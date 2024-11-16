import { getProductByEventId } from "./nostr/market";

export class ProductNotFoundError extends Error {
  constructor(id: string) {
    super(`Product with ID ${id} not found`);
    this.name = "ProductNotFoundError";
  }
}

export async function getProduct(id: string) {
  try {
    const productEvent = await getProductByEventId(id);

    const product = {
      id: productEvent?.id.toHex() || "",
      title: productEvent?.tags.find("title")?.content() || "Sample Product",
      description:
        productEvent?.tags.find("summary")?.content() || "Sample Summary",
      price: parseInt(productEvent?.tags.find("price")?.content() || "21"),
      currency: productEvent?.tags.find("price")?.asVec().at(2) || "sats",
      inStock:
        productEvent?.tags.find("status")?.content() == "active" || false,
      images: [productEvent?.tags.find("image")?.content() || ""],
      slug: "sample-product",
      category: "general",
      npub: productEvent?.author.toBech32() || "",
    };

    if (!product) throw new ProductNotFoundError(id);
    return product;
  } catch (error) {
    if (error instanceof ProductNotFoundError) throw error;
    throw new Error("Failed to fetch product");
  }
}
