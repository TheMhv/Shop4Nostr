"use client";

import { useState } from "react";
import { ProductImage } from "./ProductImage";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <ProductImage src={selectedImage} alt={title} priority />

      {images.length > 1 && (
        <div
          className="grid grid-cols-5 gap-2"
          role="region"
          aria-label="Product gallery"
        >
          {images.map((image, index) => (
            <button
              key={image}
              onClick={() => setSelectedImage(image)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg",
                selectedImage === image && "ring-2 ring-white"
              )}
              aria-label={`View ${title} image ${index + 1}`}
              aria-current={selectedImage === image}
            >
              <ProductImage src={image} alt={`${title} view ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
