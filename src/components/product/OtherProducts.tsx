import { ChevronRight } from "lucide-react";
import { ProductCard } from "../home/productCard";
import Link from "next/link";

interface OtherProductsProps {
  category: string;
  currentProductId: string;
}

async function getOtherProducts(category: string, currentProductId: string) {
  console.log(currentProductId);

  return Array.from({ length: 4 }, (_, i) => ({
    id: crypto.randomUUID(),
    title: `Sample Product ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 10,
    images: [],
    slug: `sample-product-${i + 1}`,
    category,
  }));
}

export async function OtherProducts({
  category,
  currentProductId,
}: OtherProductsProps) {
  const products = await getOtherProducts(category, currentProductId);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="pt-16 border-t border-white/35 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl">See also</h2>

        <Link
          href="/"
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
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </section>
    </div>
  );
}
