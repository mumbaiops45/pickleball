// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import QuantityStepper from "@/components/cart/QuantityStepper";
// import WishlistButton from "@/components/product/WishlistButton";
// import {
//   ArrowIcon,
//   BagIcon,
//   BoltIcon,
//   CheckIcon,
//   RepeatIcon,
//   ShieldIcon,
//   StarIcon,
//   TruckIcon,
// } from "@/components/ui/Icons";
// import { useCart } from "@/store/CartProvider";
// import { brand } from "@/lib/data";
// import { formatPrice } from "@/lib/format";

// const SERVICES = [
//   { icon: TruckIcon, title: "Free delivery", note: "On every order over ₹2,499" },
//   { icon: RepeatIcon, title: "30-day play test", note: "We cover the return postage" },
//   { icon: ShieldIcon, title: "Lifetime edge guard", note: "Warrantied against delamination" },
// ];

// function ProductPhoto({ src, alt, priority = false, sizes, className = "" }) {
//   return (
//     <Image
//       src={src}
//       alt={alt}
//       fill
//       priority={priority}
//       sizes={sizes}
//       className={`object-contain ${className}`}
//     />
//   );
// }

// /**
//  * Marketplace layout, the shape shoppers already know from Flipkart and its
//  * peers: a sticky gallery on the left with the two commit buttons pinned
//  * directly beneath it, and a single scrolling column of facts on the right,
//  * ordered the way the decision is actually made — what it is, how it is rated,
//  * what it costs, which variant, when it arrives, then the detail.
//  */
// export default function ProductDetail({ product }) {
//   const { addItem } = useCart();
//   const router = useRouter();
//   // data.js guarantees a gallery of at least the product's own hero shot
//   const gallery = product.gallery ?? [product.image];
//   const [shot, setShot] = useState(0);
//   const [colorway, setColorway] = useState(product.colorways[0]);
//   const [option, setOption] = useState(product.options[0]);
//   const [quantity, setQuantity] = useState(1);
//   const [added, setAdded] = useState(false);

//   const discounted = Boolean(product.compareAt);
//   const lowStock = product.stock <= 10;
//   const percentOff = discounted
//     ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
//     : 0;

//   const lineItem = {
//     productId: product.id,
//     colorway: colorway.name,
//     option,
//     quantity,
//   };

//   const onAdd = () => {
//     addItem(lineItem);
//     setAdded(true);
//     window.setTimeout(() => setAdded(false), 2000);
//   };

//   // Buy now is the same commit with the cart step skipped — the whole point of
//   // the second button is that it does not stop to show you the drawer.
//   const onBuyNow = () => {
//     addItem(lineItem);
//     router.push("/checkout");
//   };

//   return (
//     <section className="relative mx-auto w-full max-w-350 px-5 py-6 sm:px-8 lg:py-10">
//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
//         {/* ===================================================== left column */}
//         <div className="lg:sticky lg:top-32 lg:self-start">
//           {/* thumbs run down the side on a desktop and along the bottom on a
//               phone, so the shot keeps the full width where width is scarce */}
//           <div className="flex flex-col-reverse gap-3 sm:flex-row">
//             {/* The gallery is however many shots the CMS holds for this SKU, so
//                 the strip has to survive an unbounded count: it wraps while it
//                 is a row under the shot on a phone, and becomes the rail beside
//                 it from sm up. A single-shot product renders no strip at all
//                 rather than one dead button. */}
//             {gallery.length > 1 ? (
//               <div className="flex flex-wrap gap-3 sm:flex-col sm:flex-nowrap">
//                 {gallery.map((src, index) => (
//                   <button
//                     key={src}
//                     type="button"
//                     onClick={() => setShot(index)}
//                     aria-label={`View ${index + 1} of ${gallery.length}`}
//                     aria-pressed={index === shot}
//                     className={`relative grid size-16 shrink-0 overflow-hidden rounded-xl border bg-surface-2 ${
//                       index === shot
//                         ? "border-volt-deep"
//                         : "border-line hover:border-ink/40"
//                     }`}
//                   >
//                     <ProductPhoto src={src} alt="" sizes="64px" className="p-1.5" />
//                   </button>
//                 ))}
//               </div>
//             ) : null}

