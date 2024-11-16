"use client";

import React, { useState } from "react";
import { ArrowRight, ImageOff, ShoppingCart, Zap } from "lucide-react";
import { useCart } from "./CartContext";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CartModal } from "./CartModal";

interface CartItem {
  id: string;
  image?: string;
  title: string;
  quantity: number;
  price: number;
}

interface CartBadgeProps {
  count: number;
}

interface CartItemImageProps {
  item: CartItem;
  index: number;
}

interface PriceDisplayProps {
  amount: number;
  className?: string;
}

const CartBadge: React.FC<CartBadgeProps> = ({ count }) => (
  <span
    className="absolute right-0 top-0 bg-lime-600 rounded-full text-primary text-xs py-0.5 px-1 translate-x-1/4 min-w-[1.2rem] text-center"
    aria-label={`${count} items in cart`}
  >
    {count}
  </span>
);

const CartItemImage: React.FC<CartItemImageProps> = ({ item }) => (
  <span className="size-8 relative -mr-2 last:mr-0">
    {item.image ? (
      <Image
        src={item.image}
        fill
        alt={`${item.title} - ${item.quantity} ${
          item.quantity === 1 ? "item" : "items"
        }`}
        className="absolute rounded-md size-8 bg-neutral-500 border border-white/25"
      />
    ) : (
      <div className="rounded-md size-8 bg-neutral-500 border border-white/25 flex items-center justify-center">
        <ImageOff className="size-6" aria-hidden="true" />
      </div>
    )}
  </span>
);

const PriceDisplay: React.FC<PriceDisplayProps> = ({ amount, className }) => (
  <span className={cn("flex items-center gap-2", className)}>
    <Zap className="inline text-yellow-500" aria-hidden="true" />
    <span>{amount.toLocaleString()} Sats</span>
  </span>
);

const ViewCartButton: React.FC = () => (
  <span className="flex items-center gap-x-2 rounded-full bg-white/35 text-secondary text-lg py-1 md:pl-4 md:pr-2">
    <span>View</span>
    <ArrowRight className="size-4" aria-hidden="true" />
  </span>
);

export const CartBar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { items, totalItems, totalPrice } = useCart();

  if (items.length == 0) {
    return;
  }

  const handleCartClick = () => {
    setModalOpen(true);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      handleCartClick();
    }
  };

  return (
    <div role="complementary" aria-label="Shopping Cart" className="mt-20">
      <section className="fixed w-full bottom-0 left-0 bg-neutral-pure py-6 border-t-2 border-white/20 bg-background z-10">
        <div className="flex items-center justify-between max-w-[870px] px-5 mx-auto">
          <div
            className="flex items-center gap-x-2 md:gap-x-6 cursor-pointer transition-transform duration-150 origin-left hover:scale-105 font-medium md:text-xl text-secondary"
            onClick={handleCartClick}
            onKeyDown={handleKeyPress}
            role="button"
            tabIndex={0}
            aria-label={`Shopping cart with ${totalItems} items`}
          >
            <span className="relative inline-block size-8">
              <ShoppingCart className="w-8 h-8" aria-hidden="true" />
              <CartBadge count={totalItems} />
            </span>
            <span>Your cart</span>
          </div>

          <div
            className="flex items-center gap-x-2 md:gap-x-6 cursor-pointer transition-transform duration-150 origin-right hover:scale-105 font-medium md:text-xl text-secondary"
            onClick={handleCartClick}
            onKeyDown={handleKeyPress}
            role="button"
            tabIndex={0}
          >
            {items.length > 0 && (
              <div
                className="flex flex-nowrap pr-2"
                aria-label={`${items.length} different items in cart`}
              >
                {items.map((item, index) => (
                  <CartItemImage key={item.id} item={item} index={index} />
                ))}
              </div>
            )}

            <PriceDisplay amount={totalPrice} />

            <ViewCartButton />
          </div>
        </div>

        <button
          className="absolute left-0 top-0 size-full opacity-0"
          onClick={handleCartClick}
          aria-label={`Open cart with ${totalItems} items, total ${totalPrice.toLocaleString()} Sats`}
          data-testid="cart-open-btn"
        />
      </section>

      <CartModal isOpen={modalOpen} setIsOpen={setModalOpen} />
    </div>
  );
};
