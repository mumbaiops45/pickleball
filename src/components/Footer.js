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
 */
const CONTACT_ROWS = [
  {
    icon: PhoneIcon,
    label: "Phone",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/\s/g, "")}`,
  },
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

const LEGAL_LINKS = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms and conditions", href: "/terms" },
];

const linkClass =
  "text-sm text-mist transition-colors duration-300 hover:text-volt-deep";

const headingClass =
  "text-[11px] font-semibold uppercase tracking-[0.18em] text-volt-deep";

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-line bg-surface-2 text-ink">
      {/* the logo's four colours as a hairline rail across the very top */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-flame via-volt via-45% to-sky"
      />
      {/* two faint washes so the panel is not one flat colour */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 -z-10 size-96 rounded-full bg-volt/25 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 bottom-0 -z-10 size-80 rounded-full bg-sky/15 blur-[130px]"
      />

      <div className="mx-auto w-full max-w-350 px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 md:grid-cols-4 lg:grid-cols-12 lg:py-16">
          {/* brand + socials */}
          <div className="col-span-2 md:col-span-4 lg:col-span-3 lg:pr-8">
            <Link href="/" className="inline-block">
              <Logo href={null} size="lg" className="gap-0!" />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
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
                    className="grid size-10 place-items-center rounded-full border border-line-strong bg-paper text-mist transition-all duration-300 hover:-translate-y-1 hover:border-volt-deep hover:bg-volt hover:text-ink hover:shadow-[0_8px_18px_-10px_rgba(63,122,30,.9)]"
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

          {/* get in touch */}
          <div className="col-span-2 md:col-span-4 lg:col-span-3">
            <h3 className={headingClass}>Get in touch</h3>

            <ul className="mt-5 flex flex-col gap-5">
              {CONTACT_ROWS.map((row) => {
                const Icon = row.icon;

                return (
                  <li key={row.label} className="group flex gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-paper text-volt-deep transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-volt-deep group-hover:bg-volt group-hover:text-ink">
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

        {/* legal line */}
        <div className="flex flex-col gap-4 border-t border-line py-7 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
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

        {/* build credit */}
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
    </footer>
  );
}
