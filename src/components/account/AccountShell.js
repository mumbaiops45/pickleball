"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import { Accent } from "@/components/ui/Heading";
import { ArrowIcon, LogOutIcon, UserIcon } from "@/components/ui/Icons";
import { ACCOUNT_SECTIONS } from "@/lib/account";
import { formatPrice } from "@/lib/format";
import { useAuth } from "@/store/AuthProvider";
import { useWishlist } from "@/store/WishlistProvider";
import { useOrders } from "@/store/OrdersProvider";

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function SignedOut() {
  const { openAuth } = useAuth();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 py-16 text-center sm:px-8 lg:py-24">
      <span className="grid size-20 place-items-center rounded-full border border-line text-mist">
        <UserIcon className="size-8" />
      </span>
      <h2 className="mt-8 text-3xl font-semibold tracking-tight">
        You are <Accent>not signed in</Accent>
      </h2>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mist">
        Login to see your account, your orders and the wishlist you have been
        building.
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

/**
 * Frame shared by /account, /account/orders and /account/wishlist: the hero,
 * the profile card and the section nav. Lives in the route layout so the nav
 * keeps its state while you move between the three pages.
 */
export default function AccountShell({ children }) {
  const pathname = usePathname();
  const { user, hydrated, signOut } = useAuth();
  const { count: savedCount, hydrated: wishlistHydrated } = useWishlist();
  const { orders, loading: ordersLoading } = useOrders();

  const section =
    ACCOUNT_SECTIONS.find((entry) => entry.href === pathname) ??
    ACCOUNT_SECTIONS[0];

  const hero = (
    <PageHero
      eyebrow={section.eyebrow}
      title={section.title}
      titleAccent={section.titleAccent}
      copy={section.copy}
      crumbs={
        section.href === "/account"
          ? [{ label: "Account" }]
          : [{ label: "Account", href: "/account" }, { label: section.label }]
      }
    />
  );

  if (!hydrated) {
    return (
      <>
        {hero}
        <div className="mx-auto w-full max-w-350 px-5 py-10 sm:px-8 lg:py-20">
          <div className="h-64 animate-pulse rounded-3xl border border-line bg-surface" />
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        {hero}
        <SignedOut />
      </>
    );
  }

  return (
    <>
      {hero}
      <div className="mx-auto grid w-full max-w-350 grid-cols-1 gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[280px_1fr] lg:gap-14 lg:py-14">
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-3xl border border-line bg-surface p-6">
            <span className="grid size-14 place-items-center rounded-full bg-volt text-lg font-semibold text-ink">
              {initials(user.name)}
            </span>
            <p className="mt-5 text-lg font-semibold tracking-tight">
              {user.name}
            </p>
            {user.email || user.phone ? (
              <p className="mt-1 truncate text-sm text-mist">
                {user.email || user.phone}
              </p>
            ) : null}
            <p className="mt-4 inline-block rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-mist">
              Member since {user.memberSince}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              <div className="bg-surface p-4">
                <dt className="text-[10px] uppercase tracking-[0.14em] text-mist">
                  Orders
                </dt>
                <dd className="mt-1 font-mono text-xl font-semibold">
                  {ordersLoading ? "—" : orders.length}
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
          </div>

          {/* section nav */}
          <nav aria-label="Account" className="mt-4">
            <ul className="flex flex-col gap-1.5">
              {ACCOUNT_SECTIONS.map((entry) => {
                const active = entry.href === section.href;
                const Icon = entry.icon;
                return (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex h-12 items-center gap-3 rounded-2xl border px-4 text-sm transition-colors ${
                        active
                          ? "border-volt-deep bg-volt/15 font-semibold text-ink"
                          : "border-line text-mist hover:border-line-strong hover:text-ink"
                      }`}
                    >
                      <Icon className="size-4 shrink-0" />
                      {entry.label}
                      {entry.href === "/account/wishlist" &&
                      wishlistHydrated &&
                      savedCount ? (
                        <span className="ml-auto rounded-full bg-ink px-2 py-0.5 font-mono text-[11px] text-paper">
                          {savedCount}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={signOut}
              className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-line-strong text-sm font-medium text-ink transition-colors hover:border-clay hover:text-clay"
            >
              <LogOutIcon className="size-4" />
              Sign out
            </button>
          </nav>
        </aside>

        <section className="min-w-0">{children}</section>
      </div>
    </>
  );
}
