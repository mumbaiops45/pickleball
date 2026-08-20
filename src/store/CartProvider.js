"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gstPortion } from "@/lib/format";
import { useProductLookup } from "@/store/catalogue";
import {
  createMemoryStore,
  createPersistentStore,
  useHydrated,
  usePersistentStore,
} from "@/store/persistent";
import { useAuth } from "@/store/AuthProvider";
import * as cartApi from "@/lib/services/cart";
import { toast } from "@/store/toast";
import { errorMessage } from "@/lib/api";

const CartContext = createContext(null);

const FREE_SHIPPING_THRESHOLD = 2499;
const SHIPPING_FLAT = 99;
const MAX_PER_LINE = 20;

/** The key carries a version because lines written before `ownerStore` existed
 *  cannot be told apart from a guest cart, and would be pushed up one last
 *  time — doubling every quantity. Starting a new key retires them instead. */
const cartStore = createPersistentStore("paddlehaus.cart.v2", []);

/** Which account the persisted lines were last read from.
 *
 *  `POST /cart` adds to the quantity the server already holds, so the mirror
 *  may only be pushed up while it is still a guest cart. Once it belongs to an
 *  account it is a copy of the server's own lines, and pushing it again adds
 *  every quantity on top of itself. */
const ownerStore = createPersistentStore("paddlehaus.cart.owner", null);

/** True while the sign-in merge and first server read are in flight. */
const syncingStore = createMemoryStore(false);

/** Cart lines are keyed by product + chosen options, so two colourways of the
 *  same paddle stay separate rows. */
function lineKey(productId, colorway, option) {
  return [productId, colorway ?? "", option ?? ""].join("::");
}

/**
 * The cart is local until you sign in.
 *
 * `/api/cart` sits behind authMiddleware, so a signed-out shopper has nowhere
 * to put a paddle but localStorage. On sign-in whatever they collected is
 * pushed up and the server's cart becomes the truth; on sign-out the mirror is
 * dropped so the next person on the machine starts empty.
 *
 * Writes apply locally first and reconcile after, which keeps the quantity
 * stepper instant instead of waiting on a round trip.
 */
