"use client";

import { useState } from "react";
import { LocateIcon } from "@/components/ui/Icons";
import { validateAddress } from "@/lib/services/addresses";
import { locateAddress } from "@/lib/services/geocode";
import { errorMessage } from "@/lib/api";

const ADDRESS_TYPES = ["HOME", "WORK", "OTHER"];

const EMPTY = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  addressType: "HOME",
  isDefault: false,
};

const field =
  "h-11 w-full rounded-xl border border-line-strong bg-paper px-4 text-sm text-ink outline-none transition-colors placeholder:text-mist/60 focus:border-volt-deep";

const labelStyle = "text-[11px] uppercase tracking-[0.16em] text-mist";

function Field({ id, label, span = 1, children }) {
  return (
    <div className={span === 2 ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

/**
 * Mirrors addressSchema field for field. Used both for the first address and
 * for editing an existing one, so it takes an optional `initial`.
 */
export default function AddressForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState({ ...EMPTY, ...(initial ?? {}) });
  const [error, setError] = useState("");
  const [locating, setLocating] = useState(false);
  const [located, setLocated] = useState("");

  /**
   * Fills in what the lookup found and leaves the rest alone — a blank city
   * from the geocoder must not wipe one the shopper already typed. Everything
   * stays editable afterwards; this is a head start, not an answer.
   */
  const useMyLocation = async () => {
    setLocating(true);
    setError("");
    setLocated("");

    try {
      const { label, ...found } = await locateAddress();

      setForm((current) => {
        const next = { ...current };
        for (const [key, value] of Object.entries(found)) {
          if (value) next[key] = value;
        }
        return next;
      });
      setLocated(label ?? "");
    } catch (problem) {
      setError(errorMessage(problem, "Could not use your location."));
    } finally {
      setLocating(false);
    }
  };

  const set = (key) => (event) => {
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const submit = async (event) => {
    event.preventDefault();

    const problem = validateAddress(form);
    if (problem) {
      setError(problem);
      return;
    }

    try {
      await onSave({
        ...form,
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        addressLine1: form.addressLine1.trim(),
        addressLine2: form.addressLine2.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim(),
      });
    } catch (problem) {
      setError(errorMessage(problem, "Could not save this address."));
    }
  };

  return (
    <form onSubmit={submit} noValidate className="mt-5">
      {/* a head start on the typing; every field below stays editable */}
      <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <button
          type="button"
          onClick={useMyLocation}
          disabled={locating}
          className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-xs font-medium text-ink transition-colors hover:border-volt-deep hover:text-volt-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LocateIcon className={`size-3.5 ${locating ? "animate-pulse" : ""}`} />
          {locating ? "Finding you…" : "Use my current location"}
        </button>

        {located ? (
          <span className="text-xs text-mist">Found {located}</span>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="fullName" label="Full name">
          <input
            id="fullName"
            value={form.fullName}
            onChange={set("fullName")}
            autoComplete="name"
            placeholder="Ananya Rao"
            className={field}
          />
        </Field>

        <Field id="phone" label="Mobile">
          <input
            id="phone"
            value={form.phone}
            onChange={set("phone")}
            inputMode="numeric"
            maxLength={10}
            autoComplete="tel-national"
            placeholder="9876543210"
            className={field}
          />
        </Field>

        <Field id="addressLine1" label="Address" span={2}>
          <input
            id="addressLine1"
            value={form.addressLine1}
            onChange={set("addressLine1")}
            autoComplete="address-line1"
            placeholder="Flat 402, Indiranagar"
            className={field}
          />
        </Field>

        <Field id="addressLine2" label="Landmark (optional)" span={2}>
          <input
            id="addressLine2"
            value={form.addressLine2}
            onChange={set("addressLine2")}
            autoComplete="address-line2"
            placeholder="Near the water tank"
            className={field}
          />
        </Field>

        <Field id="city" label="City">
          <input
            id="city"
            value={form.city}
            onChange={set("city")}
            autoComplete="address-level2"
            placeholder="Bengaluru"
            className={field}
          />
        </Field>

        <Field id="state" label="State">
          <input
            id="state"
            value={form.state}
            onChange={set("state")}
            autoComplete="address-level1"
            placeholder="Karnataka"
            className={field}
          />
        </Field>

        <Field id="pincode" label="Pincode">
          <input
            id="pincode"
            value={form.pincode}
            onChange={set("pincode")}
            inputMode="numeric"
            maxLength={6}
            autoComplete="postal-code"
            placeholder="560038"
            className={field}
          />
        </Field>

        <Field id="country" label="Country">
          <input
            id="country"
            value={form.country}
            onChange={set("country")}
            autoComplete="country-name"
            className={field}
          />
        </Field>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className={labelStyle}>Save as</span>
        {ADDRESS_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setForm((current) => ({ ...current, addressType: type }))}
            aria-pressed={form.addressType === type}
            className={`h-9 rounded-full border px-4 text-xs font-medium capitalize transition-colors ${
              form.addressType === type
                ? "border-volt-deep bg-volt/15 text-ink"
                : "border-line-strong text-mist hover:border-ink/40 hover:text-ink"
            }`}
          >
            {type.toLowerCase()}
          </button>
        ))}
      </div>

      <label className="mt-5 flex items-center gap-2.5 text-sm text-mist">
        <input
          type="checkbox"
          checked={form.isDefault}
          onChange={set("isDefault")}
          className="size-4 accent-volt-deep"
        />
        Make this my default address
      </label>

      {error ? <p className="mt-4 text-xs text-clay">{error}</p> : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-7 text-sm font-semibold text-paper transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save address"}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-12 items-center justify-center rounded-full border border-line-strong px-7 text-sm font-medium transition-colors hover:border-ink/50"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
