"use client";

import {
  PRICE_BANDS,
  SHOE_BRANDS,
  SHOE_TYPES,
  SKILL_LEVELS,
  productFilters,
} from "@/lib/data";
import { CloseIcon } from "@/components/ui/Icons";

function Group({ title, children }) {
  return (
    <div className="border-t border-line py-6 first:border-t-0 first:pt-0">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
        {title}
      </h3>
      <div className="mt-4 flex flex-col gap-3">{children}</div>
    </div>
  );
}

function Check({ checked, onChange, label, hint }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 text-sm text-mist transition-colors hover:text-ink">
      <span
        className={`grid size-4.5 shrink-0 place-items-center rounded border transition-colors ${
          checked
            ? "border-volt-deep bg-volt text-ink"
            : "border-line-strong group-hover:border-ink/60"
        }`}
      >
        {checked ? (
          <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
            <path
              d="M2 6.2 4.6 8.8 10 3.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="flex-1">{label}</span>
      {hint != null ? (
        <span className="font-mono text-[11px] text-line-strong">{hint}</span>
      ) : null}
    </label>
  );
}

export default function ShopFilters({
  filters,
  counts,
  onToggle,
  onReset,
  onClose,
}) {
  const activeCount =
    (filters.category === "All" ? 0 : 1) +
    filters.skills.length +
    filters.priceBands.length +
    filters.brands.length +
    filters.types.length +
    (filters.onSale ? 1 : 0);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-6 lg:hidden">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">
          Filters
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close filters"
          className="grid size-11 place-items-center rounded-full text-mist hover:bg-surface-2 hover:text-ink"
        >
          <CloseIcon className="size-5" />
        </button>
      </div>

      <div className="flex items-center justify-between pb-5">
        <span className="text-[11px] uppercase tracking-[0.18em] text-mist">
          {activeCount === 0 ? "No filters" : `${activeCount} active`}
        </span>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-volt-deep underline-offset-4 hover:underline"
          >
            Clear all
          </button>
        ) : null}
      </div>

      <Group title="Category">
        {productFilters.map((category) => (
          <Check
            key={category}
            label={category}
            hint={counts.category[category] ?? 0}
            checked={filters.category === category}
            onChange={() => onToggle("category", category)}
          />
        ))}
      </Group>

      <Group title="Skill level">
        {SKILL_LEVELS.map((skill) => (
          <Check
            key={skill}
            label={skill}
            hint={counts.skill[skill] ?? 0}
            checked={filters.skills.includes(skill)}
            onChange={() => onToggle("skill", skill)}
          />
        ))}
      </Group>

      <Group title="Shoe brand">
        {SHOE_BRANDS.map((brand) => (
          <Check
            key={brand}
            label={brand}
            hint={counts.brand[brand] ?? 0}
            checked={filters.brands.includes(brand)}
            onChange={() => onToggle("brand", brand)}
          />
        ))}
      </Group>

      <Group title="Shoe type">
        {SHOE_TYPES.map((type) => (
          <Check
            key={type}
            label={type}
            hint={counts.type[type] ?? 0}
            checked={filters.types.includes(type)}
            onChange={() => onToggle("type", type)}
          />
        ))}
      </Group>

      <Group title="Price">
        {PRICE_BANDS.map((band) => (
          <Check
            key={band.id}
            label={band.label}
            hint={counts.price[band.id] ?? 0}
            checked={filters.priceBands.includes(band.id)}
            onChange={() => onToggle("price", band.id)}
          />
        ))}
      </Group>

      <Group title="Offers">
        <Check
          label="On sale"
          hint={counts.onSale}
          checked={filters.onSale}
          onChange={() => onToggle("onSale")}
        />
      </Group>
    </div>
  );
}
