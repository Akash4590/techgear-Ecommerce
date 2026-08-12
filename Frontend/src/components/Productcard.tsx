import { Heart, Star, ShoppingCart } from "lucide-react";
import type { Product } from "../data/Products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { name, price, rating, reviewCount, imageAlt, image } = product;

  return (
    <div className="group relative rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#E5E7EB] transition-shadow hover:shadow-md">
      <button
        type="button"
        aria-label={`Add ${name} to wishlist`}
        className="absolute right-6 top-6 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:text-[#4F46E5]"
      >
        <Heart className="h-4 w-4 text-[#111827]" strokeWidth={2} />
      </button>

      {/* Product Image */}
      <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-[#F8F9FC]">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-[#111827]">{name}</h3>

        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.round(rating)
                    ? "fill-[#F59E0B] text-[#F59E0B]"
                    : "fill-[#E5E7EB] text-[#E5E7EB]"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-[#6B7280]">({reviewCount})</span>
        </div>

        <p className="mt-2 text-base font-bold text-[#111827]">
          ${price.toLocaleString()}
        </p>

        <button
          type="button"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#6366F1]"
        >
          <ShoppingCart className="h-4 w-4" strokeWidth={2} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;