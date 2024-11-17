import React from "react";
import { ImageOff } from "lucide-react";
import Image from "next/image";

interface ShopHeaderProps {
  name?: string;
  description?: string;
  icon?: string;
}

export const ShopHeader = ({
  name = "",
  description = "",
  icon = "",
}: ShopHeaderProps) => {
  return (
    <div className="text-center mx-auto space-y-4">
      <div className="flex items-center justify-center relative aspect-[3/4] rounded-full w-24 h-24 mx-auto bg-gray-800">
        {icon ? (
          <Image
            src={icon}
            fill
            alt="Store icon"
            className="object-cover rounded-full w-1/3 h-1/3"
          />
        ) : (
          <ImageOff
            className="object-cover rounded-full w-1/3 h-1/3"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="space-y-2">
        <span className="text-2xl font-bold">{name}</span>
        <p className="text-white/80 text-sm">{description}</p>
      </div>
    </div>
  );
};
