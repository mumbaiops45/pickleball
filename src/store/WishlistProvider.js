"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  createMemoryStore,
  createPersistentStore,
  useHydrated,
  usePersistentStore,
} from "@/store/persistent";
import { useAuth } from "@/store/AuthProvider";
import { useProductLookup } from "@/store/catalogue";
import * as wishlistApi from "@/lib/services/wishlist";
import { toast } from "@/store/toast";
import { errorMessage } from "@/lib/api";

const WishlistContext = createContext(null);

/**
 * Product slugs only — the catalogue stays the source of truth for price and
 * stock, exactly like the cart.
 *
 * Saving requires an account (WishlistButton opens the login modal for signed-
 * out taps), so the server owns this list. The local store is a mirror that
 * lets the hearts paint instantly on load instead of popping in after a fetch;
 * it is cleared on sign-out so the next account never inherits it.
 */
const wishlistStore = createPersistentStore("paddlehaus.wishlist", []);

/** True while the first read for the current account is in flight. */
const syncingStore = createMemoryStore(false);

export function WishlistProvider({ children }) {
  const ids = usePersistentStore(wishlistStore);
  const clientReady = useHydrated();
  const { user, handleAuthError } = useAuth();

  // saved ids are slugs; the catalogue turns them back into products
  const findProduct = useProductLookup(ids.length > 0);

  const syncing = usePersistentStore(syncingStore);
  // guards against a slow response from a previous account overwriting a newer one
  const requestId = useRef(0);

  useEffect(() => {
    const ticket = ++requestId.current;

    if (!user) {
      wishlistStore.set([]);
      syncingStore.set(false);
      return;
    }

    syncingStore.set(true);
    wishlistApi
      .fetchWishlist()
      .then((serverIds) => {
        if (ticket !== requestId.current) return;
        wishlistStore.set(serverIds);
      })
      .catch((error) => {
        if (ticket !== requestId.current) return;
        handleAuthError(error);
        // keep the mirror on a network blip rather than blanking the page
      })
      .finally(() => {
        if (ticket === requestId.current) syncingStore.set(false);
      });
  }, [user, handleAuthError]);

  /** Applies the change locally first, then rolls back if the server refuses. */
  const commit = useCallback(
    async (optimistic, request) => {
      const previous = wishlistStore.getSnapshot();
      wishlistStore.set(optimistic);
      try {
        return await request();
      } catch (error) {
        wishlistStore.set(previous);
        if (!handleAuthError(error)) {
          toast.error(errorMessage(error, "Could not update your wishlist."));
        }
        throw error;
      }
    },
    [handleAuthError],
  );

  const add = useCallback(
    (productId) => {
      const current = wishlistStore.getSnapshot();
      if (current.includes(productId)) return Promise.resolve();
      return commit([productId, ...current], () =>
        wishlistApi.addToWishlist(productId),
      );
    },
    [commit],
  );

  const remove = useCallback(
    (productId) => {
      const current = wishlistStore.getSnapshot();
      return commit(
        current.filter((entry) => entry !== productId),
        () => wishlistApi.removeFromWishlist(productId),
      );
    },
    [commit],
  );

  const toggle = useCallback(
    (productId) => {
      const current = wishlistStore.getSnapshot();
      const saved = !current.includes(productId);
      const optimistic = saved
        ? [productId, ...current]
        : current.filter((entry) => entry !== productId);

      commit(optimistic, async () => {
        const serverSaved = await wishlistApi.toggleWishlist(productId);
        // settle on the server's answer when the controller reports one
        if (serverSaved !== null && serverSaved !== saved) {
          wishlistStore.update((list) =>
            serverSaved
              ? list.includes(productId)
                ? list
                : [productId, ...list]
              : list.filter((entry) => entry !== productId),
          );
        }
      }).catch(() => {
        // already rolled back in `commit`
      });

      // the heart flips immediately; the caller does not wait on the network
      return saved;
    },
    [commit],
  );

  const clear = useCallback(async () => {
    const current = wishlistStore.getSnapshot();
    // no bulk-delete route, so clearing is one call per saved product
    await commit([], () =>
      Promise.all(current.map((id) => wishlistApi.removeFromWishlist(id))),
    ).catch(() => {});
  }, [commit]);

  // drop ids whose product has left the catalogue rather than rendering holes
  const items = useMemo(
    () => ids.map((id) => findProduct(id)).filter(Boolean),
    [ids, findProduct],
  );

  const has = useCallback((productId) => ids.includes(productId), [ids]);

  // the existing skeleton covers the first fetch as well as hydration
  const hydrated = clientReady && !syncing;

  const value = useMemo(
    () => ({
      ids,
      items,
      count: items.length,
      hydrated,
      has,
      add,
      remove,
      toggle,
      clear,
    }),
    [ids, items, hydrated, has, add, remove, toggle, clear],
  );

  return <WishlistContext value={value}>{children}</WishlistContext>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used inside <WishlistProvider>");
  return context;
}
