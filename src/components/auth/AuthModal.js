"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import OtpInput from "@/components/auth/OtpInput";
import PasswordToggle from "@/components/auth/PasswordToggle";
import PaddleArt from "@/components/art/PaddleArt";
import BallArt from "@/components/art/BallArt";
import { LogoMark } from "@/components/ui/Logo";
import { ArrowIcon, CloseIcon } from "@/components/ui/Icons";
import { useAuth } from "@/store/AuthProvider";
import { errorMessage } from "@/lib/api";
import { toast } from "@/store/toast";

const RESEND_SECONDS = 30;

/** Shown when an endpoint succeeds but hands back no token to sign in with. */
const NO_SESSION =
  "Verified, but the server did not return a login token. Use email and password for now.";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;

export default function AuthModal() {
  const {
    modalOpen,
    closeAuth,
    signInWithPassword,
    registerAccount,
    requestOtp,
    signInWithOtp,
  } = useAuth();

  // blocks a second submit while a request is in flight
  const [pending, setPending] = useState(false);

  // ============================================================
  // AUTH MODE
  // ============================================================

  const [authMode, setAuthMode] = useState("login");

  // password | otp
  const [loginMethod, setLoginMethod] = useState("password");

  // ============================================================
  // LOGIN - PASSWORD
  // ============================================================

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // ============================================================
  // LOGIN - OTP
  // ============================================================

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState("phone");
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(0);

  // ============================================================
  // REGISTER
  // ============================================================

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");

  // ============================================================
  // VALIDATION
  // ============================================================

  const loginEmailValid = EMAIL_REGEX.test(
    loginEmail.trim()
  );

  const loginPasswordValid =
    loginPassword.length >= 6;

  const phoneValid = PHONE_REGEX.test(phone);

  const otpValid =
    otp.replace(/\D/g, "").length === 6;

  const registerNameValid =
    registerName.trim().length >= 2;

  const registerEmailValid =
    EMAIL_REGEX.test(registerEmail.trim());

  const registerPhoneValid =
    PHONE_REGEX.test(registerPhone);

  const registerPasswordValid =
    registerPassword.length >= 6;

  // ============================================================
  // LOCK BODY SCROLL + ESCAPE
  // ============================================================

  useEffect(() => {
    if (!modalOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeAuth();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [modalOpen, closeAuth]);

  // ============================================================
  // RESET MODAL WHEN CLOSED
  // ============================================================

  useEffect(() => {
    if (modalOpen) return;

    const timer = window.setTimeout(() => {
      setAuthMode("login");
      setLoginMethod("password");

      setLoginEmail("");
      setLoginPassword("");
      // a reopened modal must never start with a password on show
      setShowLoginPassword(false);
      setLoginError("");

      setPhone("");
      setOtp("");
      setOtpStep("phone");
      setOtpError("");
      setCountdown(0);

      setRegisterName("");
      setRegisterEmail("");
      setRegisterPhone("");
      setRegisterPassword("");
      setShowRegisterPassword(false);
      setRegisterError("");

      setPending(false);
    }, 400);

    return () => {
      window.clearTimeout(timer);
    };
  }, [modalOpen]);

  // ============================================================
  // OTP COUNTDOWN
  // ============================================================

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = window.setInterval(() => {
      setCountdown((current) =>
        current > 0 ? current - 1 : 0
      );
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [countdown]);

  // ============================================================
  // PASSWORD LOGIN
  // ============================================================

  const handlePasswordLogin = async (event) => {
    event.preventDefault();

    setLoginError("");

    if (!loginEmail.trim()) {
      setLoginError(
        "Please enter your email address."
      );
      return;
    }

    if (!loginEmailValid) {
      setLoginError(
        "Please enter a valid email address."
      );
      return;
    }

    if (!loginPassword) {
      setLoginError(
        "Please enter your password."
      );
      return;
    }

    if (!loginPasswordValid) {
      setLoginError(
        "Password must be at least 6 characters."
      );
      return;
    }

    setPending(true);
    try {
      const result = await signInWithPassword({
        email: loginEmail.trim(),
        password: loginPassword,
      });

      if (result.user) {
        toast.success(result.message || `Welcome back, ${result.user.name}.`);
      } else {
        toast.info(result.message || "Signed in.");
        setLoginError(NO_SESSION);
      }
    } catch (error) {
      const message = errorMessage(error, "Could not sign you in.");
      setLoginError(message);
      toast.error(message);
    } finally {
      setPending(false);
    }
  };

  // ============================================================
  // SEND OTP
  // ============================================================

  const handleSendOtp = async (event) => {
    event.preventDefault();

    setOtpError("");

    if (!phone) {
      setOtpError(
        "Please enter your mobile number."
      );
      return;
    }

    if (!phoneValid) {
      setOtpError(
        "Enter a valid 10-digit Indian mobile number."
      );
      return;
    }

    setPending(true);
    try {
      const result = await requestOtp({ phone });
      toast.success(result?.message || `OTP sent to +91 ${phone}.`);
      setOtp("");
      setCountdown(RESEND_SECONDS);
      setOtpStep("otp");
    } catch (error) {
      const message = errorMessage(error, "Could not send the OTP.");
      setOtpError(message);
      toast.error(message);
    } finally {
      setPending(false);
    }
  };

  // ============================================================
  // VERIFY OTP
  // ============================================================

  const handleVerifyOtp = async (event) => {
    event.preventDefault();

    setOtpError("");

    if (!otpValid) {
      setOtpError(
        "Enter the 6-digit OTP."
      );
      return;
    }

    setPending(true);
    try {
      const result = await signInWithOtp({ phone, otp });

      // verify-otp currently answers {success, message} with no token, so the
      // phone is confirmed but no session exists — say so instead of sitting
      // on a modal that looks like it did nothing
      if (result.user) {
        toast.success(result.message || "Signed in.");
      } else {
        toast.info(result.message || "OTP verified.");
        setOtpError(NO_SESSION);
      }
    } catch (error) {
      const message = errorMessage(error, "That OTP did not work.");
      setOtpError(message);
      toast.error(message);
    } finally {
      setPending(false);
    }
  };

  // ============================================================
  // REGISTER
  // ============================================================

  const handleRegister = async (event) => {
    event.preventDefault();

    setRegisterError("");

    if (!registerName.trim()) {
      setRegisterError(
        "Please enter your full name."
      );
      return;
    }

    if (!registerEmail.trim()) {
      setRegisterError(
        "Please enter your email address."
      );
      return;
    }

    if (!registerEmailValid) {
      setRegisterError(
        "Please enter a valid email address."
      );
      return;
    }

    if (!registerPhone) {
      setRegisterError(
        "Please enter your mobile number."
      );
      return;
    }

    if (!registerPhoneValid) {
      setRegisterError(
        "Enter a valid 10-digit mobile number."
      );
      return;
    }

    if (!registerPassword) {
      setRegisterError(
        "Please create a password."
      );
      return;
    }

    if (!registerPasswordValid) {
      setRegisterError(
        "Password must be at least 6 characters."
      );
      return;
    }

    setPending(true);
    try {
      const result = await registerAccount({
        name: registerName.trim(),
        email: registerEmail.trim(),
        phone: registerPhone,
        password: registerPassword,
      });

      toast.success(result.message || "Account created.");

      // POST /auth/register returns the new user but no token, so the account
      // exists and is not signed in — hand them straight to the login form
      if (!result.user) {
        setAuthMode("login");
        setLoginMethod("password");
        setLoginEmail(registerEmail.trim());
        setLoginError("Account created. Please log in.");
      }
    } catch (error) {
      const message = errorMessage(error, "Could not create your account.");
      setRegisterError(message);
      toast.error(message);
    } finally {
      setPending(false);
    }
  };

  // ============================================================
  // SWITCH TO REGISTER
  // ============================================================

  const openRegister = () => {
    setAuthMode("register");

    setLoginError("");
    setOtpError("");
  };

  // ============================================================
  // SWITCH BACK TO LOGIN
  // ============================================================

  const openLogin = () => {
    setAuthMode("login");

    setLoginMethod("password");

    setRegisterError("");
  };

  // ============================================================
  // SWITCH LOGIN METHOD
  // ============================================================

  const selectPasswordLogin = () => {
    setLoginMethod("password");

    setLoginError("");
    setOtpError("");
    setOtpStep("phone");
    setOtp("");
  };

  const selectOtpLogin = () => {
    setLoginMethod("otp");

    setLoginError("");
    setOtpError("");
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div
      className={`fixed inset-0 z-[80] grid place-items-center px-4 ${
        modalOpen
          ? "pointer-events-auto"
          : "pointer-events-none"
      }`}
      aria-hidden={!modalOpen}
    >
      {/* ======================================================
          BACKDROP
      ======================================================= */}

      <button
        type="button"
        tabIndex={modalOpen ? 0 : -1}
        aria-label="Close login"
        onClick={closeAuth}
        className={`absolute inset-0 bg-ink/55 backdrop-blur-sm transition-opacity duration-400 ${
          modalOpen
            ? "opacity-100"
            : "opacity-0"
        }`}
      />

      {/* ======================================================
          MODAL
      ======================================================= */}

      <div
        role="dialog"
        aria-modal="true"
        aria-label={
          authMode === "login"
            ? "Login"
            : "Create account"
        }
        className={`relative flex w-full max-w-[540px] max-h-[92vh] flex-col overflow-hidden rounded-3xl bg-paper shadow-[0_40px_80px_-20px_rgba(15,17,21,.45)] transition-all duration-400 ease-[cubic-bezier(.16,1,.3,1)] ${
          modalOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-6 scale-95 opacity-0"
        }`}
      >
        {/* ====================================================
            HEADER
        ===================================================== */}

        <div className="relative isolate shrink-0 overflow-hidden bg-[linear-gradient(135deg,#d4ff3f_0%,#a9dd00_55%,#7ba500_100%)] px-6 py-5">
          {/* Decorative glow */}
          <span className="pointer-events-none absolute -right-6 -top-10 size-40 rounded-full bg-paper/25 blur-2xl" />

          {/* ==================================================
              PADDLE
          =================================================== */}

          <div className="pointer-events-none absolute -right-2 -top-4 w-24 rotate-[18deg] opacity-95 sm:w-28">
            <PaddleArt
              id="auth-modal-paddle"
              face="#0f1115"
              edge="#0b0d10"
              grip="#1b1f26"
              texture="carbon"
              className="w-full drop-shadow-[0_18px_30px_rgba(15,17,21,.35)]"
            />
          </div>

          {/* ==================================================
              BALL
          =================================================== */}

          <div className="pointer-events-none absolute bottom-2 right-24 w-9 opacity-90">
            <div className="float-slow">
              <BallArt
                id="auth-modal-ball"
                color="#f5f3ed"
                className="w-full"
              />
            </div>
          </div>

          {/* ==================================================
              CLOSE
          =================================================== */}

          <button
            type="button"
            tabIndex={modalOpen ? 0 : -1}
            onClick={closeAuth}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full text-ink/60 transition-colors hover:bg-ink/10 hover:text-ink"
          >
            <CloseIcon className="size-4" />
          </button>

          {/* ==================================================
              HEADER CONTENT
          =================================================== */}

          <div className="relative max-w-[68%]">
            <LogoMark
              size="sm"
              tone="ink"
            />

            {authMode === "login" ? (
              <>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink">
                  Welcome back
                </h2>

                <p className="mt-1 text-[12px] leading-relaxed text-ink/75">
                  Login to your account for member
                  pricing, faster checkout and exclusive
                  drops.
                </p>
              </>
            ) : (
              <>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink">
                  Create your account
                </h2>

                <p className="mt-1 text-[12px] leading-relaxed text-ink/75">
                  Join PaddleHaus and get access to
                  exclusive offers and faster checkout.
                </p>
              </>
            )}
          </div>
        </div>

        {/* ====================================================
            BODY
        ===================================================== */}

        <div className="min-h-0 flex-1 overflow-y-auto px-7 pb-6 pt-5">
          {/* ==================================================
              LOGIN
          =================================================== */}

          {authMode === "login" && (
            <>
              <h3 className="text-xl font-semibold tracking-tight text-ink">
                Login to your account
              </h3>

              {/* =================================================
                  LOGIN TABS
              ================================================== */}

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={selectPasswordLogin}
                  className={`h-12 rounded-xl border text-sm font-medium transition-all ${
                    loginMethod === "password"
                      ? "border-volt bg-volt/5 text-ink"
                      : "border-line-strong bg-paper text-ink hover:border-volt"
                  }`}
                >
                  Login with Password
                </button>

                <button
                  type="button"
                  onClick={selectOtpLogin}
                  className={`h-12 rounded-xl border text-sm font-medium transition-all ${
                    loginMethod === "otp"
                      ? "border-volt bg-volt/5 text-ink"
                      : "border-line-strong bg-paper text-ink hover:border-volt"
                  }`}
                >
                  Login with OTP
                </button>
              </div>

              {/* =================================================
                  PASSWORD LOGIN
              ================================================== */}

              {loginMethod === "password" && (
                <form
                  onSubmit={handlePasswordLogin}
                  noValidate
                >
                  {/* Email */}

                  <div className="mt-4">
                    <label
                      htmlFor="login-email"
                      className="mb-2 block text-sm font-medium text-ink"
                    >
                      Email Address
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      value={loginEmail}
                      onChange={(event) => {
                        setLoginEmail(
                          event.target.value
                        );
                        setLoginError("");
                      }}
                      placeholder="Email Address"
                      className={`h-13 w-full rounded-xl border bg-paper px-4 text-sm text-ink outline-none transition-colors placeholder:text-mist/70 ${
                        loginError
                          ? "border-clay"
                          : "border-line-strong focus:border-volt-deep"
                      }`}
                    />
                  </div>

                  {/* Password */}

                  <div className="mt-4">
                    <label
                      htmlFor="login-password"
                      className="mb-2 block text-sm font-medium text-ink"
                    >
                      Password
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <input
                        id="login-password"
                        type={showLoginPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={loginPassword}
                        onChange={(event) => {
                          setLoginPassword(
                            event.target.value
                          );
                          setLoginError("");
                        }}
                        placeholder="Password"
                        className={`h-13 w-full rounded-xl border bg-paper pl-4 pr-12 text-sm text-ink outline-none transition-colors placeholder:text-mist/70 ${
                          loginError
                            ? "border-clay"
                            : "border-line-strong focus:border-volt-deep"
                        }`}
                      />

                      <PasswordToggle
                        shown={showLoginPassword}
                        onToggle={() =>
                          setShowLoginPassword(
                            (current) => !current
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* Error */}

                  {loginError && (
                    <p
                      role="alert"
                      className="mt-2 text-xs font-medium text-clay"
                    >
                      {loginError}
                    </p>
                  )}

                  {/* Forgot Password */}

                  <div className="mt-3 text-right">
                    <Link
                      href="/forgot-password"
                      onClick={closeAuth}
                      className="text-sm font-medium text-volt-deep underline-offset-2 hover:underline"
                    >
                      Forgot Password via Email?
                    </Link>
                  </div>

                  {/* Login */}

                  <button
                    type="submit"
                    disabled={pending}
                    className="mt-4 h-13 w-full rounded-xl bg-volt text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {pending ? "Logging in…" : "Login Now"}
                  </button>
                </form>
              )}

              {/* =================================================
                  OTP LOGIN
              ================================================== */}

              {loginMethod === "otp" && (
                <>
                  {/* PHONE */}

                  {otpStep === "phone" && (
                    <form
                      onSubmit={handleSendOtp}
                      noValidate
                    >
                      <div className="mt-4">
                        <label
                          htmlFor="login-phone"
                          className="mb-2 block text-sm font-medium text-ink"
                        >
                          Mobile Number
                          <span className="ml-1 text-red-500">
                            *
                          </span>
                        </label>

                        <div
                          className={`flex overflow-hidden rounded-xl border ${
                            otpError
                              ? "border-clay"
                              : "border-line-strong focus-within:border-volt-deep"
                          }`}
                        >
                          <span className="grid w-14 shrink-0 place-items-center border-r border-line bg-surface text-sm font-medium text-ink">
                            +91
                          </span>

                          <input
                            id="login-phone"
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel-national"
                            maxLength={10}
                            value={phone}
                            onChange={(event) => {
                              setPhone(
                                event.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 10)
                              );

                              setOtpError("");
                            }}
                            placeholder="10-digit mobile number"
                            className="h-13 min-w-0 flex-1 bg-paper px-4 text-sm text-ink outline-none placeholder:text-mist/70"
                          />
                        </div>

                        {otpError && (
                          <p className="mt-2 text-xs text-clay">
                            {otpError}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={pending}
                        className="mt-4 h-13 w-full rounded-xl bg-volt text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {pending ? "Sending…" : "Send OTP"}
                      </button>
                    </form>
                  )}

                  {/* OTP */}

                  {otpStep === "otp" && (
                    <form
                      onSubmit={handleVerifyOtp}
                      noValidate
                    >
                      <p className="mt-4 text-sm text-mist">
                        Enter the OTP sent to{" "}
                        <span className="font-medium text-ink">
                          +91 {phone}
                        </span>
                      </p>

                      <div className="mt-4">
                        <OtpInput
                          value={otp}
                          onChange={(next) => {
                            setOtp(next);
                            setOtpError("");
                          }}
                        />

                        {otpError && (
                          <p className="mt-2 text-xs text-clay">
                            {otpError}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={pending}
                        className="mt-4 h-13 w-full rounded-xl bg-volt text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {pending ? "Verifying…" : "Verify OTP"}
                      </button>

                      <div className="mt-3 text-center">
                        {countdown > 0 ? (
                          <p className="text-xs text-mist">
                            Resend OTP in{" "}
                            {countdown}s
                          </p>
                        ) : (
                          <button
                            type="button"
                            disabled={pending}
                            onClick={async () => {
                              setOtpError("");
                              setPending(true);
                              try {
                                const result = await requestOtp({ phone });
                                toast.success(
                                  result?.message || "OTP sent again."
                                );
                                setCountdown(RESEND_SECONDS);
                              } catch (error) {
                                const message = errorMessage(
                                  error,
                                  "Could not resend the OTP."
                                );
                                setOtpError(message);
                                toast.error(message);
                              } finally {
                                setPending(false);
                              }
                            }}
                            className="text-xs font-medium text-volt-deep hover:underline disabled:opacity-60"
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setOtpStep("phone");
                          setOtp("");
                          setOtpError("");
                        }}
                        className="mt-2 w-full text-xs text-mist hover:text-ink"
                      >
                        Change mobile number
                      </button>
                    </form>
                  )}
                </>
              )}

              {/* =================================================
                  REGISTER LINK
              ================================================== */}

              <p className="mt-5 text-center text-sm text-ink">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={openRegister}
                  className="font-medium text-volt-deep hover:underline"
                >
                  Join free today
                </button>
              </p>
            </>
          )}

          {/* ==================================================
              REGISTER
          =================================================== */}

          {authMode === "register" && (
            <form
              onSubmit={handleRegister}
              noValidate
            >
              <h3 className="text-xl font-semibold tracking-tight text-ink">
                Create your account
              </h3>

              <p className="mt-1 text-sm text-mist">
                Join free and start shopping.
              </p>

              {/* Name */}

              <div className="mt-4">
                <label
                  htmlFor="register-name"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  Full Name
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  id="register-name"
                  type="text"
                  autoComplete="name"
                  value={registerName}
                  onChange={(event) => {
                    setRegisterName(
                      event.target.value
                    );
                    setRegisterError("");
                  }}
                  placeholder="Full Name"
                  className="h-13 w-full rounded-xl border border-line-strong bg-paper px-4 text-sm text-ink outline-none transition-colors placeholder:text-mist/70 focus:border-volt-deep"
                />
              </div>

              {/* Email */}

              <div className="mt-4">
                <label
                  htmlFor="register-email"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  Email Address
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  value={registerEmail}
                  onChange={(event) => {
                    setRegisterEmail(
                      event.target.value
                    );
                    setRegisterError("");
                  }}
                  placeholder="Email Address"
                  className="h-13 w-full rounded-xl border border-line-strong bg-paper px-4 text-sm text-ink outline-none transition-colors placeholder:text-mist/70 focus:border-volt-deep"
                />
              </div>

              {/* Mobile */}

              <div className="mt-4">
                <label
                  htmlFor="register-phone"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  Mobile Number
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <div className="flex overflow-hidden rounded-xl border border-line-strong focus-within:border-volt-deep">
                  <span className="grid w-14 shrink-0 place-items-center border-r border-line bg-surface text-sm font-medium text-ink">
                    +91
                  </span>

                  <input
                    id="register-phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={10}
                    value={registerPhone}
                    onChange={(event) => {
                      setRegisterPhone(
                        event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10)
                      );

                      setRegisterError("");
                    }}
                    placeholder="10-digit mobile number"
                    className="h-13 min-w-0 flex-1 bg-paper px-4 text-sm text-ink outline-none placeholder:text-mist/70"
                  />
                </div>
              </div>

              {/* Password */}

              <div className="mt-4">
                <label
                  htmlFor="register-password"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  Password
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <div className="relative">
                  <input
                    id="register-password"
                    type={showRegisterPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={registerPassword}
                    onChange={(event) => {
                      setRegisterPassword(
                        event.target.value
                      );
                      setRegisterError("");
                    }}
                    placeholder="Create password"
                    className="h-13 w-full rounded-xl border border-line-strong bg-paper pl-4 pr-12 text-sm text-ink outline-none transition-colors placeholder:text-mist/70 focus:border-volt-deep"
                  />

                  <PasswordToggle
                    shown={showRegisterPassword}
                    onToggle={() =>
                      setShowRegisterPassword(
                        (current) => !current
                      )
                    }
                  />
                </div>
              </div>

              {/* Error */}

              {registerError && (
                <p
                  role="alert"
                  className="mt-2 text-xs font-medium text-clay"
                >
                  {registerError}
                </p>
              )}

              {/* Register */}

              <button
                type="submit"
                disabled={pending}
                className="mt-4 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-volt text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? "Creating account…" : "Create Account"}

                <ArrowIcon className="size-4" />
              </button>

              {/* Back to Login */}

              <p className="mt-5 text-center text-sm text-ink">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={openLogin}
                  className="font-medium text-volt-deep hover:underline"
                >
                  Login here
                </button>
              </p>

              {/* Terms */}

              <p className="mt-3 text-center text-[11px] leading-relaxed text-mist">
                By creating an account, you agree to our{" "}
                <Link
                  href="/terms"
                  onClick={closeAuth}
                  className="text-volt-deep underline-offset-2 hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  onClick={closeAuth}
                  className="text-volt-deep underline-offset-2 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}