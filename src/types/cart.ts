import { ShippingMethod } from "./product";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  shipping?: ShippingMethod[];
};

export type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};
