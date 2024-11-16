"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { Product } from "@/types/product";
import { Store, Zap } from "lucide-react";
import { QuantitySelector } from "./QuantitySelector";
import Link from "next/link";
import Image from "next/image";

interface ProductDetailsProps {
  product: Product;
}

const StoreHeader = ({ icon, name }: { icon?: string; name: string }) => (
  <Link href="/" className="group">
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

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async (buyNow = false) => {
    setIsAddingToCart(true);

    await addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: quantity || 1,
    });

    if (buyNow) {
      window.location.href = "/checkout";
    }

    setIsAddingToCart(false);
  };

  return (
    <div className="space-y-14">
      <div className="space-y-6">
        <StoreHeader name="My Store" />

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold">{product.title}</h1>
          </div>

          <div className="flex items-center gap-2 text-3xl font-bold">
            <Zap className="text-yellow-500" aria-hidden="true" />
            <span>{product.price.toLocaleString()} Sats</span>
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
            disabled={!product.inStock || isAddingToCart}
          />
        </div>

        <div className="space-y-4">
          <button
            className="w-full py-3 px-6 rounded-full font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white text-black"
            onClick={() => handleAddToCart(true)}
            disabled={!product.inStock || isAddingToCart}
          >
            {isAddingToCart ? "Adding..." : "Buy now"}
          </button>

          <button
            className="w-full py-3 px-6 rounded-full font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white/15 text-white"
            onClick={() => handleAddToCart(false)}
            disabled={!product.inStock || isAddingToCart}
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
