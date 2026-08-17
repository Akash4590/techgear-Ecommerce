import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import ShopHero from "../components/shop/ShopHero";
import CategoryTabs from "../components/shop/CategoryTabs";
import FilterSidebar from "../components/shop/FilterSidebar";
import type { FilterState } from "../components/shop/FilterSidebar";
import ProductGrid from "../components/shop/ProductGrid";
import Pagination from "../components/shop/Pagination";
import { products } from "../data/Products";

const PRODUCTS_PER_PAGE = 8;

const ShopPage: React.FC = () => {
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

  // Category tabs + sidebar checkboxes dono combine karke filter
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesTabCategory =
        activeCategory === "All Products" || p.category === activeCategory;

      const matchesSidebarCategory =
        filters.categories.length === 0 || filters.categories.includes(p.category);

      const matchesPrice = p.price <= filters.maxPrice;
      const matchesRating = p.rating >= filters.minRating;
      const matchesStock = !filters.inStockOnly || p.inStock !== false;

      return (
        matchesTabCategory &&
        matchesSidebarCategory &&
        matchesPrice &&
        matchesRating &&
        matchesStock
      );
    });
  }, [activeCategory, filters]);

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

  // Current page ke products nikaalo
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return sortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  // Naya: har category ka live count (sidebar counts ke liye)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "All Products": products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1); // category badalne pe page 1 pe wapas
  };

  // Naya: sidebar filter change handler
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
        <ProductGrid
          products={paginatedProducts}
          totalCount={sortedProducts.length}
          sortValue={sortValue}
          onSortChange={setSortValue}
        />
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default ShopPage;