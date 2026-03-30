"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  category?: string;
  size?: string;
  color?: string;
  printfulVariantId?: number;
  variant?: string;
}

export type CartItemInput = Omit<CartItem, "id" | "quantity"> & {
  id: string | number;
  quantity?: number;
};

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  addItem: (item: CartItemInput) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const STORAGE_KEY = "gray-method-training-cart-v1";

const CartContext = createContext<CartContextValue | undefined>(undefined);

const toCartId = (id: string | number) => String(id);

const normalizeQuantity = (quantity?: number) => {
  if (typeof quantity !== "number" || !Number.isFinite(quantity)) {
    return 1;
  }

  return Math.max(1, Math.floor(quantity));
};

const isCartItem = (value: unknown): value is CartItem => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.price === "number" &&
    Number.isFinite(candidate.price) &&
    typeof candidate.quantity === "number" &&
    Number.isFinite(candidate.quantity) &&
    candidate.quantity > 0
  );
};

const readStoredCart = (): CartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .filter(isCartItem)
      .map((item) => ({
        ...item,
        quantity: normalizeQuantity(item.quantity),
      }));
  } catch {
    return [];
  }
};

const writeStoredCart = (items: CartItem[]) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage failures so cart interactions still work.
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => readStoredCart());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    writeStoredCart(items);
  }, [items]);

  const addItem = useCallback((incomingItem: CartItemInput) => {
    const nextItem: CartItem = {
      id: toCartId(incomingItem.id),
      name: incomingItem.name,
      price: incomingItem.price,
      quantity: normalizeQuantity(incomingItem.quantity),
      imageUrl: incomingItem.imageUrl,
      category: incomingItem.category,
      size: incomingItem.size,
      color: incomingItem.color,
      printfulVariantId: incomingItem.printfulVariantId,
      variant: incomingItem.variant,
    };

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === nextItem.id);

      if (!existingItem) {
        return [...currentItems, nextItem];
      }

      return currentItems.map((item) =>
        item.id === nextItem.id
          ? { ...item, quantity: item.quantity + nextItem.quantity }
          : item,
      );
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string | number) => {
    const normalizedId = toCartId(id);
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== normalizedId),
    );
  }, []);

  const updateQuantity = useCallback(
    (id: string | number, quantity: number) => {
      const normalizedId = toCartId(id);

      if (quantity <= 0) {
        setItems((currentItems) =>
          currentItems.filter((item) => item.id !== normalizedId),
        );
        return;
      }

      const nextQuantity = normalizeQuantity(quantity);

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === normalizedId ? { ...item, quantity: nextQuantity } : item,
        ),
      );
    },
    [],
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  const count = items.reduce((runningCount, item) => runningCount + item.quantity, 0);
  const total = items.reduce(
    (runningTotal, item) => runningTotal + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
