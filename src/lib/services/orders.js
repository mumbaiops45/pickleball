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

/** Order document -> the shape OrdersView and AccountOverview already render. */
export function toOrderCard(order) {
  if (!order) return null;
  return {
    id: order.orderNumber ?? order._id ?? order.id,
    orderId: order._id ?? order.id ?? null,
    date: orderDate(order.createdAt),
    status: statusLabel(order),
    total: Number(order.totalAmount) || 0,
    paymentMethod: order.paymentMethod ?? null,
    paymentStatus: order.paymentStatus ?? null,
    cancellable: !["DELIVERED", "CANCELLED"].includes(order.orderStatus),
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

export function cancelOrder(id, reason) {
  return api.patch(`/orders/${encodeURIComponent(id)}/cancel`, { reason });
}
