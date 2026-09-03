import { api, ApiError } from "@/lib/api";
import { mergeCatalogue } from "@/lib/services/products";

/**
 * Slug <-> ObjectId index for the backend catalogue.
 *
 * The storefront identifies a product by its catalogue id (`apex-carbon-16`),
 * but every write route casts what it is given straight to an ObjectId — even
 * `GET /products/:id` answers "Cast to ObjectId failed" for a slug. So the id
 * is resolved here, from the public product list, before any cart or wishlist
 * call goes out.
 *
 * `GET /products` is public and small, and the mapping only changes when the
 * catalogue is reseeded, so the list is fetched once per page load and cached.
 * If the API grows a slug-aware route later, this whole module can go away
 * without touching the callers.
 */

// one shared fetch: the index, the client catalogue and every slug lookup
// on a page all read the same product list
let rowsPromise = null;

function readRows(payload) {
  if (Array.isArray(payload)) return payload;
  return payload?.products ?? payload?.data ?? [];
}

function buildIndex(rows) {
  const slugToId = new Map();
  const idToSlug = new Map();

  for (const row of rows) {
    const id = row?._id ?? row?.id;
    const slug = row?.slug;
    if (!id || !slug) continue;
    slugToId.set(slug, String(id));
    idToSlug.set(String(id), slug);
  }

  return { slugToId, idToSlug };
}

function productRows() {
  rowsPromise ??= api
    .get("/products?limit=500")
    .then(readRows)
    .catch((error) => {
      // a failed fetch must not poison the cache — the next call retries
      rowsPromise = null;
      throw error;
    });

  return rowsPromise;
}

export function productIndex() {
  return productRows().then(buildIndex);
}

/**
 * The same rows the index is built from, in storefront shape — so a client
 * that needs to render a product it only holds a slug for (a cart line, a
 * saved wishlist id) reuses this fetch rather than starting its own.
 */
export function catalogueProducts() {
  return productRows().then(mergeCatalogue);
}

/** Call after reseeding so new products resolve without a page reload. */
export function invalidateProductIndex() {
  rowsPromise = null;
}

/**
 * Slug -> ObjectId. Throws a message worth showing when the product exists in
 * the local catalogue but has never been seeded into Mongo, which is the
 * difference between "something broke" and "that one is not in the store yet".
 */
export async function resolveProductId(slug) {
  if (!slug) throw new ApiError("Missing product.", { status: 400 });

  // already an ObjectId — nothing to resolve
  if (/^[0-9a-f]{24}$/i.test(slug)) return slug;

  const { slugToId } = await productIndex();
  const id = slugToId.get(slug);
  if (id) return id;

  const name = slug;
  throw new ApiError(`${name} is not in the store catalogue yet.`, {
    status: 404,
  });
}

/** ObjectId -> slug, so server rows can be joined against the local catalogue. */
export async function slugForId(id) {
  if (!id) return null;
  if (!/^[0-9a-f]{24}$/i.test(String(id))) return String(id);

  const { idToSlug } = await productIndex();
  return idToSlug.get(String(id)) ?? null;
}
