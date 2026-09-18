import { Link } from "react-router-dom";
import { X, Plus, Minus } from "lucide-react";
import { useCart } from "../api/CartContext";
import CameraMark from "./CameraMark";
import { formatZAR } from "./ProductCard";

export default function CartDrawer() {
  const { cart, isOpen, closeCart, changeQuantity } = useCart();
  if (!isOpen) return null;

  const items = cart?.items ?? [];

  return (
    <div onClick={closeCart} className="fixed inset-0 z-40 bg-navydeep/50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 flex h-full w-full max-w-[380px] flex-col bg-paper p-6"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Your cart</h3>
          <button onClick={closeCart} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto">
          {items.length === 0 && <p className="text-[13.5px] text-[#8A8272]">No cameras added yet.</p>}
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 border-b border-line py-3.5">
              <CameraMark category={item.product.category} size={34} />
              <div className="flex-grow">
                <p className="mb-1 text-[13px] font-medium">{item.product.name}</p>
                <p className="text-xs text-[#8A8272]">{formatZAR(item.product.price)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => changeQuantity(item.id, item.quantity - 1)}
                    className="flex h-6 w-6 items-center justify-center border border-line"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="min-w-4 text-center text-[13px]">{item.quantity}</span>
                  <button
                    onClick={() => changeQuantity(item.id, item.quantity + 1)}
                    className="flex h-6 w-6 items-center justify-center border border-line"
                    aria-label="Increase quantity"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 border-t border-line pt-4">
          <div className="mb-3.5 flex justify-between">
            <span className="font-display text-base font-semibold">Subtotal</span>
            <span className="font-display text-base font-semibold">{formatZAR(cart?.total ?? "0")}</span>
          </div>
          <Link
            to="/checkout"
            onClick={closeCart}
            aria-disabled={items.length === 0}
            className={`block bg-navydeep px-5 py-2.5 text-center font-display text-sm font-medium text-paper transition-opacity ${
              items.length === 0 ? "pointer-events-none opacity-40" : "hover:opacity-85"
            }`}
          >
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
