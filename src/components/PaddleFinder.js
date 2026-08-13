"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
import ProductArt from "@/components/art/ProductArt";
import { ArrowIcon, RepeatIcon, StarIcon } from "@/components/ui/Icons";
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
const pad = (n) => String(n).padStart(2, "0");

/**
 * One answerable option. Number key, label, hint — the whole tile is the target
 * and fills volt on hover so the choice reads as a physical button press.
 */
function OptionTile({ option, index, onChoose }) {
  return (
    <button
      type="button"
      onClick={() => onChoose(option.value)}
      className="group flex items-center gap-4 rounded-2xl border border-paper/15 bg-paper/4 px-4 py-4 text-left transition-all duration-400 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5 hover:border-volt hover:bg-volt hover:text-ink focus-visible:outline-volt"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-paper/20 font-mono text-xs text-paper/70 transition-colors duration-300 group-hover:border-transparent group-hover:bg-ink group-hover:text-volt">
        {index + 1}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-medium">{option.label}</span>
        <span className="mt-0.5 block text-xs text-paper/55 transition-colors duration-300 group-hover:text-ink/70">
          {option.hint}
        </span>
      </span>
      <ArrowIcon className="size-4 shrink-0 text-paper/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink" />
    </button>
  );
}

export default function PaddleFinder() {
  const { addItem } = useCart();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [added, setAdded] = useState(false);

  const done = step >= TOTAL;
  const question = finderQuestions[step];
  const match = done ? findProduct(recommendPaddle(answers)) : null;

  const answeredCount = finderQuestions.filter((q) => answers[q.id]).length;

  /**
   * Answering jumps to the next *unanswered* question rather than the next one
   * in sequence — so revising an early answer drops you straight back on the
   * result instead of walking the whole quiz again.
   */
  const choose = (value) => {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    const pending = finderQuestions.findIndex((entry) => !next[entry.id]);
    setStep(pending === -1 ? TOTAL : pending);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setAdded(false);
  };

  // number keys pick an option, so the whole quiz is playable without a mouse
  useEffect(() => {
    if (done) return;

    const onKey = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.target?.closest?.("input, textarea, select")) return;

      const index = Number(event.key) - 1;
      const option = question.options[index];
      if (option) {
        event.preventDefault();
        choose(option.value);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // the hints double as a plain-language explanation of why we landed here
  const reasons = useMemo(
    () =>
      finderQuestions
        .map(
          (entry) =>
            entry.options.find((option) => option.value === answers[entry.id])
              ?.hint,
        )
        .filter(Boolean),
    [answers],
  );

  const alternates = useMemo(() => {
    if (!match) return [];
    return products
      .filter((item) => item.category === "Paddles" && item.id !== match.id)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 2);
  }, [match]);

  /**
   * Built at render rather than inside the click handler on purpose: the React
   * compiler hoists a callback's property reads into its memo-cache comparison,
   * which runs every render — so `match.colorways` inside the handler would be
   * dereferenced while `match` is still null, mid-quiz.
   */
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
    <ParallaxScene
      as="section"
      id="finder"
      pointer
      className="grain relative isolate w-full overflow-hidden bg-ink py-16 text-paper lg:py-28"
    >
      <div
        data-speed="-1.2"
        data-speed-x="0.8"
        className="pointer-events-none absolute -left-32 top-[-10%] -z-10 size-120 rounded-full bg-volt/18 blur-[140px]"
      />
      <div
        data-speed="1.4"
        className="pointer-events-none absolute -right-24 bottom-[-20%] -z-10 size-100 rounded-full bg-volt/10 blur-[130px]"
      />

      <div className="mx-auto grid w-full max-w-350 grid-cols-1 items-start gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* ------------------------------------------------------- the pitch */}
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-volt/30 bg-volt/10 py-1.5 pl-2 pr-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-volt">
            <span className="rounded-full bg-volt px-2.5 py-0.5 text-ink">
              {TOTAL}
            </span>
            Paddle finder
          </span>

          <h2 className="mt-6 text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Three questions.
            <br />
            One paddle that <Accent dark>fits</Accent>.
          </h2>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-paper/60">
            No quiz-funnel nonsense. Answer honestly and we point at the paddle
            our fitters would hand you across the counter — then you have 30 days
            on court to disagree with us.
          </p>

          {/* the rail doubles as navigation: every answered step is clickable */}
          <ol className="mt-10 max-w-md">
            {finderQuestions.map((entry, index) => {
              const answer = answers[entry.id];
              const current = !done && index === step;
              const chosen = entry.options.find(
                (option) => option.value === answer,
              );
              const reachable = Boolean(answer) || index <= step;

              return (
                <li key={entry.id} className="border-t border-paper/12">
                  <button
                    type="button"
                    disabled={!reachable}
                    onClick={() => setStep(index)}
                    aria-current={current ? "step" : undefined}
                    className="group flex w-full items-center gap-4 py-4 text-left transition-opacity duration-300 disabled:cursor-default disabled:opacity-40 focus-visible:outline-volt"
                  >
                    <span
                      className={`font-mono text-[11px] tracking-[0.16em] transition-colors duration-300 ${
                        current
                          ? "text-volt"
                          : answer
                            ? "text-paper/55"
                            : "text-paper/30"
                      }`}
                    >
                      {pad(index + 1)}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block truncate text-sm transition-colors duration-300 ${
                          current || answer
                            ? "text-paper group-hover:text-volt"
                            : "text-paper/40"
                        }`}
                      >
                        {entry.label}
                      </span>
                      {chosen ? (
                        <span className="mt-0.5 block truncate text-xs text-volt">
                          {chosen.label}
                        </span>
                      ) : null}
                    </span>

                    {current ? (
                      <span className="size-1.5 shrink-0 rounded-full bg-volt" />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ol>
        </Reveal>

        {/* -------------------------------------------------------- the panel */}
        <Reveal delay={120} variant="right">
          <div className="relative overflow-hidden rounded-[28px] border border-paper/12 bg-paper/5 p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,.7)] backdrop-blur-sm sm:p-9">
            {/* progress hairline across the top edge of the card */}
            <span
              className="absolute inset-x-0 top-0 h-0.5 bg-paper/10"
              aria-hidden="true"
            >
              <span
                className="block h-full bg-volt transition-[width] duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                style={{ width: `${(answeredCount / TOTAL) * 100}%` }}
              />
            </span>

            {done && match ? (
              <div key="result" className="step-in">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-volt">
                    Your match
                  </p>
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center gap-2 text-xs text-paper/50 transition-colors hover:text-volt focus-visible:outline-volt"
                  >
                    <RepeatIcon className="size-3.5" />
                    Start over
                  </button>
                </div>

                <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
                  {/* product shots are lit for a light background, so the plate
                      stays paper even on the dark panel */}
                  <div className="relative grid h-44 w-full shrink-0 place-items-center overflow-hidden rounded-3xl bg-paper sm:w-40">
                    <span className="absolute inset-x-6 top-6 h-24 rounded-full bg-volt/25 blur-2xl" />
                    <ProductArt
                      product={match}
                      className="relative h-36 w-auto"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {match.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-paper/60">{match.blurb}</p>
                    <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-xl font-semibold">
                        {formatPrice(match.price)}
                      </span>
                      {match.compareAt ? (
                        <span className="text-sm text-paper/40 line-through">
                          {formatPrice(match.compareAt)}
                        </span>
                      ) : null}
                      <span className="flex items-center gap-1 text-xs text-paper/60">
                        <StarIcon className="size-3 text-volt" />
                        {match.rating} ·{" "}
                        {match.reviews.toLocaleString("en-IN")} reviews
                      </span>
                    </p>
                  </div>
                </div>

                {reasons.length ? (
                  <div className="mt-7">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-paper/45">
                      Because you said
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {reasons.map((reason) => (
                        <span
                          key={reason}
                          className="rounded-full border border-volt/30 bg-volt/10 px-3 py-1.5 text-[11px] font-medium tracking-wide text-volt"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <ul className="mt-7 flex flex-col gap-2.5 border-t border-paper/12 pt-6">
                  {match.highlights.slice(0, 3).map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm text-paper/65"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={onAdd}
                    className="inline-flex h-13 flex-1 items-center justify-center gap-2.5 rounded-full bg-volt text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-volt"
                  >
                    {added
                      ? "Added to cart"
                      : `Add to cart · ${formatPrice(match.price)}`}
                  </button>
                  <Link
                    href={`/products/${match.id}`}
                    className="inline-flex h-13 items-center justify-center rounded-full border border-paper/25 px-6 text-sm font-medium text-paper transition-colors hover:border-volt hover:text-volt focus-visible:outline-volt"
                  >
                    See details
                  </Link>
                </div>

                {alternates.length ? (
                  <div className="mt-8 border-t border-paper/12 pt-6">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-paper/45">
                      Close seconds
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {alternates.map((item) => (
                        <Link
                          key={item.id}
                          href={`/products/${item.id}`}
                          className="group flex items-center gap-3 rounded-2xl border border-paper/12 p-2.5 transition-colors hover:border-volt/50 focus-visible:outline-volt"
                        >
                          <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-paper">
                            <ProductArt product={item} className="h-10 w-auto" />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-[13px] font-medium transition-colors group-hover:text-volt">
                              {item.name}
                            </span>
                            <span className="block text-[11px] text-paper/50">
                              {formatPrice(item.price)}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div key={step} className="step-in">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[11px] tracking-[0.22em] text-volt">
                    {pad(step + 1)}
                    <span className="text-paper/35"> / {pad(TOTAL)}</span>
                  </p>
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="text-xs text-paper/50 transition-colors hover:text-volt focus-visible:outline-volt"
                    >
                      Back
                    </button>
                  ) : null}
                </div>

                <h3 className="mt-5 text-[clamp(1.45rem,2.4vw,1.95rem)] font-semibold leading-tight tracking-tight">
                  {question.label}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-paper/55">
                  {question.help}
                </p>

                <div className="mt-8 flex flex-col gap-3">
                  {question.options.map((option, index) => (
                    <OptionTile
                      key={option.value}
                      option={option}
                      index={index}
                      onChoose={choose}
                    />
                  ))}
                </div>

                <p className="mt-6 text-[11px] text-paper/35">
                  Tip — press{" "}
                  <span className="font-mono text-paper/60">1</span> to{" "}
                  <span className="font-mono text-paper/60">
                    {question.options.length}
                  </span>{" "}
                  to answer without reaching for the mouse.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </ParallaxScene>
  );
}
