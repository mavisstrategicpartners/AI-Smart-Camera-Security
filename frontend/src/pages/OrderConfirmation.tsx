import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchOrder } from "../api/client";
import type { Order } from "../types";
import { formatZAR } from "../components/ProductCard";

export default function OrderConfirmation() {
  const { reference } = useParams<{ reference: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!reference) return;
    fetchOrder(reference)
      .then(setOrder)
      .catch(() => setError(true));
  }, [reference]);

  if (error) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <h1 className="mb-3 font-display text-2xl font-semibold">Order not found</h1>
        <Link to="/" className="bg-navydeep px-5 py-2.5 font-display text-sm text-paper">
          Back to shop
        </Link>
      </div>
    );
  }

  if (!order) return <p className="px-6 py-20 text-center text-sm text-muted">Loading…</p>;

  const statusCopy: Record<string, { label: string; note: string }> = {
    pending: {
      label: "Payment processing",
      note: "We're waiting for PayFast to confirm your payment — this page will update shortly. Refresh if it's been a few minutes.",
    },
    paid: { label: "Payment received", note: `We'll email ${order.email} again once it ships.` },
    shipped: { label: "On its way", note: `Shipped to you — we'll follow up with tracking at ${order.email}.` },
    delivered: { label: "Delivered", note: "Enjoy your new camera!" },
    cancelled: { label: "Order cancelled", note: "This order was cancelled. Contact us if that's unexpected." },
  };
  const status = statusCopy[order.status] ?? statusCopy.pending;

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <p className="mb-2 text-sm text-amberdeep">{status.label}</p>
      <h1 className="mb-1 font-display text-2xl font-semibold">Thanks, {order.full_name.split(" ")[0]}.</h1>
      <p className="mb-8 text-sm text-muted">
        Reference <span className="font-mono">{order.reference}</span> · {status.note}
      </p>

      <div className="border border-line bg-card p-6">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between border-b border-line py-3 text-sm last:border-b-0">
            <span>
              {item.product_name} × {item.quantity}
            </span>
            <span>{formatZAR(item.subtotal)}</span>
          </div>
        ))}
        <div className="mt-3 flex justify-between border-t border-line pt-3 font-display text-base font-semibold">
          <span>Total</span>
          <span>{formatZAR(order.total)}</span>
        </div>
      </div>

      <div className="mt-6 text-sm text-muted">
        <p>Shipping to:</p>
        <p className="text-ink">
          {order.address_line1}
          {order.address_line2 && `, ${order.address_line2}`}, {order.city}, {order.province} {order.postal_code}
        </p>
      </div>

      <Link to="/" className="mt-8 inline-block bg-navydeep px-5 py-2.5 font-display text-sm text-paper">
        Continue shopping
      </Link>
    </div>
  );
}
