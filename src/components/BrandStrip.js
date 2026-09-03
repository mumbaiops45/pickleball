import Reveal from "@/components/ui/Reveal";
import Logo from "@/components/ui/Logo";
import { partners } from "@/lib/data";

/** Credibility row — our lockup above the bodies that approve, play and stock the ball. */
export default function BrandStrip() {
  return (
    <section className="border-y border-line bg-paper py-12">
      <div className="shell flex flex-col items-center gap-8 text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <Logo href={null} size="md" tagline="Mumbai" />
        </Reveal>

        <Reveal delay={80} className="flex flex-col items-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-mist">
            Approved, played and stocked by
          </p>
          <ul className="mt-5 flex flex-wrap items-start justify-center gap-x-10 gap-y-5">
            {partners.map((partner) => (
              <li key={partner.name} className="group">
                <p className="text-[13px] font-semibold tracking-[0.12em] text-ink transition-colors group-hover:text-volt-deep">
                  {partner.name}
                </p>
                <p className="mt-0.5 text-[11px] text-mist">{partner.note}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
