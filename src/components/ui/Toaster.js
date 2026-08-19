"use client";

import { CheckIcon, CloseIcon } from "@/components/ui/Icons";
import { dismissToast, useToasts } from "@/store/toast";

/**
 * Fixed stack of API messages. Sits at the very top of the tree so a toast
 * raised from a provider or a service still has somewhere to land.
 *
 * Bottom-right on desktop, full width at the top on phones where a bottom-right
 * card would sit under the thumb.
 */
const TONE = {
  success: "border-volt-deep/50 bg-surface text-ink",
  error: "border-clay/50 bg-surface text-ink",
  info: "border-line-strong bg-surface text-ink",
};

const DOT = {
  success: "bg-volt text-ink",
  error: "bg-clay text-paper",
  info: "bg-ink text-paper",
};

export default function Toaster() {
  const toasts = useToasts();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-x-4 top-24 z-90 flex flex-col gap-2.5 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:top-auto sm:w-90"
    >
      {toasts.map((entry) => (
        <div
          key={entry.id}
          role="status"
          className={`step-item pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3.5 shadow-[0_18px_40px_rgba(15,17,21,.12)] backdrop-blur ${
            TONE[entry.tone] ?? TONE.info
          }`}
        >
          <span
            aria-hidden="true"
            className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
              DOT[entry.tone] ?? DOT.info
            }`}
          >
            {entry.tone === "success" ? (
              <CheckIcon className="size-3" />
            ) : (
              <span className="text-[11px] font-semibold leading-none">
                {entry.tone === "error" ? "!" : "i"}
              </span>
            )}
          </span>

          <p className="min-w-0 flex-1 text-[13px] leading-relaxed">
            {entry.message}
          </p>

          <button
            type="button"
            onClick={() => dismissToast(entry.id)}
            aria-label="Dismiss"
            className="-mr-1 -mt-0.5 shrink-0 rounded-full p-1 text-mist transition-colors hover:text-ink"
          >
            <CloseIcon className="size-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
