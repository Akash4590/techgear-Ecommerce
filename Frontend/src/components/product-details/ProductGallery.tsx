import React, { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  badge?: string; // e.g. "New"
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  badge,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const visibleThumbnails = images.slice(0, 4);
  const remainingCount = images.length - 4;

  return (
    <div className="flex gap-4">
      {/* Thumbnails column */}
      <div className="flex flex-col gap-3">
        {visibleThumbnails.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative h-[70px] w-[70px] flex-shrink-0 rounded-lg border-2 overflow-hidden bg-[#F8F9FC] transition-colors ${
              selectedIndex === index
                ? "border-[#4F46E5]"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <img
              src={img}
              alt={`${productName} thumbnail ${index + 1}`}
              className="h-full w-full object-contain p-1.5"
            />
          </button>
        ))}

        {remainingCount > 0 && (
          <button
            onClick={() => setSelectedIndex(4)}
            className="relative h-[70px] w-[70px] flex-shrink-0 rounded-lg border-2 border-gray-200 overflow-hidden bg-[#F8F9FC] hover:border-gray-300 transition-colors"
          >
            {images[4] && (
              <img
                src={images[4]}
                alt={`${productName} thumbnail 5`}
                className="h-full w-full object-contain p-1.5 opacity-50"
              />
            )}
            <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm font-semibold">
              +{remainingCount}
            </span>
          </button>
        )}
      </div>

      {/* Main image */}
      <div className="relative flex-1">
        {badge && (
          <span className="absolute left-3 top-3 z-10 bg-[#4F46E5] text-white text-xs font-semibold px-2.5 py-1 rounded-md">
            {badge}
          </span>
        )}
        <div className="flex h-[420px] items-center justify-center rounded-xl border border-gray-200 bg-[#F8F9FC]">
          <img
            src={images[selectedIndex]}
            alt={productName}
            className="h-full w-full object-contain p-10"
          />
        </div>

        {/* Dots indicator (mobile-style, shown below image) */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              aria-label={`Go to image ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                selectedIndex === index
                  ? "w-5 bg-[#4F46E5]"
                  : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;