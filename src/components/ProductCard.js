"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductArt from "@/components/art/ProductArt";
import WishlistButton from "@/components/product/WishlistButton";
import { CheckIcon } from "@/components/ui/Icons";
import { useCart } from "@/store/CartProvider";
import { formatPrice } from "@/lib/format";

/**
 * A catalogue tile.
 *
 * Deliberately plain. The previous version put the shot on a radial gradient
 * behind a blurred yellow glow that warmed on hover, lifted the whole card
 * 6px, scaled the product 4% and ran two full-width buttons underneath — five
 * things moving on a tile whose job is to show a ball and a price. The client
 * has asked twice for the product tiles to sit still, so nothing here
 * transforms: hover changes the border and the shadow and that is all.
 */
export default function ProductCard({ product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const discounted = Boolean(product.compareAt);
  const lowStock = product.stock <= 10;

  const selection = {
    productId: product.id,
    colorway: product.colorways[0]?.name,
    option: product.options[0],
    quantity: 1,
  };

  const quickAdd = () => {
    addItem(selection);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  const buyNow = () => {
    addItem({ ...selection, openDrawer: false });
    router.push("/checkout");
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-colors duration-200 hover:border-line-strong">
      {/* White, not a tint. Every ball shot on the site is now cut out on
          white (see ProductArt), so any tint here would frame the photograph
          in a visible rectangle of its own backdrop — which is what the old
          radial gradient behind this box was built to disguise. The card is
          told apart from the section by sitting white on surface, and the
          image is told apart from the copy by the rule under it. */}
      <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden border-b border-line bg-paper p-6">
        <ProductArt
          product={product}
          sizes="(max-width: 640px) 88vw, (max-width: 1280px) 44vw, 24vw"
          className="h-auto max-h-full w-auto max-w-full"
        />

        <div className="absolute left-3.5 top-3.5 flex max-w-[calc(100%-4rem)] flex-col items-start gap-1.5">
          {product.badge ? (
            <span className="max-w-full truncate rounded-full bg-volt px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink">
              {product.badge}
            </span>
          ) : null}
          {discounted ? (
            <span className="whitespace-nowrap rounded-full bg-clay px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-paper">
              Save {formatPrice(product.compareAt - product.price)}
            </span>
          ) : null}
        </div>

        <WishlistButton
          productId={product.id}
          className="absolute right-3.5 top-3.5"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] uppercase tracking-[0.14em] text-mist">
          {product.brand ?? product.category}
        </p>

        <h3 className="mt-2 text-[15px] font-semibold leading-snug tracking-tight">
          {/* stretched link keeps the whole card clickable */}
          <Link
            href={`/products/${product.id}`}
            className="before:absolute before:inset-0 before:z-10 before:content-['']"
          >
            {product.name}
          </Link>
        </h3>

        {product.blurb ? (
          <p className="mt-1.5 text-[13px] leading-relaxed text-mist">
            {product.blurb}
          </p>
        ) : null}

        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-lg font-semibold">
            {formatPrice(product.price)}
          </span>
          {discounted ? (
            <span className="text-sm text-mist line-through">
              {formatPrice(product.compareAt)}
            </span>
          ) : null}
          {lowStock ? (
            <span className="ml-auto text-[11px] font-medium uppercase tracking-[0.12em] text-clay">
              Only {product.stock} left
            </span>
          ) : null}
        </div>

        {/* Always on, not hover-revealed: a hover-only control is unreachable
            on touch, where most of this grid is read. `relative z-20` lifts it
            over the title's stretched link, which otherwise covers the card. */}
        <div className="relative z-20 mt-auto flex flex-col gap-1.5 pt-5">
          <button
            type="button"
            onClick={quickAdd}
            aria-label={`Add ${product.name} to cart`}
            className={`flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
              added
                ? "bg-volt text-ink"
                : "bg-volt-deep text-paper hover:bg-forest"
            }`}
          >
            {added ? (
              <>
                <CheckIcon className="size-4" />
                Added to cart
              </>
            ) : (
              "Add to cart"
            )}
          </button>

          {/* The second action used to be a full-width orange fill sitting
              above this one, so the tile shipped two equally loud primaries
              and neither read as the default. */}
          <button
            type="button"
            onClick={buyNow}
            aria-label={`Buy ${product.name} now`}
            className="h-9 text-[13px] font-medium text-mist underline-offset-4 transition-colors duration-200 hover:text-volt-deep hover:underline"
          >
            Buy it now
          </button>
        </div>
      </div>
    </article>
  );
}
