"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
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
 * Premium Option Tile - Redesigned with better visual hierarchy
 */
function OptionTile({ option, index, onChoose }) {
  return (
    <button
      type="button"
      onClick={() => onChoose(option.value)}
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5 hover:border-volt/40 hover:bg-volt/5 hover:shadow-[0_8px_30px_rgba(212,255,63,0.06)] focus-visible:outline-volt"
    >
      {/* Hover gradient effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-volt/0 via-volt/5 to-volt/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/5 font-mono text-xs font-semibold text-white/60 transition-all duration-300 group-hover:border-volt/30 group-hover:bg-volt/10 group-hover:text-volt">
        {index + 1}
      </span>
      
      <span className="relative z-10 min-w-0 flex-1">
        <span className="block text-[15px] font-medium text-white/90 transition-colors duration-300 group-hover:text-white">
          {option.label}
        </span>
        <span className="mt-0.5 block text-xs text-white/40 transition-colors duration-300 group-hover:text-white/60">
          {option.hint}
        </span>
      </span>
      
      <ArrowIcon className="relative z-10 size-4 shrink-0 text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-volt" />
    </button>
  );
}

export default function PaddleFinder() {
  const { addItem } = useCart();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const done = step >= TOTAL;
  const question = finderQuestions[step];
  const match = done ? findProduct(recommendPaddle(answers)) : null;

  const answeredCount = finderQuestions.filter((q) => answers[q.id]).length;

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
      className="relative isolate w-full overflow-hidden bg-gradient-to-b from-[#0a0c0e] via-[#0d0f13] to-[#0a0c0e] py-16 text-white lg:py-28"
    >
      {/* =====================================================
          PREMIUM BACKGROUND EFFECTS
      ====================================================== */}

      {/* Main glow - volt */}
      <div
        data-speed="-1.2"
        data-speed-x="0.8"
        className="pointer-events-none absolute -left-32 top-[-10%] -z-10 size-[500px] rounded-full bg-volt/10 blur-[150px]"
      />
      
      {/* Secondary glow - clay */}
      <div
        data-speed="1.4"
        className="pointer-events-none absolute -right-24 bottom-[-20%] -z-10 size-[400px] rounded-full bg-clay/8 blur-[130px]"
      />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient overlay at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0c0e] to-transparent" />

      <div className="mx-auto grid w-full max-w-350 grid-cols-1 items-start gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        
        {/* =====================================================
            LEFT - PREMIUM PITCH
        ====================================================== */}
        
        <Reveal>
          {/* Premium badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-volt/30 bg-volt/10 py-1.5 pl-2 pr-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-volt backdrop-blur-sm">
            <span className="rounded-full bg-volt px-2.5 py-0.5 text-[9px] text-ink font-bold">
              {TOTAL}
            </span>
            Paddle finder
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt/60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-volt" />
            </span>
          </div>

          <h2 className="mt-6 text-[clamp(2.1rem,4.6vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.035em]">
            Three questions.
            <br />
            One paddle that <Accent dark>fits</Accent>.
          </h2>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/50">
            No quiz-funnel nonsense. Answer honestly and we point at the paddle
            our fitters would hand you across the counter — then you have 30 days
            on court to disagree with us.
          </p>

          {/* Trust indicators */}
          <div className="mt-6 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <svg className="size-4 text-volt" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-white/40">30-day play test</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <svg className="size-4 text-volt" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-white/40">AIPA approved</span>
            </div>
          </div>

          {/* Step navigation - premium */}
          <ol className="mt-10 max-w-md space-y-1">
            {finderQuestions.map((entry, index) => {
              const answer = answers[entry.id];
              const current = !done && index === step;
              const chosen = entry.options.find(
                (option) => option.value === answer,
              );
              const reachable = Boolean(answer) || index <= step;

              return (
                <li key={entry.id}>
                  <button
                    type="button"
                    disabled={!reachable}
                    onClick={() => setStep(index)}
                    aria-current={current ? "step" : undefined}
                    className={`group flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all duration-300 disabled:cursor-default disabled:opacity-30 focus-visible:outline-volt ${
                      current 
                        ? "bg-white/5" 
                        : "hover:bg-white/3"
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] font-semibold tracking-[0.16em] transition-colors duration-300 ${
                        current
                          ? "text-volt"
                          : answer
                            ? "text-white/60"
                            : "text-white/20"
                      }`}
                    >
                      {pad(index + 1)}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block truncate text-sm transition-colors duration-300 ${
                          current || answer
                            ? "text-white group-hover:text-volt"
                            : "text-white/30"
                        }`}
                      >
                        {entry.label}
                      </span>
                      {chosen ? (
                        <span className="mt-0.5 block truncate text-xs text-volt font-medium">
                          {chosen.label}
                        </span>
                      ) : null}
                    </span>

                    {current ? (
                      <span className="size-2 shrink-0 rounded-full bg-volt shadow-[0_0_20px_rgba(212,255,63,0.3)]" />
                    ) : answer ? (
                      <svg className="size-4 shrink-0 text-volt" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Progress indicator */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-volt transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                style={{ width: `${(answeredCount / TOTAL) * 100}%` }}
              />
            </div>
            <span className="font-mono text-[9px] text-white/30">
              {answeredCount}/{TOTAL}
            </span>
          </div>
        </Reveal>

        {/* =====================================================
            RIGHT - PREMIUM PANEL
        ====================================================== */}

        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-all duration-500 hover:border-white/20 sm:p-9">
            
            {/* Premium glow behind card */}
            <div className="pointer-events-none absolute -inset-px rounded-[32px] bg-gradient-to-r from-volt/5 via-transparent to-clay/5 opacity-50" />
            
            {/* Progress bar - premium */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-white/10" aria-hidden="true">
              <div
                className="h-full bg-gradient-to-r from-volt to-volt/80 shadow-[0_0_20px_rgba(212,255,63,0.3)] transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                style={{ width: `${(answeredCount / TOTAL) * 100}%` }}
              />
            </div>

            {/* Corner accents */}
            <div className="pointer-events-none absolute -left-px -top-px size-6 rounded-tl-[32px] border-l-2 border-t-2 border-white/10" />
            <div className="pointer-events-none absolute -right-px -top-px size-6 rounded-tr-[32px] border-r-2 border-t-2 border-white/10" />

            {done && match ? (
              /* =============================================
                 RESULT VIEW - Premium
              ============================================== */
              <div key="result" className="step-in">
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt/60" />
                      <span className="relative inline-flex size-2 rounded-full bg-volt" />
                    </span>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-volt">
                      Your match
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center gap-1.5 text-[10px] text-white/30 transition-all duration-300 hover:text-volt focus-visible:outline-volt group"
                  >
                    <RepeatIcon className="size-3.5 transition-transform duration-300 group-hover:rotate-180" />
                    <span className="hidden sm:inline">Start over</span>
                  </button>
                </div>

                {/* Product Card */}
                <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="relative grid h-44 w-full shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 sm:w-40">
                    <div className="absolute inset-x-6 top-6 h-24 rounded-full bg-volt/20 blur-2xl" />
                    <Image
                      src={match.image}
                      alt={match.name}
                      width={140}
                      height={140}
                      className="relative h-32 w-auto object-contain transition-transform duration-500 hover:scale-105"
                    />
                    {match.badge && (
                      <span className="absolute left-3 top-3 rounded-full bg-volt px-2 py-0.5 text-[7px] font-bold uppercase tracking-[0.1em] text-ink">
                        {match.badge}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xl font-bold tracking-tight text-white">
                      {match.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-white/50">{match.blurb}</p>
                    <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-xl font-bold text-volt">
                        {formatPrice(match.price)}
                      </span>
                      {match.compareAt && (
                        <span className="text-sm text-white/30 line-through">
                          {formatPrice(match.compareAt)}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-white/50">
                        <StarIcon className="size-3 text-volt" />
                        {match.rating} · {match.reviews.toLocaleString("en-IN")} reviews
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reasons */}
                {reasons.length > 0 && (
                  <div className="mt-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/30">
                      Why this fits
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {reasons.map((reason) => (
                        <span
                          key={reason}
                          className="rounded-full border border-volt/20 bg-volt/5 px-3 py-1.5 text-[10px] font-medium tracking-wide text-volt backdrop-blur-sm"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights */}
                <ul className="mt-6 flex flex-col gap-2.5 border-t border-white/10 pt-5">
                  {match.highlights.slice(0, 3).map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm text-white/60"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt shadow-[0_0_10px_rgba(212,255,63,0.3)]" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Actions */}
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={onAdd}
                    className="group relative inline-flex h-12 flex-1 items-center justify-center overflow-hidden rounded-full bg-volt px-6 text-sm font-semibold text-ink transition-all duration-300 hover:shadow-[0_8px_30px_rgba(212,255,63,0.2)] hover:-translate-y-0.5"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {added ? (
                        <>
                          <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Added to cart
                        </>
                      ) : (
                        `Add to cart · ${formatPrice(match.price)}`
                      )}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-volt/0 via-white/20 to-volt/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </button>
                  <Link
                    href={`/products/${match.id}`}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-medium text-white transition-all duration-300 hover:border-volt hover:text-volt hover:bg-volt/5"
                  >
                    See details
                  </Link>
                </div>

                {/* Alternates */}
                {alternates.length > 0 && (
                  <div className="mt-7 border-t border-white/10 pt-5">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/30">
                      Close seconds
                    </p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {alternates.map((item) => (
                        <Link
                          key={item.id}
                          href={`/products/${item.id}`}
                          className="group flex items-center gap-3 rounded-xl border border-white/10 p-2.5 transition-all duration-300 hover:border-volt/30 hover:bg-white/5"
                        >
                          <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-white/5">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={40}
                              height={40}
                              className="h-8 w-auto object-contain"
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[12px] font-medium text-white/80 transition-colors duration-300 group-hover:text-volt">
                              {item.name}
                            </span>
                            <span className="block text-[10px] text-white/40">
                              {formatPrice(item.price)}
                            </span>
                          </span>
                          <ArrowIcon className="size-3 shrink-0 text-white/20 transition-all duration-300 group-hover:text-volt group-hover:translate-x-0.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* =============================================
                 QUESTION VIEW - Premium
              ============================================== */
              <div key={step} className="step-in">
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] font-semibold tracking-[0.22em] text-volt">
                      {pad(step + 1)}
                      <span className="text-white/20"> / {pad(TOTAL)}</span>
                    </span>
                    <span className="h-4 w-px bg-white/10" />
                    <span className="text-[9px] text-white/20">
                      {Math.round(((step + 1) / TOTAL) * 100)}%
                    </span>
                  </div>
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex items-center gap-1.5 text-[10px] text-white/30 transition-all duration-300 hover:text-volt focus-visible:outline-volt group"
                    >
                      <ArrowIcon className="size-3 rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5" />
                      Back
                    </button>
                  )}
                </div>

                {/* Question */}
                <h3 className="mt-5 text-[clamp(1.45rem,2.4vw,1.95rem)] font-bold leading-tight tracking-tight text-white">
                  {question.label}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/40">
                  {question.help}
                </p>

                {/* Options */}
                <div className="mt-7 flex flex-col gap-3">
                  {question.options.map((option, index) => (
                    <OptionTile
                      key={option.value}
                      option={option}
                      index={index}
                      onChoose={choose}
                    />
                  ))}
                </div>

                {/* Keyboard shortcut hint */}
                <div className="mt-5 flex items-center gap-2 text-[10px] text-white/20">
                  <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>
                    Press <span className="font-mono text-white/40">1</span> to{" "}
                    <span className="font-mono text-white/40">{question.options.length}</span> to answer
                  </span>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </ParallaxScene>
  );
}