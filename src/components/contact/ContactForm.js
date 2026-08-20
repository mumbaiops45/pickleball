"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowIcon, CheckIcon } from "@/components/ui/Icons";
import { contact } from "@/lib/data";
import { toast } from "@/store/toast";

/** Topics the form offers. */
const ENQUIRY_TOPICS = [
  { value: "order", label: "Order or delivery" },
  { value: "product", label: "Product question" },
  { value: "returns", label: "Returns and warranty" },
  { value: "bulk", label: "Bulk, club and academy orders" },
  { value: "other", label: "Something else" },
];

/** How long the thank-you sits there before the empty form comes back. */
const THANKS_MS = 4000;

/* ------------------------------------------------------------------ rules */

const NAME_MIN = 2;
const NAME_MAX = 60;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 1000;

/** Letters, spaces and the punctuation real names carry. `\p{L}\p{M}` rather
 *  than A-Z, so Devanagari and Telugu names pass — their vowel signs are marks,
 *  not letters, and a letters-only class rejects the whole name. Both
 *  apostrophes are allowed because phones substitute the curly one. Digits are
 *  the tell for a phone number pasted in the wrong box, so they fail. */
const NAME_REGEX = /^[\p{L}][\p{L}\p{M}\s.'’-]*$/u;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

/** Ten digits starting 6-9 — every Indian mobile number. The optional +91 or
 *  leading 0 is stripped before this runs, not matched by it. */
const PHONE_REGEX = /^[6-9]\d{9}$/;

const TOPIC_VALUES = ENQUIRY_TOPICS.map((option) => option.value);

/**
 * The bare subscriber number out of whatever was typed.
 *
 * The country code and the trunk 0 are only stripped when the length says they
 * are one — 9198765432 is a real ten-digit mobile, so a blind `^91` strip would
 * eat the first two digits of it and then reject the number as too short.
 */
const digitsOf = (value) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
};

/**
 * One validator per field, each returning an error string or "".
 *
 * They run on submit and again on blur, so a field is never marked wrong while
 * it is still being typed into — only once it has been left, or once the form
 * has been sent.
 */
const VALIDATORS = {
  name(value) {
    const name = value.trim();
    if (!name) return "Please tell us your name.";
    if (name.length < NAME_MIN) return "That name looks too short.";
    if (name.length > NAME_MAX) return `Please keep your name under ${NAME_MAX} characters.`;
    if (!NAME_REGEX.test(name))
      return "Use letters only — no numbers or symbols.";
    return "";
  },

  email(value) {
    const email = value.trim();
    if (!email) return "We need an email address to reply to.";
    if (email.length > 254) return "That email address is too long.";
    if (!EMAIL_REGEX.test(email))
      return "That does not look like a valid email address.";
    return "";
  },

  phone(value) {
    const raw = value.trim();
    if (!raw) return "Please add a phone number we can reach you on.";
    if (/[^\d\s+()\-.]/.test(raw)) return "A phone number should be digits only.";

    const digits = digitsOf(raw);
    if (digits.length !== 10)
      return "Enter a 10-digit mobile number.";
    if (!PHONE_REGEX.test(digits))
      return "Indian mobile numbers start with 6, 7, 8 or 9.";
    return "";
  },

  topic(value) {
    if (!TOPIC_VALUES.includes(value)) return "Please choose what this is about.";
    return "";
  },

  message(value) {
    const message = value.trim();
    if (!message) return "Please tell us what you need.";
    if (message.length < MESSAGE_MIN)
      return `Add a little more detail — at least ${MESSAGE_MIN} characters.`;
    if (message.length > MESSAGE_MAX)
      return `Please keep it under ${MESSAGE_MAX} characters.`;
    return "";
  },
};

/** Submit order, which is also the order the first bad field is focused in. */
const FIELDS = ["name", "email", "phone", "topic", "message"];

/* ----------------------------------------------------------------- styles */

const base =
  "w-full rounded-xl border bg-paper px-4 text-sm text-ink outline-none transition-colors placeholder:text-mist/70";

const control = (invalid) =>
  `${base} h-13 ${invalid ? "border-clay focus:border-clay" : "border-line-strong focus:border-volt-deep"}`;

const labelStyle = "mb-2 block text-sm font-medium text-ink";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  topic: ENQUIRY_TOPICS[0].value,
  message: "",
};

