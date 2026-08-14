"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";


export default function CardRail({
  className = "",
  label = "Card slider",
  children,
}) {
  const railRef = useRef(null);
  const [overflowing, setOverflowing] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [progress, setProgress] = useState(0);

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;

    // rounding guard: browsers report fractional scroll positions at the ends
    const max = el.scrollWidth - el.clientWidth;
    setOverflowing(max > 4);
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
    setProgress(max > 4 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    sync();
    el.addEventListener("scroll", sync, { passive: true });

    const observer = new ResizeObserver(sync);
    observer.observe(el);
    for (const child of el.children) observer.observe(child);

    return () => {
      el.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, [sync]);

  const page = (direction) => {
    const el = railRef.current;
    if (!el) return;

    // one card + its gap, falling back to most of the viewport width
    const first = el.firstElementChild;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = first ? first.getBoundingClientRect().width + gap : el.clientWidth * 0.9;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * step, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div>
      <div className="relative">
        <div
          ref={railRef}
          role="region"
          aria-label={label}
          tabIndex={0}
          className={`${className} focus-visible:outline-none`}
        >
          {children}
        </div>

        {overflowing && (
          <>
            <RailButton
              side="left"
              disabled={atStart}
              onClick={() => page(-1)}
              label="Previous"
            />
            <RailButton
              side="right"
              disabled={atEnd}
              onClick={() => page(1)}
              label="Next"
            />
          </>
        )}
      </div>

      {/* travel indicator, doubles as the "there is more" hint */}
      {overflowing && (
        <div
          className="mx-auto mt-6 h-0.5 w-32 overflow-hidden rounded-full bg-ink/10"
          aria-hidden="true"
        >
          <span
            className="block h-full w-1/3 rounded-full bg-ink/60 transition-transform duration-200 ease-out"
            style={{ transform: `translateX(${progress * 200}%)` }}
          />
        </div>
      )}
    </div>
  );
}

function RailButton({ side, disabled, onClick, label }) {
  const Icon = side === "left" ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-paper/90 text-ink shadow-[0_10px_24px_-12px_rgba(15,17,21,.4)] backdrop-blur transition-all duration-300 hover:border-volt-deep hover:text-volt-deep disabled:pointer-events-none disabled:opacity-0 sm:grid ${
        side === "left" ? "left-2 sm:left-3" : "right-2 sm:right-3"
      }`}
    >
      <Icon className="size-5" />
    </button>
  );
}
