"use client";

import { useSyncExternalStore } from "react";

/**
 * A localStorage-backed external store.
 *
 * `getServerSnapshot` returns the empty initial value, which is what the
 * prerendered HTML contains; React swaps to `getSnapshot` after hydration, so
 * there is no markup mismatch and no setState-inside-an-effect. Writes from
 * another tab arrive through the `storage` event.
 */
export function createPersistentStore(key, initial) {
  let snapshot = initial;
  let rawCache = null;
  const listeners = new Set();

  const readRaw = () => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const parse = (raw) => {
    if (!raw) return initial;
    try {
      return JSON.parse(raw);
    } catch {
      return initial;
    }
  };

  const emit = () => {
    for (const listener of listeners) listener();
  };

  // pull the stored value in before React ever renders on the client
  const syncFromStorage = () => {
    const raw = readRaw();
    if (raw === rawCache) return;
    rawCache = raw;
    snapshot = parse(raw);
    emit();
  };

  if (typeof window !== "undefined") syncFromStorage();

  const write = (next) => {
    snapshot = next;
    try {
      rawCache = JSON.stringify(next);
      window.localStorage.setItem(key, rawCache);
    } catch {
      // quota exceeded or private mode — state still lives in memory
    }
    emit();
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      const onStorage = (event) => {
        if (event.key === key) syncFromStorage();
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
      };
    },
    getSnapshot: () => snapshot,
    getServerSnapshot: () => initial,
    set: write,
    update(updater) {
      write(updater(snapshot));
    },
  };
}

/**
 * The same store contract without the localStorage half, for transient values
 * that must not survive a reload — in-flight flags, fetched-not-cached data.
 *
 * Providers use this instead of `useState` for anything an effect has to set,
 * because writing to an external store is what effects are for; calling
 * `setState` in an effect body triggers the cascading-render lint.
 */
export function createMemoryStore(initial) {
  let snapshot = initial;
  const listeners = new Set();

  const write = (next) => {
    if (Object.is(next, snapshot)) return;
    snapshot = next;
    for (const listener of listeners) listener();
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot: () => snapshot,
    getServerSnapshot: () => initial,
    set: write,
    update(updater) {
      write(updater(snapshot));
    },
  };
}

export function usePersistentStore(store) {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
}

const noopSubscribe = () => () => {};

/** False during SSR and hydration, true once the client has taken over. */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
