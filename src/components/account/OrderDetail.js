"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import ProductArt, { ART_MINI } from "@/components/art/ProductArt";
import {
  ArrowUpRightIcon,
  CheckIcon,
  ChevronLeftIcon,
  PinIcon,
  ShieldIcon,
  TruckIcon,
} from "@/components/ui/Icons";
import { OrderStatus } from "@/components/account/OrdersView";
import { formatPrice } from "@/lib/format";
import { errorMessage } from "@/lib/api";
import { ORDER_STEPS, cancelOrder, fetchOrder } from "@/lib/services/orders";
import { payForOrder } from "@/lib/services/payments";
import { useAuth } from "@/store/AuthProvider";
import { useOrders } from "@/store/OrdersProvider";
import { useProductLookup } from "@/store/catalogue";
import { toast } from "@/store/toast";

const panel = "rounded-3xl border border-line bg-surface p-6";
const heading = "text-sm font-semibold uppercase tracking-[0.16em]";

const PAYMENT_LABEL = {
  PENDING: "Not paid yet",
  PAID: "Paid",
  FAILED: "Payment failed",
  REFUNDED: "Refunded",
};

/**
 * The delivery steps as a vertical track. Each reached step shows when it
 * happened, taken from the order's own status history.
 */
function Timeline({ order }) {
  if (order.orderStatus === "CANCELLED") {
    return (
      <ol className="flex flex-col gap-4">
        {order.timeline.map((event, index) => (
          <li key={`${event.status}-${index}`} className="flex gap-3">
            <span
              className={`mt-1 size-2.5 shrink-0 rounded-full ${
                event.status === "CANCELLED" ? "bg-clay" : "bg-line-strong"
              }`}
            />
            <div>
              <p className="text-sm font-medium capitalize">
                {event.status.toLowerCase()}
              </p>
              {event.note ? <p className="text-xs text-mist">{event.note}</p> : null}
              {event.time ? <p className="text-xs text-mist">{event.time}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    );
  }

  const reached = ORDER_STEPS.findIndex((step) => step.status === order.orderStatus);
  const whenReached = (status) =>
    [...order.timeline].reverse().find((event) => event.status === status);

  return (
    <ol className="flex flex-col">
      {ORDER_STEPS.map((step, index) => {
        const done = index <= reached;
        const current = index === reached;
        const event = whenReached(step.status);
        const last = index === ORDER_STEPS.length - 1;

        return (
          <li key={step.status} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={`grid size-7 shrink-0 place-items-center rounded-full border ${
                  done
                    ? "border-volt-deep bg-volt text-ink"
                    : "border-line-strong text-mist"
                }`}
              >
                {done ? <CheckIcon className="size-3.5" /> : null}
              </span>
              {!last ? (
                <span
                  className={`w-px flex-1 ${index < reached ? "bg-volt-deep" : "bg-line"}`}
                />
              ) : null}
            </div>
            <div className={last ? "pb-0" : "pb-6"}>
              <p className={`text-sm ${current ? "font-semibold" : done ? "" : "text-mist"}`}>
                {step.label}
              </p>
              {done && event?.time ? (
                <p className="text-xs text-mist">{event.time}</p>
              ) : null}
              {done && event?.note ? (
                <p className="text-xs text-mist">{event.note}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Shipment({ shipment }) {
  if (!shipment) {
    return (
      <p className="text-sm text-mist">
        Courier details appear here as soon as your parcel is packed.
      </p>
    );
  }

  return (
    <div>
      <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
        {shipment.courierName ? (
          <div>
            <dt className="text-xs text-mist">Courier</dt>
            <dd className="font-medium">{shipment.courierName}</dd>
          </div>
        ) : null}
        {shipment.awbCode ? (
          <div>
            <dt className="text-xs text-mist">Tracking number (AWB)</dt>
            <dd className="font-mono font-medium">{shipment.awbCode}</dd>
          </div>
        ) : null}
        {shipment.currentStatus ? (
          <div>
            <dt className="text-xs text-mist">Latest update</dt>
            <dd className="font-medium capitalize">
              {shipment.currentStatus.toLowerCase()}
            </dd>
          </div>
        ) : null}
        {shipment.estimatedDelivery ? (
          <div>
            <dt className="text-xs text-mist">Expected delivery</dt>
            <dd className="font-medium">{shipment.estimatedDelivery}</dd>
          </div>
        ) : null}
      </dl>

      {shipment.trackingUrl ? (
        <a
          href={shipment.trackingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-5 text-xs font-medium transition-colors hover:border-volt-deep hover:text-volt-deep"
        >
          Track on courier site
          <ArrowUpRightIcon className="size-3.5" />
        </a>
      ) : null}

      {shipment.events.length ? (
        <ol className="mt-6 flex flex-col gap-4 border-t border-line pt-5">
          {shipment.events.map((event, index) => (
            <li key={index} className="flex gap-3">
              <span
                className={`mt-1.5 size-2 shrink-0 rounded-full ${
                  index === 0 ? "bg-volt-deep" : "bg-line-strong"
                }`}
              />
              <div className="min-w-0">
                <p className="text-sm font-medium">{event.activity || event.status}</p>
                <p className="text-xs text-mist">
                  {[event.location, event.time].filter(Boolean).join(" · ")}
                </p>
              </div>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

export default function OrderDetail({ id }) {
  const { user, handleAuthError } = useAuth();
  const { refresh: refreshOrders } = useOrders();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(null);
  const findProduct = useProductLookup(Boolean(order));
  const requestId = useRef(0);

  const load = useCallback(() => {
    const ticket = ++requestId.current;

    return fetchOrder(id)
      .then((card) => {
        if (ticket !== requestId.current) return;
        setOrder(card);
        setError("");
      })
      .catch((problem) => {
        if (ticket !== requestId.current) return;
        handleAuthError(problem);
        setError(errorMessage(problem, "Could not load this order."));
      })
      .finally(() => {
        if (ticket === requestId.current) setLoading(false);
      });
  }, [id, handleAuthError]);

  useEffect(() => {
    load();
  }, [load]);

  const pay = async () => {
    setBusy("pay");
    try {
      const paid = await payForOrder({ orderId: order.orderId, user });
      if (paid) toast.success("Payment received — thank you.");
      await Promise.all([load(), refreshOrders()]);
    } catch (problem) {
      handleAuthError(problem);
      toast.error(errorMessage(problem, "The payment could not be completed."));
      await load();
    } finally {
      setBusy(null);
    }
  };

  const cancel = async () => {
    if (!window.confirm(`Cancel order ${order.id}?`)) return;

    setBusy("cancel");
    try {
      const updated = await cancelOrder(order.orderId, "Cancelled by customer");
      if (updated) setOrder(updated);
      toast.success(
        order.paymentStatus === "PAID"
          ? "Order cancelled. Your refund has been started."
          : "Order cancelled.",
      );
      refreshOrders();
    } catch (problem) {
      handleAuthError(problem);
      toast.error(errorMessage(problem, "Could not cancel this order."));
    } finally {
      setBusy(null);
    }
  };

  const back = (
    <Link
      href="/account/orders"
      className="-my-2.5 inline-flex items-center gap-1.5 self-start py-2.5 text-xs text-mist transition-colors hover:text-ink"
    >
      <ChevronLeftIcon className="size-3.5" />
      All orders
    </Link>
  );

  if (loading) {
    return <div className="h-64 animate-pulse rounded-3xl border border-line bg-surface" />;
  }

  if (error || !order) {
    return (
      <div>
        {back}
        <p className="mt-6 rounded-2xl border border-clay/40 bg-clay/5 px-4 py-3 text-sm text-clay">
          {error || "Order not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {back}

      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
        <div>
          <p className="font-mono text-lg font-semibold">{order.id}</p>
          <p className="mt-1 text-xs text-mist">Placed {order.date}</p>
        </div>
        <OrderStatus status={order.status} />
      </div>

      {order.payable || order.cancellable ? (
        <div className="flex flex-wrap gap-3">
          {order.payable ? (
            <button
              type="button"
              onClick={pay}
              disabled={busy !== null}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-volt px-6 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
            >
              <ShieldIcon className="size-4" />
              {busy === "pay" ? "Opening payment…" : `Pay ${formatPrice(order.total)} now`}
            </button>
          ) : null}
          {order.cancellable ? (
            <button
              type="button"
              onClick={cancel}
              disabled={busy !== null}
              className="inline-flex h-11 items-center rounded-full border border-line-strong px-6 text-sm font-medium transition-colors hover:border-clay hover:text-clay disabled:opacity-60"
            >
              {busy === "cancel" ? "Cancelling…" : "Cancel order"}
            </button>
          ) : null}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className={panel}>
          <h2 className={heading}>Order status</h2>
          <div className="mt-5">
            <Timeline order={order} />
          </div>
        </section>

        <section className={panel}>
          <h2 className={`${heading} flex items-center gap-2`}>
            <TruckIcon className="size-4" />
            Shipment
          </h2>
          <div className="mt-5">
            {order.orderStatus === "CANCELLED" ? (
              <p className="text-sm text-mist">
                {order.cancellationReason ?? "This order was cancelled."}
              </p>
            ) : (
              <Shipment shipment={order.shipment} />
            )}
          </div>
        </section>
      </div>

      {/* items */}
      <section className={panel}>
        <h2 className={heading}>Items</h2>
        <ul className="mt-5 flex flex-col divide-y divide-line">
          {order.items.map((item) => {
            const product = findProduct(item.productId);
            return (
              <li
                key={item.productId}
                className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
              >
                <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-paper">
                  {product ? (
                    <ProductArt
                      product={product}
                      id={`detail-${order.id}-${product.id}`}
                      className={`${ART_MINI[product.art.kind]} w-auto`}
                    />
                  ) : null}
                </span>
                <div className="min-w-0 flex-1">
                  {product ? (
                    <Link
                      href={`/products/${product.id}`}
                      className="text-sm font-medium hover:underline"
                    >
                      {product.name}
                    </Link>
                  ) : (
                    <p className="text-sm font-medium">{item.name ?? "Item"}</p>
                  )}
                  <p className="text-xs text-mist">
                    Qty {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
                <p className="text-sm font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {order.address ? (
          <section className={panel}>
            <h2 className={`${heading} flex items-center gap-2`}>
              <PinIcon className="size-4" />
              Delivery address
            </h2>
            <address className="mt-4 text-sm not-italic leading-relaxed">
              <span className="font-medium">{order.address.fullName}</span>
              <br />
              {order.address.addressLine1}
              {order.address.addressLine2 ? (
                <>
                  <br />
                  {order.address.addressLine2}
                </>
              ) : null}
              <br />
              {order.address.city}, {order.address.state} {order.address.pincode}
              <br />
              <span className="text-mist">{order.address.phone}</span>
            </address>
          </section>
        ) : null}

        <section className={panel}>
          <h2 className={heading}>Payment</h2>
          <dl className="mt-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-mist">Subtotal</dt>
              <dd>{formatPrice(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-mist">Shipping</dt>
              <dd>{order.shippingCharge ? formatPrice(order.shippingCharge) : "Free"}</dd>
            </div>
            {order.discount ? (
              <div className="flex justify-between">
                <dt className="text-mist">Discount</dt>
                <dd className="text-clay">&minus;{formatPrice(order.discount)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between border-t border-line pt-2 font-semibold">
              <dt>Total</dt>
              <dd>{formatPrice(order.total)}</dd>
            </div>
            <div className="flex justify-between pt-2">
              <dt className="text-mist">Method</dt>
              <dd>{order.paymentMethod === "COD" ? "Cash on delivery" : "Online"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-mist">Status</dt>
              <dd>{PAYMENT_LABEL[order.paymentStatus] ?? order.paymentStatus}</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
