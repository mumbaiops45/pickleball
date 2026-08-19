import { api } from "@/lib/api";
import { SHOE_BRANDS, findProduct, products as localCatalogue } from "@/lib/data";

/**
 * The live catalogue, read from `GET /products`.
 *
 * The storefront keeps owning presentation — the review block, the shop
 * filters, the card sizing — while the API owns what a shopper is actually
 * buying: name, copy, photography, price, stock, badge. `mergeProduct` lays an
 * API row over the local entry of the same slug, so a page renders exactly as
 * it did before but shows whatever the store is selling.
 *
 * Three things about the API shape drive the code below:
 *
 *  - `GET /products/:id` casts its param straight to an ObjectId, so a slug
 *    answers "Cast to ObjectId failed". Slugs are resolved from the list,
 *    which is public and carries the full document per row.
 *  - the `effectivePrice` virtual reads `discountPrice ?? price`, and a row
 *    with no discount stores `0` rather than `null` — so the virtual comes
 *    back as `0`. The selling price is computed here instead of trusted.
 *  - free-text fields are typed by hand in the admin, so `brand` arrives as
 *    "babolat", "NA" and "" as often as "Babolat". They are tidied here, or
 *    the shop sidebar's brand filter silently matches nothing.
 */

const LIST_PATH = "/products?limit=500";

/** Backend category names against the storefront's filter names. */
const CATEGORY_FILTER = {
  Paddles: "Paddles",
  Ball: "Balls",
  Balls: "Balls",
  Apparel: "Apparel",
  Bags: "Gear",
  Gear: "Gear",
  Shoes: "Shoes",
};

/** Card and gallery sizing is keyed on art.kind, so every product needs one. */
const CATEGORY_ART = {
  Paddles: "paddle",
  Balls: "ball",
  Apparel: "tee",
  Gear: "bag",
  Shoes: "shoe",
};

/** The generic shots ProductArt falls back to, for a row with no photo. */
const KIND_PHOTO = {
  paddle: "/photos/paddle-product.png",
  ball: "/photos/pickleball-balls.png",
  tee: "/photos/court-apparel.png",
  bag: "/photos/bags.jpg",
  shoe: "/photos/shoes.jpg",
};

// ProductDetail reads colorways[0] and options[0] on mount, so neither may
// ever be empty. Rows created from the admin often carry neither.
const DEFAULT_COLORWAY = { name: "Standard", hex: "#f5f3ed" };
const DEFAULT_OPTIONS = ["One size"];

/** Placeholders a shopper should never see in a filter or a spec line. */
const BLANK_BRANDS = new Set(["na", "n/a", "none", "-", "null"]);

const isObjectId = (value) => /^[0-9a-f]{24}$/i.test(String(value ?? ""));

/**
 * `Product.images` stores whole photos inline as base64 data URIs. Those
 * cannot be cached or resized and would put ~20KB of markup in the page per
 * shot, so they are pointed at `/media/products/<id>` — the route that decodes
 * them — and only inlined when there is no id to fetch them back with.
 */
function photoUrl(source, mongoId, index) {
  if (!source.startsWith("data:")) return source;
  if (!mongoId) return source;
  return `/media/products/${mongoId}/${index}`;
}

/** A draft or archived row is not for sale, so it is treated as absent. */
const isVisible = (row) =>
  row?.isActive !== false && (row?.status ?? "PUBLISHED") === "PUBLISHED";

const text = (value, fallback = null) =>
  typeof value === "string" && value.trim() ? value.trim() : fallback;

const filled = (value, fallback) =>
  Array.isArray(value) && value.length ? value : fallback;

const positive = (value, fallback) =>
  Number.isFinite(Number(value)) && Number(value) > 0 ? Number(value) : fallback;

/**
 * Hand-typed brands against the names the shop sidebar filters on, so
 * "babolat" and "Paddlehaus" still land under Babolat and PADDLEHAUS.
 */
function brandName(value, fallback) {
  const raw = text(value);
  if (!raw || BLANK_BRANDS.has(raw.toLowerCase())) return fallback;

  const known = SHOE_BRANDS.find(
    (brand) => brand.toLowerCase() === raw.toLowerCase(),
  );
  return known ?? raw;
}

/**
 * Selling price and the struck-through number. The schema quotes `price` as
 * the list price and `discountPrice` as what it is on offer for, which is the
 * inverse of how the storefront names them.
 */
function pricing(row, local) {
  const price = Number(row?.price);
  if (!Number.isFinite(price) || price <= 0) {
    return { price: local?.price ?? 0, compareAt: local?.compareAt ?? null };
  }

  const discount = Number(row?.discountPrice);
  const onOffer = Number.isFinite(discount) && discount > 0 && discount < price;

  return { price: onOffer ? discount : price, compareAt: onOffer ? price : null };
}

