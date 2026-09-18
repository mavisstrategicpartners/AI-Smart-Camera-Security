import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { fetchProduct, resolveImageUrl } from "../api/client";
import type { ProductDetail as ProductDetailType } from "../types";
import CameraMark from "./CameraMark";
import { formatZAR } from "./ProductCard";
import { useCart } from "../api/CartContext";

interface Props {
  slug: string;
  onClose: () => void;
}

export default function ProductModal({ slug, onClose }: Props) {
  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const { addItem, openCart } = useCart();

  useEffect(() => {
    let cancelled = false;
    fetchProduct(slug).then((data) => {
      if (!cancelled) setProduct(data);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-navydeep/60 p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[480px] bg-card p-8"
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-ink" aria-label="Close">
          <X size={18} />
        </button>

        {!product ? (
          <p className="py-10 text-center text-sm text-muted">Loading…</p>
        ) : (
          <>
            {resolveImageUrl(product.image) ? (
              <div className="mb-4 flex h-56 w-full items-center justify-center bg-paper">
                <img
                  src={resolveImageUrl(product.image)!}
                  alt={product.name}
                  className="h-full w-full object-contain p-4"
                />
              </div>
            ) : (
              <div className="mb-4 flex h-56 w-full items-center justify-center bg-paper">
                <CameraMark category={product.category} size={64} />
              </div>
            )}
            <p className="mt-4 text-xs text-[#8A8272]">{product.brand === "xiaomi" ? "Xiaomi" : "TP-Link"}</p>
            <h3 className="mb-1.5 mt-1 font-display text-xl font-semibold">{product.name}</h3>
            <p className="mb-4 text-sm text-[#5C5545]">{product.tagline}</p>
            <ul className="m-0 list-none p-0">
              {product.specs.map((s, i) => (
                <li key={i} className="border-t border-line py-2.5 text-[13.5px] text-[#3A3527]">
                  {s.text}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between">
              <span className="font-display text-xl font-semibold">{formatZAR(product.price)}</span>
              <button
                onClick={() => {
                  addItem(product.slug);
                  onClose();
                  openCart();
                }}
                className="bg-amber px-5 py-2.5 font-display text-sm font-semibold text-navydeep transition-opacity hover:opacity-85"
              >
                Add to cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
