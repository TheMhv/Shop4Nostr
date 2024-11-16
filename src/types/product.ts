export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  inStock: boolean;
  slug: string;
  category: string;
}

export interface CartItem extends Pick<Product, "id" | "title" | "price"> {
  quantity: number;
  image?: string;
}