//             <div className="relative isolate flex aspect-square flex-1 items-center justify-center overflow-hidden rounded-2xl border border-line bg-[radial-gradient(75%_65%_at_50%_16%,#ffffff_0%,#eeece4_80%)]">
//               <div className="relative h-[88%] w-[88%]">
//                 <ProductPhoto
//                   src={gallery[shot]}
//                   alt={`${product.name} — view ${shot + 1} of ${gallery.length}`}
//                   priority
//                   sizes="(min-width: 1024px) 42vw, 100vw"
//                   className="drop-shadow-[0_28px_45px_rgba(15,17,21,.15)]"
//                 />
//               </div>

//               {product.badge ? (
//                 <span className="absolute left-4 top-4 rounded-full bg-volt px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
//                   {product.badge}
//                 </span>
//               ) : null}

//               <WishlistButton
//                 productId={product.id}
//                 className="absolute right-4 top-4"
//               />

//               <span className="absolute bottom-4 right-4 font-mono text-[11px] text-mist">
//                 {product.sku}
//               </span>
//             </div>
//           </div>

//           {/* the two commit buttons sit with the product, not at the end of a
//               long scroll of specifications */}
//           <div className="mt-4 grid gap-3 sm:grid-cols-2">
//             <button
//               type="button"
//               onClick={onAdd}
//               className="inline-flex h-13 items-center justify-center gap-2.5 rounded-xl bg-volt text-[13px] font-bold uppercase tracking-[0.1em] text-ink"
//             >
//               {added ? (
//                 <>
//                   <CheckIcon className="size-4.5" />
//                   Added to cart
//                 </>
//               ) : (
//                 <>
//                   <BagIcon className="size-4.5" />
//                   Add to cart
//                 </>
//               )}
//             </button>
//             <button
//               type="button"
//               onClick={onBuyNow}
//               className="inline-flex h-13 items-center justify-center gap-2.5 rounded-xl bg-forest text-[13px] font-bold uppercase tracking-[0.1em] text-paper"
//             >
//               <BoltIcon className="size-4.5" />
//               Buy now
//             </button>
//           </div>
//         </div>

//         {/* ==================================================== right column */}
//         <div>
//           <p className="text-[11px] uppercase tracking-[0.18em] text-mist">
//             {[product.brand, product.category, product.type, product.skill]
//               .filter(Boolean)
//               .join(" · ")}
//           </p>

//           <h1 className="mt-2 text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold leading-[1.12] tracking-[-0.03em]">
//             {product.name}
//           </h1>

//           {/* rating reads as one compact badge plus a count, rather than five
//               loose glyphs competing with the title */}
//           <div className="mt-3 flex flex-wrap items-center gap-3">
//             <span className="inline-flex items-center gap-1 rounded-md bg-volt-deep px-2 py-0.5 text-[13px] font-bold text-paper">
//               {product.rating}
//               <StarIcon className="size-3" />
//             </span>
//             <a
//               href="#reviews"
//               className="text-[13px] font-medium text-mist underline-offset-4 hover:text-ink hover:underline"
//             >
//               {product.reviews.toLocaleString("en-IN")} ratings &amp; reviews
//             </a>
//           </div>

//           {/* -------------------------------------------------------- price */}
//           <div className="mt-5">
//             {discounted ? (
//               <p className="text-[13px] font-semibold text-volt-deep">
//                 Special price
//               </p>
//             ) : null}
//             <div className="mt-1 flex flex-wrap items-center gap-3">
//               <span className="text-[2rem] font-semibold leading-none tracking-[-0.03em]">
//                 {formatPrice(product.price)}
//               </span>
//               {discounted ? (
//                 <>
//                   <span className="text-base text-mist line-through">
//                     {formatPrice(product.compareAt)}
//                   </span>
//                   <span className="text-base font-semibold text-volt-deep">
//                     {percentOff}% off
//                   </span>
//                 </>
//               ) : null}
//             </div>
//             <p className="mt-1.5 text-xs text-mist">Inclusive of all taxes</p>
//           </div>

