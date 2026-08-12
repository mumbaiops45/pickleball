"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  createPersistentStore,
  useHydrated,
  usePersistentStore,
} from "@/store/persistent";

const AuthContext = createContext(null);

const sessionStore = createPersistentStore("paddlehaus.session", null);

/**
 * Front-end-only session. There is no server, no OTP delivery and no token —
 * completing the modal just records a profile in localStorage so the UI can
 * show a signed-in state. Swap `completeSignIn` for a real call later.
 *
 * The sign-in UI is a modal rather than a route, so the open/closed state
 * lives here where any component can reach it.
 */
export function AuthProvider({ children }) {
  const user = usePersistentStore(sessionStore);
  const hydrated = useHydrated();
  const [modalOpen, setModalOpen] = useState(false);

  const openAuth = useCallback(() => setModalOpen(true), []);
  const closeAuth = useCallback(() => setModalOpen(false), []);

  const completeSignIn = useCallback(({ phone, name }) => {
    sessionStore.set({
      phone,
      name: name?.trim() || "Player",
      memberSince: "2026",
    });
    setModalOpen(false);
  }, []);

  const signOut = useCallback(() => sessionStore.set(null), []);

  const value = useMemo(
    () => ({
      user,
      hydrated,
      modalOpen,
      openAuth,
      closeAuth,
      completeSignIn,
      signOut,
    }),
    [user, hydrated, modalOpen, openAuth, closeAuth, completeSignIn, signOut],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}
