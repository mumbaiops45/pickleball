/**
 * Exports the local catalogue as seed JSON for the backend `Product`
 * collection, in that collection's own field names.
 *
 * The frontend keeps rendering products from `src/lib/data.js` — the generated
 * art, swatches, specs and filters all live there. Mongo needs a matching row
 * per product so cart / wishlist / order documents have something to reference,
 * and a `slug` equal to the catalogue id so the API can resolve one from the
 * other.
 *
 *   node scripts/export-catalogue.mjs
 *
 * Writes scripts/catalogue-seed.json. Categories are resolved against the live
 * API so each row carries a real ObjectId; if the API cannot be reached the
 * rows still carry `categoryName` for a seeder to look up.
 *
 * Re-run whenever data.js changes and seed with an UPSERT ON `slug` — never a
 * drop-and-recreate, or every existing cart, wishlist and order row is left
 * pointing at an ObjectId that no longer exists.
 */

import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { products } from "../src/lib/data.js";

const here = dirname(fileURLToPath(import.meta.url));

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

/** The catalogue's filter names against the categories the backend actually has. */
const CATEGORY_NAME = {
  Paddles: "Paddles",
  Balls: "Ball",
  Apparel: "Apparel",
  Gear: "Bags",
  Shoes: "Shoes",
};

async function categoryIds() {
  try {
    const response = await fetch(`${API_URL}/categories`);
    const body = await response.json();
    const rows = body?.data ?? body ?? [];
    return new Map(rows.map((row) => [row.name, row._id]));
  } catch {
    console.warn(
      `! Could not read ${API_URL}/categories — rows will carry categoryName only.`,
    );
    return new Map();
  }
}

const ids = await categoryIds();

const seed = products.map((product) => {
  const categoryName = CATEGORY_NAME[product.category] ?? product.category;

  return {
    slug: product.id,
    name: product.name,
    sku: product.sku,
    description: product.description ?? product.blurb,
    shortDescription: product.blurb,

    categoryName,
    category: ids.get(categoryName) ?? null,

    price: product.price,
    compareAt: product.compareAt ?? null,
    discountPrice: 0,
    stock: product.stock,

    images: product.gallery ?? [product.image],

    brand: product.brand ?? "PADDLEHAUS",
    type: product.type ?? null,
    skill: product.skill ?? null,
    badge: product.badge ?? null,

    rating: product.rating ?? 0,
    reviewCount: product.reviews ?? 0,

    // presentation fields — the storefront reads these from data.js, so they are
    // safe to drop if the schema types them differently
    optionLabel: product.optionLabel ?? null,
    options: product.options ?? [],
    colorways: product.colorways ?? [],
    swatches: product.swatches ?? [],
    specs: product.specs ?? [],
    highlights: product.highlights ?? [],

    status: "PUBLISHED",
    isActive: true,
    isFeatured: false,
  };
});

const target = join(here, "catalogue-seed.json");
await writeFile(target, `${JSON.stringify(seed, null, 2)}\n`);

const unresolved = seed.filter((row) => !row.category).length;
console.log(`Wrote ${seed.length} products to ${target}`);
if (unresolved) {
  console.log(`${unresolved} rows have no category ObjectId — resolve by categoryName.`);
}
