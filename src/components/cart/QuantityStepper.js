"use client";

export default function QuantityStepper({ value, onChange, compact = false }) {
  const size = compact ? "h-10" : "h-12";
  const button =
    "grid aspect-square place-items-center text-mist transition-colors hover:text-ink disabled:opacity-40 disabled:hover:text-mist";

  return (
    <div
      className={`${size} inline-flex items-center rounded-full border border-line-strong`}
    >
      <button
        type="button"
        className={`${button} h-full`}
        onClick={() => onChange(value - 1)}
        aria-label="Decrease quantity"
      >
        &minus;
      </button>
      <input
        type="number"
        min="1"
        max="20"
        value={value}
        onChange={(event) => {
          const next = Number(event.target.value);
          if (!Number.isNaN(next)) onChange(next);
        }}
        aria-label="Quantity"
        className={`${compact ? "w-8 text-xs" : "w-10 text-sm"} bg-transparent text-center font-medium text-ink outline-none`}
      />
      <button
        type="button"
        className={`${button} h-full`}
        onClick={() => onChange(value + 1)}
        disabled={value >= 20}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