//           {/* ------------------------------------------------------ variants */}
//           <div className="mt-7">
//             <p className="text-[13px] font-semibold">
//               Colour
//               <span className="ml-2 font-normal text-mist">{colorway.name}</span>
//             </p>
//             <div className="mt-2.5 flex flex-wrap gap-2.5">
//               {product.colorways.map((entry) => (
//                 <button
//                   key={entry.name}
//                   type="button"
//                   onClick={() => setColorway(entry)}
//                   aria-label={entry.name}
//                   aria-pressed={entry.name === colorway.name}
//                   className={`grid size-10 place-items-center rounded-full border-2 ${
//                     entry.name === colorway.name
//                       ? "border-volt-deep"
//                       : "border-transparent hover:border-line-strong"
//                   }`}
//                 >
//                   <span
//                     className="block size-7 rounded-full border border-ink/20"
//                     style={{ background: entry.hex }}
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="mt-6">
//             <p className="text-[13px] font-semibold">
//               {product.optionLabel}
//               <span className="ml-2 font-normal text-mist">{option}</span>
//             </p>
//             <div className="mt-2.5 flex flex-wrap gap-2">
//               {product.options.map((entry) => (
//                 <button
//                   key={entry}
//                   type="button"
//                   onClick={() => setOption(entry)}
//                   aria-pressed={entry === option}
//                   className={`h-10 min-w-16 rounded-lg border px-4 text-sm font-medium ${
//                     entry === option
//                       ? "border-volt-deep bg-volt text-ink"
//                       : "border-line-strong bg-paper text-mist hover:border-ink/50 hover:text-ink"
//                   }`}
//                 >
//                   {entry}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="mt-6 flex flex-wrap items-center gap-4">
//             <p className="text-[13px] font-semibold">Quantity</p>
//             <QuantityStepper
//               value={quantity}
//               onChange={(next) => setQuantity(Math.max(1, next))}
//             />
//             <p className="flex items-center gap-2 text-xs">
//               <span
//                 aria-hidden="true"
//                 className={`size-1.5 shrink-0 rounded-full ${lowStock ? "bg-clay" : "bg-volt-deep"}`}
//               />
//               {lowStock ? (
//                 <span className="text-clay">Only {product.stock} left</span>
//               ) : (
//                 <span className="text-mist">In stock</span>
//               )}
//             </p>
//           </div>

//           {/* ------------------------------------------------------ services */}
//           <ul className="mt-8 grid gap-4 rounded-2xl border border-line bg-surface/60 p-5 sm:grid-cols-3">
//             {SERVICES.map(({ icon: Icon, title, note }) => (
//               <li key={title} className="flex gap-3">
//                 <Icon className="mt-0.5 size-4.5 shrink-0 text-volt-deep" />
//                 <span>
//                   <span className="block text-[13px] font-semibold">{title}</span>
//                   <span className="mt-0.5 block text-xs leading-relaxed text-mist">
//                     {note}
//                   </span>
//                 </span>
//               </li>
//             ))}
//           </ul>

//           {/* ---------------------------------------------------- highlights */}
//           <div className="mt-8 border-t border-line pt-7">
//             <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em]">
//               Highlights
//             </h2>
//             <ul className="mt-4 flex flex-col gap-2.5">
//               {product.highlights.map((highlight) => (
//                 <li
//                   key={highlight}
//                   className="flex gap-3 text-sm leading-relaxed text-mist"
//                 >
//                   <CheckIcon className="mt-0.5 size-4 shrink-0 text-volt-deep" />
//                   {highlight}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* --------------------------------------------------- description */}
//           <div className="mt-7 border-t border-line pt-7">
//             <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em]">
//               About this paddle
//             </h2>
//             <p className="mt-3 text-[15px] leading-relaxed text-mist">
//               {product.description}
//             </p>
//             <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-volt-deep">
//               {brand.taglines.premium}
//             </p>
//           </div>

