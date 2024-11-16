"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, ImageOff, ShoppingCart, Zap, X, Plus } from "lucide-react";
import { useCart } from "./CartContext";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CartItemCard } from "./CartItemCard";
import Link from "next/link";

interface CartItem {
  id: string;
  image?: string;
  title: string;
  quantity: number;
  price: number;
}

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

interface PriceDisplayProps {
  amount: number;
  className?: string;
}

interface CartModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ amount, className }) => (
  <span className={cn("flex items-center gap-2", className)}>
    <Zap className="inline text-yellow-500" aria-hidden="true" />
    <span>{amount.toLocaleString()} Sats</span>
  </span>
);

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => (
  <div className="flex items-center gap-4 py-4 border-b border-white/10">
    <div className="relative size-16 flex-shrink-0">
      {item.image ? (
        <Image
          src={item.image}
          fill
          alt={item.title}
          className="rounded-lg object-cover"
        />
      ) : (
        <div className="size-16 rounded-lg bg-neutral-800 flex items-center justify-center">
          <ImageOff className="size-8 text-neutral-500" />
        </div>
      )}
    </div>

    <div className="flex-1 min-w-0">
      <h3 className="text-sm font-medium truncate">{item.title}</h3>
      <PriceDisplay amount={item.price * item.quantity} className="text-sm" />

      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-2 bg-white/10 rounded-lg">
          <button
            onClick={() =>
              onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))
            }
            className="p-1 hover:bg-white/20 rounded-l-lg transition-colors"
            aria-label="Decrease quantity"
          >
            -
          </button>

          <span className="w-8 text-center">{item.quantity}</span>

          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="p-1 hover:bg-white/20 rounded-r-lg transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const CartModal: React.FC<CartModalProps> = ({ isOpen, setIsOpen }) => {
  const { items, totalItems, totalPrice } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, setIsOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 z-40",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-md bg-neutral-900 shadow-xl transform transition-transform duration-300 ease-in-out z-50",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 id="cart-title" className="text-lg font-medium">
            Shopping Cart ({totalItems})
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 hover:bg-white/10 transition-colors"
            aria-label="Close cart"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 h-[calc(100vh-180px)]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400">
              <ShoppingCart className="size-12 mb-4" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-600">
              {items.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}

              <div className="py-4">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center gap-4 p-2 rounded-lg shadow hover:bg-white/5 transition-colors">
                    <div className="relative size-20 flex-shrink-0">
                      <div className="absolute w-full h-full rounded-lg border-2 border-dashed border-neutral-600 flex items-center justify-center">
                        <Plus className="size-8 text-neutral-600" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm truncate">Add another products</h3>
                      <span className="font-semibold">See more</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-4 space-y-4 bg-neutral-900">
            <div className="flex items-center justify-between text-lg font-medium">
              <span>Total</span>
              <PriceDisplay amount={totalPrice} />
            </div>

            <Link href="/checkout">
              <button className="w-full bg-white text-black py-3 mt-4 rounded-full font-medium hover:scale-105 transition-transform flex items-center justify-center gap-2">
                Checkout
                <ArrowRight className="size-4" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
