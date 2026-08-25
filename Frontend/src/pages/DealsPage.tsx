import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Loader2, AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/shop/ProductCard";
import Pagination from "../components/shop/Pagination";
import { API_BASE_URL } from "../config/api";
import type { Product } from "../types/product";

const PRODUCTS_PER_PAGE = 8;

// Backend ka raw deal product shape (jo humare Product mongoose model se aata hai)
interface RawDealProduct {
  _id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageAlt: string;
  image: string;
  images?: string[];
  description?: string;
  inStock: boolean;
  isDeal: boolean;
  discountPercent?: number;
  dealExpiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Backend fields ko existing frontend Product type ki shape mein map karna
const mapToProduct = (raw: RawDealProduct): Product => ({
  _id: raw._id,
  name: raw.name,
  description: raw.description || "",
  price: raw.price,
  category: raw.category,
  brand: "",
  images: raw.images && raw.images.length > 0 ? raw.images : [raw.image],
  stock: raw.inStock ? 99 : 0,
  rating: raw.rating,
  reviewsCount: raw.reviewCount,
  isFeatured: false,
  isDeal: raw.isDeal,
  discount: raw.discountPercent || 0,
  createdAt: raw.createdAt,
  updatedAt: raw.updatedAt,
});

const DealsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dealProducts, setDealProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE_URL}/products/deals`);
        const data = await res.json();
        if (!data.success) {
          setError(data.message || "Failed to load deals");
          return;
        }
        setDealProducts((data.data as RawDealProduct[]).map(mapToProduct));
      } catch {
        setError("Something went wrong while loading deals.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const totalPages = Math.max(1, Math.ceil(dealProducts.length / PRODUCTS_PER_PAGE));

  const paginatedDeals = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return dealProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [dealProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#4F46E5] transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-[#0B0B14] font-medium">Deals</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0B0B14] mb-1">Today's Deals</h1>
          <p className="text-sm text-gray-500">
            Save big on top tech products — limited time offers.
          </p>
          {!loading && !error && dealProducts.length > 0 && (
            <p className="text-sm text-gray-400 mt-1">
              {dealProducts.length} deal{dealProducts.length > 1 ? "s" : ""} found
            </p>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Loader2 size={24} className="animate-spin text-[#4F46E5] mb-3" />
            <p className="text-sm text-gray-400">Loading deals...</p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle size={22} className="text-red-400 mb-3" />
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && dealProducts.length === 0 && (
          <p className="text-gray-400 text-sm py-10 text-center">
            No active deals right now. Check back soon!
          </p>
        )}

        {/* GRID */}
        {!loading && !error && dealProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {paginatedDeals.map((product) => (
              <div key={product._id} className="relative">
                {product.discount > 0 && (
                  <span className="absolute top-3 left-3 z-30 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                    -{product.discount}%
                  </span>
                )}
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {!loading && !error && dealProducts.length > PRODUCTS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <Footer />
    </div>
  );
};

export default DealsPage;