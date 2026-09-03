"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Types a phrase, holds it, erases it, moves to the next — on a loop.
 *
 * Server and first client paint both render `words[0]` in full, so there is no
 * hydration mismatch. An invisible sizer holding the *longest* phrase reserves
 * the box, and the animating text is laid over it absolutely — so the line
 * never changes height as the text types and erases, and the page below it
 * never moves. Under `prefers-reduced-motion` it stays on `words[0]`.
 */
export default function Typewriter({
  words,
  className = "",
  typeSpeed = 70,
  eraseSpeed = 38,
  holdTime = 1700,
  gapTime = 420,
}) {
  const list = useMemo(
    () => (Array.isArray(words) && words.length ? words : [""]),
    [words],
  );
  const longest = useMemo(
    () => list.reduce((a, b) => (b.length >= a.length ? b : a), ""),
    [list],
  );

  const [index, setIndex] = useState(0);
  const [text, setText] = useState(list[0]);
  // "waiting" = fully typed and paused; "erasing"; "typing"
  const [phase, setPhase] = useState("waiting");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || list.length < 2) return;

    let timer;
    if (phase === "waiting") {
      timer = setTimeout(() => setPhase("erasing"), holdTime);
    } else if (phase === "erasing") {
      if (text.length > 0) {
        timer = setTimeout(
          () => setText(list[index].slice(0, text.length - 1)),
          eraseSpeed,
        );
      } else {
        timer = setTimeout(() => {
          setIndex((current) => (current + 1) % list.length);
          setPhase("typing");
        }, gapTime);
      }
    } else if (phase === "typing") {
      const target = list[index];
      if (text.length < target.length) {
        timer = setTimeout(
          () => setText(target.slice(0, text.length + 1)),
          typeSpeed,
        );
      } else {
        timer = setTimeout(() => setPhase("erasing"), holdTime);
      }
    }

    return () => clearTimeout(timer);
  }, [
    text,
    phase,
    index,
    reduced,
    list,
    typeSpeed,
    eraseSpeed,
    holdTime,
    gapTime,
  ]);

  return (
    <span className={`relative inline-block max-w-full align-top ${className}`}>
      {/* invisible sizer — reserves the box for the longest phrase (at whatever
          number of lines it wraps to at this width) so nothing below shifts */}
      <span aria-hidden="true" className="invisible">
        {longest}
        <span className="ml-1 inline-block w-2" />
      </span>

      {/* the visible, animating text, laid over the sizer at the same width */}
      <span className="absolute inset-x-0 top-0">
        {text}
        <span
          aria-hidden="true"
          className="typewriter-caret ml-1 inline-block h-[0.95em] w-2 translate-y-[0.12em] bg-current"
        />
      </span>
    </span>
  );
}
