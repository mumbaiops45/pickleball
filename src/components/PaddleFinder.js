"use client";

import { useState } from "react";
import Link from "next/link";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
import ProductArt from "@/components/art/ProductArt";
import { ArrowIcon, StarIcon } from "@/components/ui/Icons";
import { finderQuestions, findProduct, recommendPaddle } from "@/lib/data";
import { useCart } from "@/store/CartProvider";
import { formatPrice } from "@/lib/format";
import { Accent } from "@/components/ui/Heading";

export default function PaddleFinder() {
  const { addItem } = useCart();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const done = step >= finderQuestions.length;
  const question = finderQuestions[step];
  const match = done ? findProduct(recommendPaddle(answers)) : null;

  const choose = (value) => {
    setAnswers((current) => ({ ...current, [question.id]: value }));
    setStep((current) => current + 1);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <ParallaxScene
      as="section"
      id="finder"
      className="relative isolate w-full overflow-hidden border-y border-line bg-surface-2 py-14 lg:py-24"
    >
      <div
        data-speed="-1.2"
        data-speed-x="0.8"
        className="pointer-events-none absolute -left-24 top-0 -z-10 size-96 rounded-full bg-volt/40 blur-[130px]"
      />

      <div className="mx-auto grid w-full max-w-350 grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <span className="inline-flex items-center rounded-full bg-volt px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
            Paddle finder
          </span>
          <h2 className="mt-5 text-[clamp(2.1rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Three questions.
            <br />
            One paddle that <Accent>fits</Accent>.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mist">
            No quiz-funnel nonsense. Answer honestly and we point at the paddle
            our fitters would hand you across the counter — then you have 30 days
            on court to disagree with us.
          </p>

          <div className="mt-8 flex items-center gap-2">
            {finderQuestions.map((entry, index) => (
              <span
                key={entry.id}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                  index < step ? "bg-volt-deep" : "bg-line"
                }`}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-mist">
            {done ? "Done" : `Step ${step + 1} of ${finderQuestions.length}`}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-3xl border border-line bg-paper p-7 shadow-[0_1px_2px_rgba(15,17,21,.04),0_18px_40px_-28px_rgba(15,17,21,.3)] sm:p-9">
            {done && match ? (
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-volt-deep">
                  Your match
                </p>

                <div className="mt-5 flex items-center gap-5">
                  <span className="grid size-28 shrink-0 place-items-center overflow-hidden rounded-2xl border border-line bg-surface">
                    <ProductArt
                      product={match}
                      id={`finder-${match.id}`}
                      className="h-24 w-auto"
                    />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold tracking-tight">
                      {match.name}
                    </h3>
                    <p className="mt-1 text-sm text-mist">{match.blurb}</p>
                    <p className="mt-2 flex items-center gap-2 text-sm">
                      <span className="font-semibold">{formatPrice(match.price)}</span>
                      <span className="flex items-center gap-1 text-xs text-mist">
                        <StarIcon className="size-3 text-volt-deep" />
                        {match.rating} · {match.reviews.toLocaleString("en-IN")}
                      </span>
                    </p>
                  </div>
                </div>

                <ul className="mt-6 flex flex-col gap-2 border-t border-line pt-5">
                  {match.highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm text-mist">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt-deep" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        productId: match.id,
                        colorway: match.colorways[0]?.name,
                        option: match.options[0],
                        quantity: 1,
                      })
                    }
                    className="inline-flex h-13 flex-1 items-center justify-center gap-2.5 rounded-full bg-volt text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Add to cart · {formatPrice(match.price)}
                  </button>
                  <Link
                    href={`/products/${match.id}`}
                    className="inline-flex h-13 items-center justify-center rounded-full border border-line-strong px-6 text-sm font-medium text-ink transition-colors hover:border-volt-deep hover:text-volt-deep"
                  >
                    See details
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={restart}
                  className="mt-4 text-xs text-mist underline-offset-4 hover:text-ink hover:underline"
                >
                  Start over
                </button>
              </div>
            ) : (
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-mist">
                  Question {step + 1}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                  {question.label}
                </h3>
                <p className="mt-2 text-sm text-mist">{question.help}</p>

                <div className="mt-7 flex flex-col gap-3">
                  {question.options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => choose(option.value)}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-line-strong px-5 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-volt-deep hover:bg-surface"
                    >
                      <span>
                        <span className="block text-sm font-medium">
                          {option.label}
                        </span>
                        <span className="mt-0.5 block text-xs text-mist">
                          {option.hint}
                        </span>
                      </span>
                      <ArrowIcon className="size-4 shrink-0 text-mist transition-all duration-300 group-hover:translate-x-1 group-hover:text-volt-deep" />
                    </button>
                  ))}
                </div>

                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep((current) => current - 1)}
                    className="mt-5 text-xs text-mist underline-offset-4 hover:text-ink hover:underline"
                  >
                    Back
                  </button>
                ) : null}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </ParallaxScene>
  );
}
