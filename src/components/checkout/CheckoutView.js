"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import AddressForm from "@/components/checkout/AddressForm";
import { Accent } from "@/components/ui/Heading";
import {
  ArrowIcon,
  BagIcon,
  CheckIcon,
  PencilIcon,
  PhoneIcon,
  PinIcon,
  PlusIcon,
  ShieldIcon,
  TruckIcon,
  UserIcon,
} from "@/components/ui/Icons";
import { formatPrice } from "@/lib/format";
import { errorMessage } from "@/lib/api";
import { toast } from "@/store/toast";
import { useAuth } from "@/store/AuthProvider";
import { useCart } from "@/store/CartProvider";
import * as addressApi from "@/lib/services/addresses";
import * as orderApi from "@/lib/services/orders";
import * as paymentApi from "@/lib/services/payments";
import { RAZORPAY_KEY, openRazorpay } from "@/lib/gateway";

const PAYMENT_METHODS = [
  {
    value: "COD",
    label: "Cash on delivery",
    copy: "Pay the courier when the box reaches you.",
    icon: TruckIcon,
  },
  {
    value: "ONLINE",
    label: "Pay online",
    copy: "UPI, cards, netbanking and wallets.",
    icon: ShieldIcon,
  },
];

const panel = "rounded-3xl border border-line bg-surface p-6";

function Skeleton() {
  return (
    <div className="mx-auto w-full max-w-350 px-5 py-10 sm:px-8 lg:py-20">
      <div className="h-64 animate-pulse rounded-3xl border border-line bg-surface" />
    </div>
  );
}

function Centered({ icon: Icon, title, accent, copy, children }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 py-16 text-center sm:px-8 lg:py-24">
      <span className="grid size-20 place-items-center rounded-full border border-line text-mist">
        <Icon className="size-8" />
      </span>
      <h2 className="mt-8 text-3xl font-semibold tracking-tight">
        {title} {accent ? <Accent>{accent}</Accent> : null}
      </h2>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mist">{copy}</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">{children}</div>
    </div>
  );
}

