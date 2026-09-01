"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import QuantityStepper from "@/components/cart/QuantityStepper";
import WishlistButton from "@/components/product/WishlistButton";
import {
  ArrowIcon,
  BagIcon,
  BoltIcon,
  CheckIcon,
  RepeatIcon,
  ShieldIcon,
  StarIcon,
  TruckIcon,
} from "@/components/ui/Icons";
import { useCart } from "@/store/CartProvider";
import { brand } from "@/lib/data";
import { formatPrice } from "@/lib/format";

const SERVICES = [
  { icon: TruckIcon, title: "Free delivery", note: "On every order over ₹2,499" },
  { icon: RepeatIcon, title: "30-day play test", note: "We cover the return postage" },
  { icon: ShieldIcon, title: "Lifetime edge guard", note: "Warrantied against delamination" },
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

/**
 * Marketplace layout, the shape shoppers already know from Flipkart and its
 * peers: a sticky gallery on the left with the two commit buttons pinned
 * directly beneath it, and a single scrolling column of facts on the right,
 * ordered the way the decision is actually made — what it is, how it is rated,
 * what it costs, which variant, when it arrives, then the detail.
 */
export default function ProductDetail({ product }) {
  const { addItem } = useCart();
  const router = useRouter();
  // data.js guarantees a gallery of at least the product's own hero shot
  const gallery = product.gallery ?? [product.image];
  const [shot, setShot] = useState(0);
  const [colorway, setColorway] = useState(product.colorways[0]);
  const [option, setOption] = useState(product.options[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const discounted = Boolean(product.compareAt);
  const lowStock = product.stock <= 10;
  const percentOff = discounted
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;

  const lineItem = {
    productId: product.id,
    colorway: colorway.name,
    option,
    quantity,
  };

  const onAdd = () => {
    addItem(lineItem);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  // Buy now is the same commit with the cart step skipped — the whole point of
  // the second button is that it does not stop to show you the drawer.
  const onBuyNow = () => {
    addItem(lineItem);
    router.push("/checkout");
  };

  return (
    <section className="relative mx-auto w-full max-w-350 px-5 py-6 sm:px-8 lg:py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
        {/* ===================================================== left column */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          {/* thumbs run down the side on a desktop and along the bottom on a
              phone, so the shot keeps the full width where width is scarce */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            {/* The gallery is however many shots the CMS holds for this SKU, so
                the strip has to survive an unbounded count: it wraps while it
                is a row under the shot on a phone, and becomes the rail beside
                it from sm up. A single-shot product renders no strip at all
                rather than one dead button. */}
            {gallery.length > 1 ? (
              <div className="flex flex-wrap gap-3 sm:flex-col sm:flex-nowrap">
                {gallery.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setShot(index)}
                    aria-label={`View ${index + 1} of ${gallery.length}`}
                    aria-pressed={index === shot}
                    className={`relative grid size-16 shrink-0 overflow-hidden rounded-xl border bg-surface-2 ${
                      index === shot
                        ? "border-volt-deep"
                        : "border-line hover:border-ink/40"
                    }`}
                  >
                    <ProductPhoto src={src} alt="" sizes="64px" className="p-1.5" />
                  </button>
                ))}
              </div>
            ) : null}

            <div className="relative isolate flex aspect-square flex-1 items-center justify-center overflow-hidden rounded-2xl border border-line bg-[radial-gradient(75%_65%_at_50%_16%,#ffffff_0%,#eeece4_80%)]">
              <div className="relative h-[88%] w-[88%]">
                <ProductPhoto
                  src={gallery[shot]}
                  alt={`${product.name} — view ${shot + 1} of ${gallery.length}`}
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="drop-shadow-[0_28px_45px_rgba(15,17,21,.15)]"
                />
              </div>

              {product.badge ? (
                <span className="absolute left-4 top-4 rounded-full bg-volt px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                  {product.badge}
                </span>
              ) : null}

              <WishlistButton
                productId={product.id}
                className="absolute right-4 top-4"
              />

              <span className="absolute bottom-4 right-4 font-mono text-[11px] text-mist">
                {product.sku}
              </span>
            </div>
          </div>

          {/* the two commit buttons sit with the product, not at the end of a
              long scroll of specifications */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onAdd}
              className="inline-flex h-13 items-center justify-center gap-2.5 rounded-xl bg-volt text-[13px] font-bold uppercase tracking-[0.1em] text-ink"
            >
              {added ? (
                <>
                  <CheckIcon className="size-4.5" />
                  Added to cart
                </>
              ) : (
                <>
                  <BagIcon className="size-4.5" />
                  Add to cart
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onBuyNow}
              className="inline-flex h-13 items-center justify-center gap-2.5 rounded-xl bg-forest text-[13px] font-bold uppercase tracking-[0.1em] text-paper"
            >
              <BoltIcon className="size-4.5" />
              Buy now
            </button>
          </div>
        </div>

        {/* ==================================================== right column */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-mist">
            {[product.brand, product.category, product.type, product.skill]
              .filter(Boolean)
              .join(" · ")}
          </p>

          <h1 className="mt-2 text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold leading-[1.12] tracking-[-0.03em]">
            {product.name}
          </h1>

          {/* rating reads as one compact badge plus a count, rather than five
              loose glyphs competing with the title */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-md bg-volt-deep px-2 py-0.5 text-[13px] font-bold text-paper">
              {product.rating}
              <StarIcon className="size-3" />
            </span>
            <a
              href="#reviews"
              className="text-[13px] font-medium text-mist underline-offset-4 hover:text-ink hover:underline"
            >
              {product.reviews.toLocaleString("en-IN")} ratings &amp; reviews
            </a>
          </div>

          {/* -------------------------------------------------------- price */}
          <div className="mt-5">
            {discounted ? (
              <p className="text-[13px] font-semibold text-volt-deep">
                Special price
              </p>
            ) : null}
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <span className="text-[2rem] font-semibold leading-none tracking-[-0.03em]">
                {formatPrice(product.price)}
              </span>
              {discounted ? (
                <>
                  <span className="text-base text-mist line-through">
                    {formatPrice(product.compareAt)}
                  </span>
                  <span className="text-base font-semibold text-volt-deep">
                    {percentOff}% off
                  </span>
                </>
              ) : null}
            </div>
            <p className="mt-1.5 text-xs text-mist">Inclusive of all taxes</p>
          </div>

          {/* ------------------------------------------------------ variants */}
          <div className="mt-7">
            <p className="text-[13px] font-semibold">
              Colour
              <span className="ml-2 font-normal text-mist">{colorway.name}</span>
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {product.colorways.map((entry) => (
                <button
                  key={entry.name}
                  type="button"
                  onClick={() => setColorway(entry)}
                  aria-label={entry.name}
                  aria-pressed={entry.name === colorway.name}
                  className={`grid size-10 place-items-center rounded-full border-2 ${
                    entry.name === colorway.name
                      ? "border-volt-deep"
                      : "border-transparent hover:border-line-strong"
                  }`}
                >
                  <span
                    className="block size-7 rounded-full border border-ink/20"
                    style={{ background: entry.hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-[13px] font-semibold">
              {product.optionLabel}
              <span className="ml-2 font-normal text-mist">{option}</span>
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {product.options.map((entry) => (
                <button
                  key={entry}
                  type="button"
                  onClick={() => setOption(entry)}
                  aria-pressed={entry === option}
                  className={`h-10 min-w-16 rounded-lg border px-4 text-sm font-medium ${
                    entry === option
                      ? "border-volt-deep bg-volt text-ink"
                      : "border-line-strong bg-paper text-mist hover:border-ink/50 hover:text-ink"
                  }`}
                >
                  {entry}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <p className="text-[13px] font-semibold">Quantity</p>
            <QuantityStepper
              value={quantity}
              onChange={(next) => setQuantity(Math.max(1, next))}
            />
            <p className="flex items-center gap-2 text-xs">
              <span
                aria-hidden="true"
                className={`size-1.5 shrink-0 rounded-full ${lowStock ? "bg-clay" : "bg-volt-deep"}`}
              />
              {lowStock ? (
                <span className="text-clay">Only {product.stock} left</span>
              ) : (
                <span className="text-mist">In stock</span>
              )}
            </p>
          </div>

          {/* ------------------------------------------------------ services */}
          <ul className="mt-8 grid gap-4 rounded-2xl border border-line bg-surface/60 p-5 sm:grid-cols-3">
            {SERVICES.map(({ icon: Icon, title, note }) => (
              <li key={title} className="flex gap-3">
                <Icon className="mt-0.5 size-4.5 shrink-0 text-volt-deep" />
                <span>
                  <span className="block text-[13px] font-semibold">{title}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-mist">
                    {note}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          {/* ---------------------------------------------------- highlights */}
          <div className="mt-8 border-t border-line pt-7">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em]">
              Highlights
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {product.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-sm leading-relaxed text-mist"
                >
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-volt-deep" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* --------------------------------------------------- description */}
          <div className="mt-7 border-t border-line pt-7">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em]">
              About this paddle
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-mist">
              {product.description}
            </p>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-volt-deep">
              {brand.taglines.premium}
            </p>
          </div>

          <Link
            href="/shop"
            className="mt-7 inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-volt-deep"
          >
            <ArrowIcon className="size-4 rotate-180" />
            Back to shop
          </Link>
        </div>
      </div>
    </section>
  );
}
