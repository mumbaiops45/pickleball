"use client";

import { useEffect, useRef } from "react";

/**
 * A trailing ring + dot that replaces the pointer on fine-pointer devices.
 *
 * Zero React re-renders: the position is written to the nodes in a rAF loop and
 * the interaction mode is a data attribute toggled on pointermove. Runs only
 * where `(pointer: fine)` matches and `prefers-reduced-motion` does not — on a
 * touch device or with motion reduced the native cursor is left completely
 * alone. `data-cursor` on any element overrides the mode:
 *   media  → ring swells into a filled "View" disc
 *   native → the custom cursor hides and the OS cursor returns
 */
export default function CustomCursor() {
  const layerRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const layer = layerRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!layer || !dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const modeFor = (target) => {
      const el =
        target instanceof Element
          ? target.closest(
              "[data-cursor], a, button, label, input, textarea, select",
            )
          : null;
      if (!el) return "default";
      const declared = el.getAttribute("data-cursor");
      if (declared) return declared;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)) return "native";
      return "link";
    };

    const onMove = (event) => {
      mx = event.clientX;
      my = event.clientY;
      layer.classList.add("is-active");
      layer.dataset.mode = modeFor(event.target);
    };
    const onLeave = () => layer.classList.remove("is-active");
    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div ref={layerRef} aria-hidden="true" className="cursor-layer" data-mode="default">
      <span ref={ringRef} className="cursor-ring">
        <span className="cursor-ring-label">View</span>
      </span>
      <span ref={dotRef} className="cursor-dot" />
    </div>
  );
}
