/* =============================================================================
   CART CONTEXT — P. Sims Hair Boutique
   Holds the shopping cart in memory + localStorage, exposes the drawer-open
   state so any component (Navbar, product cards) can pop the cart.

   Real multi-item checkout will be wired through a Supabase Edge Function that
   creates a Stripe Checkout Session from `items`. Until that's deployed, the
   drawer's Checkout button surfaces a friendly fallback.
   ============================================================================= */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  /** Stable identity used to de-duplicate / update qty. */
  key: string;
  /** Product display name, e.g. "Straight · Loose Wave · Body Wave Bundle". */
  name: string;
  /** Optional variant name within the product (texture, etc.). */
  variant?: string;
  /** Length in inches when applicable. */
  length?: number;
  /** Unit price in USD. */
  price: number;
  /** Thumbnail src. */
  image: string;
  /**
   * Per-SKU Stripe Payment Link, when one exists. Kept on the item so we can
   * fall back to single-item checkout for anything not yet mapped to a Stripe
   * Price ID in the future Supabase Edge Function flow.
   */
  checkoutUrl?: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "psb-cart-v1";

function loadInitial(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (it): it is CartItem =>
        it && typeof it.key === "string" && typeof it.price === "number" && typeof it.qty === "number"
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadInitial);
  const [isOpen, setIsOpen] = useState(false);

  // Persist on every change.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full / disabled — non-fatal */
    }
  }, [items]);

  // Lock body scroll while drawer is open.
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback<CartContextValue["addItem"]>((incoming) => {
    setItems((prev) => {
      const addQty = incoming.qty ?? 1;
      const idx = prev.findIndex((p) => p.key === incoming.key);
      if (idx === -1) {
        const { qty: _omit, ...rest } = incoming;
        return [...prev, { ...rest, qty: addQty }];
      }
      const next = [...prev];
      next[idx] = { ...next[idx], qty: next[idx].qty + addQty };
      return next;
    });
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((p) => p.key !== key));
  }, []);

  const updateQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((p) => p.key !== key)
        : prev.map((p) => (p.key === key ? { ...p, qty } : p))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const { count, subtotal } = useMemo(
    () =>
      items.reduce(
        (acc, it) => ({
          count: acc.count + it.qty,
          subtotal: acc.subtotal + it.price * it.qty,
        }),
        { count: 0, subtotal: 0 }
      ),
    [items]
  );

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    isOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    updateQty,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

/** Build a stable cart-item key from product + variant + length. */
export function cartKey(name: string, variant?: string, length?: number) {
  return `${name}::${variant ?? ""}::${length ?? ""}`;
}
