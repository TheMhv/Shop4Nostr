"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { Product } from "@/types/product";
import { Banknote, Store, Zap } from "lucide-react";
import { QuantitySelector } from "./QuantitySelector";
import Link from "next/link";
import Image from "next/image";

interface ProductDetailsProps {
  product: Product;
  store: {
    name?: string;
    icon?: string;
    npub: string;
  };
}

const StoreHeader = ({
  icon,
  name,
  npub,
}: {
  icon?: string;
  name: string;
  npub: string;
}) => (
  <Link href={`/shop/${npub}`} className="group">
    <div className="flex gap-x-3 items-center">
      <div className="flex items-center shrink-0 relative size-8">
        {icon ? (
          <Image
            src={icon}
            fill
            alt={`${name} icon`}
            className="absolute rounded-full"
          />
        ) : (
          <Store className="rounded-full" />
        )}
      </div>
      <div className="flex flex-col">
        <h3 className="font-medium text-white group-hover:underline">{name}</h3>
      </div>
    </div>
  </Link>
);

export function ProductDetails({ product, store }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async (buyNow = false) => {
    setIsAddingToCart(true);

    await addItem({
      id: product.id,
      title: product.title,
      author: product.author,
      price: product.price,
      currency: product.currency || "SATS",
      image: product?.images?.at(0),
      quantity: quantity || 1,
      shipping: product.shipping?.at(0),
    });

    if (buyNow) {
      window.location.href = "/checkout";
    }

    setIsAddingToCart(false);
  };

  return (
    <div className="space-y-14">
      <div className="space-y-6">
        {store.name && (
          <StoreHeader name={store.name} icon={store.icon} npub={store.npub} />
        )}

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold">{product.title}</h1>
          </div>

          <div className="flex items-center gap-2 text-3xl font-bold">
            {product.currency == "SATS" ? (
              <Zap className="text-yellow-500" aria-hidden="true" />
            ) : (
              <Banknote className="text-green-700" aria-hidden="true" />
            )}
            <span>
              {product.price.toLocaleString()} {product.currency}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="quantity" className="font-semibold">
            Quantity
          </label>
          <QuantitySelector
            id="quantity"
            quantity={quantity}
            onIncrease={() => setQuantity((q) => q + 1)}
            onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
            disabled={product.status !== "active" || isAddingToCart}
          />
        </div>

        <div className="space-y-4">
          <button
            className="w-full py-3 px-6 rounded-full font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white text-black"
            onClick={() => handleAddToCart(true)}
            disabled={product.status !== "active" || isAddingToCart}
          >
            {isAddingToCart ? "Adding..." : "Buy now"}
          </button>

          <button
            className="w-full py-3 px-6 rounded-full font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white/15 text-white"
            onClick={() => handleAddToCart(false)}
            disabled={product.status !== "active" || isAddingToCart}
          >
            {isAddingToCart ? "Adding..." : "Add to cart"}
          </button>
        </div>
      </div>

      <div className="prose prose-invert max-w-none pt-6 border-t border-white/35">
        <h2 className="font-semibold text-xl mb-4">Description</h2>
        <p className="break-words text-gray-300">{product.description}</p>
      </div>
    </div>
  );
}
