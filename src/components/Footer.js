import Link from "next/link";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import { LogoMark } from "@/components/ui/Logo";
import AuthLink from "@/components/auth/AuthLink";
import {
  ArrowIcon,
  ArrowUpRightIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/components/ui/Icons";
import { brand, contact, footerColumns, socials } from "@/lib/data";

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  whatsapp: WhatsappIcon,
};

const PAYMENTS = ["UPI", "RuPay", "Visa", "Mastercard", "Net banking", "COD"];

/** The bottom-bar legal row. Only pages that exist are listed here — a link
 *  that lands somewhere unrelated is worse than no link. */
const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
];

const linkClass =
  "text-sm text-paper/55 transition-colors duration-300 hover:text-volt";

const headingClass =
  "text-[11px] font-semibold uppercase tracking-[0.18em] text-paper";

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-paper">
      <ParallaxScene className="relative">
        <div
          data-speed="-1.4"
          data-speed-x="0.8"
          className="pointer-events-none absolute -left-24 -top-32 -z-10 size-96 rounded-full bg-volt/12 blur-[130px]"
        />

        <div className="mx-auto w-full max-w-350 px-5 sm:px-8">
          {/* ---------------------------------------------------- sign-up band
              A full-width band rather than a cramped column: it is the one
              thing in here we actually want you to do. */}
          <div className="flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between lg:py-14">
            <div className="max-w-xl">
              <h2 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-tight tracking-[-0.03em]">
                Season drops, restocks and the odd deep dive.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-paper/55">
                One email a week, never more. New releases, restocks and a ₹500
                credit on your first order.
              </p>
            </div>

            <Link
              href="/#newsletter"
              className="group inline-flex h-12 shrink-0 items-center gap-2.5 rounded-full bg-volt px-7 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              Join the list
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* --------------------------------------------------- main grid
              Twelve columns that add up to twelve: brand takes four, the four
              link columns take two each. */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 border-t border-paper/12 py-14 md:grid-cols-4 lg:grid-cols-12 lg:py-16">
            {/* brand, contact and the marks that earn trust */}
            <div className="col-span-2 md:col-span-4 lg:col-span-4 lg:pr-10">
              <Link href="/" className="group inline-flex items-center gap-2.5">
                <LogoMark
                  size="md"
                  tone="volt"
                  className="transition-transform duration-500 group-hover:rotate-[18deg]"
                />
                <span className="text-[15px] font-semibold tracking-[0.24em] text-paper">
                  {brand.name}
                </span>
              </Link>

              <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/55">
                {brand.tagline} Pressed, tested and shipped from Bengaluru.
              </p>

              <address className="mt-7 flex flex-col gap-3.5 text-sm not-italic">
                <span className="flex gap-3 text-paper/55">
                  <PinIcon className="mt-0.5 size-4 shrink-0 text-volt" />
                  <span>
                    {contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </span>

                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-paper/55 transition-colors hover:text-volt"
                >
                  <PhoneIcon className="size-4 shrink-0 text-volt" />
                  {contact.phone}
                </a>

                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-paper/55 transition-colors hover:text-volt"
                >
                  <MailIcon className="size-4 shrink-0 text-volt" />
                  {contact.email}
                </a>

                <span className="text-xs text-paper/40">{contact.hours}</span>
              </address>

              <div className="mt-7 flex gap-2.5">
                {socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid size-10 place-items-center rounded-full border border-paper/15 text-paper/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-volt hover:bg-volt hover:text-ink"
                    >
                      <Icon className="size-4.5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* link columns */}
            {footerColumns.map((column) => (
              <nav
                key={column.title}
                aria-label={column.title}
                className="lg:col-span-2"
              >
                <h3 className={headingClass}>{column.title}</h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.action === "auth" ? (
                        <AuthLink className={linkClass}>{link.label}</AuthLink>
                      ) : (
                        <Link href={link.href} className={linkClass}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* ------------------------------------------------ payment marks
              Alongside the legal line rather than on a rule of their own —
              three stacked bars at the foot of a page reads as clutter. */}
          <div className="flex flex-col gap-5 border-t border-paper/12 py-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
              <span className="mr-1 text-[11px] uppercase tracking-[0.16em] text-paper/35">
                We accept
              </span>
              {PAYMENTS.map((payment) => (
                <span
                  key={payment}
                  className="rounded-md border border-paper/15 px-2.5 py-1.5 text-[11px] tracking-wide text-paper/55"
                >
                  {payment}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-paper/45">
              {LEGAL_LINKS.map((entry) => (
                <Link
                  key={entry.label}
                  href={entry.href}
                  className="underline-offset-4 transition-colors hover:text-paper hover:underline"
                >
                  {entry.label}
                </Link>
              ))}
              <p>
                &copy; {new Date().getFullYear()} {brand.name}. All rights
                reserved.
              </p>
            </div>
          </div>

          {/* ------------------------------------------------- build credit
              `volt` rather than `volt-deep`: this bar is dark, where the deep
              tone drops below a readable contrast. */}
          <div className="border-t border-paper/12 py-6 text-xs text-paper/45">
            <p className="flex flex-wrap items-center justify-center gap-1.5">
              Designed and developed by
              <Link
                href="https://nakshatranamahacreations.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 font-medium text-volt underline-offset-4 transition-colors hover:underline"
              >
                Nakshatra Namaha Creations
                <ArrowUpRightIcon className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </p>
          </div>
        </div>
      </ParallaxScene>
    </footer>
  );
}
