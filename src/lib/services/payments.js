import { api } from "@/lib/api";

/**
 * routes/payment.routes.js — all behind authMiddleware.
 *
 * The Payment model carries `gatewayOrderId` / `gatewayPaymentId`, which is the
 * Razorpay shape: create a payment to get a gateway order, open the gateway,
 * then report back success or failure. COD skips the gateway entirely — the
 * order is already placed, so `createPayment` just records the intent.
 */

export async function createPayment({ orderId, method }) {
  const payload = await api.post("/payments", { orderId, method });
  return payload?.payment ?? payload;
}

export function completePayment({ orderId, paymentId, gatewayOrderId, gatewayPaymentId, signature }) {
  return api.post("/payments/complete", {
    orderId,
    paymentId,
    gatewayOrderId,
    gatewayPaymentId,
    signature,
  });
}

export function failPayment({ orderId, paymentId, reason }) {
  return api.post("/payments/failed", { orderId, paymentId, reason });
}
