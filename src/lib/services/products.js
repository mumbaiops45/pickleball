import { api } from "@/lib/api";


/**
 * The live catalogue, read from `GET /products`.
 *
 * The storefront owns presentation — the shop filters, the card sizing — and
 * the API owns everything a shopper is buying: name, copy, photography, price,
 * stock, badge. Nothing is read from the seeded catalogue in data.js: what the
 * admin holds is what the store shows, and an empty admin is an empty store.
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

/**
 * Backend category names against the storefront's filter names.
 *
 * Only the ball categories are listed. The admin still holds paddle, shoe,
 * apparel and bag rows and the API still returns them, but the store sells
 * pickleballs and nothing else, so a row in a category with no entry here is
 * dropped by `isVisible` instead of being rendered.
 */
const CATEGORY_FILTER = {
  Ball: "Balls",
  Balls: "Balls",
};

/** Card and gallery sizing is keyed on art.kind, so every product needs one. */
const CATEGORY_ART = {
  Balls: "ball",
};

/** The generic shots ProductArt falls back to, for a row with no photo. */
const KIND_PHOTO = {
  ball: "/photos/pickleball-balls-white.png",
};

// ProductDetail reads colorways[0] and options[0] on mount, so neither may
// ever be empty. Rows created from the admin often carry neither.
const DEFAULT_COLORWAY = { name: "Standard", hex: "#f5f3ed" };
const DEFAULT_OPTIONS = ["One size"];

/** Placeholders a shopper should never see in a filter or a spec line. */
const BLANK_BRANDS = new Set(["na", "n/a", "none", "-", "null"]);

/**
 * The same scrub, for any free-text field the admin leaves as a dash.
 *
 * The badge went straight through `text()`, so a row saved with "NA" in that
 * field printed a yellow "NA" pill across the corner of the product tile on
 * the home page and the shop grid. A badge is a claim — "Tournament", "New" —
 * and a placeholder is not one, so it renders as no badge at all.
 */
const meaningful = (value, fallback = null) => {
  const raw = text(value);
  if (!raw || BLANK_BRANDS.has(raw.toLowerCase())) return fallback;
  return raw;
};

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

/** A category the storefront no longer carries — paddles, shoes, apparel, bags. */
const isStocked = (row) =>
  !row?.category?.name || Boolean(CATEGORY_FILTER[String(row.category.name).trim()]);

/**
 * `isActive` is the switch, and it has to be explicitly true.
 *
 * It used to read `isActive !== false`, which let a row through when the field
 * was unset. A row still has to be published as well: `isActive` is how the
 * admin takes a product off sale, `status` is how it holds one back before it
 * is ready, and neither should reach a shopper.
 */
const isVisible = (row) =>
  row?.isActive === true &&
  (row?.status ?? "PUBLISHED") === "PUBLISHED" &&
  isStocked(row);

const text = (value, fallback = null) =>
  typeof value === "string" && value.trim() ? value.trim() : fallback;

const filled = (value, fallback) =>
  Array.isArray(value) && value.length ? value : fallback;

const positive = (value, fallback) =>
  Number.isFinite(Number(value)) && Number(value) > 0 ? Number(value) : fallback;

/**
 * Brands are typed by hand in the admin, so "head" and "HEAD" arrive as often
 * as each other. There is no fixed list to match against now that the shoe
 * line is gone, so a real value is trimmed and the placeholders fall back.
 */
function brandName(value, fallback) {
  const raw = text(value);
  if (!raw || BLANK_BRANDS.has(raw.toLowerCase())) return fallback;
  return raw;
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
 * One API row in the shape every product component expects.
 *
 * It used to lay the row over the data.js entry of the same slug, so a blank
 * field in the admin was quietly filled from the seeded catalogue. That is why
 * copy the store had never typed kept appearing on live products. Nothing is
 * borrowed now: a field the admin leaves empty falls back to a neutral default
 * or is simply absent.
 */
export function mergeProduct(row) {
  const slug = text(row?.slug) ?? text(row?._id);

  const category = CATEGORY_FILTER[text(row?.category?.name) ?? ""] ?? "Balls";
  const art = { kind: CATEGORY_ART[category] ?? "ball" };

  const mongoId = text(row?._id);
  const images = filled(
    (row?.images ?? [])
      .filter((src) => typeof src === "string" && src.trim())
      .map((src, index) => photoUrl(src.trim(), mongoId, index)),
    null,
  );
  const gallery = images ?? [KIND_PHOTO[art.kind] ?? KIND_PHOTO.ball];

  const colorways = filled(row?.colorways, [DEFAULT_COLORWAY]);
  const { price, compareAt } = pricing(row, null);

  return {
    id: slug,
    mongoId,
    name: text(row?.name, slug),
    blurb: text(row?.shortDescription, ""),
    description: text(row?.description, text(row?.shortDescription, "")),

    category,
    art,
    brand: brandName(row?.brand, null),
    type: text(row?.type, null),
    skill: text(row?.skill, null),
    badge: meaningful(row?.badge),
    sku: text(row?.sku, ""),

    price,
    compareAt,
    stock: Number.isFinite(Number(row?.stock)) ? Number(row.stock) : 0,

    // zero until the store collects its own; no borrowed rating
    rating: positive(row?.rating, 0),
    reviews: positive(row?.reviewCount, 0),

    image: gallery[0],
    gallery,

    colorways,
    swatches: filled(row?.swatches, colorways.map((entry) => entry.hex)),
    optionLabel: text(row?.optionLabel, "Size"),
    options: filled(row?.options, DEFAULT_OPTIONS),

    highlights: filled(row?.highlights, []),
    specs: filled(row?.specs, []),
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
 * The catalogue a page should render — the live rows, and nothing else.
 *
 * It used to fall back to the seeded catalogue in data.js whenever the API was
 * unreachable or returned nothing sellable. That meant the store quietly
 * showed products it does not sell: every ball row in the admin is currently
 * inactive, so the shop was rendering seven demo products from the repo. An
 * empty catalogue is now an empty shop, which is the truth.
 */
export async function loadCatalogue() {
  const rows = await fetchProductRows();
  return rows ? mergeCatalogue(rows) : [];
}

/**
 * One product out of a catalogue, by slug or ObjectId.
 *
 * No fallback to data.js: a link to something the store no longer sells should
 * 404 rather than render a product out of the repo that cannot be bought.
 */
export function findIn(catalogue, idOrSlug) {
  const key = String(idOrSlug ?? "");

  return (
    catalogue.find((product) =>
      isObjectId(key) ? product.mongoId === key : product.id === key,
    ) ?? null
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
