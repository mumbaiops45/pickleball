"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";
import { Accent } from "@/components/ui/Heading";
import { productFilters } from "@/lib/data";

export default function FeaturedProducts({ catalogue = [] }) {
  const [filter, setFilter] = useState("All");

  const visible = (
    filter === "All"
      ? catalogue
      : catalogue.filter((product) => product.category === filter)
  ).slice(0, 8);


  const categories = new Set(catalogue.map((product) => product.category));
  const filterable = categories.size > 1;


  const short = visible.length > 0 && visible.length < 3;

  return (
    <section id="featured" className="section bg-paper">
      <div className="shell">
        {/* Inlined rather than <SectionHeading> so the display line can run
            larger than the shared 3rem cap — this is the section the client
            called too quiet. */}
        <div className="flex flex-col gap-8 border-t border-line pt-10 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <span className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-volt-deep">
              <span aria-hidden="true" className="h-px w-7 bg-volt-deep/40" />
              The ball line
            </span>
            <h2 className="text-[clamp(2.2rem,4.6vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
              Every ball we make, <Accent>in one place</Accent>.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-mist">
              Indoor and outdoor, singles tubes through club cases. All of it
              rotomolded in one piece and weight-matched before it is sleeved.
            </p>
          </Reveal>

          <Reveal delay={100} className="shrink-0">
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              {filterable
                ? productFilters.map((option) => {
                    const active = option === filter;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFilter(option)}
                        aria-pressed={active}
                        className={`h-10 rounded-full border px-5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                          active
                            ? "border-volt-deep bg-volt-deep text-paper"
                            : "border-line-strong text-mist hover:border-ink hover:text-ink"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })
                : null}
              <Link
                href="/shop"
                className="group inline-flex h-11 items-center gap-2.5 rounded-full bg-volt-deep px-5 text-sm font-semibold text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest hover:shadow-[0_10px_24px_-12px_rgba(30,61,20,.8)]"
              >
                Shop all products
                <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>


        <div
          className={`mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 ${
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


          {short ? (
            <Reveal
              delay={visible.length * 60}
              className="hidden h-full lg:block"
            >
              <Link
                href="/shop"
                data-cursor="media"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-forest bg-forest transition-colors duration-300 hover:border-volt hover:shadow-[0_18px_35px_-24px_rgba(30,61,20,.8)]"
              >
                <div className="relative flex aspect-4/3 shrink-0 items-center justify-center overflow-hidden border-b border-forest-deep bg-paper p-0">
                  <Image
                    src="/photos/seemore.jpg"
                    alt="Pickleball paddle and ball beside a net on court"
                    fill
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-end bg-forest p-7 text-paper">
                  <span className="grid size-11 place-items-center rounded-full border border-paper/40 text-volt transition-colors duration-200 group-hover:border-volt group-hover:bg-volt group-hover:text-ink">
                    <ArrowIcon className="size-4" />
                  </span>
                  <span className="mt-6 block text-base font-semibold tracking-tight text-paper">
                    See the whole shop
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-paper/70">
                    Pack sizes, club cases and everything else currently in stock.
                  </span>
                </div>
              </Link>
            </Reveal>
          ) : null}
        </div>

        {visible.length === 0 ? (
          <p className="mt-16 text-center text-sm text-mist">
            Nothing in this category yet — check back after the next run.
          </p>
        ) : null}


        {visible.length ? (
          <Reveal className={`mt-9 flex justify-center ${short ? "lg:hidden" : ""}`}>
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
