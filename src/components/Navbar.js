"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data";
import Logo from "@/components/ui/Logo";
import AnnouncementBar from "@/components/AnnouncementBar";
import {
  BagIcon,
  CloseIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/ui/Icons";
import { useCart } from "@/store/CartProvider";
import { useAuth } from "@/store/AuthProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { count, openDrawer, hydrated } = useCart();
  const { user, openAuth } = useAuth();

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

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="group relative block px-4 py-2 text-sm text-mist transition-colors hover:text-ink"
                >
                  {link.label}
                  <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-volt transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <Link
              href="/shop"
              aria-label="Search products"
              className="hidden size-10 place-items-center rounded-full text-mist transition-colors hover:bg-surface-2 hover:text-ink sm:grid"
            >
              <SearchIcon className="size-4.5" />
            </Link>

            {/* signed out opens the modal; signed in goes to the account page */}
            {user ? (
              <Link
                href="/account"
                aria-label="Your account"
                className="hidden h-10 items-center gap-2 rounded-full px-3 text-mist transition-colors hover:bg-surface-2 hover:text-ink sm:flex"
              >
                <UserIcon className="size-4.5" />
                <span className="max-w-24 truncate text-sm">
                  {user.name.split(" ")[0]}
                </span>
              </Link>
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
              className="relative ml-1 flex h-11 items-center gap-2 rounded-full bg-ink pl-3.5 pr-4 text-sm font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5"
            >
              <BagIcon className="size-4.5" />
              <span className="hidden sm:inline">Cart</span>
              <span className="grid size-5 place-items-center rounded-full  font-semibold text-ink">
                {/* {hydrated ? count : 0} */}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="ml-1 grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface-2 lg:hidden"
            >
              <MenuIcon className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-60 lg:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-ink/45 backdrop-blur-sm transition-opacity duration-500 ${
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

          <ul className="mt-10 flex flex-col">
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
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3">
            {user ? (
              <Link
                href="/account"
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
                className="grid h-12 place-items-center rounded-full border border-line-strong text-sm font-medium text-ink"
              >
                Signed in as {user.name.split(" ")[0]}
              </Link>
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
