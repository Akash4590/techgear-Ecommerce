import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useShop();

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20 text-center">
        <Heart size={48} className="mx-auto mb-4 text-gray-300" />
        <h2 className="text-xl font-semibold text-[#0B0B14] mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6">Save items you love to find them easily later.</p>
        <Link
          to="/shop"
          className="inline-block bg-[#4F46E5] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#4338CA] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
      <h1 className="text-2xl font-bold text-[#0B0B14] mb-6">
        My Wishlist ({wishlistItems.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {wishlistItems.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-xl p-4 flex flex-col">
            <div className="relative mb-3 h-40 flex items-center justify-center">
              <img src={item.image} alt={item.imageAlt} className="h-full w-full object-contain" />
              <button
                onClick={() => removeFromWishlist(item.id)}
                aria-label={`Remove ${item.name} from wishlist`}
                className="absolute top-0 right-0 h-8 w-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
            <span className="text-[10px] font-semibold uppercase text-[#4F46E5] mb-1">
              {item.category}
            </span>
            <h3 className="text-sm font-semibold text-[#0B0B14] mb-2 line-clamp-1">{item.name}</h3>
            <span className="text-base font-bold text-[#0B0B14] mb-3">
              ${item.price.toLocaleString()}
            </span>
            <button
              onClick={() => addToCart(item)}
              className="mt-auto flex items-center justify-center gap-2 w-full bg-[#4F46E5] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#4338CA] transition-colors"
            >
              <ShoppingCart size={15} />
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;