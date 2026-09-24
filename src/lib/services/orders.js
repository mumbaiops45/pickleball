import { api } from "@/lib/api";
import { lineSlug } from "@/lib/services/product-ref";
import { slugForId } from "@/lib/services/catalogue";

/** routes/order.routes.js — all behind authMiddleware. */

/**
 * The six `orderStatus` values collapse onto the four labels the account UI
 * renders. A refund is tracked on `paymentStatus`, not `orderStatus`, so it is
 * checked first.
 */
const STATUS_LABEL = {
  PENDING: "Processing",
  CONFIRMED: "Processing",
  PROCESSING: "Processing",
  SHIPPED: "In transit",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

function statusLabel(order) {
  if (order.paymentStatus === "REFUNDED") return "Refunded";
  // an online order sits in PENDING until the payment is captured
  if (order.paymentMethod === "ONLINE" && order.orderStatus === "PENDING") {
    return "Awaiting payment";
  }
  return STATUS_LABEL[order.orderStatus] ?? "Processing";
}

/** "12 July 2026", matching the format the order list was built against. */
function orderDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** "12 Jul, 4:05 pm" — for timeline rows, where the year is noise. */
function eventTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** The delivery steps, in order. CANCELLED is an exit, not a step. */
export const ORDER_STEPS = [
  { status: "PENDING", label: "Order placed" },
  { status: "CONFIRMED", label: "Confirmed" },
  { status: "PROCESSING", label: "Packed" },
  { status: "SHIPPED", label: "Shipped" },
  { status: "DELIVERED", label: "Delivered" },
];

/**
 * Orders placed before `statusHistory` existed carry none, so their timeline
 * is rebuilt from what is known: when it was placed and, if cancelled, when.
 */
function timelineOf(order) {
  const history = Array.isArray(order.statusHistory) ? order.statusHistory : [];
  const rows = history.length
    ? history
    : [
        { status: order.orderStatus === "PENDING" ? "PENDING" : "CONFIRMED", at: order.createdAt },
        ...(order.orderStatus === "CANCELLED"
          ? [{ status: "CANCELLED", at: order.cancelledAt, note: order.cancellationReason }]
          : []),
      ];

  return rows.map((row) => ({
    status: row.status,
    note: row.note ?? "",
    at: row.at ?? null,
    time: eventTime(row.at),
  }));
}

function shipmentOf(order) {
  const shipment = order.shipment ?? {};
  if (!shipment.awbCode && !shipment.courierName && !shipment.trackingUrl) {
    return null;
  }

  return {
    courierName: shipment.courierName ?? null,
    awbCode: shipment.awbCode ?? null,
    trackingUrl: shipment.trackingUrl ?? null,
    currentStatus: shipment.currentStatus ?? null,
    estimatedDelivery: orderDate(shipment.estimatedDelivery),
    events: (shipment.events ?? []).map((event) => ({
      status: event.status ?? "",
      activity: event.activity ?? "",
      location: event.location ?? "",
      time: eventTime(event.at),
    })),
  };
}

/** Order document -> the shape OrdersView and AccountOverview already render. */
export function toOrderCard(order) {
  if (!order) return null;
  return {
    id: order.orderNumber ?? order._id ?? order.id,
    orderId: order._id ?? order.id ?? null,
    date: orderDate(order.createdAt),
    status: statusLabel(order),
    orderStatus: order.orderStatus ?? "PENDING",
    total: Number(order.totalAmount) || 0,
    subtotal: Number(order.subtotal) || 0,
    shippingCharge: Number(order.shippingCharge) || 0,
    discount: Number(order.discount) || 0,
    paymentMethod: order.paymentMethod ?? null,
    paymentStatus: order.paymentStatus ?? null,
    // mirrors cancelOrderService: once the courier has it, it is too late
    cancellable: ["PENDING", "CONFIRMED", "PROCESSING"].includes(order.orderStatus),
    payable:
      order.paymentMethod === "ONLINE" &&
      ["PENDING", "FAILED"].includes(order.paymentStatus) &&
      order.orderStatus === "PENDING",
    cancellationReason: order.cancellationReason ?? null,
    address: order.shippingAddress ?? null,
    timeline: timelineOf(order),
    shipment: shipmentOf(order),
    items: (order.items ?? [])
      .map((item) => ({
        productId: lineSlug(item),
        quantity: Number(item.quantity) || 1,
        name: item.name ?? null,
        image: item.image ?? null,
        price: Number(item.price) || 0,
      }))
      .filter((item) => item.productId),
  };
}

/**
 * Order lines reference products by ObjectId, so each one is mapped back to its
 * catalogue slug — that is what OrdersView looks up to draw the product art.
 * The order also stores its own `name` and `image`, so a line whose product has
 * left the catalogue still carries enough to render.
 */
async function hydrate(card) {
  if (!card) return null;
  const items = await Promise.all(
    card.items.map(async (item) => ({
      ...item,
      productId: (await slugForId(item.productId)) ?? item.productId,
    })),
  );
  return { ...card, items };
}

export async function fetchMyOrders() {
  const payload = await api.get("/orders");
  const rows = Array.isArray(payload) ? payload : (payload?.orders ?? []);
  const cards = await Promise.all(rows.map((row) => hydrate(toOrderCard(row))));
  return cards.filter(Boolean);
}

export async function fetchOrder(id) {
  const payload = await api.get(`/orders/${encodeURIComponent(id)}`);
  return hydrate(toOrderCard(payload?.order ?? payload));
}

/**
 * The controller builds the order from the server-side cart, so only the
 * address and payment choice are sent. Totals are the server's to compute —
 * the cart summary on this side is for display.
 */
export async function createOrder({ addressId, paymentMethod }) {
  const payload = await api.post("/orders", { addressId, paymentMethod });
  return payload?.order ?? payload;
}

export async function cancelOrder(id, reason) {
  const payload = await api.patch(`/orders/${encodeURIComponent(id)}/cancel`, { reason });
  return hydrate(toOrderCard(payload?.order ?? payload));
}
