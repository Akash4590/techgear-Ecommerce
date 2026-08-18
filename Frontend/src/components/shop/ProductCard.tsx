import { Heart, Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../../data/Products";
import { useShop } from "../../context/ShopContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { name, image, rating, reviewCount, price, imageAlt, category } = product;
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    isInCart,
  } = useShop();

  const wishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const handleWishlistClick = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="group relative flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#D8D6FE] hover:shadow-lg">

      {/* Wishlist */}
      <button
        type="button"
        onClick={handleWishlistClick}
        aria-label={`Add ${name} to wishlist`}
        className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm ring-1 ring-gray-200 transition-all duration-200 hover:scale-105 hover:text-red-500"
      >
        <Heart
          size={16}
          strokeWidth={1.8}
          className={
            wishlisted
              ? "fill-red-500 text-red-500"
              : "text-gray-400"
          }
        />
      </button>

      {/* Product Image Area — ab clickable, details page pe le jaayega */}
      <Link to={`/product/${product.id}`}>
        <div className="mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-lg bg-white">
          <img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Category */}
      <span className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[#4F46E5]">
        {category}
      </span>

      {/* Product Name — ab clickable, details page pe le jaayega */}
      <Link to={`/product/${product.id}`}>
        <h3 className="line-clamp-1 text-[14px] font-semibold leading-5 text-[#0B0B14] hover:text-[#4F46E5] transition-colors">
          {name}
        </h3>
      </Link>

      {/* Rating */}
      <div className="mt-1.5 flex items-center gap-1 text-xs">
        <Star
          size={13}
          strokeWidth={1.8}
          className="fill-[#F59E0B] text-[#F59E0B]"
        />

        <span className="font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>

        <span className="text-gray-400">
          ({reviewCount})
        </span>
      </div>

      {/* Price */}
      <div className="mt-2">
        <span className="text-base font-bold text-[#0B0B14]">
          ${price.toLocaleString()}
        </span>
      </div>

      {/* Add To Cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={inCart}
        className={`mt-auto flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 ${
          inCart
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#4F46E5] hover:bg-[#4338CA]"
        }`}
      >
        <ShoppingCart size={15} strokeWidth={2} />
        {inCart ? "Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;