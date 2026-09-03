"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ShopFilters from "@/components/shop/ShopFilters";
import Reveal from "@/components/ui/Reveal";
import { PRICE_BANDS, SORT_OPTIONS } from "@/lib/data";

const DEFAULT_FILTERS = {
  category: "All",
  skills: [],
  priceBands: [],
  brands: [],
  types: [],
  onSale: false,
};

const inBand = (price, bandId) => {
  const band = PRICE_BANDS.find((b) => b.id === bandId);
  return band ? price >= band.min && price < band.max : true;
};

export default function ShopBrowser({
  // the catalogue the page fetched; data.js only stands in if none was passed
  catalogue = [],
  initialCategory = "All",
  initialBrand = null,
  initialType = null,
}) {
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    category: initialCategory,
    brands: initialBrand ? [initialBrand] : [],
    types: initialType ? [initialType] : [],
  });
  const [sort, setSort] = useState("featured");
  const [panelOpen, setPanelOpen] = useState(false);

  const toggle = (kind, value) => {
    setFilters((current) => {
      switch (kind) {
        case "category":
          // clicking the active category returns you to All
          return {
            ...current,
            category: current.category === value ? "All" : value,
          };
        case "skill":
          return {
            ...current,
            skills: current.skills.includes(value)
              ? current.skills.filter((s) => s !== value)
              : [...current.skills, value],
          };
        case "price":
          return {
            ...current,
            priceBands: current.priceBands.includes(value)
              ? current.priceBands.filter((b) => b !== value)
              : [...current.priceBands, value],
          };
        case "brand":
          return {
            ...current,
            brands: current.brands.includes(value)
              ? current.brands.filter((b) => b !== value)
              : [...current.brands, value],
          };
        case "type":
          return {
            ...current,
            types: current.types.includes(value)
              ? current.types.filter((t) => t !== value)
              : [...current.types, value],
          };
        case "onSale":
          return { ...current, onSale: !current.onSale };
        default:
          return current;
      }
    });
  };

  const visible = useMemo(() => {
    const filtered = catalogue.filter((product) => {
      if (filters.category !== "All" && product.category !== filters.category)
        return false;
      if (filters.skills.length && !filters.skills.includes(product.skill))
        return false;
      if (
        filters.priceBands.length &&
        !filters.priceBands.some((band) => inBand(product.price, band))
      )
        return false;
      // brand and fit are optional on a row, so an unset one drops out
      // as soon as either is asked for
      if (filters.brands.length && !filters.brands.includes(product.brand))
        return false;
      if (filters.types.length && !filters.types.includes(product.type))
        return false;
      if (filters.onSale && !product.compareAt) return false;
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        sorted.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }
    return sorted;
  }, [catalogue, filters, sort]);

  // counts are computed off the full catalogue so the numbers never vanish
  const counts = useMemo(
    () => ({
      category: catalogue.reduce(
        (acc, product) => {
          acc[product.category] = (acc[product.category] ?? 0) + 1;
          return acc;
        },
        { All: catalogue.length },
      ),
      skill: catalogue.reduce((acc, product) => {
        acc[product.skill] = (acc[product.skill] ?? 0) + 1;
        return acc;
      }, {}),
      brand: catalogue.reduce((acc, product) => {
        if (product.brand) acc[product.brand] = (acc[product.brand] ?? 0) + 1;
        return acc;
      }, {}),
      type: catalogue.reduce((acc, product) => {
        if (product.type) acc[product.type] = (acc[product.type] ?? 0) + 1;
        return acc;
      }, {}),
      price: PRICE_BANDS.reduce((acc, band) => {
        acc[band.id] = catalogue.filter((p) => inBand(p.price, band.id)).length;
        return acc;
      }, {}),
      onSale: catalogue.filter((p) => p.compareAt).length,
    }),
    [catalogue],
  );

  // the sheet covers the page, so the grid behind it must not scroll under it
  useEffect(() => {
    if (!panelOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [panelOpen]);

  const reset = () => setFilters(DEFAULT_FILTERS);

  return (
    <div className="mx-auto flex w-full max-w-350 gap-10 px-5 pb-16 sm:px-8 lg:pb-24">
      {/* sidebar */}
      <Reveal as="aside" variant="left" className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-32">
          <ShopFilters
            filters={filters}
            counts={counts}
            onToggle={toggle}
            onReset={reset}
          />
        </div>
      </Reveal>

      {/* results */}
      <section className="min-w-0 flex-1">
        <Reveal className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <p className="text-sm text-mist">
            <span className="font-semibold text-ink">{visible.length}</span>{" "}
            {visible.length === 1 ? "product" : "products"}
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPanelOpen(true)}
              className="h-10 rounded-full border border-line-strong px-5 text-sm font-medium text-ink lg:hidden"
            >
              Filters
            </button>

            <label className="flex items-center gap-2 text-sm text-mist">
              <span className="hidden sm:inline">Sort</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-10 rounded-full border border-line-strong bg-surface px-4 text-sm text-ink outline-none transition-colors hover:border-ink/50"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </Reveal>

        {visible.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center lg:py-24">
            <p className="text-lg font-medium">No products match those filters</p>
            <p className="mt-2 max-w-sm text-sm text-mist">
              Try widening the price range or clearing the skill level.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 h-12 rounded-full bg-volt px-7 text-sm font-semibold text-ink"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <Reveal
            variant="zoom"
            className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
          >
            {visible.map((product) => (
              <div key={product.id} className="h-full *:h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </Reveal>
        )}
      </section>

      {/* mobile filter sheet */}
      <div
        className={`fixed inset-0 z-70 lg:hidden ${
          panelOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!panelOpen}
      >
        <button
          type="button"
          tabIndex={panelOpen ? 0 : -1}
          aria-label="Close filters"
          onClick={() => setPanelOpen(false)}
          className={`absolute inset-0 bg-forest-deep/45 backdrop-blur-sm transition-opacity duration-500 ${
            panelOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-y-0 left-0 w-[min(88vw,340px)] overflow-y-auto bg-surface px-6 py-6 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
            panelOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ShopFilters
            filters={filters}
            counts={counts}
            onToggle={toggle}
            onReset={reset}
            onClose={() => setPanelOpen(false)}
          />
          <button
            type="button"
            onClick={() => setPanelOpen(false)}
            className="mt-8 h-12 w-full rounded-full bg-volt text-sm font-semibold text-ink"
          >
            Show {visible.length} products
          </button>
        </div>
      </div>
    </div>
  );
}
