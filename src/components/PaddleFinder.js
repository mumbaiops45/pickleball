"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
import ProductArt, { ART_MINI } from "@/components/art/ProductArt";
import {
  ArrowIcon,
  CheckIcon,
  ChevronDownIcon,
  RepeatIcon,
  StarIcon,
} from "@/components/ui/Icons";
import {
  finderQuestions,
  findProduct,
  products,
  recommendPaddle,
} from "@/lib/data";
import { useCart } from "@/store/CartProvider";
import { formatPrice } from "@/lib/format";
import { Accent } from "@/components/ui/Heading";

const TOTAL = finderQuestions.length;
/** One screen of scroll per question, plus one for the recommendation. */
const STAGES = TOTAL + 1;
const pad = (n) => String(n).padStart(2, "0");

const at = (ms) => ({ "--step-delay": `${ms}ms` });

function OptionRow({ option, index, onChoose }) {
  return (
    <button
      type="button"
      onClick={() => onChoose(option.value)}
      style={at(260 + index * 100)}
      className="finder-row step-item group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/3 px-5 py-4 text-left transition-colors duration-300 hover:border-volt/50 hover:bg-volt/5"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 font-mono text-[11px] text-white/50 transition-colors duration-300 group-hover:border-volt/40 group-hover:text-volt">
        {index + 1}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-medium tracking-tight text-white">
          {option.label}
        </span>
        <span className="mt-0.5 block text-[13px] text-white/45">
          {option.hint}
        </span>
      </span>

      <ArrowIcon className="size-4 shrink-0 text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-volt" />
    </button>
  );
}

