"use client";

import { useState } from "react";
import Link from "next/link";
import ProductArt from "@/components/art/ProductArt";
import WishlistButton from "@/components/product/WishlistButton";
import { CheckIcon, PlusIcon } from "@/components/ui/Icons";
import { useCart } from "@/store/CartProvider";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const discounted = Boolean(product.compareAt);
  const lowStock = product.stock <= 10;

  const quickAdd = () => {
    addItem({
      productId: product.id,
      colorway: product.colorways[0]?.name,
      option: product.options[0],
      quantity: 1,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper shadow-[0_1px_2px_rgba(15,17,21,.04),0_8px_24px_-16px_rgba(15,17,21,.12)] hover:border-line-strong">

      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[radial-gradient(80%_70%_at_50%_18%,#ffffff_0%,#eceae2_78%)] p-6">
        <span className="absolute inset-x-8 top-8 z-0 h-40 rounded-full bg-volt/25 blur-3xl" />

        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <ProductArt
            product={product}
            sizes="(max-width: 640px) 88vw, (max-width: 1280px) 44vw, 30vw"
            className="h-auto max-h-full w-auto max-w-full"
          />
        </div>

        <div className="absolute left-4 top-4 z-20 flex max-w-[calc(100%-4.5rem)] flex-col items-start gap-2">
          {product.badge ? (
            <span className="max-w-full truncate rounded-full bg-volt px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
              {product.badge}
            </span>
          ) : null}
          {discounted ? (
            <span className="whitespace-nowrap rounded-full bg-clay px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-paper">
              Save {formatPrice(product.compareAt - product.price)}
            </span>
          ) : null}
        </div>

        <WishlistButton
          productId={product.id}
          className="absolute right-4 top-4 z-20"
        />
      </div>

      {/* details */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[15px] font-semibold tracking-tight">
          {/* stretched link keeps the whole card clickable */}
          <Link
            href={`/products/${product.id}`}
            className="before:absolute before:inset-0 before:z-10 before:content-['']"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto flex items-baseline gap-2 border-t border-line pt-5">
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

        {/* Always on, not hover-revealed: a hover-only control is unreachable
            on touch, where most of this grid is read. `relative z-20` lifts it
            over the title's stretched link, which otherwise covers the card. */}
        <button
          type="button"
          onClick={quickAdd}
          aria-label={`Add ${product.name} to cart`}
          className="relative z-20 mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-volt text-sm font-semibold text-ink"
        >
          {added ? (
            <>
              <CheckIcon className="size-4" />
              Added to cart
            </>
          ) : (
            <>
              <PlusIcon className="size-4" />
              Add to cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}
