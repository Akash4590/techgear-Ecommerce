import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import ShopHero from "../components/shop/ShopHero";
import CategoryTabs from "../components/shop/CategoryTabs";
import FilterSidebar from "../components/shop/FilterSidebar";
import type { FilterState } from "../components/shop/FilterSidebar";
import ProductGrid from "../components/shop/ProductGrid";
import Pagination from "../components/shop/Pagination";
import Footer from "../components/Footer";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  images: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  isDeal: boolean;
  discount: number;
  createdAt: string;
  updatedAt: string;
}

const PRODUCTS_PER_PAGE = 8;

const ShopPage = () => {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [activeCategory, setActiveCategory] = useState(
    urlCategory || "All Products"
  );

  const [sortValue, setSortValue] = useState("featured");

  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    maxPrice: 2000,
    minRating: 0,
    inStockOnly: false,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message || "Failed to fetch products"
          );
        }

        setProducts(result.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);

        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (urlCategory) {
      setActiveCategory(urlCategory);
    } else {
      setActiveCategory("All Products");
    }

    setCurrentPage(1);
  }, [urlCategory]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
    
      const matchesTabCategory =
        activeCategory === "All Products" ||
        product.category === activeCategory;

      const matchesSidebarCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);

      // Price filter
      const matchesPrice =
        product.price <= filters.maxPrice;
      const matchesRating =
        product.rating >= filters.minRating;

      const matchesStock =
        !filters.inStockOnly || product.stock > 0;
      const normalizedSearch =
        searchQuery.trim().toLowerCase();

      const matchesSearch =
        normalizedSearch === "" ||
        product.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        product.description
          .toLowerCase()
          .includes(normalizedSearch) ||
        product.brand
          .toLowerCase()
          .includes(normalizedSearch) ||
        product.category
          .toLowerCase()
          .includes(normalizedSearch);

      return (
        matchesTabCategory &&
        matchesSidebarCategory &&
        matchesPrice &&
        matchesRating &&
        matchesStock &&
        matchesSearch
      );
    });
  }, [
    products,
    activeCategory,
    filters,
    searchQuery,
  ]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];

    switch (sortValue) {
      case "price-low":
        return list.sort(
          (a, b) => a.price - b.price
        );

      case "price-high":
        return list.sort(
          (a, b) => b.price - a.price
        );

      case "rating":
        return list.sort(
          (a, b) => b.rating - a.rating
        );

      case "featured":
        return list.sort(
          (a, b) =>
            Number(b.isFeatured) -
            Number(a.isFeatured)
        );

      case "deals":
        return list.sort(
          (a, b) =>
            Number(b.isDeal) -
            Number(a.isDeal)
        );

      default:
        return list;
    }
  }, [filteredProducts, sortValue]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedProducts.length / PRODUCTS_PER_PAGE
    )
  );
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedProducts = useMemo(() => {
    const startIndex =
      (currentPage - 1) * PRODUCTS_PER_PAGE;

    return sortedProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );
  }, [sortedProducts, currentPage]);
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "All Products": products.length,
    };

    products.forEach((product) => {
      counts[product.category] =
        (counts[product.category] || 0) + 1;
    });

    return counts;
  }, [products]);
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleFilterChange = (
    updatedFilters: FilterState
  ) => {
    setFilters(updatedFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <ShopHero />

      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-6 lg:flex-row lg:px-10">
        {/* FILTER SIDEBAR */}

        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          categoryCounts={categoryCounts}
        />

        {/* PRODUCTS SECTION */}

        <div className="flex-1">
          {/* Search Result Text */}

          {searchQuery && (
            <p className="mb-3 text-sm text-gray-500">
              Showing results for{" "}
              <span className="font-semibold text-[#0B0B14]">
                "{searchQuery}"
              </span>
            </p>
          )}

          {/* Loading */}

          {loading && (
            <div className="flex items-center justify-center py-20">
              <p className="text-gray-500">
                Loading products...
              </p>
            </div>
          )}

          {/* Error */}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="mb-3 text-red-500">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-lg bg-[#4F46E5] px-4 py-2 text-sm font-medium text-white hover:bg-[#4338CA]"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Products */}

          {!loading && !error && (
            <ProductGrid
              products={paginatedProducts}
              totalCount={sortedProducts.length}
              sortValue={sortValue}
              onSortChange={setSortValue}
            />
          )}
        </div>
      </div>

      {/* Pagination */}

      {!loading && !error && sortedProducts.length > 0 && (
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

export default ShopPage;