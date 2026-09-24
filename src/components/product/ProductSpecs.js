"use client";

import Reveal from "@/components/ui/Reveal";
import { StarIcon } from "@/components/ui/Icons";
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

/**
 * Specifications and the rating summary.
 *
 * Both come from the product itself. The rating block used to add a five-bar
 * breakdown (981 / 224 / 52 …) and a list of written reviews from data.js —
 * the same invented figures on every product, sitting under a real "0 ratings"
 * — so a shopper saw two contradicting answers on one page. Until the store
 * collects its own reviews, only the product's own average and count show, and
 * a product without any says so plainly.
 */
export default function ProductSpecs({ product }) {
  const specs = Array.isArray(product.specs) ? product.specs : [];
  const count = Number(product.reviews) || 0;
  const rating = Number(product.rating) || 0;

  return (
    <section
      id="reviews"
      className="mx-auto w-full max-w-350 border-t border-line px-5 py-14 sm:px-8 lg:py-20"
    >
      <div
        className={`grid grid-cols-1 gap-14 lg:gap-20 ${
          specs.length ? "lg:grid-cols-2" : ""
        }`}
      >
        {/* specifications — a heading over nothing is worse than no section */}
        {specs.length ? (
          <div>
            <Reveal>
              <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-[-0.03em]">
                <Accent>Specifications</Accent>
              </h2>
            </Reveal>
            <dl className="mt-8 flex flex-col">
              {specs.map((spec, index) => (
                <Reveal
                  key={spec.label}
                  delay={index * 60}
                  className="flex items-baseline justify-between gap-6 border-t border-line py-4 last:border-b"
                >
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-mist">
                    {spec.label}
                  </dt>
                  <dd className="text-right font-mono text-sm text-ink">{spec.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        ) : null}

        {/* ratings */}
        <div>
          <Reveal>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-[-0.03em]">
              What <Accent>players say</Accent>
            </h2>
          </Reveal>

          <Reveal
            delay={80}
            className="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-line bg-surface p-8 text-center"
          >
            {count > 0 ? (
              <>
                <p className="font-mono text-4xl font-semibold">{rating.toFixed(1)}</p>
                <Stars value={Math.round(rating)} />
                <p className="text-xs text-mist">
                  Based on {count.toLocaleString("en-IN")}{" "}
                  {count === 1 ? "rating" : "ratings"}
                </p>
              </>
            ) : (
              <>
                <Stars value={0} className="size-5" />
                <p className="text-base font-semibold">No reviews yet</p>
                <p className="max-w-sm text-sm leading-relaxed text-mist">
                  This ball has not been rated yet. Once your order arrives,
                  tell us how it plays.
                </p>
              </>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
