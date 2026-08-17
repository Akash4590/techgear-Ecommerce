import React from "react";
import { Star } from "lucide-react";
import { productCategoryFilters } from "../../data/Products";

export interface FilterState {
  categories: string[];
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categoryCounts: Record<string, number>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  categoryCounts,
}) => {
  // Single-select: click karte hi purani category replace ho jaayegi
  const toggleCategory = (cat: string) => {
    if (cat === "All Products") {
      onFilterChange({ ...filters, categories: [] });
      return;
    }
    // Agar wahi category dobara click ho to unselect (All Products pe wapas)
    const isSameCategory =
      filters.categories.length === 1 && filters.categories[0] === cat;

    onFilterChange({
      ...filters,
      categories: isSameCategory ? [] : [cat], // sirf ek category array mein
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, maxPrice: Number(e.target.value) });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === rating ? 0 : rating,
    });
  };

  const clearAll = () => {
    onFilterChange({
      categories: [],
      maxPrice: 2000,
      minRating: 0,
      inStockOnly: false,
    });
  };

  return (
    <aside className="w-full lg:w-[280px] flex-shrink-0 bg-white border border-gray-200 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#0B0B14] text-sm">FILTERS</h3>
        <button
          onClick={clearAll}
          className="text-xs text-[#4F46E5] font-medium hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Category */}
      <div className="border-t border-gray-100 pt-4 mb-2">
        <h4 className="text-xs font-semibold text-gray-500 tracking-wide mb-3">
          CATEGORY
        </h4>
        <div className="space-y-2.5">
          {productCategoryFilters.map((cat) => {
            const isChecked =
              cat === "All Products"
                ? filters.categories.length === 0
                : filters.categories.includes(cat);
            return (
              <label
                key={cat}
                className="flex items-center justify-between text-sm cursor-pointer"
              >
                <span className="flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCategory(cat)}
                    className="w-4 h-4 rounded border-gray-300 text-[#4F46E5] focus:ring-[#4F46E5]"
                  />
                  {cat}
                </span>
                <span className="text-gray-400 text-xs">
                  ({categoryCounts[cat] ?? 0})
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="border-t border-gray-100 pt-4 mt-4">
        <h4 className="text-xs font-semibold text-gray-500 tracking-wide mb-3">
          PRICE RANGE
        </h4>
        <input
          type="range"
          min={0}
          max={2000}
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="w-full accent-[#4F46E5]"
        />
        <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
          <span>$0</span>
          <span>{filters.maxPrice === 2000 ? "$2000+" : `$${filters.maxPrice}`}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="border-t border-gray-100 pt-4 mt-4">
        <h4 className="text-xs font-semibold text-gray-500 tracking-wide mb-3">
          RATING
        </h4>
        <div className="space-y-2.5">
          {[5, 4, 3, 2, 1].map((r) => (
            <label
              key={r}
              className="flex items-center gap-1.5 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.minRating === r}
                onChange={() => handleRatingChange(r)}
                className="w-4 h-4 rounded border-gray-300 text-[#4F46E5] focus:ring-[#4F46E5] mr-1"
              />
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={
                    i < r
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }
                />
              ))}
              <span className="text-gray-400 text-xs ml-1">&amp; up</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="border-t border-gray-100 pt-4 mt-4">
        <h4 className="text-xs font-semibold text-gray-500 tracking-wide mb-3">
          AVAILABILITY
        </h4>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() =>
              onFilterChange({ ...filters, inStockOnly: !filters.inStockOnly })
            }
            className="w-4 h-4 rounded border-gray-300 text-[#4F46E5] focus:ring-[#4F46E5]"
          />
          In Stock Only
        </label>
      </div>
    </aside>
  );
};

export default FilterSidebar;