export default function CheckoutView() {
  const { user, hydrated: authReady, openAuth, handleAuthError } = useAuth();
  const { lines, count, totals, hydrated: cartReady, clear } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  // the address being corrected, if any — the same form does new and edit
  const [editingId, setEditingId] = useState(null);
  const [savingAddress, setSavingAddress] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);
  // an order that exists but was not paid for — the cart is gone by then, so
  // this needs saying somewhere other than the cart page
  const [unpaidOrder, setUnpaidOrder] = useState(null);

  const requestId = useRef(0);

  /**
   * Every state write happens in a promise callback rather than in the body, so
   * the mount effect below can call this without setting state synchronously —
   * `addressesLoading` starts true, which is what paints the first skeleton.
   */
  const loadAddresses = useCallback(() => {
    const ticket = ++requestId.current;

    if (!user) return Promise.resolve();

    return addressApi
      .fetchAddresses()
      .then((rows) => {
        if (ticket !== requestId.current) return;
        setAddresses(rows);
        // fetchAddresses sorts the default first, so rows[0] is the sane pick
        setSelectedId((current) =>
          rows.some((row) => row.id === current) ? current : (rows[0]?.id ?? null),
        );
        setFormOpen(rows.length === 0);
      })
      .catch((problem) => {
        if (ticket !== requestId.current) return;
        handleAuthError(problem);
        setError(errorMessage(problem, "Could not load your addresses."));
      })
      .finally(() => {
        if (ticket === requestId.current) setAddressesLoading(false);
      });
  }, [user, handleAuthError]);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const editingAddress =
    addresses.find((address) => address.id === editingId) ?? null;

  const selectedAddress =
    addresses.find((address) => address.id === selectedId) ?? null;

  /** One handler for both jobs: `editingId` decides whether this is a change
   *  to an existing address or a new one. */
  const saveAddress = async (form) => {
    const editing = editingId;
    setSavingAddress(true);

    try {
      const saved = editing
        ? await addressApi.updateAddress(editing, form)
        : await addressApi.createAddress(form);

      const savedId = saved?.id ?? editing;

      // the write routes may ignore `isDefault`; the dedicated route never
      // does, and setting a default twice costs nothing
      if (form.isDefault && savedId) {
        await addressApi.setDefaultAddress(savedId).catch(() => {});
      }

      await loadAddresses();
      // deliver to whatever was just written, rather than leaving the old pick
      if (savedId) setSelectedId(savedId);
      setFormOpen(false);
      setEditingId(null);
      toast.success(editing ? "Address updated." : "Address saved.");
    } finally {
      setSavingAddress(false);
    }
  };

  /**
   * The order is created from the server-side cart, so this only sends the
   * address and the payment choice. For COD that is the whole flow; for ONLINE
   * the gateway opens and the result is reported back either way, so a
   * half-finished payment never leaves the order looking paid.
   */
  const placeOrder = async () => {
    if (!selectedId) {
      setError("Choose a delivery address first.");
      return;
    }

    setError("");
    setPlacing(true);

    let order;
    try {
      order = await orderApi.createOrder({
        addressId: selectedId,
        paymentMethod,
      });
    } catch (problem) {
      handleAuthError(problem);
      const message = errorMessage(problem, "Could not place your order.");
      setError(message);
      toast.error(message);
      setPlacing(false);
      return;
    }

    const orderId = order?._id ?? order?.id ?? null;

    try {
      // Cash on delivery takes no payment record: `POST /payments` answers
      // "Online payment is not required for this order" and the order — which
      // exists by now — would be reported as failed for succeeding.
      if (paymentMethod === "ONLINE") {
        const payment = await paymentApi.createPayment({
          orderId,
          method: "ONLINE",
        });

        const key = payment?.key ?? payment?.keyId ?? RAZORPAY_KEY;
        const gatewayOrderId = payment?.gatewayOrderId ?? payment?.orderId ?? null;
        const paymentId = payment?._id ?? payment?.id ?? null;

        if (!key || !gatewayOrderId) {
          // the order already exists at this point — leave it marked failed
          // rather than sitting in PENDING with no payment that can settle it
          await paymentApi
            .failPayment({ orderId, paymentId, reason: "Gateway not configured" })
            .catch(() => {});

          throw new Error(
            "Online payment is not configured yet. Choose cash on delivery, or set the gateway key.",
          );
        }

        const result = await openRazorpay({
          key,
          order_id: gatewayOrderId,
          amount: Math.round((order?.totalAmount ?? totals.total) * 100),
          currency: payment?.currency ?? "INR",
          name: "PADDLEHAUS",
          description: order?.orderNumber ?? "Order",
          prefill: {
            name: user?.name ?? "",
            email: user?.email ?? "",
            contact: user?.phone ?? "",
          },
          theme: { color: "#d4ff3f" },
        });

        if (!result) {
          // closed without paying — the order stays PENDING, not FAILED
          await paymentApi
            .failPayment({ orderId, paymentId, reason: "Cancelled by user" })
            .catch(() => {});
          // the order controller has already emptied the server cart
          await clear().catch(() => {});
          const message = "Payment was cancelled. Your order is saved as unpaid.";
          setUnpaidOrder({
            id: order?.orderNumber ?? orderId,
            message,
          });
          toast.info(message);
          setPlacing(false);
          return;
        }

        await paymentApi.completePayment({
          orderId,
          paymentId,
          gatewayOrderId: result.razorpay_order_id ?? gatewayOrderId,
          gatewayPaymentId: result.razorpay_payment_id,
          signature: result.razorpay_signature,
        });
      }
    } catch (problem) {
      // the order exists and the server cart is already empty, so say what
      // actually happened rather than leaving a bag that no longer exists
      await clear().catch(() => {});

      const message = errorMessage(
        problem,
        "The payment could not be completed.",
      );

      setUnpaidOrder({ id: order?.orderNumber ?? orderId, message });
      toast.error(message);
      setPlacing(false);
      return;
    }

    // the controller empties the server cart; this clears the local mirror too
    await clear();
    const card = orderApi.toOrderCard(order) ?? { id: order?.orderNumber };
    setPlacedOrder(card);
    toast.success(
      card.id ? `Order ${card.id} placed.` : "Your order has been placed.",
    );
    setPlacing(false);
  };

  /* ------------------------------------------------------------- gates */

  if (!authReady) return <Skeleton />;

  if (!user) {
    return (
      <Centered
        icon={UserIcon}
        title="You are"
        accent="not signed in"
        copy="Checkout needs an account so we know where to send your order and where to find it later."
      >
        <button
          type="button"
          onClick={openAuth}
          className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-volt px-8 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
        >
          Login or sign up
          <ArrowIcon className="size-4" />
        </button>
        <Link
          href="/cart"
          className="inline-flex h-14 items-center justify-center rounded-full border border-line-strong px-8 text-sm font-medium text-ink transition-colors hover:border-volt-deep hover:text-volt-deep"
        >
          Back to cart
        </Link>
      </Centered>
    );
  }

  if (placedOrder) {
    return (
      <div className="mx-auto w-full max-w-2xl px-5 py-16 text-center sm:px-8 lg:py-24">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-volt text-ink">
          <CheckIcon className="size-7" />
        </span>
        <h2 className="mt-8 text-3xl font-semibold tracking-tight">
          Order <Accent>placed</Accent>
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-mist">
          {placedOrder.id ? (
            <>
              Your order{" "}
              <span className="font-mono font-medium text-ink">
                {placedOrder.id}
              </span>{" "}
              is confirmed.{" "}
            </>
          ) : null}
          {paymentMethod === "COD"
            ? "Pay the courier when it arrives."
            : "Payment received — thank you."}
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/account/orders"
            className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-volt px-8 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            Track your order
            <ArrowIcon className="size-4" />
          </Link>
          <Link
            href="/shop"
            className="inline-flex h-14 items-center justify-center rounded-full border border-line-strong px-8 text-sm font-medium text-ink transition-colors hover:border-volt-deep hover:text-volt-deep"
          >
            Keep shopping
          </Link>
        </div>
      </div>
    );
  }

  /* The order exists but was not paid for. The cart is empty by now, so
     without this the shopper is dropped on "your cart is empty" and left to
     guess whether anything was ordered. */
  if (unpaidOrder) {
    return (
      <Centered
        icon={ShieldIcon}
        title="Order saved,"
        accent="not paid"
        copy={unpaidOrder.message}
      >
        <Link
          href="/account/orders"
          className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-volt px-8 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
        >
          {unpaidOrder.id ? `See order ${unpaidOrder.id}` : "See your orders"}
          <ArrowIcon className="size-4" />
        </Link>
        <Link
          href="/shop"
          className="inline-flex h-14 items-center justify-center rounded-full border border-line-strong px-8 text-sm font-medium text-ink transition-colors hover:border-volt-deep hover:text-volt-deep"
        >
          Keep shopping
        </Link>
      </Centered>
    );
  }

  if (!cartReady) return <Skeleton />;

  if (lines.length === 0) {
    return (
      <Centered
        icon={BagIcon}
        title="Your cart is"
        accent="empty"
        copy="There is nothing to check out yet. Start with the paddle everyone reorders."
      >
        <Link
          href="/shop"
          className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-volt px-8 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
        >
          Browse the shop
          <ArrowIcon className="size-4" />
        </Link>
      </Centered>
    );
  }

  /* ------------------------------------------------------------ checkout */

  return (
    <div className="mx-auto grid w-full max-w-350 grid-cols-1 gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_380px] lg:gap-14 lg:py-14">
      <section className="min-w-0">
        {/* ------------------------------------------------- address */}
        <div className="flex items-center justify-between border-b border-line pb-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">
            Delivery address
          </h2>
          {addresses.length && !formOpen && !editingId ? (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormOpen(true);
              }}
              className="inline-flex items-center gap-1.5 text-xs text-volt-deep underline-offset-4 hover:underline"
            >
              <PlusIcon className="size-3.5" />
              Add new
            </button>
          ) : null}
        </div>

        {addressesLoading ? (
          <div className="mt-6 h-32 animate-pulse rounded-3xl border border-line bg-surface" />
        ) : (
          <>
            {addresses.length ? (
              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {addresses.map((address) => {
                  const active = address.id === selectedId;
                  return (
                    <li key={address.id} className="relative">
                      <button
                        type="button"
                        onClick={() => setSelectedId(address.id)}
                        aria-pressed={active}
                        className={`flex h-full w-full flex-col rounded-3xl border p-5 pb-12 text-left transition-colors ${
                          active
                            ? "border-volt-deep bg-volt/10"
                            : "border-line bg-surface hover:border-line-strong"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-semibold">
                            {address.fullName}
                          </span>
                          <span className="rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-mist">
                            {address.addressType.toLowerCase()}
                          </span>
                          {address.isDefault ? (
                            <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-paper">
                              Default
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-2 flex gap-1.5 text-[13px] leading-relaxed text-mist">
                          <PinIcon className="mt-0.5 size-3.5 shrink-0" />
                          <span>
                          {address.addressLine1}
                          {address.addressLine2 ? `, ${address.addressLine2}` : ""}
                          <br />
                          {address.city}, {address.state} {address.pincode}
                          <br />
                          {address.country}
                          </span>
                        </span>
                        <span className="mt-3 flex items-center gap-1.5 text-xs text-mist">
                          <PhoneIcon className="size-3.5" />
                          {address.phone}
                        </span>
                      </button>

                      {/* outside the card button — a button cannot nest in one */}
                      <button
                        type="button"
                        onClick={() => {
                          setFormOpen(false);
                          setEditingId(address.id);
                        }}
                        className="absolute bottom-5 right-5 inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-paper px-3 py-1.5 text-xs text-mist transition-colors hover:border-ink/40 hover:text-ink"
                      >
                        <PencilIcon className="size-3" />
                        Edit
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {formOpen || editingAddress ? (
              <div className={`mt-6 ${panel}`}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">
                  {editingAddress
                    ? "Edit address"
                    : addresses.length
                      ? "New address"
                      : "Where should it go?"}
                </h3>
                <AddressForm
                  // re-seeds the fields when the form switches address
                  key={editingAddress?.id ?? "new"}
                  initial={editingAddress ?? undefined}
                  onSave={saveAddress}
                  saving={savingAddress}
                  onCancel={
                    editingAddress
                      ? () => setEditingId(null)
                      : addresses.length
                        ? () => setFormOpen(false)
                        : undefined
                  }
                />
              </div>
            ) : null}
          </>
        )}

        {/* ------------------------------------------------- payment */}
        <div className="mt-10 flex items-center justify-between border-b border-line pb-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">
            Payment
          </h2>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PAYMENT_METHODS.map((method) => {
            const active = method.value === paymentMethod;
            const Icon = method.icon;
            return (
              <li key={method.value}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod(method.value)}
                  aria-pressed={active}
                  className={`flex h-full w-full flex-col rounded-3xl border p-5 text-left transition-colors ${
                    active
                      ? "border-volt-deep bg-volt/10"
                      : "border-line bg-surface hover:border-line-strong"
                  }`}
                >
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <Icon className="size-4" />
                    {method.label}
                  </span>
                  <span className="mt-2 text-[13px] leading-relaxed text-mist">
                    {method.copy}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <Link
          href="/cart"
          className="mt-8 inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-volt-deep"
        >
          <ArrowIcon className="size-4 rotate-180" />
          Back to cart
        </Link>
      </section>

      {/* --------------------------------------------------- summary */}
      <aside className="lg:sticky lg:top-32 lg:self-start">
        <div className={panel}>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">
            Order summary
          </h2>

          <ul className="mt-5 flex flex-col gap-3 border-b border-line pb-5">
            {lines.map((line) => (
              <li key={line.key} className="flex justify-between gap-4 text-sm">
                <span className="min-w-0">
                  <span className="block truncate font-medium">
                    {line.product.name}
                  </span>
                  <span className="text-xs text-mist">
                    {[line.colorway, line.option].filter(Boolean).join(" · ")}
                    {line.colorway || line.option ? " · " : ""}Qty {line.quantity}
                  </span>
                </span>
                <span className="shrink-0">{formatPrice(line.lineTotal)}</span>
              </li>
            ))}
          </ul>

          {/* where it is going, next to what it costs — no scrolling back up */}
          {selectedAddress ? (
            <p className="mt-5 flex gap-2 border-b border-line pb-5 text-xs leading-relaxed text-mist">
              <PinIcon className="mt-0.5 size-3.5 shrink-0 text-volt-deep" />
              <span>
                Delivering to{" "}
                <span className="text-ink">{selectedAddress.fullName}</span>,{" "}
                {selectedAddress.city} {selectedAddress.pincode}
              </span>
            </p>
          ) : null}

          <dl className="mt-5 flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-mist">
                Subtotal ({count} {count === 1 ? "item" : "items"})
              </dt>
              <dd>{formatPrice(totals.subtotal)}</dd>
            </div>
            {totals.savings > 0 ? (
              <div className="flex justify-between">
                <dt className="text-mist">Product savings</dt>
                <dd className="text-clay">&minus;{formatPrice(totals.savings)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between">
              <dt className="text-mist">Shipping</dt>
              <dd>
                {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-mist">Includes GST (18%)</dt>
              <dd className="text-mist">{formatPrice(totals.gst)}</dd>
            </div>
            <div className="mt-2 flex items-baseline justify-between border-t border-line pt-4">
              <dt className="text-base font-semibold">Total</dt>
              <dd className="text-2xl font-semibold">
                {formatPrice(totals.total)}
              </dd>
            </div>
          </dl>

          {error ? <p className="mt-5 text-xs text-clay">{error}</p> : null}

          <button
            type="button"
            onClick={placeOrder}
            disabled={placing || !selectedId}
            className="group mt-6 flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-volt text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {placing
              ? "Placing your order…"
              : paymentMethod === "COD"
                ? "Place order"
                : "Pay now"}
            <ArrowIcon className="size-4 transition-transform duration-400 group-hover:translate-x-1.5" />
          </button>

          <p className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-mist">
            <ShieldIcon className="size-3.5 shrink-0 text-volt-deep" />
            The final amount is confirmed by the server when the order is created.
          </p>
        </div>
      </aside>
    </div>
  );
}
