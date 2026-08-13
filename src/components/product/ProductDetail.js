"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import QuantityStepper from "@/components/cart/QuantityStepper";
import {
  ArrowIcon,
  BagIcon,
  RepeatIcon,
  ShieldIcon,
  StarIcon,
  TruckIcon,
} from "@/components/ui/Icons";
import { useCart } from "@/store/CartProvider";
import { formatPrice } from "@/lib/format";

const TRUST = [
  { icon: TruckIcon, label: "Free shipping over ₹2,499" },
  { icon: RepeatIcon, label: "30-day play test, we cover return postage" },
  { icon: ShieldIcon, label: "Lifetime edge-guard warranty" },
];

function ProductPhoto({ src, alt, priority = false, sizes, className = "" }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-contain ${className}`}
    />
  );
}

export default function ProductDetail({ product }) {
  const { addItem } = useCart();
  // data.js guarantees a gallery of at least the product's own hero shot
  const gallery = product.gallery ?? [product.image];
  const [shot, setShot] = useState(0);
  const [colorway, setColorway] = useState(product.colorways[0]);
  const [option, setOption] = useState(product.options[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const discounted = Boolean(product.compareAt);
  const lowStock = product.stock <= 10;

  const onAdd = () => {
    addItem({
      productId: product.id,
      colorway: colorway.name,
      option,
      quantity,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <ParallaxScene
      as="section"
      pointer
      className="relative mx-auto w-full max-w-350 px-5 py-8 sm:px-8 lg:py-14"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* ------------------------------------------------------- gallery */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="relative isolate flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-line bg-[radial-gradient(75%_65%_at_50%_16%,#ffffff_0%,#eeece4_80%)]">
            <div
              data-speed="-0.8"
              className="pointer-events-none absolute -top-16 left-1/2 -z-10 -ml-40 size-80 rounded-full blur-[100px] opacity-25"
              style={{ background: colorway.hex }}
            />

            <div
              data-mouse="26"
              data-speed="0.9"
              className="relative h-[82%] w-[82%]"
            >
              <ProductPhoto
                src={gallery[shot]}
                alt={`${product.name} — view ${shot + 1} of ${gallery.length}`}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="drop-shadow-[0_28px_45px_rgba(15,17,21,.15)]"
              />
            </div>

            {product.badge ? (
              <span className="absolute left-5 top-5 rounded-full bg-volt px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                {product.badge}
              </span>
            ) : null}

            <span className="absolute bottom-5 right-5 font-mono text-[11px] text-mist">
              {product.sku}
            </span>
          </div>

          {/* Thumbnails page through the real shots we hold of this SKU. A
              single-shot product has nothing to switch between, so the strip
              stays hidden rather than rendering one dead button. */}
          {gallery.length > 1 ? (
            <div className="mt-4 flex gap-3">
              {gallery.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setShot(index)}
                  aria-label={`View ${index + 1} of ${gallery.length}`}
                  aria-pressed={index === shot}
                  className={`relative grid size-20 overflow-hidden rounded-2xl border bg-surface-2 transition-all duration-300 ${
                    index === shot
                      ? "border-volt-deep"
                      : "border-line hover:border-ink/40"
                  }`}
                >
                  <ProductPhoto
                    src={src}
                    alt=""
                    sizes="80px"
                    className="p-1.5"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* ------------------------------------------------------- buy box */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-mist">
            {[product.brand, product.category, product.type, product.skill]
              .filter(Boolean)
              .join(" · ")}
          </p>

          <h1 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="flex gap-0.5 text-volt-deep">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon
                    key={i}
                    className={`size-3.5 ${i < Math.round(product.rating) ? "" : "text-line-strong"}`}
                  />
                ))}
              </span>
              <span className="text-sm text-ink">{product.rating}</span>
            </span>
            <a href="#reviews" className="text-sm text-mist underline-offset-4 hover:text-ink hover:underline">
              {product.reviews.toLocaleString("en-IN")} reviews
            </a>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-3xl font-semibold">{formatPrice(product.price)}</span>
            {discounted ? (
              <>
                <span className="pb-1 text-lg text-mist line-through">
                  {formatPrice(product.compareAt)}
                </span>
                <span className="mb-1.5 rounded-full bg-clay px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-paper">
                  Save {formatPrice(product.compareAt - product.price)}
                </span>
              </>
            ) : null}
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-mist">
            {product.description}
          </p>

          {/* colourway */}
          <div className="mt-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">
              Colour
              <span className="ml-2 font-normal normal-case tracking-normal text-mist">
                {colorway.name}
              </span>
            </p>
            <div className="mt-3 flex gap-2.5">
              {product.colorways.map((entry) => (
                <button
                  key={entry.name}
                  type="button"
                  onClick={() => setColorway(entry)}
                  aria-label={entry.name}
                  aria-pressed={entry.name === colorway.name}
                  className={`size-9 rounded-full border-2 transition-transform duration-300 hover:scale-110 ${
                    entry.name === colorway.name
                      ? "border-volt-deep"
                      : "border-transparent"
                  }`}
                >
                  <span
                    className="block size-full rounded-full border border-ink/20"
                    style={{ background: entry.hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* size / grip */}
          <div className="mt-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">
              {product.optionLabel}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.options.map((entry) => (
                <button
                  key={entry}
                  type="button"
                  onClick={() => setOption(entry)}
                  aria-pressed={entry === option}
                  className={`h-11 rounded-full border px-5 text-sm font-medium transition-colors duration-300 ${
                    entry === option
                      ? "border-volt-deep bg-volt text-ink"
                      : "border-line-strong text-mist hover:border-ink/50 hover:text-ink"
                  }`}
                >
                  {entry}
                </button>
              ))}
            </div>
          </div>

          {/* add to cart */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <QuantityStepper value={quantity} onChange={(next) => setQuantity(Math.max(1, next))} />
            <button
              type="button"
              onClick={onAdd}
              className="group inline-flex h-11 flex-1 min-w-52 items-center justify-center gap-2.5 rounded-full bg-volt px-8 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              <BagIcon className="size-4" />
              {added ? "Added to cart" : `Add to cart · ${formatPrice(product.price * quantity)}`}
            </button>
          </div>

          <p className="mt-4 text-xs text-mist">
            {lowStock ? (
              <span className="text-clay">
                Only {product.stock} left in this colourway.
              </span>
            ) : (
              <span>In stock — ships today if you order before 2pm IST.</span>
            )}
          </p>

          {/* highlights */}
          <ul className="mt-9 flex flex-col gap-3 border-t border-line pt-7">
            {product.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm text-mist">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                {highlight}
              </li>
            ))}
          </ul>

          {/* trust */}
          <ul className="mt-7 flex flex-col gap-3 border-t border-line pt-7">
            {TRUST.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-mist">
                <Icon className="size-4 shrink-0 text-volt-deep" />
                {label}
              </li>
            ))}
          </ul>

          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-volt-deep"
          >
            <ArrowIcon className="size-4 rotate-180" />
            Back to shop
          </Link>
        </div>
      </div>
    </ParallaxScene>
  );
}
