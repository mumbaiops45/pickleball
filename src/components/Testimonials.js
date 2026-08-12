import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { StarIcon } from "@/components/ui/Icons";
import { testimonials } from "@/lib/data";
import { Accent } from "@/components/ui/Heading";

// each column drifts at its own rate so the row never reads as a flat strip
const COLUMN_SPEEDS = ["0.9", "1.9", "0.4"];

function initialsOf(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export default function Testimonials() {
  return (
    <ParallaxScene
      as="section"
      className="relative mx-auto w-full max-w-350 px-5 py-10 sm:px-8 lg:py-32"
    >
      <SectionHeading
        // eyebrow="From the courts"
        title={<>12,480 players have <Accent>already switched</Accent>.</>}
        copy="Reviews collected from verified orders, unedited and unfiltered."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.name} data-speed={COLUMN_SPEEDS[index]}>
            <Reveal
              delay={index * 110}
              className="flex h-full flex-col rounded-3xl border border-line bg-surface p-7 shadow-[0_1px_2px_rgba(15,17,21,.04)] transition-all duration-500 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_20px_40px_-24px_rgba(15,17,21,.22)]"
            >
              <span className="flex gap-0.5 text-volt-deep">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <StarIcon key={i} className="size-3.5" />
                ))}
              </span>

              <blockquote className="mt-5 text-[15px] leading-relaxed text-ink/90">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                <span className="grid size-10 place-items-center rounded-full bg-volt text-xs font-semibold text-ink">
                  {initialsOf(testimonial.name)}
                </span>
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-xs text-mist">{testimonial.role}</p>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </ParallaxScene>
  );
}
