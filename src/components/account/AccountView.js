"use client";

import Link from "next/link";
import ProductArt, { ART_MINI } from "@/components/art/ProductArt";
import { ArrowIcon, BagIcon, RepeatIcon, UserIcon } from "@/components/ui/Icons";
import { findProduct, mockOrders } from "@/lib/data";
import { useAuth } from "@/store/AuthProvider";
import { useCart } from "@/store/CartProvider";
import { formatPrice } from "@/lib/format";
import { Accent } from "@/components/ui/Heading";

const STATUS_STYLE = {
  Delivered: "border-volt-deep/40 text-volt-deep",
  Refunded: "border-line-strong text-mist",
  "In transit": "border-clay/50 text-clay",
};

export default function AccountView() {
  const { user, hydrated, signOut, openAuth } = useAuth();
  const { addItem } = useCart();

  if (!hydrated) {
    return (
      <div className="mx-auto w-full max-w-350 px-5 py-10 sm:px-8 lg:py-20">
        <div className="h-64 animate-pulse rounded-3xl border border-line bg-surface" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 py-16 text-center sm:px-8 lg:py-24">
        <span className="grid size-20 place-items-center rounded-full border border-line text-mist">
          <UserIcon className="size-8" />
        </span>
        <h2 className="mt-8 text-3xl font-semibold tracking-tight">
          You are <Accent>not signed in</Accent>
        </h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mist">
          Sign in to see your orders, saved grip size and early access to the
          next drop.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={openAuth}
            className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-volt px-8 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            Login or sign up
            <ArrowIcon className="size-4" />
          </button>
          <Link
            href="/shop"
            className="inline-flex h-14 items-center justify-center rounded-full border border-line-strong px-8 text-sm font-medium text-ink transition-colors hover:border-volt-deep hover:text-volt-deep"
          >
            Keep shopping
          </Link>
        </div>
      </div>
    );
  }

  const reorder = (order) => {
    for (const item of order.items) {
      const product = findProduct(item.productId);
      if (!product) continue;
      addItem({
        productId: product.id,
        colorway: product.colorways[0]?.name,
        option: product.options[0],
        quantity: item.quantity,
        openDrawer: false,
      });
    }
  };

  return (
    <div className="mx-auto grid w-full max-w-350 grid-cols-1 gap-10 px-5 py-10 sm:px-8 lg:py-14 lg:grid-cols-[280px_1fr] lg:gap-14">
      {/* profile */}
      <aside className="lg:sticky lg:top-32 lg:self-start">
        <div className="rounded-3xl border border-line bg-surface p-6">
          <span className="grid size-14 place-items-center rounded-full bg-volt text-lg font-semibold text-ink">
            {user.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </span>
          <p className="mt-5 text-lg font-semibold tracking-tight">{user.name}</p>
          <p className="mt-1 truncate text-sm text-mist">{user.email}</p>
          <p className="mt-4 inline-block rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-mist">
            Member since {user.memberSince}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            <div className="bg-surface p-4">
              <dt className="text-[10px] uppercase tracking-[0.14em] text-mist">
                Orders
              </dt>
              <dd className="mt-1 font-mono text-xl font-semibold">
                {mockOrders.length}
              </dd>
            </div>
            <div className="bg-surface p-4">
              <dt className="text-[10px] uppercase tracking-[0.14em] text-mist">
                Credit
              </dt>
              <dd className="mt-1 font-mono text-xl font-semibold text-volt-deep">
                {formatPrice(500)}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={signOut}
            className="mt-6 h-11 w-full rounded-full border border-line-strong text-sm font-medium text-ink transition-colors hover:border-clay hover:text-clay"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* orders */}
      <section>
        <div className="flex items-center justify-between border-b border-line pb-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">
            Order history
          </h2>
          <Link
            href="/shop"
            className="text-xs text-volt-deep underline-offset-4 hover:underline"
          >
            Shop again
          </Link>
        </div>

        <ul className="mt-6 flex flex-col gap-4">
          {mockOrders.map((order) => (
            <li
              key={order.id}
              className="rounded-3xl border border-line bg-surface p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-sm font-semibold">{order.id}</p>
                  <p className="mt-1 text-xs text-mist">{order.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.14em] ${
                      STATUS_STYLE[order.status] ?? STATUS_STYLE.Refunded
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="text-sm font-semibold">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              <ul className="mt-5 flex flex-wrap gap-3">
                {order.items.map((item) => {
                  const product = findProduct(item.productId);
                  if (!product) return null;
                  return (
                    <li key={item.productId}>
                      <Link
                        href={`/products/${product.id}`}
                        className="flex items-center gap-3 rounded-2xl border border-line bg-surface-2 p-2 pr-4 transition-colors hover:border-ink/30"
                      >
                        <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-paper">
                          <ProductArt
                            product={product}
                            id={`order-${order.id}-${product.id}`}
                            className={`${ART_MINI[product.art.kind]} w-auto`}
                          />
                        </span>
                        <span>
                          <span className="block text-sm font-medium">
                            {product.name}
                          </span>
                          <span className="block text-xs text-mist">
                            Qty {item.quantity}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 flex flex-wrap gap-3 border-t border-line pt-5">
                <button
                  type="button"
                  onClick={() => reorder(order)}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-5 text-xs font-medium transition-colors hover:border-volt-deep hover:text-volt-deep"
                >
                  <RepeatIcon className="size-3.5" />
                  Buy it again
                </button>
                <Link
                  href="/cart"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-5 text-xs font-medium transition-colors hover:border-ink/50"
                >
                  <BagIcon className="size-3.5" />
                  View cart
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
