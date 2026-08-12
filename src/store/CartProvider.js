"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { findProduct } from "@/lib/data";
import { gstPortion } from "@/lib/format";
import {
  createPersistentStore,
  useHydrated,
  usePersistentStore,
} from "@/store/persistent";

const CartContext = createContext(null);

const FREE_SHIPPING_THRESHOLD = 2499;
const SHIPPING_FLAT = 99;
const MAX_PER_LINE = 20;

const cartStore = createPersistentStore("paddlehaus.cart", []);

/** Cart lines are keyed by product + chosen options, so two colourways of the
 *  same paddle stay separate rows. */
function lineKey(productId, colorway, option) {
  return [productId, colorway ?? "", option ?? ""].join("::");
}

export function CartProvider({ children }) {
  const lines = usePersistentStore(cartStore);
  const hydrated = useHydrated();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addItem = useCallback(
    ({ productId, colorway, option, quantity = 1, openDrawer = true }) => {
      const key = lineKey(productId, colorway, option);
      cartStore.update((current) => {
        const existing = current.find((line) => line.key === key);
        if (existing) {
          return current.map((line) =>
            line.key === key
              ? {
                  ...line,
                  quantity: Math.min(line.quantity + quantity, MAX_PER_LINE),
                }
              : line,
          );
        }
        return [...current, { key, productId, colorway, option, quantity }];
      });
      if (openDrawer) setDrawerOpen(true);
    },
    [],
  );

  const removeItem = useCallback((key) => {
    cartStore.update((current) => current.filter((line) => line.key !== key));
  }, []);

  const setQuantity = useCallback((key, quantity) => {
    cartStore.update((current) =>
      quantity <= 0
        ? current.filter((line) => line.key !== key)
        : current.map((line) =>
            line.key === key
              ? { ...line, quantity: Math.min(quantity, MAX_PER_LINE) }
              : line,
          ),
    );
  }, []);

  const clear = useCallback(() => cartStore.set([]), []);

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
    [lines],
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

  const count = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  );

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
