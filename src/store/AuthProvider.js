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
import * as authApi from "@/lib/services/auth";
import { toast } from "@/store/toast";

const AuthContext = createContext(null);

/**
 * The signed-in profile, cached locally.
 *
 * The API has no `GET /auth/me`, so there is no way to re-read the session on a
 * refresh — the cached copy is what keeps the header signed in across reloads.
 * The cookie (or bearer token) is the real credential; this is only what we
 * draw. A 401 from any later call is what proves the session has gone, and
 * `endSession` clears both.
 */
const sessionStore = createPersistentStore("paddlehaus.session", null);

export function AuthProvider({ children }) {
  const user = usePersistentStore(sessionStore);
  const hydrated = useHydrated();
  const [modalOpen, setModalOpen] = useState(false);

  const openAuth = useCallback(() => setModalOpen(true), []);
  const closeAuth = useCallback(() => setModalOpen(false), []);

  const startSession = useCallback((profile) => {
    if (!profile) return;
    sessionStore.set(profile);
    setModalOpen(false);
  }, []);

  const endSession = useCallback(() => {
    authApi.logout();
    sessionStore.set(null);
  }, []);

  /**
   * Each of these resolves to `{ user, token, message }`. `user` is null when
   * the endpoint verified something without issuing a session — the callers
   * treat that as "not signed in yet" rather than a failure, and show the
   * server's message.
   */
  const signInWithPassword = useCallback(
    async ({ email, password }) => {
      const result = await authApi.login({ email, password });
      startSession(result.user);
      return result;
    },
    [startSession],
  );

  const registerAccount = useCallback(
    async ({ name, email, phone, password }) => {
      const result = await authApi.register({ name, email, phone, password });
      // some register controllers create the account without logging you in
      if (result.user) startSession(result.user);
      return result;
    },
    [startSession],
  );

  const requestOtp = useCallback(({ phone }) => authApi.sendOtp({ phone }), []);

  const signInWithOtp = useCallback(
    async ({ phone, otp }) => {
      const result = await authApi.verifyOtp({ phone, otp });
      startSession(result.user);
      return result;
    },
    [startSession],
  );

  const signOut = useCallback(() => endSession(), [endSession]);

  /**
   * Shared by every provider that talks to an authenticated route: if the
   * server says the session is gone, stop drawing a signed-in UI.
   */
  const handleAuthError = useCallback(
    (error) => {
      if (error?.isUnauthorized) {
        endSession();
        toast.error("Your session has expired. Please log in again.");
        return true;
      }
      return false;
    },
    [endSession],
  );

  const value = useMemo(
    () => ({
      user,
      hydrated,
      modalOpen,
      openAuth,
      closeAuth,
      signInWithPassword,
      registerAccount,
      requestOtp,
      signInWithOtp,
      signOut,
      handleAuthError,
    }),
    [
      user,
      hydrated,
      modalOpen,
      openAuth,
      closeAuth,
      signInWithPassword,
      registerAccount,
      requestOtp,
      signInWithOtp,
      signOut,
      handleAuthError,
    ],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}
