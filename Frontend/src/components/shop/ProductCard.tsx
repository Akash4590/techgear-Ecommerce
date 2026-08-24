import { Heart, Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import type { Product } from "../../types/product";
import { useShop } from "../../context/ShopContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const {
    _id,
    name,
    images,
    rating,
    reviewsCount,
    price,
    category,
    stock,
    discount,
  } = product;

  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    isInCart,
  } = useShop();

  // =========================
  // CART / WISHLIST STATUS
  // =========================

  const wishlisted = isInWishlist(_id);
  const inCart = isInCart(_id);

  // =========================
  // WISHLIST
  // =========================

  const handleWishlistClick = () => {
    if (wishlisted) {
      removeFromWishlist(_id);
    } else {
      addToWishlist(product);
    }
  };

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = () => {
    if (stock === 0) return;

    addToCart(product);
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="group relative flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#D8D6FE] hover:shadow-lg">

      {/* =========================
          WISHLIST BUTTON
      ========================= */}

      <button
        type="button"
        onClick={handleWishlistClick}
        aria-label={
          wishlisted
            ? `Remove ${name} from wishlist`
            : `Add ${name} to wishlist`
        }
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

      {/* =========================
          PRODUCT IMAGE
      ========================= */}

      <Link to={`/product/${_id}`}>
        <div className="mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-lg bg-white">
          <img
            src={
              images && images.length > 0
                ? images[0]
                : "/placeholder-product.png"
            }
            alt={name}
            className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* =========================
          CATEGORY
      ========================= */}

      <span className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[#4F46E5]">
        {category}
      </span>

      {/* =========================
          PRODUCT NAME
      ========================= */}

      <Link to={`/product/${_id}`}>
        <h3 className="line-clamp-1 text-[14px] font-semibold leading-5 text-[#0B0B14] transition-colors hover:text-[#4F46E5]">
          {name}
        </h3>
      </Link>

      {/* =========================
          RATING
      ========================= */}

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
          ({reviewsCount})
        </span>
      </div>

      {/* =========================
          PRICE
      ========================= */}

      <div className="mt-2 flex items-center gap-2">
        <span className="text-base font-bold text-[#0B0B14]">
          ${price.toLocaleString()}
        </span>

        {discount > 0 && (
          <span className="text-xs font-medium text-red-500">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* =========================
          STOCK
      ========================= */}

      {stock === 0 && (
        <p className="mt-1 text-xs font-medium text-red-500">
          Out of stock
        </p>
      )}

      {stock > 0 && stock <= 5 && (
        <p className="mt-1 text-xs font-medium text-orange-500">
          Only {stock} left
        </p>
      )}

      {/* =========================
          ADD TO CART
      ========================= */}

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={inCart || stock === 0}
        className={`mt-auto flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 ${
          inCart || stock === 0
            ? "cursor-not-allowed bg-gray-400"
            : "bg-[#4F46E5] hover:bg-[#4338CA]"
        }`}
      >
        <ShoppingCart
          size={15}
          strokeWidth={2}
        />

        {stock === 0
          ? "Out of Stock"
          : inCart
          ? "Added to Cart"
          : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;