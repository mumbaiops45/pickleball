import { api } from "@/lib/api";

/** routes/address.routes.js — all behind authMiddleware. */

/** Address document -> a flat row with a stable `id` for React keys. */
export function toAddress(address) {
  if (!address) return null;
  return {
    id: address._id ?? address.id,
    fullName: address.fullName ?? "",
    phone: address.phone ?? "",
    addressLine1: address.addressLine1 ?? "",
    addressLine2: address.addressLine2 ?? "",
    city: address.city ?? "",
    state: address.state ?? "",
    pincode: address.pincode ?? "",
    country: address.country ?? "India",
    addressType: address.addressType ?? "HOME",
    isDefault: Boolean(address.isDefault),
  };
}

export async function fetchAddresses() {
  const payload = await api.get("/addresses");
  const rows = Array.isArray(payload) ? payload : (payload?.addresses ?? []);
  // the default sorts to the top so the checkout can preselect rows[0]
  return rows
    .map(toAddress)
    .filter(Boolean)
    .sort((a, b) => Number(b.isDefault) - Number(a.isDefault));
}

export async function createAddress(address) {
  const payload = await api.post("/addresses", address);
  return toAddress(payload?.address ?? payload);
}

export async function updateAddress(id, address) {
  const payload = await api.put(`/addresses/${encodeURIComponent(id)}`, address);
  return toAddress(payload?.address ?? payload);
}

export function deleteAddress(id) {
  return api.delete(`/addresses/${encodeURIComponent(id)}`);
}

export function setDefaultAddress(id) {
  return api.patch(`/addresses/${encodeURIComponent(id)}/default`);
}

/** Mirrors the required fields on addressSchema so the form can fail fast. */
export function validateAddress(form) {
  if (!form.fullName?.trim()) return "Please enter the recipient's full name.";
  if (!/^[6-9]\d{9}$/.test(form.phone?.trim() ?? ""))
    return "Enter a valid 10-digit Indian mobile number.";
  if (!form.addressLine1?.trim()) return "Please enter the street address.";
  if (!form.city?.trim()) return "Please enter the city.";
  if (!form.state?.trim()) return "Please enter the state.";
  if (!/^\d{6}$/.test(form.pincode?.trim() ?? ""))
    return "Enter a valid 6-digit pincode.";
  return "";
}
