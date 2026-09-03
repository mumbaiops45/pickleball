import Image from "next/image";

import mark from "../../../public/logo/logo-mark.png";

/**
 * The first-load intro.
 *
 * The brand's pickleball spins up on a light panel that then lifts off the top
 * of the screen to reveal the page. Pure CSS: the panel and the ball each run a
 * one-shot keyframe ending in a finished (off-screen / invisible) state, so it
 * clears itself with or without JS, and it is removed entirely under
 * `prefers-reduced-motion`. It sits in the root layout — which persists across
 * client-side navigation — so it plays once per full page load.
 */
export default function LoadIntro() {
  return (
    <div className="load-intro" aria-hidden="true">
      <div className="load-intro__ball">
        <Image
          src={mark}
          alt=""
          priority
          sizes="220px"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
