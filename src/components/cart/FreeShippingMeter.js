"use client";

import { TruckIcon } from "@/components/ui/Icons";
import { formatPrice } from "@/lib/format";

export default function FreeShippingMeter({ totals }) {
  const { subtotal, freeShippingRemaining, freeShippingThreshold } = totals;
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const unlocked = freeShippingRemaining === 0 && subtotal > 0;

  return (
    <div className="rounded-2xl border border-line bg-surface-2/60 p-4">
      <p className="flex items-center gap-2 text-xs text-mist">
        <TruckIcon className="size-4 text-volt-deep" />
        {unlocked ? (
          <span className="text-ink">Free shipping unlocked.</span>
        ) : (
          <span>
            <span className="font-semibold text-ink">
              {formatPrice(freeShippingRemaining)}
            </span>{" "}
            away from free shipping
          </span>
        )}
      </p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-volt transition-[width] duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
