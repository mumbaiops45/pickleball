import PageHero from "@/components/ui/PageHero";
import ShopBrowser from "@/components/shop/ShopBrowser";
import { SHOE_BRANDS, SHOE_TYPES, productFilters } from "@/lib/data";
import { loadCatalogue } from "@/lib/services/products";

export const metadata = {
  title: "Shop all",
  description:
    "Every paddle, ball, apparel piece and accessory in the PADDLEHAUS line. Filter by category, skill level and price.",
};

// The grid is whatever the store currently sells, so it is read per request.
export const dynamic = "force-dynamic";

/** `?category=` may arrive repeated; the first value is the one that counts. */
const one = (value) => (Array.isArray(value) ? value[0] : value) ?? null;

/** Unknown values are dropped rather than passed through, so a hand-edited
 *  query can never seed a filter that matches nothing. */
const allow = (value, allowed) => (allowed.includes(value) ? value : null);

export default async function ShopPage({ searchParams }) {
  // ?category=, ?brand= and ?type= are read here rather than in the browser:
  // reading them on the client would suspend the grid and paint a catalogue
  // the store no longer sells while the real one loads.
  const [catalogue, query] = await Promise.all([loadCatalogue(), searchParams]);

  const category = allow(one(query.category), productFilters) ?? "All";
  const brand = allow(one(query.brand), SHOE_BRANDS);
  const type = allow(one(query.type), SHOE_TYPES);

  return (
    <>
      <PageHero
        eyebrow={`${catalogue.length} products`}
        title="Shop the full line"
        titleAccent="full line"
        copy="Filter by what you play, not by what is on promotion. Every item ships with the same 30-day play test."
        crumbs={[{ label: "Shop" }]}
      />

      <div className="pt-10">
        {/* the key re-seeds the filter state whenever the query changes */}
        <ShopBrowser
          key={`${category}|${brand}|${type}`}
          catalogue={catalogue}
          initialCategory={category}
          initialBrand={brand}
          initialType={type}
        />
      </div>
    </>
  );
}