export function CartProvider({ children }) {
  const lines = usePersistentStore(cartStore);
  const clientReady = useHydrated();
  const { user, handleAuthError } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const syncing = usePersistentStore(syncingStore);

  // a line only ever holds a slug, so the catalogue is what turns it into
  // something renderable — including products that only exist in the store
  const findProduct = useProductLookup(lines.length > 0);

  const signedIn = Boolean(user);
  const userKey = user?.id ?? user?.email ?? user?.phone ?? null;

  // `undefined` means "we have not seen a session yet", which is different from
  // "signed out" — only the latter should wipe the guest cart
  const previousUser = useRef(undefined);
  const requestId = useRef(0);

  useEffect(() => {
    const ticket = ++requestId.current;
    const hadUser = previousUser.current;
    previousUser.current = userKey;

    if (!userKey) {
      if (hadUser) {
        cartStore.set([]);
        ownerStore.set(null);
      }
      syncingStore.set(false);
      return;
    }

    syncingStore.set(true);

    // Lines this account already owns came back from `/api/cart` and are not
    // ours to send up again: a reload would otherwise add every quantity on top
    // of itself, and so would Strict Mode running this effect twice. The mirror
    // is claimed synchronously, before the first await, so the second pass sees
    // it already claimed.
    const pending =
      ownerStore.getSnapshot() === userKey ? [] : cartStore.getSnapshot();
    ownerStore.set(userKey);

    // push anything collected while signed out, then take the server's answer
    const merge = pending.length
      ? Promise.all(
          pending.map((line) =>
            cartApi
              .addToCart({
                productId: line.productId,
                quantity: line.quantity,
                colorway: line.colorway,
                option: line.option,
              })
              .catch(() => null),
          ),
        )
      : Promise.resolve();

    merge
      .then(() => cartApi.fetchCart())
      .then((serverLines) => {
        if (ticket !== requestId.current) return;
        cartStore.set(serverLines);
      })
      .catch((error) => {
        if (ticket !== requestId.current) return;
        handleAuthError(error);
        // leave the local cart intact so a network blip does not empty the bag
      })
      .finally(() => {
        if (ticket === requestId.current) syncingStore.set(false);
      });
  }, [userKey, handleAuthError]);

  /** Applies the change locally, then rolls back if the server refuses. */
  const commit = useCallback(
    (mutate, request) => {
      const previous = cartStore.getSnapshot();
      cartStore.update(mutate);
      if (!signedIn) return Promise.resolve();

      return request().catch((error) => {
        cartStore.set(previous);
        // a 401 already raises its own toast, so do not stack a second one
        if (!handleAuthError(error)) {
          toast.error(errorMessage(error, "Could not update your cart."));
        }
      });
    },
    [signedIn, handleAuthError],
  );

  const addItem = useCallback(
    ({ productId, colorway, option, quantity = 1, openDrawer = true }) => {
      const key = lineKey(productId, colorway, option);
      const existing = cartStore
        .getSnapshot()
        .find((line) => line.key === key);

      // `POST /cart` adds whatever it is sent, so the ceiling has to be applied
      // before the request rather than only to the local line — otherwise the
      // shopper sees 20 while the server quietly climbs past it, and the next
      // read brings the excess back.
      const added = existing
        ? Math.min(existing.quantity + quantity, MAX_PER_LINE) -
          existing.quantity
        : Math.min(quantity, MAX_PER_LINE);

      if (added > 0) {
        commit(
          (current) =>
            existing
              ? current.map((line) =>
                  line.key === key
                    ? { ...line, quantity: line.quantity + added }
                    : line,
                )
              : [
                  ...current,
                  { key, productId, colorway, option, quantity: added },
                ],
          () =>
            cartApi.addToCart({ productId, quantity: added, colorway, option }),
        );
      }

      if (openDrawer) setDrawerOpen(true);
    },
    [commit],
  );

  const removeItem = useCallback(
    (key) => {
      const line = cartStore.getSnapshot().find((entry) => entry.key === key);
      if (!line) return;

      commit(
        (current) => current.filter((entry) => entry.key !== key),
        () => cartApi.removeCartItem(line.productId),
      );
    },
    [commit],
  );

  const setQuantity = useCallback(
    (key, quantity) => {
      const line = cartStore.getSnapshot().find((entry) => entry.key === key);
      if (!line) return;

      const next = Math.min(quantity, MAX_PER_LINE);

      commit(
        (current) =>
          next <= 0
            ? current.filter((entry) => entry.key !== key)
            : current.map((entry) =>
                entry.key === key ? { ...entry, quantity: next } : entry,
              ),
        () =>
          next <= 0
            ? cartApi.removeCartItem(line.productId)
            : cartApi.updateCartItem({
                productId: line.productId,
                quantity: next,
                colorway: line.colorway,
                option: line.option,
              }),
      );
    },
    [commit],
  );

  const clear = useCallback(
    () => commit(() => [], () => cartApi.clearCart()),
    [commit],
  );

  // join the stored lines against the catalogue so prices are never stale
  const detailedLines = useMemo(
    () =>
      lines
        .map((line) => {
          const product = findProduct(line.productId);
          if (!product) return null;
          return { ...line, product, lineTotal: product.price * line.quantity };
        })
        .filter(Boolean),
    [lines, findProduct],
  );

  const totals = useMemo(() => {
    const subtotal = detailedLines.reduce((sum, line) => sum + line.lineTotal, 0);
    const savings = detailedLines.reduce(
      (sum, line) =>
        sum +
        (line.product.compareAt
          ? (line.product.compareAt - line.product.price) * line.quantity
          : 0),
      0,
    );
    const shipping =
      subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
    // Indian retail prices are quoted inclusive of GST, so tax is shown as a
    // component of the subtotal rather than added on top.
    const gst = gstPortion(subtotal);

    return {
      subtotal,
      savings,
      shipping,
      gst,
      total: subtotal + shipping,
      freeShippingRemaining: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    };
  }, [detailedLines]);

  // How many products are in the bag, not how many units: two of the same
  // paddle is one product. Quantities are shown on the line itself.
  const count = lines.length;

  // the existing skeleton covers the first sync as well as hydration
  const hydrated = clientReady && !syncing;

  const value = useMemo(
    () => ({
      lines: detailedLines,
      count,
      totals,
      hydrated,
      addItem,
      removeItem,
      setQuantity,
      clear,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    }),
    [
      detailedLines,
      count,
      totals,
      hydrated,
      addItem,
      removeItem,
      setQuantity,
      clear,
      drawerOpen,
    ],
  );

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
