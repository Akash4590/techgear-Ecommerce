import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { products } from "../data/Products";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/shop/ProductCard";
import Pagination from "../components/shop/Pagination";

const PRODUCTS_PER_PAGE = 8;

const DealsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dealProducts = useMemo(() => products.filter((p) => p.isDeal), []);

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
          {dealProducts.length > 0 && (
            <p className="text-sm text-gray-400 mt-1">
              {dealProducts.length} deal{dealProducts.length > 1 ? "s" : ""} found
            </p>
          )}
        </div>

        {dealProducts.length === 0 ? (
          <p className="text-gray-400 text-sm py-10 text-center">
            No active deals right now. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {paginatedDeals.map((product) => (
              <div key={product.id} className="relative">
                {product.discountPercent && (
                  <span className="absolute top-3 left-3 z-30 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                    -{product.discountPercent}%
                  </span>
                )}
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {dealProducts.length > PRODUCTS_PER_PAGE && (
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