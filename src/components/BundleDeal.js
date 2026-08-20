"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/Logo";
import { TwoTone } from "@/components/ui/Heading";
import { ArrowIcon, PlusIcon } from "@/components/ui/Icons";
import { findProduct, starterBundle } from "@/lib/data";
import { useCart } from "@/store/CartProvider";
import { formatPrice } from "@/lib/format";

export default function BundleDeal() {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const items = starterBundle.items.map(findProduct).filter(Boolean);
  const fullPrice = items.reduce((sum, item) => sum + item.price, 0);
  const bundlePrice = Math.round(fullPrice * (1 - starterBundle.discountRate));
  const saving = fullPrice - bundlePrice;

  const addBundle = () => {
    for (const item of items) {
      addItem({
        productId: item.id,
        colorway: item.colorways[0]?.name,
        option: item.options[0],
        quantity: 1,
        openDrawer: false,
      });
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  return (
    <section className="bg-paper py-14 lg:py-20">
      <ParallaxScene
        pointer
        className="grain relative isolate mx-auto w-full max-w-350 overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-paper sm:px-12 lg:py-16"
      >
        <div
          data-speed="-1.4"
          data-speed-x="1.1"
          className="pointer-events-none absolute -right-20 -top-24 -z-10 size-96 rounded-full bg-volt/25 blur-[120px]"
        />
        <div
          data-speed="1.6"
          data-speed-x="-1.6"
          className="pointer-events-none absolute inset-x-0 bottom-2 -z-10 select-none opacity-[0.06]"
        >
          <p className="whitespace-nowrap text-center text-[clamp(3rem,11vw,9rem)] font-black leading-none tracking-tighter text-paper">
            SAVE {Math.round(starterBundle.discountRate * 100)}%
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* copy */}
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full bg-volt px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
              <LogoMark size="sm" tone="ink" className="!size-5 rounded-md" />
              Bundle &middot; save {Math.round(starterBundle.discountRate * 100)}%
            </span>

            <h2 className="mt-6 text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-paper">
              <TwoTone
                text={starterBundle.title}
                accent={starterBundle.titleAccent}
                dark
              />
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-paper/70">
              {starterBundle.blurb}
            </p>

            <ul className="mt-7 flex flex-col gap-2.5">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-baseline justify-between gap-4 border-b border-paper/15 pb-2.5 text-sm"
                >
                  <span className="text-paper/85">{item.name}</span>
                  <span className="font-mono text-paper/60">{formatPrice(item.price)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-end gap-4">
              <span className="text-4xl font-semibold text-volt">
                {formatPrice(bundlePrice)}
              </span>
              <span className="pb-1.5 text-lg text-paper/50 line-through">
                {formatPrice(fullPrice)}
              </span>
              <span className="mb-2 rounded-full bg-clay px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-paper">
                Save {formatPrice(saving)}
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={addBundle}
                className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-volt px-8 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                <PlusIcon className="size-4" />
                {added ? "Bundle added" : "Add all three"}
              </button>
              <Link
                href="/shop"
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-paper/45 px-8 text-sm font-medium text-paper transition-colors hover:border-volt hover:text-volt"
              >
                Build your own
                <ArrowIcon className="size-4" />
              </Link>
            </div>

            <p className="mt-4 text-xs text-paper/60">
              Bundle price applies with code{" "}
              <span className="font-mono text-volt">{starterBundle.code}</span>{" "}
              at checkout.
            </p>
          </Reveal>

          {/* stacked art */}
          <div className="flex items-center justify-center gap-5 sm:gap-8 lg:gap-12">
            {items.map((item, index) => {
              const imageMap = {
                Paddles: "/photos/paddle-product.png",
                Balls: "/photos/pickleball-balls.png",
                Apparel: "/photos/court-apparel.png",
                Gear: "/photos/pickleball-gear.png",
                Shoes: "/photos/court-apparel.png",
              };
              const imageSrc = imageMap[item.category] || "/photos/paddle-product.png";
              return (
                <div
                  key={item.id}
                  data-speed={String(2.2 + index * 0.7)}
                  data-mouse={String(30 + index * 15)}
                  // a share of the row rather than a fixed 180px: three of
                  // those plus the gaps are wider than a phone, and the card
                  // clips its overflow, so the outer two were cut in half
                  className="flex w-[28%] max-w-45 items-center justify-center"
                >
                  <div className="drop-shadow-[0_30px_50px_rgba(0,0,0,.45)]">
                    <Image
                      src={imageSrc}
                      alt={item.name}
                      width={180}
                      height={180}
                      sizes="(min-width: 1024px) 180px, 28vw"
                      className="h-auto w-full object-contain"
                      priority={index === 0}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ParallaxScene>
    </section>
  );
}
