import React from "react";
import ProductCard from "./ProductCard";
import type { Product } from "../../types/product";

interface ProductGridProps {
  products: Product[];
  totalCount: number;
  sortValue: string;
  onSortChange: (value: string) => void;
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
  { value: "newest", label: "Newest" },
];

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  totalCount,
  sortValue,
  onSortChange,
}) => {
  return (
    <div className="flex-1">
      {/* Sort Bar */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {totalCount} Products Found
        </p>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">
            Sort by:
          </span>

          <select
            value={sortValue}
            onChange={(e) =>
              onSortChange(e.target.value)
            }
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#4F46E5] cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-400 text-sm">
            No products match your filters. Try adjusting your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;