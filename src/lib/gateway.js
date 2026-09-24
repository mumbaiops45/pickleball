/**
 * Razorpay checkout script loader.
 *
 * The Payment model stores `gatewayOrderId` / `gatewayPaymentId`, which is the
 * Razorpay shape, so that is what this assumes. The publishable key comes from
 * the `POST /payments` response when the controller sends one, and falls back
 * to NEXT_PUBLIC_RAZORPAY_KEY_ID.
 */

const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

let loader = null;

export function loadRazorpay() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.Razorpay) return Promise.resolve(window.Razorpay);

  // one shared promise: two clicks must not inject the script twice
  loader ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve(window.Razorpay ?? null);
    script.onerror = () => {
      loader = null;
      reject(new Error("Could not load the payment gateway."));
    };
    document.body.appendChild(script);
  });

  return loader;
}

export const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "";

/**
 * Opens the gateway and settles once the shopper pays or walks away.
 * Resolves with the handler payload on success, `null` on dismissal, and
 * rejects when they close the modal after a declined attempt.
 *
 * A decline does not settle the promise: Razorpay keeps the modal open so the
 * shopper can try another card or UPI app, and a retry that succeeds must
 * still reach `handler`. Settling on the first decline dropped that success,
 * leaving money captured against an order that never heard about it.
 */
export function openRazorpay(options) {
  return loadRazorpay().then((Razorpay) => {
    if (!Razorpay) throw new Error("Payment gateway is unavailable.");

    return new Promise((resolve, reject) => {
      let lastFailure = null;

      const checkout = new Razorpay({
        ...options,
        handler: (response) => resolve(response),
        modal: {
          ...options.modal,
          ondismiss: () => (lastFailure ? reject(lastFailure) : resolve(null)),
        },
      });

      checkout.on("payment.failed", (event) => {
        lastFailure = new Error(event?.error?.description ?? "The payment failed.");
      });

      checkout.open();
    });
  });
}
