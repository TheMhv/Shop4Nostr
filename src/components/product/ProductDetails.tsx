"use client";

import { useContext, useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { Product, ShippingMethod } from "@/types/product";
import { Banknote, Bitcoin, Store, Zap } from "lucide-react";
import { QuantitySelector } from "./QuantitySelector";
import Link from "next/link";
import Image from "next/image";
import { Currencies } from "@/types/currency";
import { convert } from "@/lib/currency";
import { CurrencyContext } from "../CurrencyProvider";

interface ProductDetailsProps {
  product: Product;
  store: {
    name?: string;
    icon?: string;
  };
}

const StoreHeader = ({ icon, name }: { icon?: string; name: string }) => (
  <Link href={`/`} className="group">
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
  const [shippingMethod, setShippingMethod] = useState<
    ShippingMethod | undefined
  >(product.shipping?.at(0));
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addItem } = useCart();

  const [convertedPrice, setConvertedPrice] = useState<number>(product.price);
  const [showCurrency, setCurrency] = useState<Currencies>(
    product.currency as Currencies
  );

  const { currency } = useContext(CurrencyContext);

  useEffect(() => {
    const fetchConvertedPrice = async () => {
      try {
        const converted = await convert(
          product.price,
          product.currency as Currencies,
          currency
        );

        if (converted) {
          setConvertedPrice(converted);
          setCurrency(currency);
        }
      } catch (error) {
        console.error(error);
        setConvertedPrice(product.price);
        setCurrency(product.currency as Currencies);
      }
    };

    fetchConvertedPrice();
  }, [product, currency]);

  const handleAddToCart = async (buyNow = false) => {
    setIsAddingToCart(true);

    await addItem({
      id: product.id,
      title: product.title,
      author: product.author,
      price: convertedPrice,
      currency: showCurrency || "SATS",
      image: product?.images?.at(0),
      quantity: quantity || 1,
      shipping: shippingMethod,
    });

    if (buyNow) {
      window.location.href = "/checkout";
    }

    setIsAddingToCart(false);
  };

  return (
    <div className="space-y-14">
      <div className="space-y-6">
        {store.name && <StoreHeader name={store.name} icon={store.icon} />}

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold">{product.title}</h1>
          </div>

          <div className="flex items-center gap-2 text-3xl font-bold">
            {showCurrency == "SATS" ? (
              <Zap className="text-yellow-500" aria-hidden="true" />
            ) : showCurrency == "BTC" ? (
              <Bitcoin className="text-yellow-500" aria-hidden="true" />
            ) : (
              <Banknote className="text-green-700" aria-hidden="true" />
            )}
            <span>
              {Math.ceil(convertedPrice)} {showCurrency}
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

        {product.shipping && (
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="shipping_method" className="font-semibold w-full">
              Shipping Method
            </label>

            <select
              name="shipping"
              id="shipping_method"
              defaultValue={0}
              onChange={(e) =>
                setShippingMethod(
                  product.shipping?.at(parseInt(e.target.value))
                )
              }
              className="bg-white/15 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            >
              {product.shipping.map((shipping_method, keyIndex) => (
                <option key={keyIndex} value={keyIndex} className="text-black">
                  {`${shipping_method.method} - ${shipping_method.cost} ${shipping_method.currency}`}
                </option>
              ))}
            </select>
          </div>
        )}

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
