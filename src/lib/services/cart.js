import { api } from "@/lib/api";
import { lineSlug } from "@/lib/services/product-ref";
import { resolveProductId, slugForId } from "@/lib/services/catalogue";

/**
 * routes/cart.routes.js — all behind authMiddleware, so a signed-out shopper
 * keeps the localStorage cart and only syncs once they sign in.
 *
 * The controller casts `productId` to an ObjectId, so the catalogue slug is
 * resolved before each call and mapped back on the way in.
 *
 * `colorway` and `option` ride along on every write. The current cartItemSchema
 * has no columns for them and `DELETE /cart/:productId` keys on the product
 * alone, so until those fields are added two colourways of the same paddle
 * collapse into one line. Sending them now costs nothing and makes the client
 * correct the moment the schema catches up.
 */

/** Server line -> the shape CartProvider already renders. */
async function toLine(item) {
  const productId = await slugForId(lineSlug(item));
  if (!productId) return null;

  const colorway = item.colorway ?? null;
  const option = item.option ?? null;

  return {
    key: [productId, colorway ?? "", option ?? ""].join("::"),
    productId,
    colorway,
    option,
    quantity: Number(item.quantity) || 1,
  };
}

export async function fetchCart() {
  const payload = await api.get("/cart");
  const rows = Array.isArray(payload) ? payload : (payload?.items ?? payload?.cart?.items ?? []);

  const lines = await Promise.all(rows.map(toLine));

  /**
   * cartItemSchema has no colorway/option columns, so the server can hold two
   * rows that collapse to the same line key here. Two lines with one key means
   * duplicate React keys, and a removal that looks like it only half worked —
   * one row disappears, the other comes back on the next read. Merge them.
   */
  const merged = new Map();
  for (const line of lines.filter(Boolean)) {
    const existing = merged.get(line.key);
    if (existing) existing.quantity += line.quantity;
    else merged.set(line.key, { ...line });
  }

  return [...merged.values()];
}

export async function addToCart({ productId, quantity = 1, colorway = null, option = null }) {
  const id = await resolveProductId(productId);
  return api.post("/cart", { productId: id, quantity, colorway, option });
}

/** PUT /cart sets an absolute quantity rather than incrementing. */
export async function updateCartItem({ productId, quantity, colorway = null, option = null }) {
  const id = await resolveProductId(productId);
  return api.put("/cart", { productId: id, quantity, colorway, option });
}

/**
 * Removal is idempotent, because the goal state is "not in the cart".
 *
 * Two ways the server can say "there is nothing to delete": the slug belongs
 * to a product the store holds no row for (an older line, or one added before
 * the catalogue was seeded), or the row is already gone. Both used to reject,
 * and CartProvider rolls a failed write back — so the line the shopper just
 * removed reappeared, every time, with no way to get rid of it.
 */
export async function removeCartItem(productId) {
  let id;
  try {
    id = await resolveProductId(productId);
  } catch (error) {
    if (error?.status === 404) return null;
    throw error;
  }

  try {
    return await api.delete(`/cart/${encodeURIComponent(id)}`);
  } catch (error) {
    if (error?.status === 404) return null;
    throw error;
  }
}

export function clearCart() {
  return api.delete("/cart");
}
