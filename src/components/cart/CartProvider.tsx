"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "@/types/cart";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const cartTotals = useMemo(() => {
    return items.reduce(
      (acc, item) => ({
        totalItems: acc.totalItems + item.quantity,
        totalPrice: acc.totalPrice + item.price * item.quantity,
      }),
      { totalItems: 0, totalPrice: 0 }
    );
  }, [items]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isLoading) {
        localStorage.setItem("cart", JSON.stringify(items));
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [items, isLoading]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    setIsLoading(false);
  }, []);

  const addItem = useCallback((newItem: CartItem) => {
    setItems((currentItems) => {
      console.log(newItem);

      const existingItem = currentItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        const updatedItems = currentItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        return updatedItems;
      }

      return [...currentItems, { ...newItem }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((currentItems) => {
      const filteredItems = currentItems.filter((item) => item.id !== id);

      return filteredItems;
    });
  }, []);

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity < 1) {
        removeItem(id);
        return;
      }

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isLoading,
    ...cartTotals,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">Loading cart...</div>
    );
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
