/**
 * Thin fetch wrapper around the Express API.
 *
 * Auth is a bearer token: the API answers an unauthenticated call with
 * "Authorization token is required" and sets no cookie, so the token from the
 * login response is kept here and sent as an `Authorization` header.
 * `credentials: "include"` stays on as well, harmlessly, in case a cookie is
 * added later.
 *
 * Endpoint paths live in `src/lib/services/`, not here — this file only knows
 * how to talk, not what to say.
 */

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"
).replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, { status = 0, payload = null } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }

  /** 401 means "log back in", which the UI treats differently to a real fault. */
  get isUnauthorized() {
    return this.status === 401 || this.status === 403;
  }

  /** No response at all — server down, DNS, CORS preflight rejected. */
  get isOffline() {
    return this.status === 0;
  }
}

const NETWORK_MESSAGE =
  "Could not reach the server. Check that the API is running.";

/* ------------------------------------------------------------ bearer token */

const TOKEN_KEY = "paddlehaus.token";

let authToken = null;

if (typeof window !== "undefined") {
  try {
    authToken = window.localStorage.getItem(TOKEN_KEY);
  } catch {
    // private mode — the cookie is still doing the work
  }
}

/** Called by the auth service when a login response carries a token. Passing
 *  `null` clears it, which is what sign-out does. */
export function setAuthToken(token) {
  authToken = token || null;
  if (typeof window === "undefined") return;
  try {
    if (authToken) window.localStorage.setItem(TOKEN_KEY, authToken);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // non-fatal: the token still lives in memory for this tab
  }
}

export function getAuthToken() {
  return authToken;
}

async function readBody(response) {
  const type = response.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) {
    const text = await response.text().catch(() => "");
    return text || null;
  }
  return response.json().catch(() => null);
}

/**
 * The API answers with `{ success, message, data }` (see app.js), so callers
 * get `data` directly rather than unwrapping at every call site. A response
 * that does not use the envelope is passed through untouched.
 */
function unwrap(body) {
  if (body && typeof body === "object" && "success" in body) {
    return "data" in body ? body.data : body;
  }
  return body;
}

function messageFrom(body, fallback) {
  if (typeof body === "string" && body.trim()) return body;
  if (body && typeof body === "object") {
    return body.message || body.error || fallback;
  }
  return fallback;
}

export async function apiRequest(
  path,
  // `cache` and `next` are only meaningful on the server, where a route handler
  // may want Next to hold the response rather than re-ask on every request
  { method = "GET", body, signal, raw = false, cache, next } = {},
) {
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  let response;
  try {
    response = await fetch(url, {
      method,
      // cookie auth only works cross-origin when both sides opt in
      credentials: "include",
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
      cache,
      next,
    });
  } catch (error) {
    // an aborted request is the caller cancelling, not a failure to report
    if (error?.name === "AbortError") throw error;
    throw new ApiError(NETWORK_MESSAGE, { status: 0 });
  }

  const payload = await readBody(response);

  if (!response.ok) {
    throw new ApiError(messageFrom(payload, `Request failed (${response.status})`), {
      status: response.status,
      payload,
    });
  }

  // `raw` keeps the envelope so a caller can read `message` alongside `data`
  return raw ? payload : unwrap(payload);
}

export const api = {
  get: (path, options) => apiRequest(path, { ...options, method: "GET" }),
  post: (path, body, options) => apiRequest(path, { ...options, method: "POST", body }),
  put: (path, body, options) => apiRequest(path, { ...options, method: "PUT", body }),
  patch: (path, body, options) => apiRequest(path, { ...options, method: "PATCH", body }),
  delete: (path, options) => apiRequest(path, { ...options, method: "DELETE" }),
};

/** Turns any thrown value into something safe to render in a form's error slot. */
export function errorMessage(error, fallback = "Something went wrong.") {
  if (error instanceof ApiError) return error.message;
  if (error?.message) return error.message;
  return fallback;
}
