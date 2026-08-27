import { Heart, ShoppingCart, Trash2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, addToCart, isInCart } = useShop();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20 text-center">
          <nav className="mb-10 flex items-center justify-center gap-1.5 text-sm text-gray-500">
            <Link to="/" className="transition-colors hover:text-[#4F46E5]">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="font-medium text-[#0B0B14]">Wishlist</span>
          </nav>
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
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
        <nav className="mb-6 flex items-center gap-1.5 text-sm text-gray-500">
          <Link to="/" className="transition-colors hover:text-[#4F46E5]">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-[#0B0B14]">Wishlist</span>
        </nav>
        <h1 className="text-2xl font-bold text-[#0B0B14] mb-6">
          My Wishlist ({wishlistItems.length})
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {wishlistItems.map((item) => (
            <div key={item._id} className="border border-gray-200 rounded-xl p-4 flex flex-col">
            <div className="relative mb-3 h-40 flex items-center justify-center">
              <img src={item.image} alt={item.imageAlt} className="h-full w-full object-contain" />
              <button
                onClick={() => removeFromWishlist(item._id)}
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
              type="button"
              onClick={() => addToCart(item)}
              className="mt-auto flex items-center justify-center gap-2 w-full bg-[#4F46E5] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#4338CA] transition-colors"
            >
              <ShoppingCart size={15} />
              {isInCart(item._id) ? "Added to Cart" : "Add to Cart"}
            </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WishlistPage;