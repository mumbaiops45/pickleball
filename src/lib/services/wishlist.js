import { api } from "@/lib/api";
import { lineSlug } from "@/lib/services/product-ref";
import { resolveProductId, slugForId } from "@/lib/services/catalogue";

/**
 * routes/wishlist.routes.js — every route sits behind authMiddleware.
 *
 * The controller casts `productId` to an ObjectId, so the catalogue slug is
 * resolved before each call and mapped back on the way in.
 */

/** Returns plain slugs, which is exactly what WishlistProvider stores. */
export async function fetchWishlist() {
  const payload = await api.get("/wishlist");
  const rows = Array.isArray(payload) ? payload : (payload?.items ?? payload?.wishlist ?? []);

  const slugs = await Promise.all(rows.map((row) => slugForId(lineSlug(row))));
  // a row whose product is gone from the catalogue resolves to null, and the
  // same product saved twice would render two hearts under one key
  return [...new Set(slugs.filter(Boolean))];
}

export async function addToWishlist(slug) {
  const productId = await resolveProductId(slug);
  return api.post("/wishlist/add", { productId });
}

/** Idempotent, for the same reason removal is in the cart: a product the store
 *  has no row for cannot be saved server-side either, and a rejected delete is
 *  rolled back — which puts the heart the shopper just cleared straight back. */
export async function removeFromWishlist(slug) {
  let productId;
  try {
    productId = await resolveProductId(slug);
  } catch (error) {
    if (error?.status === 404) return null;
    throw error;
  }

  try {
    return await api.delete(`/wishlist/${encodeURIComponent(productId)}`);
  } catch (error) {
    if (error?.status === 404) return null;
    throw error;
  }
}

/**
 * The one-call variant. Returns true when the product ended up saved, so the
 * heart can settle on the server's answer rather than a guess.
 */
export async function toggleWishlist(slug) {
  const productId = await resolveProductId(slug);
  const payload = await api.post("/wishlist/toggle", { productId });

  if (typeof payload?.saved === "boolean") return payload.saved;
  if (typeof payload?.added === "boolean") return payload.added;
  if (typeof payload?.inWishlist === "boolean") return payload.inWishlist;
  return null; // controller did not say — caller keeps its optimistic value
}