/**
 * One API row plus the local catalogue entry of the same slug, in the shape
 * every product component already expects. Anything the API leaves blank — an
 * unset brand, no colourways, a rating of zero before the first review — falls
 * back to the local entry rather than blanking the page out.
 */
export function mergeProduct(row, base = null) {
  const slug = text(row?.slug) ?? text(row?._id) ?? base?.id;
  const local = base ?? findProduct(slug);

  const category =
    CATEGORY_FILTER[text(row?.category?.name) ?? ""] ?? local?.category ?? "Gear";
  const art = local?.art ?? { kind: CATEGORY_ART[category] ?? "paddle" };

  const mongoId = text(row?._id);
  const images = filled(
    (row?.images ?? [])
      .filter((src) => typeof src === "string" && src.trim())
      .map((src, index) => photoUrl(src.trim(), mongoId, index)),
    null,
  );
  const gallery =
    images ??
    local?.gallery ?? [local?.image ?? KIND_PHOTO[art.kind] ?? KIND_PHOTO.paddle];

  const colorways = filled(
    row?.colorways,
    filled(local?.colorways, [DEFAULT_COLORWAY]),
  );
  const { price, compareAt } = pricing(row, local);

  return {
    ...local,

    id: slug,
    mongoId,
    name: text(row?.name, local?.name ?? slug),
    blurb: text(row?.shortDescription, local?.blurb ?? ""),
    description: text(row?.description, local?.description ?? local?.blurb ?? ""),

    category,
    art,
    brand: brandName(row?.brand, local?.brand ?? null),
    type: text(row?.type, local?.type ?? null),
    skill: text(row?.skill, local?.skill ?? null),
    badge: text(row?.badge, local?.badge ?? null),
    sku: text(row?.sku, local?.sku ?? ""),

    price,
    compareAt,
    stock: Number.isFinite(Number(row?.stock))
      ? Number(row.stock)
      : (local?.stock ?? 0),

    // A store that has not collected its own reviews yet keeps the copy the
    // catalogue ships with, so the ratings block never drops to a bare zero.
    rating: positive(row?.rating, local?.rating ?? 0),
    reviews: positive(row?.reviewCount, local?.reviews ?? 0),

    image: gallery[0],
    gallery,

    colorways,
    swatches: filled(row?.swatches, colorways.map((entry) => entry.hex)),
    optionLabel: text(row?.optionLabel, local?.optionLabel ?? "Size"),
    options: filled(row?.options, filled(local?.options, DEFAULT_OPTIONS)),

    highlights: filled(row?.highlights, local?.highlights ?? []),
    specs: filled(row?.specs, local?.specs ?? []),
  };
}

/** Every sellable row, in storefront shape. */
export function mergeCatalogue(rows) {
  return rows.filter(isVisible).map((row) => mergeProduct(row));
}

/**
 * The raw product rows. Returns `null` — not an empty list — when the API
 * cannot be reached, so callers can tell "the store is empty" apart from
 * "the store did not answer".
 */
export async function fetchProductRows() {
  try {
    const payload = await api.get(LIST_PATH);
    return Array.isArray(payload)
      ? payload
      : (payload?.products ?? payload?.data ?? []);
  } catch {
    return null;
  }
}

/**
 * The catalogue a page should render. Falls back to `data.js` when the API is
 * unreachable or has nothing published, so an outage costs the store its
 * prices, not its shopfront.
 */
export async function loadCatalogue() {
  const rows = await fetchProductRows();
  if (!rows) return localCatalogue;

  const merged = mergeCatalogue(rows);
  return merged.length ? merged : localCatalogue;
}

/**
 * One product out of a catalogue, by slug (`apex-carbon-16`) or ObjectId. A
 * product the store holds no row for still resolves against `data.js`, so
 * older links keep working instead of 404ing.
 */
export function findIn(catalogue, idOrSlug) {
  const key = String(idOrSlug ?? "");

  return (
    catalogue.find((product) =>
      isObjectId(key) ? product.mongoId === key : product.id === key,
    ) ?? findProduct(key)
  );
}

/**
 * Same-category first, then the rest — the ordering `relatedProducts` in
 * data.js used, drawn from whichever catalogue the page is rendering.
 */
export function relatedFrom(catalogue, product, limit = 4) {
  if (!product) return [];

  const others = catalogue.filter((item) => item.id !== product.id);
  const sameCategory = others.filter((item) => item.category === product.category);
  const rest = others.filter((item) => item.category !== product.category);

  return [...sameCategory, ...rest].slice(0, limit);
}

/**
 * One product, straight from the API. `null` means neither the store nor the
 * local catalogue has it — that is a real 404.
 */
export async function loadProduct(idOrSlug) {
  const catalogue = await loadCatalogue();
  return findIn(catalogue, idOrSlug) ?? null;
}
