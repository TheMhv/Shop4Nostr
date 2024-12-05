"use Client";

import Image from "next/image";
import { Banknote, ImageOff, Zap } from "lucide-react";
import { CartContextType } from "@/types/cart";

interface SummaryFormProps {
  cart: CartContextType;
  handlePrevStep: () => void;
}

export const SummaryForm = ({ cart, handlePrevStep }: SummaryFormProps) => {
  const { items, totalPrice, totalShipping } = cart;

  const totalCartPrice = totalPrice + totalShipping;

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl text-white">Purchase Summary</h2>
      </div>

      <div className="space-y-2 overflow-y-auto h-[calc(100vh-50vh)]">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-2 rounded-lg shadow transition-colors group"
          >
            <div className="relative size-20 flex-shrink-0">
              {item.image ? (
                <Image
                  src={item.image}
                  fill
                  alt={item.title}
                  className="absolute rounded-lg object-cover w-full h-full"
                  loading="lazy"
                />
              ) : (
                <div className="absolute w-full h-full rounded-lg bg-neutral-800 flex items-center justify-center">
                  <ImageOff className="size-8 text-neutral-500" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium truncate">{item.title}</h3>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  {item.quantity.toLocaleString()} x{" "}
                  {item.price.toLocaleString()} Sats
                </div>

                <div className="flex items-center gap-2">
                  {item.currency == "SATS" ? (
                    <Zap className="text-yellow-500" aria-hidden="true" />
                  ) : (
                    <Banknote className="text-green-700" aria-hidden="true" />
                  )}
                  <span>
                    {(item.price * item.quantity).toLocaleString()}{" "}
                    {item.currency}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between text-sm font-medium gap-4 pt-4">
          <span>Shipping</span>
          <span>
            <Zap className="inline text-yellow-500 h-4" aria-hidden="true" />
            <span>{totalShipping.toLocaleString()} SATS</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-lg font-medium gap-4 pt-4">
          <span>Total</span>
          <span className="space-x-2">
            <Zap className="inline text-yellow-500" aria-hidden="true" />
            <span>{totalCartPrice.toLocaleString()} SATS</span>
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={handlePrevStep}
            className="w-full py-3 px-6 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-600 transition-all"
          >
            Back
          </button>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Order
          </button>
        </div>
      </div>
    </>
  );
};
