"use client";

import { useSearchParams } from "next/navigation";
import ShopBrowser from "@/components/shop/ShopBrowser";
import { productFilters } from "@/lib/data";

/**
 * Reads ?category= on the client so /shop itself stays statically prerendered.
 * The key remounts the browser when the query changes, which re-seeds the
 * filter state from the URL.
 */
export default function ShopBrowserRoute() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("category");
  const category = productFilters.includes(requested) ? requested : "All";

  return <ShopBrowser key={category} initialCategory={category} />;
}
