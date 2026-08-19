"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { createMemoryStore, usePersistentStore } from "@/store/persistent";
import { useAuth } from "@/store/AuthProvider";
import { fetchMyOrders } from "@/lib/services/orders";
import { errorMessage } from "@/lib/api";

const OrdersContext = createContext(null);

/**
 * Order history for the account area.
 *
 * Mounted in the /account layout so the sidebar count, the overview's "recent
 * orders" and the full history list all read one fetch rather than three.
 *
 * A memory store rather than `useState`: the effect that refetches on sign-in
 * has to write the loading flag, and writing to an external store is what
 * effects are for. It also survives moving between the three account routes, so
 * the list paints instantly on the second visit and refreshes behind it.
 */
const ordersStore = createMemoryStore({
  orders: [],
  loading: true,
  error: "",
});

export function OrdersProvider({ children }) {
  const { user, handleAuthError } = useAuth();
  const { orders, loading, error } = usePersistentStore(ordersStore);

  const requestId = useRef(0);
  const userKey = user?.id ?? user?.email ?? user?.phone ?? null;

  const load = useCallback(() => {
    const ticket = ++requestId.current;

    if (!userKey) {
      ordersStore.set({ orders: [], loading: false, error: "" });
      return Promise.resolve();
    }

    ordersStore.update((current) => ({ ...current, loading: true }));

    return fetchMyOrders()
      .then((rows) => {
        if (ticket !== requestId.current) return;
        ordersStore.set({ orders: rows, loading: false, error: "" });
      })
      .catch((problem) => {
        if (ticket !== requestId.current) return;
        handleAuthError(problem);
        ordersStore.set({
          orders: [],
          loading: false,
          error: errorMessage(problem, "Could not load your orders."),
        });
      });
  }, [userKey, handleAuthError]);

  useEffect(() => {
    load();
  }, [load]);

  const value = useMemo(
    () => ({ orders, loading, error, refresh: load }),
    [orders, loading, error, load],
  );

  return <OrdersContext value={value}>{children}</OrdersContext>;
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) throw new Error("useOrders must be used inside <OrdersProvider>");
  return context;
}
