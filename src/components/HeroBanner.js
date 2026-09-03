"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/ui/Icons";

const INTERVAL = 5000;
// Short enough that the fixed header (4.5rem, now that the announcement
// bar is gone) plus the banner still leave
// the next section peeking above the fold, so the page reads as scrollable.
// The rem cap stops a very tall monitor from turning it into a wall.
const MAX_HEIGHT = "min(86svh, 40rem)";

export default function HeroBanner({ slides }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animate, setAnimate] = useState(false);
  const touchStart = useRef(null);

  const count = slides.length;
  const slide = slides[index];

  /* The banner artwork is full-bleed: the headline starts ~4% from the left
     edge and the feature row sits on the bottom margin, so neither axis has a
     safe area to crop into. The three exports are also not one shape (1.87:1
     and 1.5:1), so a single fixed container ratio letterboxes at least one of
     them — which is what put the dark forest gutters down both sides: the box
     was 2.52:1, `object-contain` fitted the art by height and left the
     background showing. Following the active slide's own dimensions instead
     means every banner fills the width with nothing cropped and nothing bare.
     The statically imported images carry their intrinsic size; a plain string
     src would not, hence the fallback.

     The natural ratio drives the height, but only up to MAX_HEIGHT. Left
     uncapped it overshoots on desktop: the 1.5:1 export across a 1900px
     screen is a 1267px banner, so most of it sat below the fold and only
     appeared once you scrolled — and nothing else on the homepage was
     visible on load. Past the cap the art is cropped rather than
     letterboxed, centred so the loss is split between the top and the bottom
     feature strip instead of coming off one end. Phones never reach the cap
     (400px wide at 1.5:1 is a 267px banner), so small screens still get
     every export whole. */
  const ratio =
    slide?.image?.width && slide?.image?.height
      ? `${slide.image.width} / ${slide.image.height}`
      : "2.52 / 1";

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAnimate(!query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // A backgrounded tab should not burn through the whole rotation unseen.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const go = useCallback(
    // wraps in both directions — `go(-1)` lands on the last slide
    (next) => setIndex((current) => ((next ?? current + 1) + count) % count),
    [count],
  );

  useEffect(() => {
    if (!animate || paused || count < 2) return;

    const timer = setTimeout(() => go(), INTERVAL);
    return () => clearTimeout(timer);
  }, [animate, paused, count, index, go]);

  function onKeyDown(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
  }

  function onTouchEnd(event) {
    const start = touchStart.current;
    if (start === null) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    touchStart.current = null;

    // a vertical scroll drifts sideways too — only act when the gesture was
    // mostly horizontal, or the banner advances while you are scrolling past
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY))
      go(deltaX < 0 ? index + 1 : index - 1);
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured campaigns"
      className="relative isolate bg-forest text-paper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      onKeyDown={onKeyDown}
      onTouchStart={(event) => {
        const touch = event.changedTouches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={onTouchEnd}
    >
  
      <div
        style={{ aspectRatio: ratio, maxHeight: MAX_HEIGHT }}
        className="relative w-full overflow-hidden transition-[aspect-ratio] duration-1000 ease-[cubic-bezier(.16,1,.3,1)]"
      >
        {slides.map((item, position) => {
          const current = position === index;

          return (
            <Link
              key={item.id}
              href={item.href}
              tabIndex={current ? undefined : -1}
              aria-hidden={!current}
              aria-label={`${item.title} — ${item.cta}`}
              className={`absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(.16,1,.3,1)] ${
                current ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                priority={position === 0}
                placeholder="blur"
                sizes="100vw"
                className={`object-cover object-center transition-transform duration-7000 ease-[cubic-bezier(.16,1,.3,1)] ${
                  current ? "scale-100" : "scale-[1.05]"
                }`}
              />
            </Link>
          );
        })}

       
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-forest/70 to-transparent" />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-paper/25 bg-forest-deep/50 text-paper backdrop-blur transition-colors duration-300 hover:border-volt hover:bg-volt hover:text-ink md:grid"
            >
              <ChevronLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-paper/25 bg-forest-deep/50 text-paper backdrop-blur transition-colors duration-300 hover:border-volt hover:bg-volt hover:text-ink md:grid"
            >
              <ChevronRightIcon className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* The artwork carries its own headline, so the slide change is announced
          to screen readers only. */}
      <p aria-live="polite" className="sr-only">
        {`Slide ${index + 1} of ${count}: ${slide.title}`}
      </p>
    </section>
  );
}
