"use client";

import { CartContextType } from "@/types/cart";
import { createContext, useContext } from "react";

// Create Context
export const CartContext = createContext<CartContextType | null>(null);

// Custom hook to use cart
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
