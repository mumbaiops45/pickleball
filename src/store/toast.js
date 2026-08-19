"use client";

import { createMemoryStore, usePersistentStore } from "@/store/persistent";

/**
 * Toasts, held in a module-level store rather than a context.
 *
 * The providers and the service layer both need to raise one, and neither of
 * those sits comfortably under a hook — a plain store lets `toast.error(...)`
 * be called from anywhere, including a `.catch()` far from any component.
 */
const toastStore = createMemoryStore([]);

const DURATION = 4000;
const MAX_VISIBLE = 3;

let nextId = 0;
const timers = new Map();

export function dismissToast(id) {
  const timer = timers.get(id);
  if (timer) {
    clearTimeout(timer);
    timers.delete(id);
  }
  toastStore.update((current) => current.filter((entry) => entry.id !== id));
}

function push(tone, message, { duration = DURATION } = {}) {
  const text = typeof message === "string" ? message.trim() : "";
  if (!text) return null;

  const id = ++nextId;

  toastStore.update((current) => {
    // an identical toast already on screen is a repeat, not a second event
    const deduped = current.filter((entry) => entry.message !== text);
    return [...deduped, { id, tone, message: text }].slice(-MAX_VISIBLE);
  });

  if (duration > 0) {
    timers.set(
      id,
      setTimeout(() => dismissToast(id), duration),
    );
  }

  return id;
}

export const toast = {
  success: (message, options) => push("success", message, options),
  error: (message, options) => push("error", message, options),
  info: (message, options) => push("info", message, options),
};

export function useToasts() {
  return usePersistentStore(toastStore);
}
