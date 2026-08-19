/**
 * The storefront identifies a product by its catalogue id — `apex-carbon-16` —
 * while Mongo identifies it by ObjectId. The agreed contract is that the API
 * accepts and returns the slug, resolving it server-side, so the local
 * catalogue in `src/lib/data.js` stays the source of truth for anything
 * visual (art, swatches, specs, filters).
 *
 * Seed the `Product` collection from `scripts/catalogue-seed.json`, which
 * writes `slug` on every row.
 */

/**
 * Pulls the slug out of whatever the API put in a `product` field — a bare
 * ObjectId string, a populated document, or the slug itself.
 */
export function productSlugOf(entry) {
  if (!entry) return null;
  if (typeof entry === "string") return entry;
  return entry.slug ?? entry.productSlug ?? entry._id ?? entry.id ?? null;
}

/** Reads the slug off a cart / wishlist / order line, wherever it sits. */
export function lineSlug(line) {
  if (!line) return null;
  return line.slug ?? line.productSlug ?? productSlugOf(line.product ?? line.productId);
}
