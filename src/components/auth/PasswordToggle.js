"use client";

import { EyeIcon, EyeOffIcon } from "@/components/ui/Icons";

/**
 * Show/hide toggle for a password field.
 *
 * It sits inside the input's own box, so the field it belongs to carries the
 * right padding to keep typing clear of it. `tabIndex={-1}` is deliberate:
 * tabbing out of a password should reach the submit button, not this.
 */
export default function PasswordToggle({ shown, onToggle }) {
  const Icon = shown ? EyeOffIcon : EyeIcon;

  return (
    <button
      type="button"
      onClick={onToggle}
      tabIndex={-1}
      aria-label={shown ? "Hide password" : "Show password"}
      aria-pressed={shown}
      className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-mist transition-colors hover:bg-surface-2 hover:text-ink"
    >
      <Icon className="size-4.5" />
    </button>
  );
}
