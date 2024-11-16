import { ImageOff } from "lucide-react";
import Image from "next/image";

interface ProductImageProps {
  src?: string;
  alt: string;
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  priority = false,
}: ProductImageProps) {
  if (!src) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-800">
        <div className="flex items-center justify-center h-full">
          <ImageOff className="w-1/3 h-1/3 text-gray-500" aria-hidden="true" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
      />
    </div>
  );
}
