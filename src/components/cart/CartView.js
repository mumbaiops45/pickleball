"use client";

import { useState } from "react";
import Link from "next/link";
import CartLineItem from "@/components/cart/CartLineItem";
import FreeShippingMeter from "@/components/cart/FreeShippingMeter";
import { ArrowIcon, BagIcon, ShieldIcon } from "@/components/ui/Icons";
import { useCart } from "@/store/CartProvider";
import { formatPrice } from "@/lib/format";
import { Accent } from "@/components/ui/Heading";

const PROMO = { code: "SEASON04", rate: 0.1 };

export default function CartView() {
  const { lines, count, totals, hydrated, clear } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  const applyPromo = (event) => {
    event.preventDefault();
    if (promoInput.trim().toUpperCase() === PROMO.code) {
      setPromo(PROMO);
      setPromoError("");
    } else {
      setPromo(null);
      setPromoError("That code is not valid. Try SEASON04.");
    }
  };

  const discount = promo ? totals.subtotal * promo.rate : 0;
  const grandTotal = Math.max(0, totals.total - discount);

  if (!hydrated) {
    return (
      <div className="mx-auto w-full max-w-350 px-5 py-10 sm:px-8 lg:py-20">
        <div className="h-64 animate-pulse rounded-3xl border border-line bg-surface" />
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 py-16 text-center sm:px-8 lg:py-24">
        <span className="grid size-20 place-items-center rounded-full border border-line text-mist">
          <BagIcon className="size-8" />
        </span>
        <h2 className="mt-8 text-3xl font-semibold tracking-tight">
          Your cart is <Accent>empty</Accent>
        </h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mist">
          Nothing in the bag yet. Start with the ball everyone reorders.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/shop?category=Balls"
            className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-volt px-8 text-sm font-semibold text-ink"
          >
            Shop pickleballs
            <ArrowIcon className="size-4" />
          </Link>
          <Link
            href="/shop"
            className="inline-flex h-14 items-center justify-center rounded-full border border-line-strong px-8 text-sm font-medium text-ink transition-colors hover:border-volt-deep hover:text-volt-deep"
          >
            Browse everything
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-350 grid-cols-1 gap-10 px-5 py-10 sm:px-8 lg:py-14 lg:grid-cols-[1fr_380px] lg:gap-14">
      {/* lines */}
      <section>
        <div className="flex items-center justify-between border-b border-line pb-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">
            {count} {count === 1 ? "item" : "items"}
          </h2>
          <button
            type="button"
            onClick={clear}
            className="text-xs text-mist underline-offset-4 transition-colors hover:text-clay hover:underline"
          >
            Empty cart
          </button>
        </div>

        <ul className="divide-y divide-line">
          {lines.map((line) => (
            <CartLineItem key={line.key} line={line} />
          ))}
        </ul>

        <Link
          href="/shop"
          className="mt-8 inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-volt-deep"
        >
          <ArrowIcon className="size-4 rotate-180" />
          Continue shopping
        </Link>
      </section>

      {/* summary */}
      <aside className="lg:sticky lg:top-32 lg:self-start">
        <div className="rounded-3xl border border-line bg-surface p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">
            Order summary
          </h2>

          <div className="mt-5">
            <FreeShippingMeter totals={totals} />
          </div>

          <form onSubmit={applyPromo} className="mt-5">
            <label
              htmlFor="promo"
              className="text-[11px] uppercase tracking-[0.16em] text-mist"
            >
              Promo code
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="promo"
                value={promoInput}
                onChange={(event) => setPromoInput(event.target.value)}
                placeholder="SEASON04"
                className="h-11 min-w-0 flex-1 rounded-full border border-line-strong bg-paper px-4 text-sm text-ink outline-none transition-colors placeholder:text-mist/60 focus:border-volt-deep"
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-full border border-line-strong px-5 text-sm font-medium transition-colors hover:border-volt-deep hover:text-volt-deep"
              >
                Apply
              </button>
            </div>
            {promoError ? (
              <p className="mt-2 text-xs text-clay">{promoError}</p>
            ) : null}
            {promo ? (
              <p className="mt-2 text-xs text-volt-deep">
                {promo.code} applied — 10% off your subtotal.
              </p>
            ) : null}
          </form>

          <dl className="mt-6 flex flex-col gap-3 border-t border-line pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-mist">Subtotal</dt>
              <dd>{formatPrice(totals.subtotal)}</dd>
            </div>
            {totals.savings > 0 ? (
              <div className="flex justify-between">
                <dt className="text-mist">Product savings</dt>
                <dd className="text-clay">&minus;{formatPrice(totals.savings)}</dd>
              </div>
            ) : null}
            {promo ? (
              <div className="flex justify-between">
                <dt className="text-mist">Promo ({promo.code})</dt>
                <dd className="text-clay">&minus;{formatPrice(discount)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between">
              <dt className="text-mist">Shipping</dt>
              <dd>
                {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-mist">Includes GST (18%)</dt>
              <dd className="text-mist">{formatPrice(totals.gst)}</dd>
            </div>
            <div className="mt-2 flex items-baseline justify-between border-t border-line pt-4">
              <dt className="text-base font-semibold">Total</dt>
              <dd className="text-2xl font-semibold">{formatPrice(grandTotal)}</dd>
            </div>
          </dl>

          <Link
            href="/checkout"
            className="group mt-6 flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-volt text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            Checkout
            <ArrowIcon className="size-4 transition-transform duration-400 group-hover:translate-x-1.5" />
          </Link>

          <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-mist">
            <ShieldIcon className="size-3.5 text-volt-deep" />
            Secure checkout — pay online or on delivery
          </p>
        </div>
      </aside>
    </div>
  );
}
