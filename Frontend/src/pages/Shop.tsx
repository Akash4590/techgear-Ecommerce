import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ShopHero from "../components/shop/ShopHero";
import CategoryTabs from "../components/shop/CategoryTabs";
import FilterSidebar from "../components/shop/FilterSidebar";
import type { FilterState } from "../components/shop/FilterSidebar";
import ProductGrid from "../components/shop/ProductGrid";
import Pagination from "../components/shop/Pagination";
import { products } from "../data/Products";
import Footer from "../components/Footer"

const PRODUCTS_PER_PAGE = 8;

const ShopPage: React.FC = () => {
  // Naya: URL se search query read karo (Navbar se aayegi)
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState("All Products");
  const [sortValue, setSortValue] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  // Naya: FilterSidebar ke liye state
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    maxPrice: 2000,
    minRating: 0,
    inStockOnly: false,
  });

  // Naya: jab bhi search query badle, page 1 pe reset karo
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesTabCategory =
        activeCategory === "All Products" || p.category === activeCategory;

      const matchesSidebarCategory =
        filters.categories.length === 0 || filters.categories.includes(p.category);

      const matchesPrice = p.price <= filters.maxPrice;
      const matchesRating = p.rating >= filters.minRating;
      const matchesStock = !filters.inStockOnly || p.inStock !== false;

      // Naya: product name search query se match kare (case-insensitive)
      const matchesSearch =
        searchQuery.trim() === "" ||
        p.name.toLowerCase().includes(searchQuery.trim().toLowerCase());

      return (
        matchesTabCategory &&
        matchesSidebarCategory &&
        matchesPrice &&
        matchesRating &&
        matchesStock &&
        matchesSearch
      );
    });
  }, [activeCategory, filters, searchQuery]);

  // Sort logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortValue) {
      case "price-low":
        return list.sort((a, b) => a.price - b.price);
      case "price-high":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [filteredProducts, sortValue]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return sortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "All Products": products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleFilterChange = (updated: FilterState) => {
    setFilters(updated);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ShopHero />
      <CategoryTabs activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-6 flex flex-col lg:flex-row gap-6">
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          categoryCounts={categoryCounts}
        />

        {/* Naya: agar search active hai to result count ke sath dikhao */}
        <div className="flex-1">
          {searchQuery && (
            <p className="text-sm text-gray-500 mb-3">
              Showing results for <span className="font-semibold text-[#0B0B14]">"{searchQuery}"</span>
            </p>
          )}
          <ProductGrid
            products={paginatedProducts}
            totalCount={sortedProducts.length}
            sortValue={sortValue}
            onSortChange={setSortValue}
          />
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <Footer/>
    </div>
  );
};

export default ShopPage;