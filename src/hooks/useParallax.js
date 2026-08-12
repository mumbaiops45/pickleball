"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll + pointer driven parallax.
 *
 * Returns a ref to attach to a section. Every descendant carrying one of the
 * data attributes below is transformed as the section travels the viewport:
 *
 *   data-speed="-2"    vertical drift. positive = moves up faster than scroll
 *                      (foreground), negative = lags behind (background).
 *                      the value is roughly "hundreds of pixels of travel".
 *   data-speed-x="1.5" horizontal drift, same scale. this is the sideways
 *                      (x-axis) parallax used by the tickers and word walls.
 *   data-rotate="8"    degrees of rotation across the same travel.
 *   data-zoom="0.12"   extra scale at the extremes of the travel.
 *   data-mouse="24"    pixels of pointer-follow depth (needs `pointer`).
 *
 * All layers are written in a single rAF pass, and the pointer offset is
 * eased so the motion never feels sticky.
 */
export function useParallax({ pointer = false } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = Array.from(
      root.querySelectorAll(
        "[data-speed], [data-speed-x], [data-rotate], [data-zoom], [data-mouse]",
      ),
    );
    if (layers.length === 0) return;

    // progress: +1 when the section sits below the viewport, 0 when centred,
    // -1 once it has travelled past the top.
    let progress = 0;
    let visible = true;
    // pointer target vs. eased current value, both in -0.5..0.5
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf = 0;
    let dirty = true;

    const measure = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      visible = rect.bottom > -240 && rect.top < vh + 240;
      if (!visible) return;

      const centre = rect.top + rect.height / 2;
      const span = vh / 2 + rect.height / 2;
      progress = Math.max(-1, Math.min(1, (centre - vh / 2) / span));
    };

    const render = () => {
      for (const el of layers) {
        const { speed, speedX, rotate, zoom, mouse } = el.dataset;

        const ty = progress * (parseFloat(speed) || 0) * -100;
        const tx = progress * (parseFloat(speedX) || 0) * -100;
        const deg = progress * (parseFloat(rotate) || 0) * -1;
        const scale = 1 + Math.abs(progress) * (parseFloat(zoom) || 0);

        const depth = parseFloat(mouse) || 0;
        const mxOffset = currentX * depth;
        const myOffset = currentY * depth * 0.6;

        el.style.transform =
          `translate3d(${(tx + mxOffset).toFixed(2)}px, ${(ty + myOffset).toFixed(2)}px, 0)` +
          ` rotate(${deg.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
      }
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (visible) render();

      const settling =
        Math.abs(targetX - currentX) > 0.0005 ||
        Math.abs(targetY - currentY) > 0.0005;

      if (settling || dirty) {
        dirty = false;
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const wake = () => {
      dirty = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      measure();
      wake();
    };

    const onPointerMove = (event) => {
      targetX = event.clientX / window.innerWidth - 0.5;
      targetY = event.clientY / window.innerHeight - 0.5;
      wake();
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      wake();
    };

    measure();
    wake();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    if (pointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      if (raf) cancelAnimationFrame(raf);
      for (const el of layers) el.style.transform = "";
    };
  }, [pointer]);

  return ref;
}