//           <Link
//             href="/shop"
//             className="mt-7 inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-volt-deep"
//           >
//             <ArrowIcon className="size-4 rotate-180" />
//             Back to shop
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }



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

/* -------------------------------------------------------------------------- */
/* SERVICES                                                                   */
/* -------------------------------------------------------------------------- */

const SERVICES = [
  {
    icon: TruckIcon,
    title: "Free delivery",
    note: "On every order over ₹2,499",
  },
  {
    icon: RepeatIcon,
    title: "30-day play test",
    note: "Easy returns and support",
  },
  {
    icon: ShieldIcon,
    title: "Secure purchase",
    note: "Quality checked before dispatch",
  },
];

/* -------------------------------------------------------------------------- */
/* PRODUCT IMAGE                                                              */
/* -------------------------------------------------------------------------- */

function ProductPhoto({
  src,
  alt,
  priority = false,
  sizes,
  className = "",
}) {
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

/* -------------------------------------------------------------------------- */
/* PRODUCT DETAIL                                                             */
/* -------------------------------------------------------------------------- */

export default function ProductDetail({ product }) {
  const { addItem } = useCart();
  const router = useRouter();

  /* ------------------------------------------------------------------------ */
  /* GALLERY                                                                  */
  /* ------------------------------------------------------------------------ */

  const gallery = product.gallery ?? [product.image];

  const [shot, setShot] = useState(0);

  /* ------------------------------------------------------------------------ */
  /* PRODUCT OPTIONS                                                          */
  /* ------------------------------------------------------------------------ */

  const [colorway, setColorway] = useState(
    product.colorways?.[0] ?? null
  );

  const [option, setOption] = useState(
    product.options?.[0] ?? null
  );

  const [quantity, setQuantity] = useState(1);

  const [added, setAdded] = useState(false);

  /* ------------------------------------------------------------------------ */
  /* PRICE                                                                    */
  /* ------------------------------------------------------------------------ */

  const discounted = Boolean(product.compareAt);

  const lowStock =
    typeof product.stock === "number" && product.stock <= 10;

  const percentOff = discounted
    ? Math.round(
        ((product.compareAt - product.price) /
          product.compareAt) *
          100
      )
    : 0;

  /* ------------------------------------------------------------------------ */
  /* CART ITEM                                                                */
  /* ------------------------------------------------------------------------ */

  const lineItem = {
    productId: product.id,
    colorway: colorway?.name,
    option,
    quantity,
  };

  /* ------------------------------------------------------------------------ */
  /* ADD TO CART                                                              */
  /* ------------------------------------------------------------------------ */

  const onAdd = () => {
    addItem(lineItem);

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  /* ------------------------------------------------------------------------ */
  /* BUY NOW                                                                  */
  /* ------------------------------------------------------------------------ */

  const onBuyNow = () => {
    addItem(lineItem);
    router.push("/checkout");
  };

  /* ------------------------------------------------------------------------ */
  /* RENDER                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <main className="w-full bg-paper">
      {/* The breadcrumb lives in the route (src/app/products/[id]/page.js),
          which carries the category step and the <nav>/<ol> markup. A second
          copy here rendered two trails on every product page. */}

      {/* ==================================================================== */}
      {/* PRODUCT MAIN SECTION                                                 */}
      {/* ==================================================================== */}

      <section className="mx-auto w-full max-w-350 px-5 py-8 sm:px-8 lg:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(400px,0.92fr)] lg:gap-12 xl:gap-16">
          {/* ================================================================= */}
          {/* LEFT - GALLERY                                                    */}
          {/* ================================================================= */}

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              {/* ------------------------------------------------------------- */}
              {/* THUMBNAILS                                                     */}
              {/* ------------------------------------------------------------- */}

              {gallery.length > 1 ? (
                <div className="order-2 flex gap-2.5 overflow-x-auto pb-1 sm:order-1 sm:w-18 sm:flex-col sm:overflow-visible sm:pb-0">
                  {gallery.map((src, index) => {
                    const selected = index === shot;

                    return (
                      <button
                        key={`${src}-${index}`}
                        type="button"
                        onClick={() => setShot(index)}
                        aria-label={`View image ${
                          index + 1
                        } of ${gallery.length}`}
                        aria-pressed={selected}
                        className={`relative size-16 shrink-0 overflow-hidden rounded-xl border-2 bg-surface-2 transition-all sm:size-17 ${
                          selected
                            ? "border-volt-deep shadow-sm"
                            : "border-line hover:border-ink/40"
                        }`}
                      >
                        <ProductPhoto
                          src={src}
                          alt=""
                          sizes="68px"
                          className="p-1.5"
                        />
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {/* ------------------------------------------------------------- */}
              {/* MAIN PRODUCT IMAGE                                             */}
              {/* ------------------------------------------------------------- */}

              <div className="order-1 min-w-0 flex-1 sm:order-2">
                <div className="relative flex min-h-105 items-center justify-center overflow-hidden rounded-[28px] border border-line bg-[#f3f1e9] sm:min-h-130 lg:min-h-145">
                  {/* Soft background decoration */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/2 top-8 size-60 -translate-x-1/2 rounded-full bg-white/80 blur-3xl" />

                    <div className="absolute bottom-8 left-1/2 h-px w-2/3 -translate-x-1/2 bg-black/5" />
                  </div>

                  {/* Product image */}
                  <div className="absolute inset-5 sm:inset-8 lg:inset-10">
                    <ProductPhoto
                      src={gallery[shot]}
                      alt={`${product.name} - view ${
                        shot + 1
                      } of ${gallery.length}`}
                      priority
                      sizes="(min-width: 1280px) 55vw, (min-width: 1024px) 52vw, 100vw"
                      className="drop-shadow-[0_35px_55px_rgba(15,17,21,.18)]"
                    />
                  </div>

                  {/* Product badge */}
                  {product.badge ? (
                    <span className="absolute left-5 top-5 rounded-full bg-volt px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-ink shadow-sm">
                      {product.badge}
                    </span>
                  ) : null}

                  {/* Wishlist */}
                  <WishlistButton
                    productId={product.id}
                    className="absolute right-5 top-5"
                  />

                  {/* Gallery count */}
                  {gallery.length > 1 ? (
                    <span className="absolute bottom-5 right-5 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-[10px] font-medium text-mist backdrop-blur">
                      {shot + 1} / {gallery.length}
                    </span>
                  ) : null}
                </div>

                {/* Image information */}
                <div className="mt-3 flex items-center justify-between px-1">
                  <p className="text-[11px] text-mist">
                    Premium quality · Built for performance
                  </p>

                  {product.sku ? (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-mist">
                      SKU {product.sku}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* RIGHT - PURCHASE PANEL                                             */}
          {/* ================================================================= */}

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[28px] border border-line bg-white p-6 shadow-[0_12px_40px_rgba(15,17,21,.05)] sm:p-8 lg:p-9">
              {/* ------------------------------------------------------------- */}
              {/* CATEGORY                                                        */}
              {/* ------------------------------------------------------------- */}

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-mist">
                {[
                  product.brand,
                  product.category,
                  product.type,
                  product.skill,
                ]
                  .filter(Boolean)
                  .join("  ·  ")}
              </p>

              {/* ------------------------------------------------------------- */}
              {/* PRODUCT NAME                                                    */}
              {/* ------------------------------------------------------------- */}

              <h1 className="mt-4 text-[clamp(1.8rem,3vw,2.65rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
                {product.name}
              </h1>

              {/* ------------------------------------------------------------- */}
              {/* RATING                                                          */}
              {/* ------------------------------------------------------------- */}

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-volt-deep px-2.5 py-1 text-sm font-bold text-paper">
                  {product.rating}
                  <StarIcon className="size-3.5" />
                </span>

                <a
                  href="#reviews"
                  className="text-sm font-medium text-mist underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  {product.reviews?.toLocaleString("en-IN")}{" "}
                  ratings & reviews
                </a>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* PRICE                                                           */}
              {/* ------------------------------------------------------------- */}

              <div className="my-7 h-px bg-line" />

              <div>
                {discounted ? (
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-volt-deep">
                    Special price
                  </p>
                ) : null}

                <div className="flex flex-wrap items-end gap-3">
                  <span className="text-[2.35rem] font-semibold leading-none tracking-[-0.04em]">
                    {formatPrice(product.price)}
                  </span>

                  {discounted ? (
                    <>
                      <span className="pb-1 text-base text-mist line-through">
                        {formatPrice(product.compareAt)}
                      </span>

                      <span className="rounded-md bg-volt/40 px-2 py-1 text-sm font-bold text-volt-deep">
                        {percentOff}% OFF
                      </span>
                    </>
                  ) : null}
                </div>

                <p className="mt-3 text-xs text-mist">
                  Inclusive of all taxes
                </p>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* COLOUR                                                          */}
              {/* ------------------------------------------------------------- */}

              {product.colorways?.length ? (
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">
                      Colour
                    </p>

                    <span className="text-sm text-mist">
                      {colorway?.name}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-3">
                    {product.colorways.map((entry) => {
                      const selected =
                        entry.name === colorway?.name;

                      return (
                        <button
                          key={entry.name}
                          type="button"
                          onClick={() => setColorway(entry)}
                          aria-label={entry.name}
                          aria-pressed={selected}
                          className={`grid size-12 place-items-center rounded-full border-2 transition-all ${
                            selected
                              ? "border-volt-deep"
                              : "border-transparent hover:border-line-strong"
                          }`}
                        >
                          <span
                            className="size-8 rounded-full border border-black/15 shadow-inner"
                            style={{
                              background: entry.hex,
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {/* ------------------------------------------------------------- */}
              {/* PRODUCT OPTION                                                  */}
              {/* ------------------------------------------------------------- */}

              {product.options?.length ? (
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">
                      {product.optionLabel}
                    </p>

                    <span className="text-sm text-mist">
                      {option}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {product.options.map((entry) => {
                      const selected = entry === option;

                      return (
                        <button
                          key={entry}
                          type="button"
                          onClick={() => setOption(entry)}
                          aria-pressed={selected}
                          className={`min-h-11 rounded-xl border px-5 text-sm font-semibold transition-all ${
                            selected
                              ? "border-volt-deep bg-volt text-ink shadow-sm"
                              : "border-line-strong bg-paper text-mist hover:border-ink/40 hover:text-ink"
                          }`}
                        >
                          {entry}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {/* ------------------------------------------------------------- */}
              {/* QUANTITY + STOCK                                                */}
              {/* ------------------------------------------------------------- */}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-surface p-5">
                <div className="flex items-center gap-4">
                  <p className="text-sm font-semibold">
                    Quantity
                  </p>

                  <QuantityStepper
                    value={quantity}
                    onChange={(next) =>
                      setQuantity(Math.max(1, next))
                    }
                  />
                </div>

                {typeof product.stock === "number" ? (
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`size-2 rounded-full ${
                        lowStock
                          ? "bg-clay"
                          : "bg-volt-deep"
                      }`}
                    />

                    {lowStock ? (
                      <span className="font-semibold text-clay">
                        Only {product.stock} left
                      </span>
                    ) : (
                      <span className="font-medium text-mist">
                        In stock
                      </span>
                    )}
                  </div>
                ) : null}
              </div>

              {/* ------------------------------------------------------------- */}
              {/* BUY NOW + ADD TO CART                                           */}
              {/* ------------------------------------------------------------- */}

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={onBuyNow}
                  className="inline-flex h-14 items-center justify-center gap-2.5 rounded-xl bg-forest px-5 text-[12px] font-bold uppercase tracking-[0.12em] text-paper shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <BoltIcon className="size-5" />
                  Buy Now
                </button>

                <button
                  type="button"
                  onClick={onAdd}
                  className="inline-flex h-14 items-center justify-center gap-2.5 rounded-xl border-2 border-ink bg-paper px-5 text-[12px] font-bold uppercase tracking-[0.12em] text-ink transition-all duration-200 hover:bg-ink hover:text-paper"
                >
                  {added ? (
                    <>
                      <CheckIcon className="size-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <BagIcon className="size-5" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* TRUST MESSAGE                                                   */}
              {/* ------------------------------------------------------------- */}

              <div className="mt-5 flex items-center justify-center gap-2 text-center text-[11px] text-mist">
                <ShieldIcon className="size-4 text-volt-deep" />

                <span>
                  Secure checkout · Quality assured · Easy returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SERVICE BENEFITS                                                     */}
      {/* ==================================================================== */}

      <section className="border-y border-line bg-surface/50">
        <div className="mx-auto w-full max-w-350 px-5 py-9 sm:px-8 lg:py-12">
          <div className="grid gap-5 md:grid-cols-3">
            {SERVICES.map(({ icon: Icon, title, note }) => (
              <div
                key={title}
                className="flex items-center gap-4 rounded-2xl border border-line bg-paper p-5 transition-shadow hover:shadow-sm sm:p-6 lg:p-5"
              >
                <div className="grid size-12 shrink-0 place-items-center rounded-full bg-volt">
                  <Icon className="size-5 text-ink" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    {title}
                  </p>

                  <p className="mt-1.5 text-xs leading-relaxed text-mist">
                    {note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* PRODUCT CONTENT                                                      */}
      {/* ==================================================================== */}

      <section className="mx-auto w-full max-w-350 px-5 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* ================================================================= */}
          {/* HIGHLIGHTS                                                         */}
          {/* ================================================================= */}

          <div className="rounded-[28px] border border-line bg-surface p-7 sm:p-8 lg:p-9">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-volt-deep">
              Product benefits
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
              Why you&apos;ll love it
            </h2>

            {product.highlights?.length ? (
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {product.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-3 rounded-2xl bg-paper p-5"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-volt">
                      <CheckIcon className="size-4 text-ink" />
                    </span>

                    <span className="text-sm leading-relaxed text-mist">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-sm leading-relaxed text-mist">
                Premium design and performance built for
                everyday play.
              </p>
            )}
          </div>

          {/* ================================================================= */}
          {/* ABOUT PRODUCT                                                      */}
          {/* ================================================================= */}

          <div className="rounded-[28px] border border-line bg-paper p-7 sm:p-8 lg:p-9">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-volt-deep">
              Product story
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
              About this product
            </h2>

            <p className="mt-6 text-[15px] leading-7 text-mist">
              {product.description}
            </p>

            <div className="mt-7 flex items-center gap-3 rounded-2xl bg-surface p-5">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-volt">
                <CheckIcon className="size-5 text-ink" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Premium quality
                </p>

                <p className="mt-2 text-xs leading-relaxed text-mist">
                  Designed for performance, comfort and
                  durability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* CUSTOMER REVIEWS - COMPACT                                           */}
      {/* ==================================================================== */}

      <section
        id="reviews"
        className="border-t border-line bg-surface/50"
      >
        <div className="mx-auto flex w-full max-w-350 flex-col gap-6 px-5 py-9 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:py-11">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-volt-deep">
              Customer feedback
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              Customer Reviews
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-volt px-3.5 py-2 text-sm font-bold text-ink">
              {product.rating}
              <StarIcon className="size-4" />
            </span>

            <span className="text-sm text-mist">
              {product.reviews?.toLocaleString("en-IN")}{" "}
              ratings
            </span>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* BACK TO SHOP                                                          */}
      {/* ==================================================================== */}

      <section className="mx-auto w-full max-w-350 px-5 py-10 sm:px-8 lg:py-12">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-mist transition-colors hover:text-ink"
        >
          <ArrowIcon className="size-4 rotate-180" />
          Back to shop
        </Link>
      </section>
    </main>
  );
}