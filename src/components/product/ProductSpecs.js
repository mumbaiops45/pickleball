"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { StarIcon } from "@/components/ui/Icons";
import { productReviews, ratingBreakdown } from "@/lib/data";
import { Accent } from "@/components/ui/Heading";

function Stars({ value, className = "size-3.5" }) {
  return (
    <span className="flex gap-0.5 text-volt-deep">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon
          key={i}
          className={`${className} ${i < value ? "" : "text-line-strong"}`}
        />
      ))}
    </span>
  );
}

export default function ProductSpecs({ product }) {
  const [expandedReviews, setExpandedReviews] = useState(false);
  const totalRatings = ratingBreakdown.reduce((sum, row) => sum + row.count, 0);
  const visibleReviews = expandedReviews ? productReviews : productReviews.slice(0, 1);

  return (
    <section
      id="reviews"
      className="mx-auto w-full max-w-350 border-t border-line px-5 py-14 sm:px-8 lg:py-20"
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
        {/* specifications */}
        <div>
          <Reveal>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-[-0.03em]">
              <Accent>Specifications</Accent>
            </h2>
          </Reveal>
          <dl className="mt-8 flex flex-col">
            {product.specs.map((spec, index) => (
              <Reveal
                key={spec.label}
                delay={index * 60}
                className="flex items-baseline justify-between gap-6 border-t border-line py-4 last:border-b"
              >
                <dt className="text-[11px] uppercase tracking-[0.16em] text-mist">
                  {spec.label}
                </dt>
                <dd className="font-mono text-sm text-ink">{spec.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* reviews */}
        <div>
          <Reveal>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-[-0.03em]">
              What <Accent>players say</Accent>
            </h2>
          </Reveal>

          <Reveal
            delay={80}
            className="mt-8 flex flex-col gap-5 rounded-3xl border border-line bg-surface p-6 sm:flex-row sm:items-center"
          >
            <div className="shrink-0 text-center sm:w-32">
              <p className="font-mono text-4xl font-semibold">{product.rating}</p>
              <div className="mt-2 flex justify-center">
                <Stars value={Math.round(product.rating)} />
              </div>
              <p className="mt-2 text-xs text-mist">
                {product.reviews.toLocaleString("en-IN")} reviews
              </p>
            </div>

            <div className="flex-1">
              {ratingBreakdown.map((row) => (
                <div key={row.stars} className="flex items-center gap-3 py-1">
                  <span className="w-6 shrink-0 font-mono text-[11px] text-mist">
                    {row.stars}★
                  </span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                    <span
                      className="block h-full rounded-full bg-volt"
                      style={{ width: `${(row.count / totalRatings) * 100}%` }}
                    />
                  </span>
                  <span className="w-10 shrink-0 text-right font-mono text-[11px] text-mist">
                    {row.count}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <ul className="mt-6 flex flex-col gap-4">
            {visibleReviews.map((review, index) => (
              <Reveal
                key={review.name}
                delay={index * 80}
                className="rounded-3xl border border-line bg-surface p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Stars value={review.rating} className="size-3" />
                    <p className="mt-2.5 text-sm font-semibold">{review.title}</p>
                  </div>
                  <span className="shrink-0 text-[11px] text-mist">
                    {review.date}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {review.body}
                </p>
                <p className="mt-4 flex items-center gap-2 text-xs text-mist">
                  <span className="grid size-7 place-items-center rounded-full bg-surface-2 text-[10px] font-semibold text-ink">
                    {review.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  {review.name}
                  {review.verified ? (
                    <span className="rounded-full border border-volt-deep/40 px-2 py-0.5 text-[10px] text-volt-deep">
                      Verified buyer
                    </span>
                  ) : null}
                </p>
              </Reveal>
            ))}

            {!expandedReviews && productReviews.length > 1 && (
              <button
                type="button"
                onClick={() => setExpandedReviews(true)}
                className="mt-2 rounded-2xl border border-line bg-paper px-5 py-3 text-sm font-semibold text-ink transition-all hover:border-volt-deep hover:text-volt-deep"
              >
                View all {productReviews.length} reviews
              </button>
            )}

            {expandedReviews && productReviews.length > 1 && (
              <button
                type="button"
                onClick={() => setExpandedReviews(false)}
                className="mt-2 rounded-2xl border border-line bg-paper px-5 py-3 text-sm font-semibold text-ink transition-all hover:border-volt-deep hover:text-volt-deep"
              >
                Show less
              </button>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