export default function PaddleFinder({ catalogue }) {
  const { addItem } = useCart();
  const trackRef = useRef(null);
  // mirrors `step` for the scroll listener, which must not re-subscribe per step
  const stageRef = useRef(0);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  // a settled question reopened for a change, by index
  const [editing, setEditing] = useState(null);
  const [added, setAdded] = useState(false);
  // true once the section is playing as a pinned, scroll-driven sequence
  const [pinned, setPinned] = useState(false);

  const done = step >= TOTAL;
  const answeredCount = finderQuestions.filter((q) => answers[q.id]).length;
  const complete = answeredCount === TOTAL;
  const firstPending = finderQuestions.findIndex((entry) => !answers[entry.id]);

  // the one question showing its options — the step the scroll has reached, or
  // whichever settled question was reopened
  const activeIndex = editing !== null ? editing : done ? -1 : step;
  const activeQuestion = activeIndex >= 0 ? finderQuestions[activeIndex] : null;

  /* Resolved against the catalogue the page loaded rather than data.js: this
     file describes paddles the store does not necessarily stock, and one with
     no row behind it cannot be added to a cart. `recommendPaddle` answers with
     a preference list, so the finder falls to the closest stocked paddle. The
     data.js fallbacks keep it working when the API is down and the page is
     rendering from the local catalogue. */
  const paddles = useMemo(() => {
    const pool = catalogue?.length ? catalogue : products;
    return pool.filter((item) => item.category === "Paddles");
  }, [catalogue]);

  /* There is always a paddle to show: with every answer in it is a personal
     match, with none it is the house pick. Scrolling the sequence through
     without answering still has to end on a real product, not a dead end. */
  const ranked = recommendPaddle(answers);
  const match =
    ranked.map((id) => paddles.find((item) => item.id === id)).find(Boolean) ??
    paddles[0] ??
    findProduct(ranked[0]);

  /* ------------------------------------------------------------- pinned mode */

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setPinned(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /* Scroll position is the source of truth for how far the sequence has run
     while pinned: each stage owns an equal slice of the track's travel. */
  useEffect(() => {
    if (!pinned) return;
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const travel = track.offsetHeight - window.innerHeight;
      if (travel <= 0) return;

      const scrolled = -track.getBoundingClientRect().top;
      const progress = Math.min(Math.max(scrolled / travel, 0), 1);
      const stage = Math.min(Math.floor(progress * STAGES), STAGES - 1);

      if (stage === stageRef.current) return;
      stageRef.current = stage;
      setStep(stage);
      setEditing(null);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pinned]);

  /** Moves to a stage — by scrolling to it when pinned, directly otherwise. */
  const goTo = (index) => {
    const track = trackRef.current;
    const travel = track ? track.offsetHeight - window.innerHeight : 0;

    if (!pinned || travel <= 0) {
      stageRef.current = index;
      setStep(index);
      setEditing(null);
      return;
    }

    // land in the middle of the stage's slice, clear of both boundaries
    const offset = (travel * (index + 0.5)) / STAGES;
    window.scrollTo({
      top: window.scrollY + track.getBoundingClientRect().top + offset,
      behavior: "smooth",
    });
  };

  const choose = (value) => {
    if (!activeQuestion) return;

    const next = { ...answers, [activeQuestion.id]: value };
    setAnswers(next);

    // a reopened question settles in place — the sequence has already moved on
    if (editing !== null) {
      setEditing(null);
      return;
    }

    const pending = finderQuestions.findIndex((entry) => !next[entry.id]);
    goTo(pending === -1 ? TOTAL : Math.min(step + 1, TOTAL));
  };

  const restart = () => {
    setAnswers({});
    setAdded(false);
    goTo(0);
  };

  useEffect(() => {
    if (!activeQuestion) return;

    const onKey = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.target?.closest?.("input, textarea, select")) return;

      const index = Number(event.key) - 1;
      const option = activeQuestion.options[index];
      if (option) {
        event.preventDefault();
        choose(option.value);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const alternates = useMemo(() => {
    if (!match) return [];
    return paddles
      .filter((item) => item.id !== match.id)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 2);
  }, [match, paddles]);

  const addPayload = match
    ? {
        productId: match.id,
        colorway: match.colorways[0]?.name,
        option: match.options[0],
        quantity: 1,
      }
    : null;

  const onAdd = () => {
    if (!addPayload) return;
    addItem(addPayload);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section
      ref={trackRef}
      id="finder"
      style={{ "--finder-stages": STAGES }}
      className="finder-track relative bg-forest"
    >
      <ParallaxScene
        as="div"
        className="finder-stage relative isolate w-full overflow-hidden bg-linear-to-b from-forest via-forest-soft to-forest py-16 text-white lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:items-center lg:pb-0 lg:pt-28"
      >
        <div
          data-speed="-1.2"
          data-speed-x="0.8"
          className="pointer-events-none absolute -left-32 top-[-10%] -z-10 size-125 rounded-full bg-volt/10 blur-[150px]"
        />
        <div
          data-speed="1.4"
          className="pointer-events-none absolute -right-24 bottom-[-20%] -z-10 size-100 rounded-full bg-clay/8 blur-[130px]"
        />

        <div className="mx-auto grid w-full max-w-350 grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
          {/* ---------------------------------------------------------- pitch */}
          <Reveal>
            <span className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-volt">
              <span className="h-px w-8 bg-volt/40" />
              Paddle finder
            </span>

            <h2 className="mt-5 text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              Three questions. One paddle that <Accent dark>fits</Accent>.
            </h2>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/50">
              Answer the way you actually play and we point at the paddle our
              fitters would hand you across the counter — then you have 30 days
              on court to disagree with us.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[13px] text-white/45">
              <span className="flex items-center gap-2">
                <CheckIcon className="size-3.5 text-volt" />
                30-day play test
              </span>
              <span className="flex items-center gap-2">
                <CheckIcon className="size-3.5 text-volt" />
                AIPA approved
              </span>
              <span className="flex items-center gap-2">
                <CheckIcon className="size-3.5 text-volt" />
                Free returns
              </span>
            </div>

            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
              {answeredCount} of {TOTAL} answered
            </p>
          </Reveal>

          {/* ---------------------------------------------------------- panel */}
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/3">
              {/* progress: one segment per question, filled as they are answered */}
              <div className="flex gap-1 px-7 pt-7 sm:px-9" aria-hidden="true">
                {finderQuestions.map((entry, index) => (
                  <span
                    key={entry.id}
                    className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
                      answers[entry.id]
                        ? "bg-volt"
                        : index === activeIndex
                          ? "bg-volt/35"
                          : "bg-white/10"
                    }`}
                  />
                ))}
              </div>

              {/* Every question the sequence has reached stays on the panel: the
                  one in play shows its options, the ones behind it collapse to
                  their answer and reopen on click. */}
              {finderQuestions.map((entry, index) => {
                if (index > step) return null;

                const chosen = entry.options.find(
                  (option) => option.value === answers[entry.id],
                );
                const open = index === activeIndex;

                return (
                  <div
                    key={entry.id}
                    style={at(0)}
                    className="step-item border-b border-white/10"
                  >
                    {open ? (
                      <div key={`${entry.id}-open`} className="finder-pad p-7 sm:p-9">
                        <p
                          style={at(0)}
                          className="step-item font-mono text-[11px] uppercase tracking-[0.22em] text-volt"
                        >
                          Question {pad(index + 1)}
                          <span className="text-white/30"> / {pad(TOTAL)}</span>
                        </p>

                        <h3
                          style={at(90)}
                          className="step-item mt-5 text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold leading-tight tracking-[-0.03em] text-white"
                        >
                          {entry.label}
                        </h3>
                        <p
                          style={at(170)}
                          className="step-item mt-2.5 max-w-md text-[13px] leading-relaxed text-white/45"
                        >
                          {entry.help}
                        </p>

                        <div className="mt-6 flex flex-col gap-2.5">
                          {entry.options.map((option, optionIndex) => (
                            <OptionRow
                              key={option.value}
                              option={option}
                              index={optionIndex}
                              onChoose={choose}
                            />
                          ))}
                        </div>

                        <p
                          style={at(260 + entry.options.length * 100)}
                          className="finder-optional step-item mt-5 hidden items-center gap-2 text-[12px] text-white/35 sm:flex"
                        >
                          Or press
                          <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[11px] text-white/70">
                            1
                          </kbd>
                          –
                          <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[11px] text-white/70">
                            {entry.options.length}
                          </kbd>
                          to answer.
                        </p>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEditing(index)}
                        className="finder-row group flex w-full items-center gap-5 px-7 py-4 text-left transition-colors duration-300 hover:bg-white/3 sm:px-9"
                      >
                        <span className="font-mono text-[11px] tracking-[0.16em] text-white/30">
                          {pad(index + 1)}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] text-white/45">
                            {entry.label}
                          </span>
                          <span
                            className={`mt-0.5 block truncate text-sm ${
                              chosen ? "text-white" : "text-white/35"
                            }`}
                          >
                            {chosen ? chosen.label : "Not answered yet"}
                          </span>
                        </span>

                        {chosen ? (
                          <CheckIcon className="size-4 shrink-0 text-volt" />
                        ) : null}
                        <span className="shrink-0 text-[11px] uppercase tracking-[0.16em] text-white/25 transition-colors duration-300 group-hover:text-volt">
                          Change
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}

              {/* ------------------------------------------------ the result */}
              {done ? (
                <div key="result" className="finder-pad p-7 sm:p-9">
                  <div
                    style={at(0)}
                    className="step-item flex items-center justify-between gap-4"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-volt">
                      {complete ? "Your match" : "Most popular pick"}
                    </p>
                    {answeredCount > 0 ? (
                      <button
                        type="button"
                        onClick={restart}
                        className="group inline-flex items-center gap-2 text-[13px] text-white/45 transition-colors duration-300 hover:text-white"
                      >
                        <RepeatIcon className="size-3.5 transition-transform duration-500 group-hover:-rotate-180" />
                        Start over
                      </button>
                    ) : null}
                  </div>

                  {!complete ? (
                    <button
                      type="button"
                      onClick={() => setEditing(Math.max(firstPending, 0))}
                      style={at(60)}
                      className="step-item mt-3 flex items-center gap-2 text-[13px] text-white/45 transition-colors duration-300 hover:text-volt"
                    >
                      Answer question {pad(Math.max(firstPending, 0) + 1)} for a
                      paddle picked around your game
                      <ArrowIcon className="size-3.5" />
                    </button>
                  ) : null}

                  <div
                    style={at(120)}
                    className="step-item mt-6 flex flex-col gap-6 sm:flex-row sm:items-center"
                  >
                    <div className="finder-art relative h-40 w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:w-36">
                      {/* inset rather than padding on the box itself: a filled
                          image lays out against the padding box, so padding
                          there would not hold it off the edges */}
                      <div className="absolute inset-x-4 inset-y-5">
                        <ProductArt
                          product={match}
                          fill
                          sizes="(max-width: 640px) 60vw, 144px"
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      {match.badge ? (
                        <span className="mb-2.5 inline-block rounded-full bg-volt px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                          {match.badge}
                        </span>
                      ) : null}
                      <h3 className="text-[22px] font-semibold tracking-tight text-white">
                        {match.name}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-white/50">
                        {match.blurb}
                      </p>

                      <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-xl font-semibold text-white">
                          {formatPrice(match.price)}
                        </span>
                        {match.compareAt ? (
                          <span className="text-sm text-white/35 line-through">
                            {formatPrice(match.compareAt)}
                          </span>
                        ) : null}
                        <span className="flex items-center gap-1.5 text-[13px] text-white/50">
                          <StarIcon className="size-3 text-volt" />
                          {match.rating} ·{" "}
                          {match.reviews.toLocaleString("en-IN")} reviews
                        </span>
                      </div>

                      <ul className="finder-optional mt-4 flex flex-col gap-2">
                        {match.highlights.slice(0, 2).map((highlight) => (
                          <li
                            key={highlight}
                            className="flex gap-2.5 text-[13px] leading-relaxed text-white/55"
                          >
                            <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-volt" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    style={at(280)}
                    className="step-item mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
                  >
                    <button
                      type="button"
                      onClick={onAdd}
                      className="finder-cta inline-flex h-11 items-center justify-center gap-2 rounded-full bg-volt px-6 text-[13px] font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      {added ? (
                        <>
                          <CheckIcon className="size-4" />
                          Added to cart
                        </>
                      ) : (
                        `Add to cart · ${formatPrice(match.price)}`
                      )}
                    </button>
                    <Link
                      href={`/products/${match.id}`}
                      className="finder-cta inline-flex h-11 items-center justify-center rounded-full border border-white/20 px-6 text-[13px] font-medium text-white transition-colors hover:border-volt hover:text-volt"
                    >
                      See details
                    </Link>
                  </div>

                  {complete && alternates.length > 0 ? (
                    <div
                      style={at(380)}
                      className="finder-optional step-item mt-7 border-t border-white/10 pt-5"
                    >
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
                        Close seconds
                      </p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {alternates.map((item) => (
                          <Link
                            key={item.id}
                            href={`/products/${item.id}`}
                            className="group flex items-center gap-3 rounded-2xl border border-white/10 p-3 transition-colors duration-300 hover:border-volt/40 hover:bg-white/3"
                          >
                            <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-white/5">
                              <ProductArt
                                product={item}
                                className={`${ART_MINI[item.art.kind]} w-auto`}
                                sizes="44px"
                              />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[13px] font-medium tracking-tight text-white/85 transition-colors duration-300 group-hover:text-volt">
                                {item.name}
                              </span>
                              <span className="block text-[12px] text-white/40">
                                {formatPrice(item.price)}
                              </span>
                            </span>
                            <ArrowIcon className="size-3.5 shrink-0 text-white/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-volt" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            {/* the pinned sequence needs to say so, or the page reads as stuck */}
            {pinned && !done ? (
              <p className="mt-6 hidden items-center justify-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/30 lg:flex">
                Keep scrolling
                <ChevronDownIcon className="scroll-hint size-3.5" />
              </p>
            ) : null}
          </Reveal>
        </div>
      </ParallaxScene>
    </section>
  );
}
