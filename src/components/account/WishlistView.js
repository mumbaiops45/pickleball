"use client";

import Link from "next/link";
import ProductArt, { ART_THUMB } from "@/components/art/ProductArt";
import {
  ArrowIcon,
  BagIcon,
  HeartIcon,
  StarIcon,
  TrashIcon,
} from "@/components/ui/Icons";
import { useCart } from "@/store/CartProvider";
import { useWishlist } from "@/store/WishlistProvider";
import { formatPrice } from "@/lib/format";

export default function WishlistView() {
  const { items, count, hydrated, remove, clear } = useWishlist();
  const { addItem } = useCart();

  const moveToCart = (product) => {
    addItem({
      productId: product.id,
      colorway: product.colorways[0]?.name,
      option: product.options[0],
      quantity: 1,
      openDrawer: false,
    });
    remove(product.id);
  };

  if (!hydrated) {
    return <div className="h-64 animate-pulse rounded-3xl border border-line bg-surface" />;
  }

  return (
    <>
      <div className="flex items-center justify-between border-b border-line pb-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">
          Wishlist
          {count ? (
            <span className="ml-2 font-mono text-xs font-normal text-mist">
              {count} saved
            </span>
          ) : null}
        </h2>
        {count ? (
          <button
            type="button"
            onClick={clear}
            className="text-xs text-mist underline-offset-4 transition-colors hover:text-clay hover:underline"
          >
            Clear all
          </button>
        ) : null}
      </div>

      {count === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-3xl border border-line bg-surface px-6 py-16 text-center">
          <span className="grid size-16 place-items-center rounded-full border border-line text-mist">
            <HeartIcon className="size-7" />
          </span>
          <p className="mt-6 text-xl font-semibold tracking-tight">
            Nothing saved yet
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
            Tap the heart on any paddle, shoe or kit and it lands here — ready
            for the next drop or the next payday.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-volt px-7 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            Browse the shop
            <ArrowIcon className="size-4" />
          </Link>
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-4">
          {items.map((product) => (
            <li
              key={product.id}
              className="flex flex-col gap-5 rounded-3xl border border-line bg-surface p-5 sm:flex-row sm:items-center"
            >
              <Link
                href={`/products/${product.id}`}
                className="grid size-24 shrink-0 place-items-center overflow-hidden rounded-2xl bg-paper"
              >
                <ProductArt
                  product={product}
                  id={`wishlist-${product.id}`}
                  className={`${ART_THUMB[product.art.kind]} w-auto`}
                />
              </Link>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-[15px] font-semibold tracking-tight">
                    <Link
                      href={`/products/${product.id}`}
                      className="transition-colors hover:text-volt-deep"
                    >
                      {product.name}
                    </Link>
                  </h3>
                  <span className="flex items-center gap-1 text-xs text-mist">
                    <StarIcon className="size-3 text-volt-deep" />
                    {product.rating}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-mist">
                  {product.blurb}
                </p>
                <div className="mt-3 flex flex-wrap items-baseline gap-2">
                  <span className="text-lg font-semibold">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAt ? (
                    <span className="text-sm text-mist line-through">
                      {formatPrice(product.compareAt)}
                    </span>
                  ) : null}
                  <span className="text-[11px] uppercase tracking-[0.14em] text-mist">
                    {product.stock <= 10 ? (
                      <span className="text-clay">
                        Only {product.stock} left
                      </span>
                    ) : (
                      "In stock"
                    )}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2.5 sm:flex-col">
                <button
                  type="button"
                  onClick={() => moveToCart(product)}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-forest px-5 text-xs font-semibold text-paper transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <BagIcon className="size-3.5" />
                  Move to cart
                </button>
                <button
                  type="button"
                  onClick={() => remove(product.id)}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-5 text-xs font-medium transition-colors hover:border-clay hover:text-clay"
                >
                  <TrashIcon className="size-3.5" />
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
