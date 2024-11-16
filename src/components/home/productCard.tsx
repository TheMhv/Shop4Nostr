import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ImageOff, Zap } from "lucide-react";

type ProductCardProps = {
  id: string;
  title: string;
  price: number;
  image?: string;
  soldOut?: boolean;
  preSale?: boolean;
};

const ProductCard = ({
  id,
  title,
  price,
  image = "",
  soldOut = false,
  preSale = false,
}: ProductCardProps) => (
  <article className="group cursor-pointer max-w-xs px-5">
    <Link href={`/product/${id}`}>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
        {image ? (
          <Image
            src={image}
            fill
            alt={title}
            className="rounded-none border-none bg-white/30 group-hover:scale-110 transition duration-300 object-cover"
          />
        ) : (
          <div className="flex items-center justify-center aspect-square w-full rounded-lg bg-gray-800">
            <ImageOff
              className="w-1/3 h-1/3 text-gray-500 group-hover:scale-110 transition duration-300"
              aria-hidden="true"
            />
          </div>
        )}

        {soldOut && (
          <span className="absolute bottom-4 left-4 bg-black/75 text-white text-xs font-medium px-3 py-1 rounded">
            Esgotado
          </span>
        )}

        {preSale && (
          <span className="absolute bottom-4 left-4 bg-cyan-500/75 text-white text-xs font-medium px-3 py-1 rounded">
            Pre-sale
          </span>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <h2 className="text-lg leading-[130%] group-hover:underline">
          {title}
        </h2>
        <div className="flex items-center gap-2 text-lg leading-[130%] font-semibold">
          <Zap className="text-yellow-500" aria-hidden="true" />
          <span>{price.toLocaleString()} Sats</span>
        </div>
      </div>
    </Link>
  </article>
);

export { ProductCard };
