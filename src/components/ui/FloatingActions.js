"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ChevronUpIcon,
  PhoneIcon,
  WhatsappIcon,
} from "@/components/ui/Icons";
/**
 * The floating call / WhatsApp / back-to-top stack.
 *
 * The numbers come from the environment, not from `data.js`, because the real
 * ones have not been given to us yet — and a contact button that dials a
 * placeholder is worse than no button. Each one renders only once its number
 * is set, so back-to-top works today and the other two switch themselves on
 * the day the numbers land:
 *
 *   NEXT_PUBLIC_CONTACT_PHONE=+918047182200
 *   NEXT_PUBLIC_WHATSAPP_NUMBER=918047182200
 *
 * WhatsApp wants bare digits with the country code and no `+`.
 */
const digitsOf = (value) => (value ?? "").replace(/\D/g, "");

const CALL_NUMBER = digitsOf(process.env.NEXT_PUBLIC_CONTACT_PHONE);
const WHATSAPP_NUMBER = digitsOf(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);

const WHATSAPP_TEXT = encodeURIComponent(
  "Hi PADDLEHAUS — I have a question about an order.",
);

/** Far enough down that the button is a shortcut, not clutter over the hero. */
const SHOW_AFTER = 600;

const bubble =
  "grid size-12 place-items-center rounded-full shadow-[0_10px_24px_-10px_rgba(15,17,21,.45)] transition-all duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5";

/** The name sits to the left of its button, on hover and on keyboard focus. */
function Label({ children }) {
  return (
    <span className="pointer-events-none absolute right-14 hidden whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
      {children}
    </span>
  );
}

/**
 * A contact bubble that shows whether or not its number is known.
 *
 * With a number it is a real link. Without one it still draws — the design
 * calls for it, and the numbers are not with us yet — but it is inert and says
 * so on hover, rather than dialling a placeholder or opening an empty chat.
 */
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
