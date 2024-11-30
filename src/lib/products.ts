import { Product, ShippingMethod } from "@/types/product";
import { getProductByEventId } from "./nostr/market";
import { Currencies } from "@/types/currency";

export async function getProduct(id: string): Promise<Product> {
  try {
    const productEvent = await getProductByEventId(id);

    if (!productEvent) throw new Error("Failed to fetch product");

    const productId = productEvent.id.toHex();
    const author = productEvent.author.toBech32();

    const productTags = productEvent.tags;

    const title = productTags.find("title")?.content() || "";
    const status = productTags.find("status")?.content() || "active";

    const description =
      productTags.find("summary")?.content() || productEvent.content || "";

    const priceTag = productEvent?.tags.find("price");
    const price = parseInt(priceTag?.content() || "0");
    const currency = priceTag?.asVec().at(2) || "SATS";

    const images: string[] = productTags.filter("image").map((tag) => {
      return tag.content() || "";
    });

    const condition = productTags.find("condition")?.content();
    const location = productTags.find("location")?.content();

    const tags = productTags.hashtags();

    const shipping: ShippingMethod[] = productTags
      .filter("shipping")
      .map((tag) => {
        const values = tag.asVec();

        return {
          method: values.at(1) || "N/A",
          cost: parseInt(values.at(2) || "0"),
          currency: values.at(3) || "SATS",
        } as ShippingMethod;
      });

    const product: Product = {
      id: productId,
      author: author,
      title: title,
      price: price,
      status: status,
      description: description,
      currency: currency as Currencies,
      images: images,
      condition: condition,
      location: location,
      tags: tags,
      shipping: shipping,
    };

    return product;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch product");
  }
}
