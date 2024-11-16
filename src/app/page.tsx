import { Footer } from "@/components/Footer";
import { Header } from "@/components/home/Header";
import { ProductCard } from "@/components/home/productCard";
import { randomUUID } from "crypto";

export default function Home() {
  return (
    <>
      <Header />

      <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-y-6 pb-20">
        <ProductCard id={randomUUID()} title="Sample Product" price={21} />
        <ProductCard id={randomUUID()} title="Sample Product" price={21} />
        <ProductCard id={randomUUID()} title="Sample Product" price={21} />
        <ProductCard id={randomUUID()} title="Sample Product" price={21} />
      </section>

      <Footer />
    </>
  );
}
