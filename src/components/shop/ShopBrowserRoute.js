"use client";

import { useSearchParams } from "next/navigation";
import ShopBrowser from "@/components/shop/ShopBrowser";
import { SHOE_BRANDS, SHOE_TYPES, productFilters } from "@/lib/data";

/**
 * Reads ?category=, ?brand= and ?type= on the client so /shop itself stays
 * statically prerendered. The key remounts the browser when the query changes,
 * which re-seeds the filter state from the URL.
 *
 * Unknown values are dropped rather than passed through, so a hand-edited query
 * can never seed a filter that matches nothing.
 */
export default function ShopBrowserRoute() {
  const searchParams = useSearchParams();

  const requested = searchParams.get("category");
  const category = productFilters.includes(requested) ? requested : "All";

  const requestedBrand = searchParams.get("brand");
  const brand = SHOE_BRANDS.includes(requestedBrand) ? requestedBrand : null;

  const requestedType = searchParams.get("type");
  const type = SHOE_TYPES.includes(requestedType) ? requestedType : null;

  return (
    <ShopBrowser
      key={`${category}|${brand}|${type}`}
      initialCategory={category}
      initialBrand={brand}
      initialType={type}
    />
  );
}
