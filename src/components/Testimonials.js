import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { StarIcon } from "@/components/ui/Icons";
import { Accent } from "@/components/ui/Heading";
import { testimonials } from "@/lib/data";

function initialsOf(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

function Byline({ testimonial, onAccent = false }) {
  return (
    <div
      className={`mt-7 flex items-center gap-3 border-t pt-5 ${
        onAccent ? "border-ink/15" : "border-line"
      }`}
    >
      <span
        className={`grid size-10 shrink-0 place-items-center rounded-full text-xs font-semibold text-ink ${
          onAccent ? "bg-ink/10" : "bg-volt"
        }`}
      >
        {initialsOf(testimonial.name)}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-ink">{testimonial.name}</p>
        <p
          className={`truncate text-xs ${onAccent ? "text-ink/65" : "text-mist"}`}
        >
          {testimonial.role}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    <section className="section bg-paper">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="From the courts"
          title={
            <>
              What a season on them <Accent>actually looks like</Accent>.
            </>
          }
          copy="Collected from verified orders, unedited and unfiltered."
        />

        <div className="mt-9 grid grid-cols-1 gap-5 lg:mt-12 lg:grid-cols-12">
          {/* the lead quote, large, on the ball's yellow */}
          <Reveal variant="left" className="flex flex-col justify-between rounded-3xl bg-volt p-8 text-ink sm:p-10 lg:col-span-7">
            <div>
              <span className="flex gap-0.5 text-ink">
                {Array.from({ length: lead.rating }, (_, i) => (
                  <StarIcon key={i} className="size-4" />
                ))}
              </span>
              <blockquote className="mt-6 text-[clamp(1.25rem,2.2vw,1.7rem)] font-medium leading-[1.35] tracking-[-0.02em]">
                &ldquo;{lead.quote}&rdquo;
              </blockquote>
            </div>
            <Byline testimonial={lead} onAccent />
          </Reveal>

          {/* the rest, stacked */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            {rest.map((testimonial, index) => (
              <Reveal
                key={testimonial.name}
                variant="right"
                delay={(index + 1) * 80}
                className="flex flex-1 flex-col rounded-3xl border border-line bg-surface p-7"
              >
                <span className="flex gap-0.5 text-volt-deep">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <StarIcon key={i} className="size-3.5" />
                  ))}
                </span>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <Byline testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
