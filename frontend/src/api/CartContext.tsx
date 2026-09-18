import { createContext, useContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Cart } from "../types";
import { addCartItem, getOrCreateCart, removeCartItem, setCartItemQuantity } from "../api/client";

interface CartContextValue {
  cart: Cart | null;
  loading: boolean;
  itemCount: number;
  isOpen: boolean;
  error: string | null;
  clearError: () => void;
  openCart: () => void;
  closeCart: () => void;
  addItem: (slug: string, quantity?: number) => Promise<void>;
  changeQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

function extractErrorMessage(err: unknown): string {
  const axiosErr = err as { response?: { data?: { message?: string } } };
  return axiosErr?.response?.data?.message || "Something went wrong — please try again.";
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const c = await getOrCreateCart();
      setCart(c);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addItem = useCallback(
    async (slug: string, quantity = 1) => {
      try {
        const current = cart ?? (await getOrCreateCart());
        const updated = await addCartItem(current.token, slug, quantity);
        setCart(updated);
        setIsOpen(true);
      } catch (err) {
        setError(extractErrorMessage(err));
      }
    },
    [cart]
  );

  const changeQuantity = useCallback(
    async (itemId: number, quantity: number) => {
      if (!cart) return;
      try {
        if (quantity <= 0) {
          const updated = await removeCartItem(cart.token, itemId);
          setCart(updated);
          return;
        }
        const updated = await setCartItemQuantity(cart.token, itemId, quantity);
        setCart(updated);
      } catch (err) {
        setError(extractErrorMessage(err));
      }
    },
    [cart]
  );

  const removeItem = useCallback(
    async (itemId: number) => {
      if (!cart) return;
      const updated = await removeCartItem(cart.token, itemId);
      setCart(updated);
    },
    [cart]
  );

  const itemCount = useMemo(() => cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0, [cart]);

  const value: CartContextValue = {
    cart,
    loading,
    itemCount,
    isOpen,
    error,
    clearError: () => setError(null),
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    changeQuantity,
    removeItem,
    refresh,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
