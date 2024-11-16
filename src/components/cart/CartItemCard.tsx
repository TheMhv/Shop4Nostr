import { memo } from "react";
import Image from "next/image";
import { ImageOff, Minus, Plus, Trash2, Zap } from "lucide-react";
import { useCart } from "./CartContext";
import { CartItem } from "@/types/cart";
import Link from "next/link";

export const CartItemCard = memo(({ item }: { item: CartItem }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="py-4">
      <div className="flex items-center gap-4 p-2 rounded-lg shadow hover:bg-white/5 transition-colors group">
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
            <Link href={`/product/${item.id}`}>
              <h3 className="text-sm font-medium truncate hover:underline">
                {item.title}
              </h3>
            </Link>

            <button
              onClick={handleRemove}
              className="p-1 text-neutral-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={`Remove ${item.title} from cart`}
            >
              <Trash2 className="size-4" />
            </button>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-yellow-500" />
              <span>{subtotal.toLocaleString()} Sats</span>
            </div>

            <div className="flex items-center gap-2 w-24 bg-white/10 rounded-lg">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="p-2 hover:bg-white/20 rounded-l-lg transition-colors"
                aria-label={`Decrease quantity of ${item.title}`}
              >
                <Minus className="size-4" />
              </button>

              <span className="w-8 text-center" aria-label="Quantity">
                {item.quantity}
              </span>

              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="p-2 hover:bg-white/20 rounded-r-lg transition-colors"
                aria-label={`Increase quantity of ${item.title}`}
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

CartItemCard.displayName = "CartItemCard";
