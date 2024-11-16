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
    console.log(productEvent?.asPrettyJson());

    const images: string[] = [];

    productEvent?.tags.filter("image").forEach((imageTag) => {
      images.push(imageTag.content() || "");
    });

    const product = {
      id: productEvent?.id.toHex() || "",
      title: productEvent?.tags.find("title")?.content() || "Sample Product",
      description:
        productEvent?.tags.find("summary")?.content() || "Sample Summary",
      price: parseInt(productEvent?.tags.find("price")?.content() || "0"),
      currency: productEvent?.tags.find("price")?.asVec().at(2) || "sats",
      inStock: productEvent?.tags.find("status")?.content() == "active" || true,
      images: images,
      slug: "sample-product",
      tags: productEvent?.tags.hashtags() || [],
      npub: productEvent?.author.toBech32() || "",
    };

    if (!product) throw new ProductNotFoundError(id);
    return product;
  } catch (error) {
    if (error instanceof ProductNotFoundError) throw error;
    throw new Error("Failed to fetch product");
  }
}
