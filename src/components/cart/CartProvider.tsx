"use client";

import { useEffect, useState, useCallback, useMemo, useContext } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "@/types/cart";
import { convert } from "@/lib/currency";
import { CurrencyContext } from "../CurrencyProvider";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { currency } = useContext(CurrencyContext);
  const [items, setItems] = useState<CartItem[]>([]);

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
      localStorage.setItem("cart", JSON.stringify(items));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [items]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  const addItem = useCallback(async (newItem: CartItem) => {
    if (newItem.currency !== currency) {
      newItem.price = Math.ceil(
        (await convert(newItem.price, newItem.currency, currency)) ||
          newItem.price
      );

      newItem.currency = currency;
    }

    if (newItem.shipping && newItem.shipping.currency !== currency) {
      newItem.shipping.cost = Math.ceil(
        (await convert(
          newItem.shipping.cost,
          newItem.shipping.currency,
          currency
        )) || newItem.shipping.cost
      );

      newItem.shipping.currency = currency;
    }

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
    ...cartTotals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
