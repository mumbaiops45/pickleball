"use client";

import Link from "next/link";
import ProductArt, { ART_MINI } from "@/components/art/ProductArt";
import { OrderStatus } from "@/components/account/OrdersView";
import {
  ArrowIcon,
  BagIcon,
  HeartIcon,
  MailIcon,
  PackageIcon,
  PhoneIcon,
  UserIcon,
} from "@/components/ui/Icons";
import { formatPrice } from "@/lib/format";
import { useAuth } from "@/store/AuthProvider";
import { useCart } from "@/store/CartProvider";
import { useWishlist } from "@/store/WishlistProvider";
import { useOrders } from "@/store/OrdersProvider";
import { useProductLookup } from "@/store/catalogue";

function StatCard({ href, icon: Icon, label, value, hint }) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-3xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong"
    >
      <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-mist">
        <Icon className="size-3.5" />
        {label}
      </span>
      <span className="mt-3 font-mono text-2xl font-semibold">{value}</span>
      <span className="mt-1 flex items-center gap-1.5 text-xs text-mist transition-colors group-hover:text-volt-deep">
        {hint}
        <ArrowIcon className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export default function AccountOverview() {
  const { user } = useAuth();
  const { count: cartCount, hydrated: cartHydrated } = useCart();
  const { count: savedCount, hydrated: wishlistHydrated } = useWishlist();
  const { orders, loading: ordersLoading } = useOrders();
  // order lines store slugs, so the live catalogue is what draws them
  const findProduct = useProductLookup(orders.length > 0);

  const recentOrders = orders.slice(0, 2);

  return (
    <>
      <div className="flex items-center justify-between border-b border-line pb-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">
          Overview
        </h2>
        <Link
          href="/shop"
          className="text-xs text-volt-deep underline-offset-4 hover:underline"
        >
          Shop again
        </Link>
      </div>

      <p className="mt-6 text-2xl font-semibold tracking-tight">
        Welcome back, {user.name.split(" ")[0]}.
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-mist">
        Everything you have ordered, saved and left in the cart, in one place.
      </p>

      {/* quick stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          href="/account/orders"
          icon={PackageIcon}
          label="Orders"
          value={ordersLoading ? "—" : orders.length}
          hint="View order history"
        />
        <StatCard
          href="/account/wishlist"
          icon={HeartIcon}
          label="Wishlist"
          value={wishlistHydrated ? savedCount : 0}
          hint="View saved balls"
        />
        <StatCard
          href="/cart"
          icon={BagIcon}
          label="In cart"
          value={cartHydrated ? cartCount : 0}
          hint="Go to cart"
        />
      </div>

      {/* recent orders */}
      <div className="mt-10 flex items-center justify-between border-b border-line pb-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">
          Recent orders
        </h3>
        <Link
          href="/account/orders"
          className="text-xs text-volt-deep underline-offset-4 hover:underline"
        >
          See all
        </Link>
      </div>

      {ordersLoading ? (
        <div className="mt-6 h-32 animate-pulse rounded-3xl border border-line bg-surface" />
      ) : recentOrders.length === 0 ? (
        <p className="mt-6 rounded-3xl border border-line bg-surface px-6 py-10 text-center text-sm text-mist">
          No orders yet. Your first one will show up here.
        </p>
      ) : null}

      <ul className="mt-6 flex flex-col gap-4">
        {recentOrders.map((order) => (
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
                          id={`recent-${order.id}-${product.id}`}
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
          </li>
        ))}
      </ul>

      {/* profile details */}
      <div className="mt-10 border-b border-line pb-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">
          Your details
        </h3>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
        {[
          { icon: UserIcon, label: "Name", value: user.name },
          { icon: MailIcon, label: "Email", value: user.email || "Not added" },
          { icon: PhoneIcon, label: "Mobile", value: user.phone || "Not added" },
        ].map((row) => (
          <div key={row.label} className="bg-surface p-5">
            <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-mist">
              <row.icon className="size-3.5" />
              {row.label}
            </dt>
            <dd className="mt-2 truncate text-sm font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
