export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  inStock: boolean;
  slug: string;
  category: string;
}

export interface CartItem extends Pick<Product, "id" | "title" | "price"> {
  quantity: number;
  image?: string;
}
