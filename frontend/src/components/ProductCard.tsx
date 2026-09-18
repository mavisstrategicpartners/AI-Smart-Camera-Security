import type { ProductSummary } from "../types";
import CameraMark from "./CameraMark";
import { useCart } from "../api/CartContext";
import { resolveImageUrl } from "../api/client";

const BRAND_LABEL: Record<ProductSummary["brand"], string> = { xiaomi: "Xiaomi", tplink: "TP-Link" };

export function formatZAR(price: string | number) {
  const n = typeof price === "string" ? parseFloat(price) : price;
  return "R" + n.toLocaleString("en-ZA", { maximumFractionDigits: 0 });
}

interface Props {
  product: ProductSummary;
  onViewDetails: (slug: string) => void;
}

export default function ProductCard({ product, onViewDetails }: Props) {
  const { addItem } = useCart();
  const imageUrl = resolveImageUrl(product.image);

  return (
    <div className="flex flex-col border border-line bg-card">
      <div className="relative flex aspect-square items-center justify-center bg-paper">
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} className="h-full w-full object-contain p-6" />
        ) : (
          <CameraMark category={product.category} size={64} />
        )}
        {product.is_bundle && (
          <span className="absolute right-3 top-3 bg-teal px-2 py-0.5 font-display text-[11px] text-white">
            BUNDLE
          </span>
        )}
      </div>

      <div className="flex flex-grow flex-col p-5">
        <p className="mb-0.5 text-xs text-[#8A8272]">{BRAND_LABEL[product.brand]}</p>
        <h3 className="mb-2 font-display text-[17px] font-semibold">{product.name}</h3>
        <p className="mb-4 flex-grow text-[13.5px] leading-relaxed text-[#5C5545]">{product.tagline}</p>
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-semibold">{formatZAR(product.price)}</span>
          <button
            onClick={() => onViewDetails(product.slug)}
            className="text-[13px] text-amberdeep hover:underline"
          >
            Details
          </button>
        </div>
        <button
          onClick={() => addItem(product.slug)}
          className="mt-3.5 justify-center bg-navydeep px-5 py-2.5 text-center font-display text-sm font-medium text-paper transition-opacity hover:opacity-85"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
