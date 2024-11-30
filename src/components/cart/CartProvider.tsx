"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "@/types/cart";
import { convert } from "@/lib/currency";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const cartTotals = useMemo(() => {
    return items.reduce(
      (acc, item) => ({
        totalItems: acc.totalItems + item.quantity,
        totalPrice: acc.totalPrice + item.price * item.quantity,
        totalShipping: acc.totalShipping + (item.shipping?.cost || 0),
      }),
      { totalItems: 0, totalPrice: 0, totalShipping: 0 }
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

  const addItem = useCallback(async (newItem: CartItem) => {
    // TODO: Make a converter based on client choice
    if (newItem.currency !== "SATS") {
      newItem.price =
        (await convert(newItem.price, newItem.currency, "SATS")) ||
        newItem.price;
      newItem.currency = "SATS";
    }

    if (newItem.shipping && newItem.shipping.currency !== "SATS") {
      newItem.shipping.cost =
        (await convert(
          newItem.shipping.cost,
          newItem.shipping.currency,
          "SATS"
        )) || newItem.shipping.cost;
      newItem.shipping.currency = "SATS";
    }
    //

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const sameShipping = currentItems.find(
        (item) =>
          item.shipping?.method === newItem.shipping?.method &&
          item.shipping?.cost === newItem.shipping?.cost &&
          item.author == newItem.author
      );

      if (sameShipping) {
        delete newItem.shipping;
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
