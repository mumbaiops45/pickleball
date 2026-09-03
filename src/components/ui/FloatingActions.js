"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ChevronUpIcon,
  PhoneIcon,
  WhatsappIcon,
} from "@/components/ui/Icons";
import { contact } from "@/lib/data";

const digitsOf = (value) => (value ?? "").replace(/\D/g, "");

/**
 * The env vars win so a deployment can point the buttons somewhere else
 * without a rebuild of the catalogue, but they fall back to the published
 * numbers — before, an unset var left both buttons inert with a "number coming
 * soon" label on a site that prints the number in its own footer.
 */
const CALL_NUMBER =
  digitsOf(process.env.NEXT_PUBLIC_CONTACT_PHONE) || digitsOf(contact.phone);
const WHATSAPP_NUMBER =
  digitsOf(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) || digitsOf(contact.whatsapp);

const WHATSAPP_TEXT = encodeURIComponent(
  "Hi PICKLEBALL — I have a question about an order.",
);

const SHOW_AFTER = 600;

const bubble =
  "grid size-12 place-items-center rounded-full shadow-[0_10px_24px_-10px_rgba(15,17,21,.45)] transition-all duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5";

function Label({ children }) {
  return (
    <span className="pointer-events-none absolute right-14 hidden whitespace-nowrap rounded-full bg-forest px-3 py-1.5 text-xs font-medium text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
      {children}
    </span>
  );
}


function ContactBubble({ href, tone, label, pending, children }) {
  if (!href) {
    return (
      <span
        role="img"
        aria-label={`${label} — number coming soon`}
        className={`group relative cursor-default ${tone} ${bubble} opacity-70`}
      >
        <Label>{pending}</Label>
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className={`group relative ${tone} ${bubble}`}
    >
      <Label>{label}</Label>
      {children}
    </a>
  );
}

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > SHOW_AFTER);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, []);

  return (
    /* z-40 keeps the stack under the header, the cart drawer and the toaster,
       so it can never sit on top of something you are trying to read */
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <ContactBubble
        href={
          WHATSAPP_NUMBER
            ? `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`
            : null
        }
        tone="bg-[#25d366] text-white"
        label="WhatsApp us"
        pending="WhatsApp number coming soon"
      >
        <WhatsappIcon className="size-5.5" />
      </ContactBubble>

      <ContactBubble
        href={CALL_NUMBER ? `tel:+${CALL_NUMBER}` : null}
        tone="bg-volt text-ink"
        label="Call us"
        pending="Phone number coming soon"
      >
        <PhoneIcon className="size-5" />
      </ContactBubble>

      {/* Kept mounted so it can fade rather than pop, and taken out of the tab
          order while it is invisible. */}
      <button
        type="button"
        onClick={toTop}
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
        aria-label="Back to top"
        className={`group relative border border-line-strong bg-paper text-ink ${bubble} ${
          showTop
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <Label>Back to top</Label>
        <ChevronUpIcon className="size-5" />
      </button>
    </div>
  );
}
