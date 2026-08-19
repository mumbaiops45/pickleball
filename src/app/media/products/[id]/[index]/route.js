import { api } from "@/lib/api";

/**
 * Serves a product photo that the API stores as a base64 data URI.
 *
 * `Product.images` holds whole images inline — around 20KB of base64 each —
 * and a data URI cannot be cached, resized or shared between pages, so a grid
 * of 25 products would inline well over a megabyte into the HTML on every
 * request. Handing out `/media/products/<id>/<index>` instead keeps the markup
 * small, lets `next/image` resize the shot, and lets the browser cache it like
 * any other file.
 *
 * The id is the product's ObjectId, which is what `GET /products/:id` takes,
 * and the index picks the shot out of the `images` array. Both sit in the path
 * rather than a query string because the image optimiser rejects local sources
 * that carry one (`images.localPatterns` defaults to `search: ""`).
 */

const DATA_URI = /^data:([\w.+-]+\/[\w.+-]+);base64,(.+)$/s;

// Long enough to be worth caching, short enough that a re-uploaded photo shows
// up the same day. Stale copies are served while the new one is fetched.
const CACHE_CONTROL = "public, max-age=3600, stale-while-revalidate=86400";

const missing = () => new Response("Not found", { status: 404 });

export async function GET(request, { params }) {
  const { id, index } = await params;
  if (!/^[0-9a-f]{24}$/i.test(id) || !/^\d+$/.test(index)) return missing();

  let product;
  try {
    // the optimiser asks for several widths of the same shot, and photos change
    // far less often than prices — no reason to re-read the row each time
    product = await api.get(`/products/${id}`, { next: { revalidate: 3600 } });
  } catch {
    return missing();
  }

  const source = (product?.images ?? [])[Number(index)];
  const match = typeof source === "string" ? source.match(DATA_URI) : null;
  if (!match) return missing();

  const [, type, base64] = match;
  const bytes = Buffer.from(base64, "base64");
  if (!bytes.length) return missing();

  return new Response(bytes, {
    headers: {
      "Content-Type": type,
      "Content-Length": String(bytes.length),
      "Cache-Control": CACHE_CONTROL,
    },
  });
}
