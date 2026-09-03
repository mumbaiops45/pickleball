"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Icons";
import { Accent } from "@/components/ui/Heading";
import { productFilters } from "@/lib/data";

export default function FeaturedProducts({ catalogue = [] }) {
  const [filter, setFilter] = useState("All");

  // the homepage teases eight; /shop carries the full catalogue
  const visible = (
    filter === "All"
      ? catalogue
      : catalogue.filter((product) => product.category === filter)
  ).slice(0, 8);

  /**
   * A filter needs something to filter between.
   *
   * `productFilters` is the static list ["All", "Balls"], so the chips
   * rendered unconditionally — two buttons that partition the catalogue into
   * "everything" and "everything". They only appear once the live catalogue
   * actually holds more than one category.
   */
  const categories = new Set(catalogue.map((product) => product.category));
  const filterable = categories.size > 1;

  /**
   * Every heading on the page is left-aligned on the content column, and this
   * one used to centre itself whenever the catalogue was short — so the one
   * section a visitor reaches first was also the one that broke the page's
   * alignment. It stays left; the short-row problem is solved by filling the
   * empty cell below rather than by moving the heading.
   */
  const short = visible.length > 0 && visible.length < 3;

  return (
    <section id="featured" className="section bg-surface">
      <div className="shell">
        <SectionHeading
          eyebrow="The ball line"
          title={
            <>
              Every ball we make, <Accent>in one place</Accent>.
            </>
          }
          copy="Indoor and outdoor, singles tubes through club cases. All of it rotomolded in one piece and weight-matched before it is sleeved."
          action={
            filterable ? (
              <div className="flex flex-wrap gap-2">
                {productFilters.map((option) => {
                  const active = option === filter;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFilter(option)}
                      aria-pressed={active}
                      className={`h-10 rounded-full border px-5 text-sm font-medium transition-colors duration-200 ${
                        active
                          ? "border-volt-deep bg-volt-deep text-paper"
                          : "border-line-strong text-mist hover:border-ink hover:text-ink"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            ) : null
          }
        />

        {/* Three columns up to three products, four beyond — so two balls are
            two tiles of a normal size on a normal grid, not two tiles blown up
            to fill a row they were never meant to fill. */}
        <div
          className={`mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 ${
            visible.length <= 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
          }`}
        >
          {visible.map((product, index) => (
            <Reveal
              key={product.id}
              delay={index * 60}
              className="h-full *:h-full"
            >
              <ProductCard product={product} />
            </Reveal>
          ))}

          {/* The cell that closes a short row. With two products on a three-up
              grid the row ended in a third of empty section, and the only route
              onward was a lone pill floating under the middle of it. */}
          {short ? (
            <Reveal
              delay={visible.length * 60}
              className="hidden h-full lg:block"
            >
              <Link
                href="/shop"
                className="group flex h-full flex-col justify-end rounded-2xl border border-dashed border-line-strong/60 bg-paper/40 p-7 transition-colors duration-200 hover:border-volt-deep hover:bg-paper/80"
              >
                <span className="grid size-11 place-items-center rounded-full border border-line-strong text-ink transition-colors duration-200 group-hover:border-volt-deep group-hover:bg-volt-deep group-hover:text-paper">
                  <ArrowIcon className="size-4" />
                </span>
                <span className="mt-6 block text-base font-semibold tracking-tight">
                  See the whole shop
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-mist">
                  Pack sizes, club cases and everything else currently in stock.
                </span>
              </Link>
            </Reveal>
          ) : null}
        </div>

        {visible.length === 0 ? (
          <p className="mt-16 text-center text-sm text-mist">
            Nothing in this category yet — check back after the next run.
          </p>
        ) : null}

        {/* Below lg the tile above is hidden — a dashed panel under a stack of
            cards on a phone is just another card — so the row keeps its link
            there, and a full grid keeps it everywhere. */}
        {visible.length ? (
          <Reveal className={`mt-12 flex justify-center ${short ? "lg:hidden" : ""}`}>
            <Link
              href={filter === "All" ? "/shop" : `/shop?category=${filter}`}
              className="group inline-flex h-13 items-center gap-3 rounded-full border border-line-strong px-8 text-sm font-medium text-ink transition-colors duration-200 hover:border-volt-deep hover:text-volt-deep"
            >
              {catalogue.length > visible.length
                ? `View all ${catalogue.length} products`
                : "Go to the shop"}
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
