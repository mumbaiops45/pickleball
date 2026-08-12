"use client";

import { useAuth } from "@/store/AuthProvider";

/** Opens the sign-in modal from inside Server Component markup. */
export default function AuthLink({ children, className = "" }) {
  const { openAuth, user } = useAuth();

  if (user) return null;

  return (
    <button type="button" onClick={openAuth} className={className}>
      {children}
    </button>
  );
}
