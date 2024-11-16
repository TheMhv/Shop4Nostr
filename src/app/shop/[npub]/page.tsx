import { Footer } from "@/components/Footer";
import { Header } from "@/components/home/Header";
import { ProductCard } from "@/components/home/productCard";
import { getProductsFromShop, getShopMetadata } from "@/lib/nostr/market";
import { getUser } from "@/lib/nostr/users";

interface PageProps {
  params: { npub: string };
}

export default async function StorePage({ params }: PageProps) {
  const { npub } = params;

  const profile = await getUser(npub);

  if (!profile) {
    return <h1>This profile does not exist</h1>;
  }

  const shopMetadata = await getShopMetadata(npub);

  if (!shopMetadata) {
    return <h1>This profile does have a shop</h1>;
  }

  const products: string[] = [];
  const shopProducts = await getProductsFromShop(npub);
  shopProducts.forEach((event) => {
    products.push(event.asJson());
  });

  return (
    <>
      <Header shopMetadata={shopMetadata} />

      <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-y-6 pb-20">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </section>

      <Footer />
    </>
  );
}
