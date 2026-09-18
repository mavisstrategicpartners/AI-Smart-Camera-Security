import { useEffect, useState } from "react";
import { fetchProducts } from "../api/client";
import type { ProductSummary } from "../types";
import ProductCard from "./ProductCard";
import { FILTERS } from "./Header";

interface Props {
  filter: string;
  onViewDetails: (slug: string) => void;
}

export default function ProductGrid({ filter, onViewDetails }: Props) {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const params =
      filter === "all" ? undefined : filter === "bundle" ? { bundle: true } : { category: filter as never };

    fetchProducts(params)
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't reach the catalog API. Is the Spring Boot server running on :8000?");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [filter]);

  const label = FILTERS.find((f) => f.key === filter)?.label ?? "All cameras";

  return (
    <section id="catalog" className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-7 flex items-baseline justify-between">
        <h2 className="font-display text-2xl font-semibold">{label}</h2>
        {!loading && !error && (
          <span className="text-[13px] text-muted">
            {products.length} camera{products.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {loading && <p className="text-sm text-muted">Loading cameras…</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onViewDetails={onViewDetails} />
          ))}
        </div>
      )}
    </section>
  );
}
