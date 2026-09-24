"use client";

import Link from "next/link";
import ProductArt, { ART_MINI, ART_THUMB } from "@/components/art/ProductArt";
import QuantityStepper from "@/components/cart/QuantityStepper";
import { useCart } from "@/store/CartProvider";
import { formatPrice } from "@/lib/format";

export default function CartLineItem({ line, compact = false }) {
  const { setQuantity, removeItem } = useCart();
  const { product } = line;
  const colorHex = product.colorways.find((c) => c.name === line.colorway)?.hex;

  return (
    <li className="flex gap-3 py-5 sm:gap-4">
      <Link
        href={`/products/${product.id}`}
        className={`grid shrink-0 place-items-center overflow-hidden rounded-2xl border border-line bg-surface-2 ${
          // a 112px thumb leaves a 320px phone ~130px for the name and controls
          compact ? "size-20" : "size-20 sm:size-28"
        }`}
      >
        <ProductArt
          product={product}
          color={colorHex}
          id={`cart-${line.key}`}
          className={`${(compact ? ART_MINI : ART_THUMB)[product.art.kind]} w-auto`}
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/products/${product.id}`}
              className="line-clamp-2 text-sm font-semibold transition-colors hover:text-volt-deep"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-xs text-mist">
              {[line.colorway, line.option].filter(Boolean).join(" · ")}
            </p>
          </div>
          <p className="shrink-0 text-sm font-semibold">
            {formatPrice(line.lineTotal)}
          </p>
        </div>

        {/* wraps on the narrowest phones instead of pushing Remove off-screen */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-4">
          <QuantityStepper
            value={line.quantity}
            compact={compact}
            onChange={(next) => setQuantity(line.key, next)}
          />
          <button
            type="button"
            onClick={() => removeItem(line.key)}
            // padded to a finger-sized target without changing how it looks
            className="-mx-2 px-2 py-2.5 text-xs text-mist underline-offset-4 transition-colors hover:text-clay hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
