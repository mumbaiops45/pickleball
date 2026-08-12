import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import ShopBrowserRoute from "@/components/shop/ShopBrowserRoute";
import ShopBrowser from "@/components/shop/ShopBrowser";
import { products } from "@/lib/data";

export const metadata = {
  title: "Shop all",
  description:
    "Every paddle, ball, apparel piece and accessory in the PADDLEHAUS line. Filter by category, skill level and price.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow={`${products.length} products`}
        title="Shop the full line"
        titleAccent="full line"
        copy="Filter by what you play, not by what is on promotion. Every item ships with the same 30-day play test."
        crumbs={[{ label: "Shop" }]}
      />

      <div className="pt-10">
        {/* useSearchParams needs a boundary so the route can still prerender */}
        <Suspense fallback={<ShopBrowser initialCategory="All" />}>
          <ShopBrowserRoute />
        </Suspense>
      </div>
    </>
  );
}
