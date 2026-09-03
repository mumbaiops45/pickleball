"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/**
 * Eased page scrolling + parallax, GSAP's ScrollSmoother.
 *
 * The layout renders `#smooth-wrapper > #smooth-content` around the main
 * content and footer — those must stay plain, natural-height divs (no flex
 * sizing), because ScrollSmoother pins the wrapper and transforms the content.
 * Fixed chrome — navbar, cart drawer, modals, floating actions, cursor — is
 * rendered OUTSIDE `#smooth-content`, or a transformed ancestor demotes its
 * `position: fixed` to `absolute`.
 *
 * Parallax is namespaced: `effectsPrefix: "sm-"` means ScrollSmoother only
 * reads `data-sm-speed` / `data-sm-lag`, so it never collides with the older
 * `useParallax` (`data-speed`) still running on the About page. Under
 * `prefers-reduced-motion` it does not run and the page scrolls natively.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Desktop only. On touch devices smooth scroll disconnects from the finger
    // and can fight the mobile address bar, so phones and tablets scroll
    // natively — the `#smooth-wrapper`/`#smooth-content` divs are left untouched
    // and `data-sm-speed` parallax simply does not run there.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    // The browser restores the previous scroll position on reload, which lands
    // the page part-way down before ScrollSmoother has synced — take that over.
    const priorRestoration = history.scrollRestoration;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      smoothTouch: false,
      effects: true,
      effectsPrefix: "sm-",
      normalizeScroll: false,
    });

    // unless the URL points at an anchor, start at the very top — and again on
    // the next frame, after ScrollSmoother has measured and ScrollTrigger has
    // had a chance to restore a remembered position
    ScrollTrigger.clearScrollMemory("manual");
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      smoother.scrollTop(0);
      requestAnimationFrame(() => {
        if (!window.location.hash) {
          window.scrollTo(0, 0);
          smoother.scrollTop(0);
        }
      });
    }

    // same-page hash links (footer "FAQs", "back to top") — ease to the target
    // rather than let the browser hard-jump against the content transform
    const onHashClick = (event) => {
      const link = event.target.closest?.('a[href*="#"]');
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.querySelector(url.hash);
      if (!target) return;
      event.preventDefault();
      smoother.scrollTo(target, true, "top 90px");
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onHashClick);

    return () => {
      document.removeEventListener("click", onHashClick);
      if ("scrollRestoration" in history) {
        history.scrollRestoration = priorRestoration || "auto";
      }
      smoother.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // a client navigation swaps the content without a reload: jump the smoother
  // back to the top and recalculate ScrollTrigger's start/end positions
  useEffect(() => {
    if (window.location.hash) return;
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTop(0);
    } else {
      window.scrollTo(0, 0);
    }
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
