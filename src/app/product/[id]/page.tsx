import { Footer } from "@/components/Footer";
import { OtherProducts } from "@/components/product/OtherProducts";
import { OtherProductsSkeleton } from "@/components/product/OtherProductsSkeleton";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductDetailsSkeleton } from "@/components/product/ProductDetailsSkeleton";
import { ProductGallery } from "@/components/product/ProductGallery";
import { getProduct } from "@/lib/products";
import { Undo } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

interface ProductPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.id);

  return {
    title: `${product.title} | Shop4Nostr`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  return (
    <>
      <div className="fixed top-0 left-0 p-10 z-20">
        <Link href="/">
          <button className="w-full p-2 rounded-full font-semibold hover:scale-105 transition-all bg-neutral-800 text-white">
            <Undo />
          </button>
        </Link>
      </div>

      <main className="mx-auto max-w-7xl px-4 pt-20 space-y-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-32">
          <ProductGallery images={product.images} title={product.title} />

          <Suspense fallback={<ProductDetailsSkeleton />}>
            <ProductDetails product={product} />
          </Suspense>
        </div>

        <Suspense fallback={<OtherProductsSkeleton />}>
          <OtherProducts npub={product.npub} currentProductId={product.id} />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
