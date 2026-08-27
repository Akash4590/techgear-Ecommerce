import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Minus, Plus, ShoppingCart, Heart, GitCompare } from "lucide-react";
import type { Product } from "../types/product";
import { useShop } from "../context/ShopContext";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, isInCart } = useShop();
  const navigate = useNavigate();

  const hasColors = !!product.colors && product.colors.length > 0;
  const hasStorage = !!product.storageOptions && product.storageOptions.length > 0;

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const wishlisted = isInWishlist(product._id);
  const inCart = isInCart(product._id);

  const handleWishlistClick = () => {
    wishlisted ? removeFromWishlist(product._id) : addToWishlist(product);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    if (!inCart) {
      addToCart(product);
    }
    if (quantity > 1) {
      for (let index = 1; index < quantity; index += 1) {
        addToCart(product);
      }
    }
    navigate("/checkout");
  };

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQty = () => setQuantity((q) => q + 1);

  return (
    <div className="w-full">
      {/* Category */}
      <p className="text-xs font-semibold uppercase tracking-wide text-[#4F46E5] mb-2">
        {product.category}
      </p>

      {/* Title */}
      <h1 className="text-2xl lg:text-3xl font-bold text-[#0B0B14] mb-2">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4 text-sm">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} className={i < Math.round(product.rating)
                  ? "fill-[#F59E0B] text-[#F59E0B]"
                  : "fill-gray-200 text-gray-200"}/>
          ))}
        </div>
        <span className="font-medium text-[#0B0B14]">{product.rating.toFixed(1)}</span>
        <span className="text-gray-500">({product.reviewsCount} reviews)</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl font-bold text-[#0B0B14]">
          ${product.price.toLocaleString()}
        </span>
      </div>

      <div className="h-px bg-gray-100 mb-5" />

      {/* Color — sirf tab dikhega jab product mein colors defined hon */}
      {hasColors && (
        <div className="mb-5">
        <p className="text-sm font-medium text-[#0B0B14] mb-2">
        Color: <span className="font-normal text-gray-500">{product.colors![selectedColor].name}</span>
          </p>
          <div className="flex items-center gap-3">
            {product.colors!.map((color, index) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(index)}
                aria-label={color.name}
                className={`h-8 w-8 rounded-full border-2 transition-all ${
                  selectedColor === index
                    ? "border-[#4F46E5] ring-2 ring-[#4F46E5]/30"
                    : "border-gray-200"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Storage — sirf tab dikhega jab product mein storageOptions defined hon */}
      {hasStorage && (
        <div className="mb-5">
          <p className="text-sm font-medium text-[#0B0B14] mb-2">
            Storage: <span className="font-normal text-gray-500">{product.storageOptions![selectedStorage]}</span>
          </p>
          <div className="flex items-center gap-2">
            {product.storageOptions!.map((storage, index) => (
              <button
                key={storage}
                onClick={() => setSelectedStorage(index)}
                className={`px-4 py-2 rounded-lg cursor-pointer border text-sm font-medium transition-colors ${
                  selectedStorage === index
                    ? "border-[#4F46E5] text-[#4F46E5] bg-[#4F46E5]/5"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                {storage}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mb-5">
        <p className="text-sm font-medium text-[#0B0B14] mb-2">Quantity:</p>
        <div className="flex items-center gap-3 border border-gray-200 rounded-lg w-fit">
          <button
            onClick={decreaseQty}
            aria-label="Decrease quantity"
            className="p-2.5 text-gray-500 hover:text-[#4F46E5] transition-colors cursor-pointer"
          >
            <Minus size={14} />
          </button>
          <span className="text-sm font-medium text-[#0B0B14] w-4 text-center">{quantity}</span>
          <button
            onClick={increaseQty}
            aria-label="Increase quantity"
            className="p-2.5 text-gray-500 hover:text-[#4F46E5] transition-colors cursor-pointer"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <button
          onClick={handleAddToCart}
          disabled={inCart}
          className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium text-white cursor-pointer transition-colors ${
            inCart ? "bg-gray-400 cursor-not-allowed" : "bg-[#4F46E5] hover:bg-[#4338CA]"
          }`}
        >
          <ShoppingCart size={16} />
          {inCart ? "Added to Cart" : "Add to Cart"}
        </button>
        <button onClick={handleBuyNow} className="flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-[#4F46E5] text-[#4F46E5] text-sm font-medium hover:bg-[#4F46E5]/5 transition-colors cursor-pointer">
          Buy Now
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleWishlistClick}
          className="flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors cursor-pointer"
        >
          <Heart size={16} className={wishlisted ? "fill-red-500 text-red-500" : ""} />
          {wishlisted ? "In Wishlist" : "Add to Wishlist"}
        </button>
        <button className="flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors cursor-pointer">
          <GitCompare size={16} />
          Compare
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;