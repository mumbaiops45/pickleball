import Link from "next/link";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import { LogoMark } from "@/components/ui/Logo";
import AuthLink from "@/components/auth/AuthLink";
import {
  ArrowIcon,
  ArrowUpRightIcon,
  ClockIcon,
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

/**
 * The Get in touch column, built from `contact` so the footer, the contact
 * page and the certification pages all quote the same details.
 *
 * Phone and email carry an href; address and hours do not — a map link would
 * need a real street address, and the hours are a statement, not a target.
 */
const CONTACT_ROWS = [
  {
    icon: PhoneIcon,
    label: "Phone",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MailIcon,
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: PinIcon,
    label: "Address",
    value: contact.addressLines.join(", "),
  },
  {
    icon: ClockIcon,
    label: "Hours",
    value: contact.hours,
  },
];

/** The bottom-bar legal row. Only pages that exist are listed here — a link
 *  that lands somewhere unrelated is worse than no link. */
const LEGAL_LINKS = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms and conditions", href: "/terms" },
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
            {/* brand and the social marks — contact moved to its own column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-3 lg:pr-8">
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
                {brand.identity} Paddles pressed and balls rotomolded in
                Bengaluru, shipped to courts in{" "}
                {brand.exportMarkets.join(", ")} and across India.
              </p>

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-volt">
                {brand.taglines.manufacturing}
              </p>

              <div className="mt-8 flex gap-2.5">
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

            {/* ------------------------------------------------ get in touch
                A column of its own rather than four lines under the logo: the
                phone number and the address are what someone scrolls this far
                looking for, and buried in the brand block they read as
                small print. Each row is labelled, so the value beneath it
                needs no explaining. */}
            <div className="col-span-2 md:col-span-4 lg:col-span-3">
              <h3 className={headingClass}>Get in touch</h3>

              <ul className="mt-5 flex flex-col gap-5">
                {CONTACT_ROWS.map((row) => {
                  const Icon = row.icon;

                  return (
                    <li key={row.label} className="flex gap-3.5">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-paper/12 bg-paper/6 text-volt">
                        <Icon className="size-4.5" />
                      </span>

                      <span className="min-w-0 pt-0.5">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-paper/40">
                          {row.label}
                        </span>

                        {row.href ? (
                          <a
                            href={row.href}
                            className="mt-1 block wrap-break-word text-sm text-paper/75 transition-colors hover:text-volt"
                          >
                            {row.value}
                          </a>
                        ) : (
                          <span className="mt-1 block text-sm leading-relaxed text-paper/75">
                            {row.value}
                          </span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* ---------------------------------------------------- legal line
              Copyright left, policy links right. Stacked on a phone, where the
              two would otherwise be squeezed onto one line. */}
          <div className="flex flex-col gap-4 border-t border-paper/12 py-7 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {brand.name}. All rights
              reserved.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {LEGAL_LINKS.map((entry) => (
                <Link
                  key={entry.label}
                  href={entry.href}
                  className="underline-offset-4 transition-colors hover:text-paper hover:underline"
                >
                  {entry.label}
                </Link>
              ))}
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
