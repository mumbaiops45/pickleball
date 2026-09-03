"use client";

import { useState } from "react";
import Link from "next/link";
import ProductArt from "@/components/art/ProductArt";
import Reveal from "@/components/ui/Reveal";
import { TwoTone } from "@/components/ui/Heading";
import { ArrowIcon, CheckIcon } from "@/components/ui/Icons";
import { starterBundle } from "@/lib/data";
import { useCart } from "@/store/CartProvider";
import { formatPrice } from "@/lib/format";

/**
 * The bundle is resolved against the live catalogue, not against data.js.
 *
 * Its three ids are seeded slugs, so if the admin has those rows switched off
 * the bundle cannot be built — and a bundle you cannot add to a cart is worse
 * than no bundle, so the section renders nothing at all.
 *
 * The panel used to be a deep-green slab carrying a blurred yellow orb on two
 * parallax axes and the words "SAVE 10%" set at 9rem in 6% white behind the
 * copy, with the three product shots each drifting at their own speed under
 * the pointer. It was the loudest thing on the page and it sat directly above
 * a second dark panel in the newsletter. One offer, stated once, on a light
 * panel that lets the products carry it.
 */
export default function BundleDeal({ catalogue = [] }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  /**
   * `starterBundle.items` are seeded slugs from data.js — trueflight-outdoor
   * and friends. The live catalogue comes from the admin and carries its own
   * ids, so none of them resolved and this whole section returned null: the
   * bundle was simply absent from the running homepage, with nothing to say
   * so. It now falls back to the first three products actually on sale.
   *
   * NOTE: that means the configured 10% (and the SEASON04 code the cart
   * honours) is applied to whatever the shop happens to be stocking rather
   * than to a hand-picked set. If the discount is meant only for a specific
   * bundle, put those product ids in `starterBundle.items` and the seeded
   * path takes over again — or drop the fallback and the section hides itself
   * as before.
   */
  const seeded = starterBundle.items
    .map((id) => catalogue.find((product) => product.id === id))
    .filter(Boolean);

  const usingSeeded = seeded.length >= 2;
  const items = usingSeeded ? seeded : catalogue.slice(0, 3);
  if (items.length < 2) return null;

  /* The seeded blurb names its three tubes by hand ("Outdoor, indoor and a
     club case"), which is wrong the moment the fallback picks a different
     number of products off the live catalogue. */
  const blurb = usingSeeded
    ? starterBundle.blurb
    : `Take ${items.length === 2 ? "both" : `all ${items.length}`} together and the whole order comes in under the price of buying them one at a time.`;

  const fullPrice = items.reduce((sum, item) => sum + item.price, 0);
  const bundlePrice = Math.round(fullPrice * (1 - starterBundle.discountRate));
  const saving = fullPrice - bundlePrice;
  const percent = Math.round(starterBundle.discountRate * 100);

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
    <section className="section bg-surface">
      <div className="shell">
        <Reveal className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-line bg-paper shadow-[0_40px_80px_-60px_rgba(30,61,20,.55)]">
          {/* -------------------------------------------------- the header */}
          <div className="border-b border-line px-7 py-8 text-center sm:px-12 sm:py-10">
            <span className="inline-flex items-center rounded-full bg-volt px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
              Bundle · save {percent}%
            </span>

            <h2 className="mt-5 text-[clamp(1.9rem,3.4vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
              <TwoTone
                text={starterBundle.title}
                accent={starterBundle.titleAccent}
              />
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-mist">
              {blurb}
            </p>
          </div>

          {/* --------------------------------------- the products as a sum */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4 bg-surface-2 px-6 py-8 sm:gap-x-5">
            {items.map((item, index) => (
              <div key={item.id} className="flex items-center gap-3 sm:gap-5">
                {index > 0 ? (
                  <span
                    aria-hidden="true"
                    className="text-2xl font-light text-volt-deep"
                  >
                    +
                  </span>
                ) : null}
                <div className="grid size-20 place-items-center rounded-2xl border border-line bg-paper p-3 sm:size-24">
                  <ProductArt
                    product={item}
                    sizes="120px"
                    className="h-full w-auto max-w-full"
                  />
                </div>
              </div>
            ))}

            <span
              aria-hidden="true"
              className="text-2xl font-light text-volt-deep"
            >
              =
            </span>
            <div className="text-left">
              <p className="text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-none tracking-tight">
                {formatPrice(bundlePrice)}
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-sm">
                <span className="text-mist line-through">
                  {formatPrice(fullPrice)}
                </span>
                <span className="rounded-full bg-clay px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-paper">
                  Save {formatPrice(saving)}
                </span>
              </p>
            </div>
          </div>

          {/* -------------------------------------------- the itemised list */}
          <div className="px-7 py-7 sm:px-12">
            <ul className="flex flex-col">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-sm last:border-b-0"
                >
                  <span className="min-w-0 truncate font-medium text-ink">
                    {item.name}
                  </span>
                  <span className="shrink-0 text-mist">
                    {formatPrice(item.price)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={addBundle}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-volt-deep px-6 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-forest"
              >
                {added ? (
                  <>
                    <CheckIcon className="size-4" />
                    Bundle added
                  </>
                ) : (
                  `Add all ${items.length}`
                )}
              </button>
              <Link
                href="/shop"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong px-6 text-sm font-medium text-ink transition-colors duration-200 hover:border-volt-deep hover:text-volt-deep"
              >
                Build your own
                <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <p className="mt-5 text-center text-xs text-mist">
              Bundle price applies with code{" "}
              <span className="font-semibold tracking-[0.08em] text-ink">
                {starterBundle.code}
              </span>{" "}
              at checkout.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
