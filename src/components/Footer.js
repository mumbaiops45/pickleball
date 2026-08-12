import Link from "next/link";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import { LogoMark } from "@/components/ui/Logo";
import AuthLink from "@/components/auth/AuthLink";
import {
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

const PAYMENTS = ["UPI", "RUPAY", "VISA", "MASTERCARD", "NET BANKING", "COD"];

const linkClass =
  "text-sm text-paper/60 transition-colors hover:text-volt";

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
          {/* ------------------------------------------------------ main grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-4 lg:grid-cols-12 lg:py-20">
            {/* brand + contact */}
            <div className="col-span-2 lg:col-span-4">
              <Link href="/" className="group flex items-center gap-2.5">
                <LogoMark
                  size="md"
                  tone="volt"
                  className="transition-transform duration-500 group-hover:rotate-[18deg]"
                />
                <span className="text-[15px] font-semibold tracking-[0.24em] text-paper">
                  {brand.name}
                </span>
              </Link>

              <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/60">
                {brand.tagline} Pressed, tested and shipped from Bengaluru.
              </p>

              <ul className="mt-7 flex flex-col gap-3.5 text-sm">
                <li className="flex gap-3 text-paper/60">
                  <PinIcon className="mt-0.5 size-4 shrink-0 text-volt" />
                  <span>
                    {contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-paper/60 transition-colors hover:text-volt"
                  >
                    <PhoneIcon className="size-4 shrink-0 text-volt" />
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 text-paper/60 transition-colors hover:text-volt"
                  >
                    <MailIcon className="size-4 shrink-0 text-volt" />
                    {contact.email}
                  </a>
                </li>
              </ul>

              <p className="mt-4 text-xs text-paper/60">{contact.hours}</p>

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
                      className="grid size-10 place-items-center rounded-full border border-paper/40 text-paper/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-volt hover:bg-volt hover:text-ink"
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
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper">
                  {column.title}
                </h3>
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

            {/* newsletter nudge */}
            <div className="col-span-2 lg:col-span-2">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper">
                Season drops
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-paper/60">
                One email a week. New releases, restocks and a ₹500 credit on
                your first order.
              </p>
              <Link
                href="/#newsletter"
                className="mt-5 inline-flex h-11 items-center rounded-full bg-volt px-5 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                Join the list
              </Link>
            </div>
          </div>

          {/* ------------------------------------------------------ bottom bar */}
          <div className="flex flex-col gap-6 border-t border-paper/12 py-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {PAYMENTS.map((payment) => (
                <span
                  key={payment}
                  className="rounded-md border border-paper/20 px-2.5 py-1.5 font-mono text-[10px] tracking-wider text-paper/50"
                >
                  {payment}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-paper/50">
              {["Privacy", "Terms", "Accessibility", "GST info"].map((label) => (
                <Link
                  key={label}
                  href="/shop"
                  className="transition-colors hover:text-paper"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-paper/12 py-6 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {brand.name}. All rights
              reserved.
            </p>
            <p className="flex items-center gap-2">
              Made in Bengaluru
              <span className="size-1 rounded-full bg-volt" />
              Prices inclusive of GST
            </p>
          </div>
        </div>
      </ParallaxScene>
    </footer>
  );
}
