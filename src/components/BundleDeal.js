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
        <Reveal className="overflow-hidden rounded-2xl border border-line">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* -------------------------------------------------- the offer */}
            <div className="order-2 flex flex-col justify-center bg-paper p-8 sm:p-12 lg:order-1">
              <span className="inline-flex w-fit items-center rounded-full bg-volt px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
                Bundle · save {percent}%
              </span>

              <h2 className="mt-6 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
                <TwoTone
                  text={starterBundle.title}
                  accent={starterBundle.titleAccent}
                />
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mist">
                {blurb}
              </p>

              <ul className="mt-8 flex flex-col border-t border-line">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-sm"
                  >
                    <span className="min-w-0 truncate">{item.name}</span>
                    <span className="shrink-0 text-mist">
                      {formatPrice(item.price)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-end gap-x-4 gap-y-2">
                <span className="text-4xl font-semibold tracking-tight">
                  {formatPrice(bundlePrice)}
                </span>
                <span className="pb-1 text-lg text-mist line-through">
                  {formatPrice(fullPrice)}
                </span>
                <span className="mb-1.5 rounded-full bg-clay px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-paper">
                  Save {formatPrice(saving)}
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={addBundle}
                  className="inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-volt-deep px-8 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-forest"
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
                  className="group inline-flex h-13 items-center justify-center gap-2.5 rounded-full border border-line-strong px-8 text-sm font-medium text-ink transition-colors duration-200 hover:border-volt-deep hover:text-volt-deep"
                >
                  Build your own
                  <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              <p className="mt-5 text-xs text-mist">
                Bundle price applies with code{" "}
                <span className="font-semibold tracking-[0.08em] text-ink">
                  {starterBundle.code}
                </span>{" "}
                at checkout.
              </p>
            </div>

            {/* ------------------------------------------------ what is in it */}
            <div
              // one column per item below lg, so a two-product bundle fills the
              // strip instead of leaving a third of it blank
              className={`order-1 grid gap-px border-b border-line bg-line lg:order-2 lg:grid-cols-1 lg:border-b-0 lg:border-l ${
                items.length === 2 ? "grid-cols-2" : "grid-cols-3"
              }`}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-center bg-paper p-5 lg:justify-start lg:gap-6 lg:px-10"
                >
                  <div className="flex h-20 w-full items-center justify-center lg:h-24 lg:w-24 lg:shrink-0">
                    <ProductArt
                      product={item}
                      sizes="(max-width: 1024px) 28vw, 120px"
                      className="h-full w-auto max-w-full"
                    />
                  </div>
                  <div className="hidden min-w-0 lg:block">
                    <p className="text-sm font-semibold tracking-tight">
                      {item.name}
                    </p>
                    {item.blurb ? (
                      <p className="mt-1 text-[13px] leading-relaxed text-mist">
                        {item.blurb}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
