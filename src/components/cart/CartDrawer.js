"use client";

import { useEffect } from "react";
import Link from "next/link";
import CartLineItem from "@/components/cart/CartLineItem";
import FreeShippingMeter from "@/components/cart/FreeShippingMeter";
import { ArrowIcon, BagIcon, CloseIcon } from "@/components/ui/Icons";
import { LogoMark } from "@/components/ui/Logo";
import { useCart } from "@/store/CartProvider";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const { lines, count, totals, drawerOpen, closeDrawer } = useCart();

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (event) => {
      if (event.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen, closeDrawer]);

  return (
    <div
      className={`fixed inset-0 z-70 ${drawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!drawerOpen}
    >
      <button
        type="button"
        tabIndex={drawerOpen ? 0 : -1}
        aria-label="Close cart"
        onClick={closeDrawer}
        className={`absolute inset-0 bg-forest-deep/45 backdrop-blur-sm transition-opacity duration-500 ${
          drawerOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        aria-label="Shopping cart"
        className={`absolute inset-y-0 right-0 flex w-[min(92vw,440px)] flex-col bg-surface shadow-2xl transition-transform duration-600 ease-[cubic-bezier(.16,1,.3,1)] ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em]">
            <LogoMark size="sm" />
            Your cart
            <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-mist">
              {count}
            </span>
          </h2>
          <button
            type="button"
            tabIndex={drawerOpen ? 0 : -1}
            onClick={closeDrawer}
            aria-label="Close cart"
            className="grid size-11 place-items-center rounded-full text-mist transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <CloseIcon className="size-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid size-16 place-items-center rounded-full border border-line text-mist">
              <BagIcon className="size-7" />
            </span>
            <p className="mt-6 text-base font-medium">Your cart is empty</p>
            <p className="mt-2 text-sm text-mist">
              Every ball we make is two taps away.
            </p>
            <Link
              href="/shop"
              onClick={closeDrawer}
              tabIndex={drawerOpen ? 0 : -1}
              className="mt-8 inline-flex h-12 items-center gap-2.5 rounded-full bg-volt px-7 text-sm font-semibold text-ink"
            >
              Start shopping
              <ArrowIcon className="size-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <div className="pt-5">
                <FreeShippingMeter totals={totals} />
              </div>
              <ul className="divide-y divide-line">
                {lines.map((line) => (
                  <CartLineItem key={line.key} line={line} compact />
                ))}
              </ul>
            </div>

            <footer className="border-t border-line px-6 py-5">
              <dl className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-mist">Subtotal</dt>
                  <dd className="font-semibold">
                    {formatPrice(totals.subtotal)}
                  </dd>
                </div>
                {totals.savings > 0 ? (
                  <div className="flex justify-between">
                    <dt className="text-mist">You save</dt>
                    <dd className="font-medium text-clay">
                      &minus;{formatPrice(totals.savings)}
                    </dd>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <dt className="text-mist">Shipping</dt>
                  <dd className="text-mist">
                    {totals.shipping === 0
                      ? "Free"
                      : formatPrice(totals.shipping)}
                  </dd>
                </div>
              </dl>

              <Link
                href="/cart"
                onClick={closeDrawer}
                tabIndex={drawerOpen ? 0 : -1}
                className="group mt-5 flex h-13 items-center justify-center gap-2.5 rounded-full bg-volt text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                View cart and checkout
                <ArrowIcon className="size-4 transition-transform duration-400 group-hover:translate-x-1.5" />
              </Link>
              <button
                type="button"
                onClick={closeDrawer}
                tabIndex={drawerOpen ? 0 : -1}
                className="mt-3 h-10 w-full text-xs text-mist transition-colors hover:text-ink"
              >
                Continue shopping
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
