import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ProductCard from "./Productcard";

import {products,productCategoryFilters} from "../data/Products";

import type {Product,ProductCategory} from "../data/Products";

const ITEMS_PER_PAGE = 4;

type ProductFilter =
  | "All Products"
  | ProductCategory;

const FeaturedProducts = () => {
  const [activeFilter, setActiveFilter] =
    useState<ProductFilter>("All Products");

  const [page, setPage] = useState(0);

  const filteredProducts = useMemo(
    () =>
      activeFilter === "All Products"
        ? products
        : products.filter(
            (product: Product) =>
              product.category === activeFilter
          ),
    [activeFilter]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length / ITEMS_PER_PAGE
    )
  );

  const visibleProducts =
    filteredProducts.slice(
      page * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

  const handleFilterChange = (
    filter: ProductFilter
  ) => {
    setActiveFilter(filter);
    setPage(0);
  };

  const goPrev = () => {
    setPage((p) => Math.max(0, p - 1));
  };

  const goNext = () => {
    setPage((p) =>
      Math.min(totalPages - 1, p + 1)
    );
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-8 text-center">

          <span className="text-xs font-semibold uppercase tracking-widest text-[#4F46E5]">
            Featured Products
          </span>

          <h2 className="mt-3 text-3xl font-bold text-[#111827] sm:text-4xl">
            What's Trending
          </h2>

          <p className="mt-3 text-sm text-[#6B7280] sm:text-base">
            Handpicked products our customers love
            the most.
          </p>

        </div>

        {/* Category Tabs */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">

          {productCategoryFilters.map(
            (filter) => (
              <button
                key={filter}
                type="button"
                onClick={() =>
                  handleFilterChange(filter)
                }
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                  activeFilter === filter
                    ? "bg-[#4F46E5] text-white"
                    : "bg-[#F8F9FC] text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                {filter}
              </button>
            )
          )}

        </div>

        {/* Products Row */}
        <div className="relative flex items-center gap-3">

          {/* Left Arrow */}
          <button
            type="button"
            onClick={goPrev}
            disabled={page === 0}
            aria-label="Previous products"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-[#F8F9FC] hover:text-[#111827] disabled:cursor-not-allowed disabled:opacity-30 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Product Grid */}
          <div className="grid flex-1 grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">

            {visibleProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}

          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={goNext}
            disabled={
              page >= totalPages - 1
            }
            aria-label="Next products"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-[#F8F9FC] hover:text-[#111827] disabled:cursor-not-allowed disabled:opacity-30 sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

        </div>

        {/* Dots Indicator */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">

            {Array.from({
              length: totalPages,
            }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() =>
                  setPage(i)
                }
                aria-label={`Go to page ${
                  i + 1
                }`}
                className={`h-2 rounded-full transition-all ${
                  page === i
                    ? "w-6 bg-[#4F46E5]"
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}

          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedProducts;