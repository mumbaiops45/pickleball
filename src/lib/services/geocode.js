/**
 * "Use my current location" for the delivery address.
 *
 * Two steps, kept apart so either can fail with something worth reading: the
 * browser gives coordinates, then `/api/geocode` turns them into address
 * fields. Nothing is stored — the coordinates go no further than that lookup,
 * and only the resulting text lands in the form, where it can be corrected
 * before it is saved.
 *
 * Geolocation needs a secure context: it works on https and on localhost, and
 * is refused outright on a plain-http host.
 */

/** The three failures `PositionError` reports, in words a shopper can act on. */
const GEO_MESSAGE = {
  1: "Location permission was denied. Allow it for this site, or type the address in.",
  2: "Your location is not available right now. Please type the address in.",
  3: "Finding you took too long. Try again, or type the address in.",
};

const UNSUPPORTED = "This browser cannot share your location.";

export function currentPosition({ timeout = 12000 } = {}) {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error(UNSUPPORTED));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (error) =>
        reject(new Error(GEO_MESSAGE[error?.code] ?? "Could not read your location.")),
      // a minute-old fix is fine for an address, and cheaper than a new one
      { enableHighAccuracy: true, timeout, maximumAge: 60000 },
    );
  });
}

export async function reverseGeocode({ latitude, longitude }) {
  const response = await fetch(`/api/geocode?lat=${latitude}&lon=${longitude}`);
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(body?.message ?? "Could not find an address for that spot.");
  }
  return body;
}

/** Coordinates to address fields in one call, for the button to await. */
export async function locateAddress() {
  return reverseGeocode(await currentPosition());
}
