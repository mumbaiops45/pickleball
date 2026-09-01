"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data";
import Logo from "@/components/ui/Logo";
import AnnouncementBar from "@/components/AnnouncementBar";
import { ACCOUNT_SECTIONS } from "@/lib/account";
import {
  BagIcon,
  ChevronDownIcon,
  CloseIcon,
  HeartIcon,
  LogOutIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/ui/Icons";
import { useCart } from "@/store/CartProvider";
import { useAuth } from "@/store/AuthProvider";
import { useWishlist } from "@/store/WishlistProvider";

/**
 * Desktop mega-menu for a nav entry that carries `columns`.
 *
 * Opens on hover and on keyboard focus; the wrapping `li` owns both, so the
 * panel closes as soon as focus or the pointer leaves the whole item rather
 * than the instant it leaves the trigger link.
 */
function MegaMenu({ link, open, onOpen, onClose }) {
  return (
    <li
      // Full height of the bar, so `top-full` on the panel below resolves to
      // the header's bottom edge. Sized to the link instead, the panel opened
      // partway up the bar and slid under the cart button.
      className="relative flex h-full items-center"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onClose();
      }}
    >
      <Link
        href={link.href}
        aria-expanded={open}
        className={`group relative flex items-center gap-1.5 px-4 py-2 text-sm transition-colors ${
          open ? "bg-volt text-ink" : "text-mist hover:text-ink"
        }`}
      >
        {link.label}
        <ChevronDownIcon
          className={`size-3.5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </Link>

      <div
        // kept mounted so the fade runs both ways; pointer events follow `open`
        // max-w keeps it inside the window whatever the trigger's position
        className={`absolute top-full flex max-w-[calc(100vw-2.5rem)] border border-line bg-paper shadow-[0_28px_60px_-30px_rgba(15,17,21,.45)] transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${
          link.menuAlign === "right" ? "right-0" : "left-0"
        } ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {link.columns.map((column, index) => (
          <div
            key={column.title}
            // No min-width and no flex-1: with nowrap entries each column is
            // already exactly as wide as its longest label, so a minimum only
            // padded the panel out with dead space.
            className={`shrink-0 px-6 py-6 ${
              index === 0 ? "bg-paper" : "bg-surface-2"
            }`}
          >
            <p className="whitespace-nowrap text-sm font-semibold tracking-tight text-ink">
              {column.title}
            </p>
            {/* Entries stay on one line and the column widens to fit. Left to
                wrap, a long label broke over three lines and the panel read as
                a block of ragged text rather than a list. */}
            <ul className="mt-5 flex flex-col gap-3.5">
              {column.links.map((entry) => (
                <li key={entry.label}>
                  <Link
                    href={entry.href}
                    tabIndex={open ? 0 : -1}
                    onClick={onClose}
                    className="whitespace-nowrap text-sm text-mist transition-colors hover:text-volt-deep"
                  >
                    {entry.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </li>
  );
}

/**
 * Signed-in account dropdown: account, orders and wishlist in one place.
 *
 * Click to open rather than hover — this is a destination menu (it holds
 * "Sign out"), so it should not fall open as the pointer crosses the header.
 */
function AccountMenu() {
  const { user, signOut } = useAuth();
  const { count: savedCount, hydrated: wishlistHydrated } = useWishlist();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative hidden sm:block"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex h-10 items-center gap-2 rounded-full px-3 transition-colors ${
          open ? "bg-surface-2 text-ink" : "text-mist hover:bg-surface-2 hover:text-ink"
        }`}
      >
        <UserIcon className="size-4.5" />
        <span className="max-w-24 truncate text-sm">
          {user.name.split(" ")[0]}
        </span>
        <ChevronDownIcon
          className={`size-3.5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        role="menu"
        aria-label="Account"
        className={`absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_28px_60px_-30px_rgba(15,17,21,.45)] transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="border-b border-line bg-surface px-4 py-3.5">
          <p className="truncate text-sm font-semibold tracking-tight">
            {user.name}
          </p>
          {user.email || user.phone ? (
            <p className="mt-0.5 truncate text-xs text-mist">
              {user.email || user.phone}
            </p>
          ) : null}
        </div>

        <ul className="p-2">
          {ACCOUNT_SECTIONS.map((entry) => {
            const Icon = entry.icon;
            return (
              <li key={entry.href}>
                <Link
                  href={entry.href}
                  role="menuitem"
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm text-mist transition-colors hover:bg-surface hover:text-ink"
                >
                  <Icon className="size-4 shrink-0" />
                  {entry.label}
                  {entry.href === "/account/wishlist" &&
                  wishlistHydrated &&
                  savedCount ? (
                    <span className="ml-auto rounded-full bg-forest px-2 py-0.5 font-mono text-[11px] text-paper">
                      {savedCount}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-line p-2">
          <button
            type="button"
            role="menuitem"
            tabIndex={open ? 0 : -1}
            onClick={() => {
              setOpen(false);
              signOut();
            }}
            className="flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm text-mist transition-colors hover:bg-surface hover:text-clay"
          >
            <LogOutIcon className="size-4 shrink-0" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const pathname = usePathname();
  const { count, openDrawer, hydrated } = useCart();
  const { user, openAuth, signOut } = useAuth();
  const { count: savedCount, hydrated: wishlistHydrated } = useWishlist();

  // only the homepage has a hero to sit over — everywhere else stays solid
  const overlayRoute = pathname === "/";
  const solid = scrolled || !overlayRoute;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          solid
            ? "border-b border-line bg-paper/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <AnnouncementBar />
        <nav className="mx-auto flex h-18 max-w-350 items-center justify-between gap-8 px-5 sm:px-8">
          <Logo />

          <ul
            className="hidden items-center gap-1 xl:flex xl:h-full"
            onKeyDown={(event) => {
              if (event.key === "Escape") setOpenMenu(null);
            }}
          >
            {navLinks.map((link) =>
              link.columns ? (
                <MegaMenu
                  key={link.label}
                  link={link}
                  open={openMenu === link.label}
                  onOpen={() => setOpenMenu(link.label)}
                  onClose={() => setOpenMenu(null)}
                />
              ) : (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onMouseEnter={() => setOpenMenu(null)}
                    className="group relative block px-4 py-2 text-sm text-mist transition-colors hover:text-ink"
                  >
                    {link.label}
                    <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-volt transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100" />
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-1.5">
            <Link
              href="/shop"
              aria-label="Search products"
              className="hidden size-10 place-items-center rounded-full text-mist transition-colors hover:bg-surface-2 hover:text-ink sm:grid"
            >
              <SearchIcon className="size-4.5" />
            </Link>

            {/* signed in gets a wishlist shortcut with a live saved count */}
            {user ? (
              <Link
                href="/account/wishlist"
                aria-label="Your wishlist"
                className="relative hidden size-10 place-items-center rounded-full text-mist transition-colors hover:bg-surface-2 hover:text-ink sm:grid"
              >
                <HeartIcon className="size-4.5" />
                {wishlistHydrated && savedCount ? (
                  <span className="absolute -right-0.5 -top-0.5 grid min-w-4.5 place-items-center rounded-full bg-clay px-1 font-mono text-[10px] font-semibold text-paper">
                    {savedCount}
                  </span>
                ) : null}
              </Link>
            ) : null}

            {/* signed out opens the modal; signed in opens the account menu */}
            {user ? (
              <AccountMenu />
            ) : (
              <button
                type="button"
                onClick={openAuth}
                aria-label="Login or sign up"
                className="hidden h-10 items-center gap-2 rounded-full px-3 text-mist transition-colors hover:bg-surface-2 hover:text-ink sm:flex"
              >
                <UserIcon className="size-4.5" />
                <span className="text-sm">Login</span>
              </button>
            )}

            <button
              type="button"
              onClick={openDrawer}
              className="relative ml-1 flex h-11 items-center gap-2 rounded-full bg-forest pl-3.5 pr-4 text-sm font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5"
            >
              <BagIcon className="size-4.5" />
              <span className="hidden sm:inline">Cart</span>
              {/* an empty bag shows no bubble rather than a standing zero */}
              {hydrated && count ? (
                <span className="grid size-5 place-items-center rounded-full bg-volt font-mono text-[11px] font-semibold text-ink">
                  {count}
                </span>
              ) : null}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="ml-1 grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface-2 xl:hidden"
            >
              <MenuIcon className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-60 xl:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-forest-deep/45 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-[min(88vw,380px)] flex-col bg-surface px-6 py-6 transition-transform duration-600 ease-[cubic-bezier(.16,1,.3,1)] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo onClick={() => setMenuOpen(false)} />
            <button
              type="button"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface-2"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          <ul className="mt-10 flex flex-col overflow-y-auto">
            {navLinks.map((link, index) => (
              <li key={link.label} className="border-b border-line">
                <Link
                  href={link.href}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-4 py-5 text-2xl font-medium tracking-tight text-ink transition-colors hover:text-volt-deep"
                >
                  <span className="font-mono text-xs text-mist">
                    0{index + 1}
                  </span>
                  {link.label}
                </Link>

                {/* the mega-menu columns flatten into chips on mobile */}
                {link.columns ? (
                  <div className="flex flex-col gap-3 pb-5 pl-9">
                    {link.columns.map((column) => (
                      <div key={column.title} className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] uppercase tracking-[0.16em] text-mist">
                          {column.title}
                        </span>
                        {column.links.map((entry) => (
                          <Link
                            key={entry.label}
                            href={entry.href}
                            tabIndex={menuOpen ? 0 : -1}
                            onClick={() => setMenuOpen(false)}
                            className="rounded-full border border-line-strong px-3 py-1 text-xs text-mist transition-colors hover:border-volt-deep hover:text-volt-deep"
                          >
                            {entry.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3">
            {user ? (
              <>
                <p className="text-[11px] uppercase tracking-[0.16em] text-mist">
                  Signed in as {user.name.split(" ")[0]}
                </p>
                <ul className="flex flex-col gap-2">
                  {ACCOUNT_SECTIONS.map((entry) => {
                    const Icon = entry.icon;
                    return (
                      <li key={entry.href}>
                        <Link
                          href={entry.href}
                          tabIndex={menuOpen ? 0 : -1}
                          onClick={() => setMenuOpen(false)}
                          className="flex h-12 items-center gap-3 rounded-full border border-line px-5 text-sm font-medium text-ink"
                        >
                          <Icon className="size-4 shrink-0" />
                          {entry.label}
                          {entry.href === "/account/wishlist" &&
                          wishlistHydrated &&
                          savedCount ? (
                            <span className="ml-auto rounded-full bg-forest px-2 py-0.5 font-mono text-[11px] text-paper">
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
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                  className="flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong text-sm font-medium text-ink"
                >
                  <LogOutIcon className="size-4" />
                  Sign out
                </button>
              </>
            ) : (
              <button
                type="button"
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => {
                  setMenuOpen(false);
                  openAuth();
                }}
                className="grid h-12 place-items-center rounded-full border border-line-strong text-sm font-medium text-ink"
              >
                Login or sign up
              </button>
            )}
            <Link
              href="/shop"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              className="grid h-14 place-items-center rounded-full bg-volt text-sm font-semibold tracking-wide text-ink"
            >
              Shop the Season 04 drop
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
