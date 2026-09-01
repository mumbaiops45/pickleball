import Link from "next/link";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
import BallArt from "@/components/art/BallArt";
import { ArrowIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { contact } from "@/lib/data";
import { Accent } from "@/components/ui/Heading";

export default function AboutContact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-350 px-5 py-20 sm:px-8 lg:py-28">
      <ParallaxScene
        pointer
        className="grain relative isolate overflow-hidden rounded-[2rem] bg-forest px-6 py-14 text-paper sm:px-12 lg:py-16"
      >
        <div
          data-speed="-1.4"
          data-speed-x="1"
          className="pointer-events-none absolute -right-24 -top-28 -z-10 size-96 rounded-full bg-volt/25 blur-[120px]"
        />
        <div
          data-speed="3"
          data-mouse="46"
          className="pointer-events-none absolute -bottom-6 right-10 -z-10 hidden w-28 opacity-80 md:block"
        >
          <div className="float-slow">
            <BallArt id="about-contact-ball" color="#d4ff3f" className="w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-volt px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
              Come and hit
            </span>
            <h2 className="mt-6 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-paper">
              The demo wall is open <Accent dark>six days a week</Accent>.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-paper/70">
              Bring your current paddle, hit every model on the wall, and leave
              with the one that actually suits your game. No appointment needed.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-volt px-8 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                Shop the range
                <ArrowIcon className="size-4 transition-transform duration-400 group-hover:translate-x-1.5" />
              </Link>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex h-14 items-center justify-center rounded-full border border-paper/45 px-8 text-sm font-medium text-paper transition-colors hover:border-volt hover:text-volt"
              >
                Email the team
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <dl className="flex flex-col gap-6 rounded-3xl border border-paper/15 bg-paper/5 p-7">
              <div className="flex gap-4">
                <PinIcon className="mt-0.5 size-5 shrink-0 text-volt" />
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-paper/50">
                    Store and workshop
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-paper">
                    {contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </dd>
                </div>
              </div>

              <div className="flex gap-4 border-t border-paper/15 pt-6">
                <PhoneIcon className="mt-0.5 size-5 shrink-0 text-volt" />
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-paper/50">
                    Phone
                  </dt>
                  <dd className="mt-1.5 text-sm text-paper">
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="transition-colors hover:text-volt"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4 border-t border-paper/15 pt-6">
                <MailIcon className="mt-0.5 size-5 shrink-0 text-volt" />
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-paper/50">
                    Email
                  </dt>
                  <dd className="mt-1.5 text-sm text-paper">
                    <a
                      href={`mailto:${contact.email}`}
                      className="transition-colors hover:text-volt"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
              </div>

              <p className="border-t border-paper/15 pt-6 text-xs text-paper/50">
                {contact.hours}
              </p>
            </dl>
          </Reveal>
        </div>
      </ParallaxScene>
    </section>
  );
}
