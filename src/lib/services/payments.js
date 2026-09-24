import { api } from "@/lib/api";
import { RAZORPAY_KEY, openRazorpay } from "@/lib/gateway";

/**
 * routes/payment.routes.js — all behind authMiddleware.
 *
 * `POST /payments` creates (or reuses) a Razorpay order for one of our orders
 * and answers `{ payment, checkout }`, where `checkout` is everything the
 * Razorpay modal needs: publishable key, gateway order id and the amount in
 * paise. After the modal, the signed result goes to `/payments/verify`; a
 * walk-away or decline goes to `/payments/failed`.
 */

export async function createPayment({ orderId }) {
  const payload = await api.post("/payments", { orderId });
  const payment = payload?.payment ?? null;
  const checkout = payload?.checkout ?? {};

  return {
    paymentId: payment?._id ?? payment?.id ?? null,
    key: checkout.key ?? null,
    razorpayOrderId: checkout.razorpayOrderId ?? payment?.gatewayOrderId ?? null,
    // already in paise
    amount: checkout.amount ?? null,
    currency: checkout.currency ?? payment?.currency ?? "INR",
    orderNumber: checkout.orderNumber ?? null,
  };
}

export function verifyPayment({ razorpayOrderId, razorpayPaymentId, signature }) {
  return api.post("/payments/verify", {
    razorpayOrderId,
    razorpayPaymentId,
    signature,
  });
}

export function failPayment({ razorpayOrderId, paymentId, reason }) {
  return api.post("/payments/failed", {
    razorpayOrderId,
    paymentId,
    failureReason: reason,
  });
}

/**
 * The whole online payment for one existing order: gateway order, modal,
 * then verify or report the failure. Used by checkout and by "Pay now" on an
 * unpaid order.
 *
 * Resolves `true` once the server has verified the payment, `false` when the
 * shopper closed the modal without paying. Throws when the payment failed.
 */
export async function payForOrder({ orderId, user }) {
  const payment = await createPayment({ orderId });
  const key = payment.key ?? RAZORPAY_KEY;

  if (!key || !payment.razorpayOrderId) {
    throw new Error(
      "Online payment is not configured yet. Choose cash on delivery.",
    );
  }

  const report = (reason) =>
    failPayment({
      razorpayOrderId: payment.razorpayOrderId,
      paymentId: payment.paymentId,
      reason,
    }).catch(() => {});

  let result;
  try {
    result = await openRazorpay({
      key,
      order_id: payment.razorpayOrderId,
      amount: payment.amount ?? undefined,
      currency: payment.currency,
      name: "PICKLEBALL",
      description: payment.orderNumber ?? "Order",
      prefill: {
        name: user?.name ?? "",
        email: user?.email ?? "",
        contact: user?.phone ?? "",
      },
      theme: { color: "#fecd06" },
    });
  } catch (problem) {
    await report(problem.message);
    throw problem;
  }

  if (!result) {
    await report("Cancelled by customer");
    return false;
  }

  await verifyPayment({
    razorpayOrderId: result.razorpay_order_id ?? payment.razorpayOrderId,
    razorpayPaymentId: result.razorpay_payment_id,
    signature: result.razorpay_signature,
  });

  return true;
}
