import { Currencies } from "./currency";

export type ShippingMethod = {
  method: string;
  cost: number;
  currency: Currencies | string;
};

export type Product = {
  id: string;
  author: string;
  title: string;
  price: number;
  status: string;
  description?: string;
  currency?: Currencies;
  images?: string[];
  condition?: string;
  location?: string;
  tags?: string[];
  shipping?: ShippingMethod[];
};

export interface CartItem extends Pick<Product, "id" | "title" | "price"> {
  quantity: number;
  image?: string;
}
