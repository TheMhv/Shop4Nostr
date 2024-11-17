"use client";

import { ShopHeader } from "./ShopHeader";
import { Search } from "lucide-react";
import { Footer } from "../Footer";
import { Event, loadWasmSync } from "@rust-nostr/nostr-sdk";
import { ProductCard } from "./productCard";
import React, { useMemo, useState } from "react";

interface ShopInfoProps {
  name?: string;
  description?: string;
  icon?: string;
  productsEvents: string[];
}

export const ShopInfo = ({
  name,
  description,
  icon,
  productsEvents,
}: ShopInfoProps) => {
  const [activeTag, setActiveTag] = useState<string>("");

  loadWasmSync();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const products: Event[] = [];

  productsEvents.forEach((product) => {
    products.push(Event.fromJson(product));
  });

  const tags: string[] = useMemo(() => {
    const allTags: string[] = [];
    products.forEach((product) => {
      allTags.push(...product.tags.hashtags());
    });
    return [...new Set(allTags)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!activeTag) {
      return products;
    }

    return products.filter((product) => {
      const productTags = product.tags.hashtags();
      return productTags.includes(activeTag);
    });
  }, [products, activeTag]);

  const handleOnClickTag = (e: React.MouseEvent<HTMLElement>) => {
    setActiveTag((e.target as HTMLInputElement).value);
  };

  return (
    <>
      <header className="mt-24 px-4 md:px-8">
        <ShopHeader name={name} description={description} icon={icon} />

        <div className="mx-auto mt-12 px-2 md:px-0 space-y-6">
          <form role="search" className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-white/60" aria-hidden="true" />
            </div>

            <input
              type="text"
              className="bg-white/15 text-white text-sm rounded-lg outline-none border-2 border-transparent focus:border-white/15 block w-full pl-10 px-3 py-1.5"
              placeholder="Search..."
            />
          </form>

          <nav className="flex items-center flex-wrap gap-2">
            <button
              onClick={handleOnClickTag}
              value={""}
              className={`rounded-full border-2 py-2 px-4 cursor-pointer transition hover:bg-white/15 hover:border-white/30 text-white text-sm font-medium whitespace-nowrap ${
                activeTag == ""
                  ? "bg-white/30 border-transparent"
                  : "border-white/25 bg-transparent"
              }`}
            >
              All
            </button>

            {tags.map((tag, index) => (
              <button
                key={index}
                onClick={handleOnClickTag}
                value={tag}
                className={`rounded-full border-2 py-2 px-4 cursor-pointer transition hover:bg-white/15 hover:border-white/30 text-white text-sm font-medium whitespace-nowrap ${
                  activeTag == tag
                    ? "bg-white/30 border-transparent"
                    : "border-white/25 bg-transparent"
                }`}
              >
                {tag}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-y-6 pb-20">
        {filteredProducts.map((product, index) => (
          <ProductCard key={index} product={product.asJson()} />
        ))}
      </section>

      <Footer />
    </>
  );
};
