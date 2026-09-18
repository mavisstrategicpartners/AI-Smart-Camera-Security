import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchOrderByEmail } from "../api/client";

export default function TrackOrder() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const reference = String(form.get("reference")).trim();
    const email = String(form.get("email")).trim();

    try {
      await fetchOrderByEmail(reference, email);
      navigate(`/order/${reference}`);
    } catch {
      setError("We couldn't find an order with that reference and email. Double-check both and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <p className="mb-6 text-sm">
        <Link to="/" className="text-amberdeep hover:underline">
          ← Back to shop
        </Link>
      </p>
      <h1 className="mb-2 font-display text-2xl font-semibold">Track your order</h1>
      <p className="mb-6 text-sm text-muted">
        Lost your confirmation email? Enter your order reference and the email you used to check
        its status.
      </p>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="mb-1 block text-[13px] text-[#5C5545]">Order reference</label>
          <input
            name="reference"
            required
            placeholder="e.g. a1b2c3d4-..."
            className="w-full border border-line bg-card px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-[13px] text-[#5C5545]">Email used at checkout</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-line bg-card px-3 py-2.5 text-sm"
          />
        </div>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 justify-center bg-navydeep px-5 py-2.5 text-center font-display text-sm font-medium text-paper transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {submitting ? "Looking up…" : "Find my order"}
        </button>
      </form>
    </div>
  );
}
