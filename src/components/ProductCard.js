"use client";

import Link from "next/link";
import ProductArt, { ART_HEIGHT } from "@/components/art/ProductArt";
import { PlusIcon, StarIcon } from "@/components/ui/Icons";
import { useCart } from "@/store/CartProvider";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const discounted = Boolean(product.compareAt);
  const lowStock = product.stock <= 10;

  const quickAdd = () =>
    addItem({
      productId: product.id,
      colorway: product.colorways[0]?.name,
      option: product.options[0],
      quantity: 1,
    });

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper shadow-[0_1px_2px_rgba(15,17,21,.04),0_8px_24px_-16px_rgba(15,17,21,.12)] transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_2px_4px_rgba(15,17,21,.05),0_28px_50px_-24px_rgba(15,17,21,.25)]">
      {/* media */}
      <div className="relative isolate flex h-64 items-center justify-center overflow-hidden bg-[radial-gradient(80%_70%_at_50%_18%,#ffffff_0%,#eceae2_78%)] py-7">
        <span className="absolute inset-x-8 top-8 -z-10 h-40 rounded-full bg-volt/25 blur-3xl transition-all duration-700 group-hover:bg-volt/40" />

        <div className="flex h-full items-center transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-2 group-hover:scale-105 group-hover:rotate-3">
          <ProductArt
            product={product}
            className={`${ART_HEIGHT[product.art.kind]} w-auto`}
          />
        </div>

        {product.badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-volt px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
            {product.badge}
          </span>
        ) : null}

        {discounted ? (
          <span className="absolute right-4 top-4 rounded-full bg-clay px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-paper">
            Save {formatPrice(product.compareAt - product.price)}
          </span>
        ) : null}

        <button
          type="button"
          onClick={quickAdd}
          className="absolute inset-x-4 bottom-4 z-20 flex h-11 translate-y-16 items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-paper opacity-0 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
        >
          <PlusIcon className="size-4" />
          Quick add
        </button>
      </div>

      {/* details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[15px] font-semibold tracking-tight">
            {/* stretched link keeps the whole card clickable */}
            <Link
              href={`/products/${product.id}`}
              className="before:absolute before:inset-0 before:z-10 before:content-['']"
            >
              {product.name}
            </Link>
          </h3>
          <span className="flex shrink-0 items-center gap-1 text-xs text-mist">
            <StarIcon className="size-3 text-volt-deep" />
            {product.rating}
          </span>
        </div>

        <p className="mt-1.5 text-[13px] leading-relaxed text-mist">
          {product.blurb}
        </p>

        <div className="mt-4 flex items-center gap-1.5">
          {product.swatches.map((swatch) => (
            <span
              key={swatch}
              className="size-3.5 rounded-full border border-ink/20"
              style={{ background: swatch }}
            />
          ))}
          <span className="ml-1 text-[11px] text-mist">
            {product.reviews.toLocaleString("en-IN")} reviews
          </span>
        </div>

        <div className="mt-5 flex items-baseline gap-2 border-t border-line pt-4">
          <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
          {discounted ? (
            <span className="text-sm text-mist line-through">
              {formatPrice(product.compareAt)}
            </span>
          ) : null}
          <span className="ml-auto text-[11px] uppercase tracking-[0.14em] text-mist">
            {lowStock ? (
              <span className="text-clay">Only {product.stock} left</span>
            ) : (
              // footwear reads better by maker than by the shelf it sits on
              product.brand ?? product.category
            )}
          </span>
        </div>
      </div>
    </article>
  );
}
