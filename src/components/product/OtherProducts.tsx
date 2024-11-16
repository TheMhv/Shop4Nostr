import { ChevronRight } from "lucide-react";
import { ProductCard } from "../home/productCard";
import Link from "next/link";
import { getProductsFromShop } from "@/lib/nostr/market";

export async function OtherProducts({ npub, currentProductId }) {
  const products: string[] = [];

  const shopProducts = await getProductsFromShop(npub);

  shopProducts.forEach((event) => {
    if (event.id.toHex() != currentProductId) {
      products.push(event.asJson());
    }
  });

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="pt-16 border-t border-white/35 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl">See also</h2>

        <Link
          href={`/shop/${npub}`}
          className="flex items-center gap-2 font-semibold hover:scale-105 transition-all group"
        >
          <span>See all</span>
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pb-20"
        aria-label="Other products"
      >
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </section>
    </div>
  );
}
