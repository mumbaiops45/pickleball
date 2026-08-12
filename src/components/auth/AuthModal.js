"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import OtpInput from "@/components/auth/OtpInput";
import PaddleArt from "@/components/art/PaddleArt";
import BallArt from "@/components/art/BallArt";
import { LogoMark } from "@/components/ui/Logo";
import { ArrowIcon, CloseIcon } from "@/components/ui/Icons";
import { useAuth } from "@/store/AuthProvider";

const RESEND_SECONDS = 30;

const PERKS = [
  "Track orders and re-order in two taps",
  "Early access to every limited drop",
  "₹500 credit on your first order",
];

export default function AuthModal() {
  const { modalOpen, closeAuth, completeSignIn } = useAuth();

  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);

  const phoneRef = useRef(null);

  const phoneValid = /^[6-9]\d{9}$/.test(phone);
  const otpValid = otp.replace(/\D/g, "").length === 6;

  // lock the page behind the modal and close on Escape
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (event) => {
      if (event.key === "Escape") closeAuth();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modalOpen, closeAuth]);

  // reset the flow a moment after closing, so it does not flicker mid-animation
  useEffect(() => {
    if (modalOpen) return;
    const timer = window.setTimeout(() => {
      setStep("phone");
      setOtp("");
      setName("");
      setError("");
    }, 400);
    return () => window.clearTimeout(timer);
  }, [modalOpen]);

  // resend cooldown
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = window.setInterval(
      () => setCountdown((current) => current - 1),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [countdown]);

  const sendOtp = (event) => {
    event.preventDefault();
    if (!phoneValid) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    setError("");
    setOtp("");
    setCountdown(RESEND_SECONDS);
    setStep("otp");
  };

  const verifyOtp = (event) => {
    event.preventDefault();
    if (!otpValid) {
      setError("Enter the 6-digit code.");
      return;
    }
    setError("");
    setStep("profile");
  };

  const finish = (event) => {
    event.preventDefault();
    completeSignIn({ phone: `+91 ${phone}`, name });
  };

  return (
    <div
      className={`fixed inset-0 z-80 grid place-items-center px-4 ${
        modalOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      // the dialog stays mounted so it can animate; `inert` keeps its inputs
      // out of the tab order and the accessibility tree while it is closed
      inert={!modalOpen}
    >
      <button
        type="button"
        tabIndex={modalOpen ? 0 : -1}
        aria-label="Close sign in"
        onClick={closeAuth}
        className={`absolute inset-0 bg-ink/55 backdrop-blur-sm transition-opacity duration-400 ${
          modalOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Login or sign up"
        className={`relative w-full max-w-md overflow-hidden rounded-3xl bg-paper shadow-[0_40px_80px_-20px_rgba(15,17,21,.45)] transition-all duration-400 ease-[cubic-bezier(.16,1,.3,1)] ${
          modalOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-6 scale-95 opacity-0"
        }`}
      >
        {/* ---------------------------------------------------------- banner */}
        <div className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#d4ff3f_0%,#a9dd00_55%,#7ba500_100%)] px-7 py-7">
          <span className="pointer-events-none absolute -right-6 -top-10 size-40 rounded-full bg-paper/25 blur-2xl" />

          <div className="pointer-events-none absolute -right-2 -top-4 w-28 rotate-[18deg] opacity-95 sm:w-32">
            <PaddleArt
              id="auth-modal-paddle"
              face="#0f1115"
              edge="#0b0d10"
              grip="#1b1f26"
              texture="carbon"
              className="w-full drop-shadow-[0_18px_30px_rgba(15,17,21,.35)]"
            />
          </div>
          <div className="pointer-events-none absolute bottom-2 right-28 w-10 opacity-90">
            <div className="float-slow">
              <BallArt id="auth-modal-ball" color="#f5f3ed" className="w-full" />
            </div>
          </div>

          <button
            type="button"
            tabIndex={modalOpen ? 0 : -1}
            onClick={closeAuth}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full text-ink/60 transition-colors hover:bg-ink/10 hover:text-ink"
          >
            <CloseIcon className="size-4.5" />
          </button>

          <div className="relative max-w-[62%]">
            <LogoMark size="sm" tone="ink" />
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
              New here?
            </h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink/75">
              Log in for member pricing, faster checkout and first look at every
              drop.
            </p>
          </div>
        </div>

        {/* ------------------------------------------------------------ body */}
        <div className="px-7 pb-7 pt-6">
          {step === "phone" ? (
            <form onSubmit={sendOtp} noValidate>
              <h3 className="text-xl font-semibold tracking-tight">
                Login <span className="font-normal text-mist">or</span> Sign up
              </h3>
              <p className="mt-1.5 text-sm text-mist">
                Access offers, save a wishlist and place orders quickly.
              </p>

              <div className="mt-6">
                <label htmlFor="auth-phone" className="sr-only">
                  Mobile number
                </label>
                <div
                  className={`flex overflow-hidden rounded-2xl border transition-colors ${
                    error ? "border-clay" : "border-line-strong focus-within:border-volt-deep"
                  }`}
                >
                  <span className="grid w-16 shrink-0 place-items-center border-r border-line bg-surface text-sm font-medium text-ink">
                    +91
                  </span>
                  <input
                    id="auth-phone"
                    ref={phoneRef}
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={10}
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value.replace(/\D/g, "").slice(0, 10));
                      setError("");
                    }}
                    placeholder="Enter your phone number"
                    className="h-14 min-w-0 flex-1 bg-paper px-4 text-sm text-ink outline-none placeholder:text-mist/70"
                  />
                </div>
                {error ? <p className="mt-2 text-xs text-clay">{error}</p> : null}
              </div>

              <button
                type="submit"
                disabled={!phoneValid}
                className="mt-4 h-14 w-full rounded-2xl bg-volt text-sm font-semibold text-ink transition-all duration-300 enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-mist"
              >
                Continue
              </button>

              <div className="my-6 flex items-center gap-4">
                <span className="h-px flex-1 bg-line" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mist">
                  or login with
                </span>
                <span className="h-px flex-1 bg-line" />
              </div>

              <button
                type="button"
                disabled
                title="Social sign-in is not wired up in this static demo"
                className="flex h-13 w-full items-center justify-center gap-3 rounded-2xl border border-line-strong text-sm font-medium text-mist disabled:cursor-not-allowed"
              >
                <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                  <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.700c2.2-2 3.4-5 3.4-8.6Z" />
                  <path fill="#34A853" d="M12 23.5c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3A11.5 11.5 0 0 0 12 23.5Z" />
                  <path fill="#FBBC05" d="M5.6 14.2a6.9 6.9 0 0 1 0-4.4v-3H1.8a11.5 11.5 0 0 0 0 10.4l3.8-3Z" />
                  <path fill="#EA4335" d="M12 5.1c1.7 0 3.2.6 4.4 1.7l3.3-3.3A11.5 11.5 0 0 0 1.8 6.8l3.8 3c.9-2.7 3.4-4.7 6.4-4.7Z" />
                </svg>
                Continue with Google
              </button>

              <p className="mt-6 text-center text-[11px] leading-relaxed text-mist">
                By continuing you agree to the{" "}
                <Link href="/shop" onClick={closeAuth} className="text-volt-deep underline-offset-2 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/shop" onClick={closeAuth} className="text-volt-deep underline-offset-2 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          ) : null}

          {step === "otp" ? (
            <form onSubmit={verifyOtp} noValidate>
              <h3 className="text-xl font-semibold tracking-tight">
                Verify your number
              </h3>
              <p className="mt-1.5 text-sm text-mist">
                We sent a 6-digit code to{" "}
                <span className="font-medium text-ink">+91 {phone}</span>.
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="ml-2 text-volt-deep underline-offset-4 hover:underline"
                >
                  Change
                </button>
              </p>

              <div className="mt-6">
                <OtpInput
                  value={otp}
                  onChange={(next) => {
                    setOtp(next);
                    setError("");
                  }}
                />
                {error ? <p className="mt-2 text-xs text-clay">{error}</p> : null}
                <p className="mt-3 rounded-xl bg-surface px-3 py-2 text-[11px] text-mist">
                  Demo build — no SMS is sent. Any 6 digits will verify.
                </p>
              </div>

              <button
                type="submit"
                disabled={!otpValid}
                className="mt-5 h-14 w-full rounded-2xl bg-volt text-sm font-semibold text-ink transition-all duration-300 enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-mist"
              >
                Verify and continue
              </button>

              <p className="mt-4 text-center text-xs text-mist">
                {countdown > 0 ? (
                  <>Resend code in {countdown}s</>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCountdown(RESEND_SECONDS)}
                    className="text-volt-deep underline-offset-4 hover:underline"
                  >
                    Resend code
                  </button>
                )}
              </p>
            </form>
          ) : null}

          {step === "profile" ? (
            <form onSubmit={finish} noValidate>
              <h3 className="text-xl font-semibold tracking-tight">
                What should we call you?
              </h3>
              <p className="mt-1.5 text-sm text-mist">
                Last step — this is the name on your orders.
              </p>

              <div className="mt-6">
                <label htmlFor="auth-name" className="sr-only">
                  Full name
                </label>
                <input
                  id="auth-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  placeholder="Ananya Rao"
                  className="h-14 w-full rounded-2xl border border-line-strong bg-paper px-4 text-sm text-ink outline-none transition-colors placeholder:text-mist/70 focus:border-volt-deep"
                />
              </div>

              <ul className="mt-6 flex flex-col gap-2 rounded-2xl bg-surface p-4">
                {PERKS.map((perk) => (
                  <li key={perk} className="flex gap-3 text-[13px] text-mist">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt-deep" />
                    {perk}
                  </li>
                ))}
              </ul>

              <button
                type="submit"
                className="group mt-6 flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-volt text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start shopping
                <ArrowIcon className="size-4 transition-transform duration-400 group-hover:translate-x-1.5" />
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
}
