/**
 * Reverse geocoding for the checkout's "use my current location" button.
 *
 * The browser hands over coordinates; the address form needs a street, city,
 * state and pincode. That lookup runs here rather than in the page so the
 * provider can be swapped without touching the form, no key ever reaches the
 * client, and repeat lookups are cached instead of re-asked.
 *
 * OpenStreetMap's Nominatim is the provider: no key to manage, and it returns
 * Indian pincodes. Its usage policy asks for an identifying User-Agent and at
 * most one call a second — a shopper pressing a button stays well inside that,
 * but swap in a keyed provider here if this ever runs at volume.
 */

const NOMINATIM = "https://nominatim.openstreetmap.org/reverse";

const USER_AGENT = "PADDLEHAUS storefront (hello@paddlehaus.in)";


const PRECISION = 4;

const DAY = 86400;

const fail = (message, status) => Response.json({ message }, { status });

const first = (...values) =>
  values.find((value) => typeof value === "string" && value.trim())?.trim() ?? "";

function toAddress(place) {
  const found = place?.address ?? {};

  const street = [found.house_number, found.road].filter(Boolean).join(" ");
  const area = first(found.neighbourhood, found.suburb, found.hamlet);

  const addressLine1 = street || area;

  return {
    addressLine1,
    // the area reads as a landmark, unless it is already the street line
    addressLine2: area && area !== addressLine1 ? area : "",
    city: first(
      found.city,
      found.town,
      found.village,
      found.municipality,
      found.city_district,
      found.county,
    ),
    state: first(found.state, found.state_district),
    pincode: first(found.postcode).replace(/\s/g, ""),
    country: first(found.country) || "India",
    // what the coordinates resolved to, so the shopper can see it was right
    label: first(place?.display_name),
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return fail("Send lat and lon as numbers.", 400);
  }
  if (Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return fail("Those coordinates are not on Earth.", 400);
  }

  const query = new URLSearchParams({
    format: "jsonv2",
    addressdetails: "1",
    zoom: "18",
    lat: lat.toFixed(PRECISION),
    lon: lon.toFixed(PRECISION),
  });

  let place;
  try {
    const response = await fetch(`${NOMINATIM}?${query}`, {
      headers: { "User-Agent": USER_AGENT, "Accept-Language": "en" },
      next: { revalidate: DAY },
    });
    if (!response.ok) return fail("The address lookup is unavailable.", 502);
    place = await response.json();
  } catch {
    return fail("The address lookup is unavailable.", 502);
  }

  if (!place || place.error || !place.address) {
    return fail("No address found at that spot.", 404);
  }

  return Response.json(toAddress(place));
}
