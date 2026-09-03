import Link from "next/link";
import Logo from "@/components/ui/Logo";
import AuthLink from "@/components/auth/AuthLink";
import {
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
  // the brochure publishes two lines; the second is listed rather than hidden
  {
    icon: PhoneIcon,
    label: "Phone (alt)",
    value: contact.phoneAlt,
    href: `tel:${contact.phoneAlt.replace(/\s/g, "")}`,
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
  "text-sm text-mist transition-colors duration-300 hover:text-volt-deep";

const headingClass =
  "text-[11px] font-semibold uppercase tracking-[0.18em] text-ink";

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-line bg-surface text-ink">
      {/* A 384px yellow orb blurred to 130px used to drift across the top-left
          of this on a parallax offset. On a deep-green footer it read as a
          smudge on the screen rather than as light. */}
      <div className="relative">
        <div className="mx-auto w-full max-w-350 px-5 sm:px-8">
          {/* The sign-up band that used to open the footer is gone. It sat
              directly under the newsletter section — same headline register,
              same "Join the list" button, and it promised one email a week
              where the section above it promised one a month. Asking twice in
              two hundred pixels reads as a template, and the contradiction is
              the kind of thing a reader notices. The list link in the Company
              column still points at #newsletter. */}

          {/* --------------------------------------------------- main grid
              Twelve columns that add up to twelve: brand takes four, the four
              link columns take two each. */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 md:grid-cols-4 lg:grid-cols-12 lg:py-16">
            {/* brand and the social marks — contact moved to its own column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-3 lg:pr-8">
              {/* The full lockup, not the ball on its own — the footer is
                  where the brand signs off, and the artwork carries the name.
                  Its transparent ground is why the white paddle inside "BA"
                  still reads against the deep green here. */}
              <Link href="/" className="inline-block">
                <Logo href={null} size="lg" className="!gap-0" />
              </Link>

              <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
                {/* was "rotomolded in Bengaluru", which contradicted both
                    the address three columns to the right of it and the
                    brand tagline in the hero, each of which says Mumbai. */}
                {brand.identity} Pickleballs rotomolded in Mumbai, shipped to
                courts in {brand.exportMarkets.join(", ")} and across India.
              </p>

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-volt-deep">
                {brand.taglines.promise}
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
                      className="grid size-10 place-items-center rounded-full border border-line-strong text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-volt-deep hover:bg-volt hover:text-ink"
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
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-paper text-volt-deep">
                        <Icon className="size-4.5" />
                      </span>

                      <span className="min-w-0 pt-0.5">
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-mist">
                          {row.label}
                        </span>

                        {row.href ? (
                          <a
                            href={row.href}
                            className="mt-1 block wrap-break-word text-sm text-mist transition-colors hover:text-volt-deep"
                          >
                            {row.value}
                          </a>
                        ) : (
                          <span className="mt-1 block text-sm leading-relaxed text-mist">
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
          <div className="flex flex-col gap-4 border-t border-line py-7 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {brand.name}. All rights
              reserved.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {LEGAL_LINKS.map((entry) => (
                <Link
                  key={entry.label}
                  href={entry.href}
                  className="underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  {entry.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------- build credit
              `volt` rather than `volt-deep`: this bar is dark, where the deep
              tone drops below a readable contrast. */}
          <div className="border-t border-line py-6 text-xs text-mist">
            <p className="flex flex-wrap items-center justify-center gap-1.5">
              Designed and developed by
              <Link
                href="https://nakshatranamahacreations.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 font-medium text-volt-deep underline-offset-4 transition-colors hover:underline"
              >
                Nakshatra Namaha Creations
                <ArrowUpRightIcon className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
