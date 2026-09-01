"use client";

import { useState } from "react";
import Link from "next/link";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/ui/Reveal";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { productFilters, products as localCatalogue } from "@/lib/data";
import { Accent } from "@/components/ui/Heading";

export default function FeaturedProducts({ catalogue = localCatalogue }) {
  const [filter, setFilter] = useState("All");

  // the homepage teases eight; /shop carries the full catalogue
  const visible = (
    filter === "All"
      ? catalogue
      : catalogue.filter((product) => product.category === filter)
  ).slice(0, 8);

  return (
    <ParallaxScene
      as="section"
      id="paddles"
      className="relative isolate w-full overflow-hidden border-y border-line bg-surface py-14 lg:py-24"
    >
      <div
        data-speed="-1"
        className="pointer-events-none absolute right-[6%] top-[8%] -z-10 size-95 rounded-full bg-volt/40 blur-[130px]"
      />
      <div className="mx-auto w-full max-w-350 px-5 sm:px-8">

      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-xl">
          <h2 className="mt-5 text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Built for players who <Accent>keep score</Accent>.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-wrap gap-2">
            {productFilters.map((option) => {
              const active = option === filter;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                  aria-pressed={active}
                  className={`h-10 rounded-full border px-5 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "border-volt-deep bg-volt text-ink"
                      : "border-line-strong text-mist hover:border-ink/50 hover:text-ink"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((product) => (
          <div key={product.id} className="h-full *:h-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 text-center text-sm text-mist">
          Nothing in this category yet — check back after the next drop.
        </p>
      ) : null}

      <Reveal className="mt-14 flex justify-center">
        <Link
          href={filter === "All" ? "/shop" : `/shop?category=${filter}`}
          className="group inline-flex h-14 items-center gap-3 rounded-full border border-line-strong px-8 text-sm font-medium text-ink transition-colors hover:border-volt-deep hover:text-volt-deep"
        >
          View all {catalogue.length} products
          <ArrowUpRightIcon className="size-4 transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </Reveal>
      </div>
    </ParallaxScene>
  );
}
