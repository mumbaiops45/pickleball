"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import OtpInput from "@/components/auth/OtpInput";
import PasswordToggle from "@/components/auth/PasswordToggle";
import { ArrowIcon, MailIcon } from "@/components/ui/Icons";
import { Accent } from "@/components/ui/Heading";
import { requestPasswordReset, resetPassword } from "@/lib/services/auth";
import { errorMessage } from "@/lib/api";
import { toast } from "@/store/toast";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MIN_PASSWORD = 6;
const OTP_LENGTH = 6;

/**
 * What a 404 from the reset routes actually means. The API has no
 * forgot-password endpoint yet, so "something went wrong" would leave shoppers
 * pressing the same button expecting a different answer.
 */
const NOT_ENABLED =
  "Reset by email is not switched on yet. Please write to hello@paddlehaus.in and we will get you back in.";

const field =
  "h-13 w-full rounded-xl border border-line-strong bg-paper px-4 text-sm text-ink outline-none transition-colors placeholder:text-mist/70 focus:border-volt-deep";

const label = "mb-2 block text-sm font-medium text-ink";

const primary =
  "inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-volt px-8 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60";

const quiet =
  "text-xs text-volt-deep underline-offset-4 transition-colors hover:underline";

const panel = "rounded-3xl border border-line bg-surface p-6 sm:p-8";

function Problem({ children }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-3 text-xs font-medium text-clay">
      {children}
    </p>
  );
}

/* --------------------------------------------------------- reset by email */

/**
 * Two steps, one panel: the address gets a six-digit code, then the code comes
 * back with the new password. Asking for the code and the password together
 * keeps it to a single verification round trip — the server checks the code as
 * it writes the password, so there is no window where a verified code sits
 * around waiting to be used.
 */
function EmailReset() {
  const router = useRouter();

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [shown, setShown] = useState(false);

  const [pending, setPending] = useState(false);
  const [problem, setProblem] = useState("");
  const [note, setNote] = useState("");

  const sendCode = async (event) => {
    event?.preventDefault();

    if (!EMAIL_REGEX.test(email.trim())) {
      setProblem("Please enter a valid email address.");
      return;
    }

    setProblem("");
    setPending(true);

    try {
      const result = await requestPasswordReset({ email: email.trim() });
      const message =
        result.message || `We sent a ${OTP_LENGTH}-digit code to ${email.trim()}.`;
      setNote(message);
      toast.success(message);
      setStep("code");
    } catch (error) {
      setProblem(
        error?.status === 404
          ? NOT_ENABLED
          : errorMessage(error, "Could not send the code."),
      );
    } finally {
      setPending(false);
    }
  };

  const submitReset = async (event) => {
    event.preventDefault();

    if (otp.replace(/\D/g, "").length !== OTP_LENGTH) {
      setProblem(`Enter the ${OTP_LENGTH}-digit code from your email.`);
      return;
    }
    if (password.length < MIN_PASSWORD) {
      setProblem(`Password must be at least ${MIN_PASSWORD} characters.`);
      return;
    }
    if (password !== confirm) {
      setProblem("Both passwords must match.");
      return;
    }

    setProblem("");
    setPending(true);

    try {
      const result = await resetPassword({
        email: email.trim(),
        otp: otp.replace(/\D/g, ""),
        password,
      });

      toast.success(result.message || "Your password has been changed.");
      // a controller that hands back a token has already signed them in
      router.push(result.user ? "/account" : "/");
    } catch (error) {
      setProblem(
        error?.status === 404
          ? NOT_ENABLED
          : errorMessage(error, "That code was not accepted."),
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={step === "email" ? sendCode : submitReset}
      noValidate
      className={panel}
    >
      <h2 className="text-lg font-semibold">Reset by email</h2>
      <p className="mt-2 text-sm leading-relaxed text-mist">
        {step === "email"
          ? `Enter your email and we will send a ${OTP_LENGTH}-digit code to it.`
          : note}
      </p>

      {step === "email" ? (
        <div className="mt-6">
          <label htmlFor="reset-email" className={label}>
            Email
          </label>
          <input
            id="reset-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setProblem("");
            }}
            placeholder="you@example.com"
            className={field}
          />
        </div>
      ) : (
        <>
          <div className="mt-6">
            <p className={label}>Code from your email</p>
            <OtpInput
              value={otp}
              onChange={(next) => {
                setOtp(next);
                setProblem("");
              }}
            />

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setOtp("");
                  setProblem("");
                }}
                className={quiet}
              >
                Change email
              </button>
              <button
                type="button"
                onClick={sendCode}
                disabled={pending}
                className={`${quiet} disabled:opacity-60`}
              >
                Resend code
              </button>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="reset-new-password" className={label}>
              New password
            </label>
            <div className="relative">
              <input
                id="reset-new-password"
                type={shown ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setProblem("");
                }}
                placeholder={`At least ${MIN_PASSWORD} characters`}
                className={`${field} pr-12`}
              />
              <PasswordToggle
                shown={shown}
                onToggle={() => setShown((current) => !current)}
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="reset-confirm-password" className={label}>
              Confirm password
            </label>
            <input
              id="reset-confirm-password"
              type={shown ? "text" : "password"}
              autoComplete="new-password"
              value={confirm}
              onChange={(event) => {
                setConfirm(event.target.value);
                setProblem("");
              }}
              placeholder="Repeat it"
              className={field}
            />
          </div>
        </>
      )}

      <Problem>{problem}</Problem>

      <button type="submit" disabled={pending} className={`${primary} mt-6`}>
        {pending
          ? "Working…"
          : step === "email"
            ? "Send me a code"
            : "Set new password"}
        {pending ? null : step === "email" ? (
          <MailIcon className="size-4" />
        ) : (
          <ArrowIcon className="size-4" />
        )}
      </button>
    </form>
  );
}

/* -------------------------------------------------------------------- page */

export default function ForgotPasswordView() {
  return (
    <div className="mx-auto w-full max-w-xl px-5 py-12 sm:px-8 lg:py-16">
      <EmailReset />

      <p className="mt-10 text-center text-sm text-mist">
        Remembered it?{" "}
        <Link
          href="/"
          className="font-medium text-volt-deep underline-offset-4 hover:underline"
        >
          Back to the shop
        </Link>{" "}
        and sign in from the header.
      </p>

      <p className="mt-4 text-center text-xs text-mist">
        Need a hand? Write to{" "}
        <Accent>
          <a href="mailto:hello@paddlehaus.in">hello@paddlehaus.in</a>
        </Accent>
        .
      </p>
    </div>
  );
}
