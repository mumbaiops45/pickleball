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

export default function Testimonials() {
  return (
    <section className="section bg-paper">
      <div className="shell">
        <SectionHeading
          eyebrow="From the courts"
          /* The heading used to read "12,480 players have already switched",
             a figure nothing on the site or in the client's brochure
             supports. A precise invented number is the one claim a buyer can
             catch you on, and it undercuts the specifications either side of
             it, which are true. */
          title={
            <>
              What a season on them <Accent>actually looks like</Accent>.
            </>
          }
          copy="Collected from verified orders, unedited and unfiltered."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:mt-16 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.name}
              delay={index * 70}
              className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7"
            >
              <span className="flex gap-0.5 text-volt-deep">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <StarIcon key={i} className="size-3.5" />
                ))}
              </span>

              <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-ink">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-volt text-xs font-semibold text-ink">
                  {initialsOf(testimonial.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {testimonial.name}
                  </p>
                  <p className="truncate text-xs text-mist">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
