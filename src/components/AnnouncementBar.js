"use client";

import { useState } from "react";
import Link from "next/link";
import { CloseIcon } from "@/components/ui/Icons";
import { LogoMark } from "@/components/ui/Logo";

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative bg-ink text-paper">
      <div className="mx-auto flex h-9 max-w-350 items-center justify-center gap-3 px-5 sm:px-8">
        <LogoMark size="sm" tone="volt" className="hidden sm:grid" />
        <p className="truncate text-[11px] font-medium uppercase tracking-[0.16em]">
          Season 04 is live &middot;{" "}
          <Link href="/shop?category=Paddles" className="text-volt underline-offset-4 hover:underline">
            Shop the raw carbon drop
          </Link>
          <span className="hidden md:inline"> &middot; Free shipping over ₹2,499</span>
        </p>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-paper/60 transition-colors hover:bg-paper/10 hover:text-paper"
      >
        <CloseIcon className="size-4" />
      </button>
    </div>
  );
}
