/**
 * Indian rupee formatting. `en-IN` gives the lakh/crore grouping
 * (₹1,15,999 rather than ₹115,999), which is what an Indian shopper expects.
 */

export const CURRENCY_CODE = "INR";
export const GST_RATE = 0.18;

export function formatPrice(value) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function formatNumber(value) {
  return value.toLocaleString("en-IN");
}

/** GST already contained in a tax-inclusive price. */
export function gstPortion(value) {
  return value - value / (1 + GST_RATE);
}
