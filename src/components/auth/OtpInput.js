"use client";

import { useRef } from "react";

const LENGTH = 6;

/** Six single-character boxes with auto-advance, backspace and paste support. */
export default function OtpInput({ value, onChange }) {
  const refs = useRef([]);
  const digits = value.padEnd(LENGTH, " ").slice(0, LENGTH).split("");

  const setAt = (index, char) => {
    const next = digits.map((d, i) => (i === index ? char : d)).join("");
    onChange(next.replace(/\s/g, " ").trimEnd());
  };

  const handleChange = (index, raw) => {
    const char = raw.replace(/\D/g, "").slice(-1);
    if (!char) return;
    setAt(index, char);
    if (index < LENGTH - 1) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      if (digits[index] !== " ") {
        setAt(index, " ");
      } else if (index > 0) {
        refs.current[index - 1]?.focus();
        setAt(index - 1, " ");
      }
      return;
    }
    if (event.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < LENGTH - 1)
      refs.current[index + 1]?.focus();
  };

  const handlePaste = (event) => {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    event.preventDefault();
    onChange(pasted.slice(0, LENGTH));
    refs.current[Math.min(pasted.length, LENGTH - 1)]?.focus();
  };

  return (
    <div className="flex gap-2.5" onPaste={handlePaste}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          aria-label={`Digit ${index + 1}`}
          value={digit.trim()}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          className="h-13 w-full min-w-0 rounded-xl border border-line-strong bg-paper text-center text-lg font-semibold text-ink outline-none transition-colors focus:border-volt-deep focus:ring-2 focus:ring-volt-deep/25"
        />
      ))}
    </div>
  );
}
