"use client";

import Link from "next/link";
import ProductArt, { ART_MINI } from "@/components/art/ProductArt";
import { ArrowIcon, BagIcon, PackageIcon, RepeatIcon } from "@/components/ui/Icons";
import { useCart } from "@/store/CartProvider";
import { useOrders } from "@/store/OrdersProvider";
import { useProductLookup } from "@/store/catalogue";
import { formatPrice } from "@/lib/format";

export const STATUS_STYLE = {
  Delivered: "border-volt-deep/40 text-volt-deep",
  Refunded: "border-line-strong text-mist",
  Cancelled: "border-line-strong text-mist",
  "In transit": "border-clay/50 text-clay",
  Processing: "border-line-strong text-ink",
};

export function OrderStatus({ status }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.14em] ${
        STATUS_STYLE[status] ?? STATUS_STYLE.Refunded
      }`}
    >
      {status}
    </span>
  );
}

export default function OrdersView() {
  const { addItem } = useCart();
  const { orders, loading, error } = useOrders();
  // order lines store slugs, so the live catalogue is what draws them
  const findProduct = useProductLookup(orders.length > 0);

  const reorder = (order) => {
    for (const item of order.items) {
      const product = findProduct(item.productId);
      if (!product) continue;
      addItem({
        productId: product.id,
        colorway: product.colorways?.[0]?.name,
        option: product.options?.[0],
        quantity: item.quantity,
        openDrawer: false,
      });
    }
  };

  if (loading) {
    return <div className="h-64 animate-pulse rounded-3xl border border-line bg-surface" />;
  }

  return (
    <>
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

      {error ? (
        <p className="mt-6 rounded-3xl border border-clay/40 bg-surface px-6 py-5 text-sm text-clay">
          {error}
        </p>
      ) : null}

      {!error && orders.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-3xl border border-line bg-surface px-6 py-16 text-center">
          <span className="grid size-16 place-items-center rounded-full border border-line text-mist">
            <PackageIcon className="size-7" />
          </span>
          <p className="mt-6 text-xl font-semibold tracking-tight">
            No orders yet
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
            Once you place an order it lands here, with tracking and a one-tap
            reorder.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-volt px-7 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            Browse the shop
            <ArrowIcon className="size-4" />
          </Link>
        </div>
      ) : null}

      <ul className="mt-6 flex flex-col gap-4">
        {orders.map((order) => (
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
                <OrderStatus status={order.status} />
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
    </>
  );
}
