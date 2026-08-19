import { api, setAuthToken } from "@/lib/api";

/**
 * routes/auth.routes.js — register, login and the two OTP steps are public;
 * everything else on that router is admin-only and not used by the storefront.
 *
 * Auth is a bearer token, not a cookie: the API answers an unauthenticated call
 * with "Authorization token is required" and sends no `set-cookie`. The token
 * therefore has to come back in the login response body.
 *
 * There is no `GET /auth/me`, so a signed-in profile cannot be re-fetched after
 * a refresh. The profile is cached locally by AuthProvider and a 401 from any
 * later call is what tells us the session has actually gone.
 *
 * Every call is made with `raw: true` so the envelope's `message` survives —
 * that is what the toaster shows.
 */

/**
 * Pulls a session out of an auth response. The token and user may sit at the
 * top level or under `data`, and some responses carry neither — verify-otp
 * currently answers `{ success, message }` alone, which confirms the phone but
 * starts no session.
 */
function readSession(payload) {
  const body = payload ?? {};
  const data = body.data ?? body;

  const token = data.token ?? data.accessToken ?? body.token ?? null;
  const rawUser =
    data.user ?? body.user ?? (data.email || data.phone ? data : null);

  if (token) setAuthToken(token);

  return {
    // No token means no session, whatever else came back. `register` returns a
    // full user object and no token — treating that as signed in would paint a
    // signed-in header over a client that 401s on every authenticated call.
    user: token ? normaliseUser(rawUser) : null,
    profile: normaliseUser(rawUser),
    token,
    message: body.message ?? "",
  };
}

/** Maps a User document onto the shape the account UI already renders. */
export function normaliseUser(user) {
  if (!user) return null;
  return {
    id: user._id ?? user.id ?? null,
    name: user.name?.trim() || user.email?.split("@")[0] || "Player",
    email: user.email ?? "",
    phone: user.phone ?? "",
    role: user.role ?? "CUSTOMER",
    memberSince: user.createdAt
      ? String(new Date(user.createdAt).getFullYear())
      : "2026",
  };
}

export async function register({ name, email, phone, password }) {
  const payload = await api.post(
    "/auth/register",
    { name, email, phone, password },
    { raw: true },
  );
  return readSession(payload);
}

export async function login({ email, password }) {
  const payload = await api.post("/auth/login", { email, password }, { raw: true });
  return readSession(payload);
}

export async function sendOtp({ phone }) {
  const payload = await api.post("/auth/send-otp", { phone }, { raw: true });
  return { message: payload?.message ?? "" };
}

export async function verifyOtp({ phone, otp }) {
  const payload = await api.post("/auth/verify-otp", { phone, otp }, { raw: true });
  return readSession(payload);
}

/**
 * Password reset by emailed code, mirroring the phone OTP the API already has:
 * ask for a code, then send it back with the new password.
 *
 * Neither route exists yet — both answer 404 "Route ... not found" — and
 * `send-otp` is phone-only, so an email cannot borrow it. They are written
 * against this contract so /forgot-password starts working the day they land;
 * until then the page reads the 404 and points at phone sign-in, which works.
 *
 *   POST /auth/forgot-password  { email }
 *     -> { success, message }
 *     Mails a six-digit code with a short expiry. Answer the same whether or
 *     not the address has an account, or it becomes an account oracle.
 *
 *   POST /auth/reset-password   { email, otp, password }
 *     -> { success, message, token?, user? }
 *     Verifies the code, hashes the new password, burns the code. Returning a
 *     token signs them straight in; leaving it out sends them to log in.
 */
export async function requestPasswordReset({ email }) {
  const payload = await api.post(
    "/auth/forgot-password",
    { email },
    { raw: true },
  );
  return { message: payload?.message ?? "" };
}

export async function resetPassword({ email, otp, password }) {
  const payload = await api.post(
    "/auth/reset-password",
    { email, otp, password },
    { raw: true },
  );
  return readSession(payload);
}

/** No logout route exists, so signing out is local: drop the token and let it
 *  expire server-side. Add `POST /auth/logout` to invalidate it properly. */
export function logout() {
  setAuthToken(null);
}
