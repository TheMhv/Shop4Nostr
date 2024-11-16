import { Product } from "@/types/product";

export class ProductNotFoundError extends Error {
  constructor(id: string) {
    super(`Product with ID ${id} not found`);
    this.name = "ProductNotFoundError";
  }
}

export async function getProduct(id: string): Promise<Product> {
  try {
    // In a real app, this would be an API call
    const product = {
      id,
      title: "Sample Product",
      description: "Lorem ipsum dolor sit amet...",
      price: 21,
      inStock: true,
      images: [],
      slug: "sample-product",
      category: "general",
    };

    if (!product) throw new ProductNotFoundError(id);
    return product;
  } catch (error) {
    if (error instanceof ProductNotFoundError) throw error;
    throw new Error("Failed to fetch product");
  }
}