function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-xs font-medium leading-relaxed text-clay">
      {children}
    </p>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  // a field only shows its error once it has been left or the form submitted
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);

  // one ref per control, so a failed submit can put the cursor in the first
  // field that needs fixing rather than leaving it to be hunted for
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const topicRef = useRef(null);
  const messageRef = useRef(null);
  const refs = {
    name: nameRef,
    email: emailRef,
    phone: phoneRef,
    topic: topicRef,
    message: messageRef,
  };

  const errorFor = (key) => (touched[key] ? errors[key] : "");

  const change = (key) => (event) => {
    const { value } = event.target;
    setForm((current) => ({ ...current, [key]: value }));
    // re-validate as they type only once the field has already been marked
    // wrong, so a correction clears the message the moment it is correct
    if (touched[key]) {
      setErrors((current) => ({ ...current, [key]: VALIDATORS[key](value) }));
    }
  };

  const blur = (key) => (event) => {
    setTouched((current) => ({ ...current, [key]: true }));
    setErrors((current) => ({ ...current, [key]: VALIDATORS[key](event.target.value) }));
  };

  // the thank-you is on a timer, so it has to be cleared if the visitor
  // navigates away before it runs
  const timer = useRef(null);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const submit = (event) => {
    event.preventDefault();

    const found = {};
    for (const key of FIELDS) found[key] = VALIDATORS[key](form[key]);

    setErrors(found);
    setTouched(Object.fromEntries(FIELDS.map((key) => [key, true])));

    const firstBad = FIELDS.find((key) => found[key]);
    if (firstBad) {
      refs[firstBad]?.current?.focus();
      return;
    }

    // The form is presentational for now — nothing is posted anywhere. Say
    // thank you, then hand back a clean form so the page is usable again.
    setSent(true);
    setForm(EMPTY);
    setErrors({});
    setTouched({});
    toast.success("Thanks — we have your message.");

    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSent(false), THANKS_MS);
  };

  if (sent) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-3xl border border-line bg-surface p-6 text-center sm:p-8"
      >
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-volt text-ink">
          <CheckIcon className="size-6" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight">
          Message received
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-mist">
          We answer inside one working day, {contact.hours.toLowerCase()}. If it
          is urgent, ring us on{" "}
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="text-volt-deep underline-offset-4 hover:underline"
          >
            {contact.phone}
          </a>
          .
        </p>
        <p className="mt-6 text-xs text-mist">
          Bringing the form back in a moment&hellip;
        </p>
      </div>
    );
  }

  const messageLeft = MESSAGE_MAX - form.message.length;

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-3xl border border-line bg-surface p-6 sm:p-8"
    >
      <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.03em]">
        Send us an enquiry
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-mist">
        Orders, sizing, bulk kit for a club — whatever it is, one of us reads it
        and replies inside a working day. All fields are required.
      </p>

      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="enquiry-name" className={labelStyle}>
            Your name
          </label>
          <input
            id="enquiry-name"
            ref={nameRef}
            name="name"
            autoComplete="name"
            maxLength={NAME_MAX}
            required
            aria-required="true"
            aria-invalid={errorFor("name") ? "true" : undefined}
            aria-describedby={errorFor("name") ? "enquiry-name-error" : undefined}
            value={form.name}
            onChange={change("name")}
            onBlur={blur("name")}
            placeholder="Ananya Rao"
            className={control(errorFor("name"))}
          />
          <FieldError id="enquiry-name-error">{errorFor("name")}</FieldError>
        </div>

        <div>
          <label htmlFor="enquiry-email" className={labelStyle}>
            Email
          </label>
          <input
            id="enquiry-email"
            ref={emailRef}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            required
            aria-required="true"
            aria-invalid={errorFor("email") ? "true" : undefined}
            aria-describedby={errorFor("email") ? "enquiry-email-error" : undefined}
            value={form.email}
            onChange={change("email")}
            onBlur={blur("email")}
            placeholder="you@example.com"
            className={control(errorFor("email"))}
          />
          <FieldError id="enquiry-email-error">{errorFor("email")}</FieldError>
        </div>

        <div>
          <label htmlFor="enquiry-phone" className={labelStyle}>
            Phone
          </label>
          <input
            id="enquiry-phone"
            ref={phoneRef}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={18}
            required
            aria-required="true"
            aria-invalid={errorFor("phone") ? "true" : undefined}
            aria-describedby={errorFor("phone") ? "enquiry-phone-error" : undefined}
            value={form.phone}
            onChange={change("phone")}
            onBlur={blur("phone")}
            placeholder="98765 43210"
            className={control(errorFor("phone"))}
          />
          <FieldError id="enquiry-phone-error">{errorFor("phone")}</FieldError>
        </div>

        <div>
          <label htmlFor="enquiry-topic" className={labelStyle}>
            What is it about
          </label>
          <select
            id="enquiry-topic"
            ref={topicRef}
            name="topic"
            required
            aria-required="true"
            aria-invalid={errorFor("topic") ? "true" : undefined}
            aria-describedby={errorFor("topic") ? "enquiry-topic-error" : undefined}
            value={form.topic}
            onChange={change("topic")}
            onBlur={blur("topic")}
            className={`${control(errorFor("topic"))} pr-10`}
          >
            {ENQUIRY_TOPICS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError id="enquiry-topic-error">{errorFor("topic")}</FieldError>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="enquiry-message" className={labelStyle}>
            Message
          </label>
          <textarea
            id="enquiry-message"
            ref={messageRef}
            name="message"
            rows={6}
            maxLength={MESSAGE_MAX}
            required
            aria-required="true"
            aria-invalid={errorFor("message") ? "true" : undefined}
            aria-describedby={
              errorFor("message") ? "enquiry-message-error" : "enquiry-message-count"
            }
            value={form.message}
            onChange={change("message")}
            onBlur={blur("message")}
            placeholder="Tell us what you need — include your order number if you have one."
            className={`${base} resize-y py-3.5 leading-relaxed ${
              errorFor("message")
                ? "border-clay focus:border-clay"
                : "border-line-strong focus:border-volt-deep"
            }`}
          />
          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4">
            <FieldError id="enquiry-message-error">{errorFor("message")}</FieldError>
            <p
              id="enquiry-message-count"
              className={`ml-auto text-xs ${messageLeft < 50 ? "text-clay" : "text-mist"}`}
            >
              {messageLeft} characters left
            </p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="group mt-7 inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-volt px-8 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
      >
        Send enquiry
        <ArrowIcon className="size-4 transition-transform duration-400 group-hover:translate-x-1.5" />
      </button>

      <p className="mt-4 text-xs leading-relaxed text-mist">
        We use your details to answer this enquiry and nothing else — see the{" "}
        <a
          href="/privacy-policy"
          className="text-volt-deep underline-offset-4 hover:underline"
        >
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
