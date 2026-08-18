import React from "react";
import {
  LayoutGrid,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Package,
} from "lucide-react";
import { productCategoryFilters } from "../../data/Products";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  "All Products": <LayoutGrid size={16} />,
  Smartphones: <Smartphone size={16} />,
  Laptops: <Laptop size={16} />,
  Audio: <Headphones size={16} />,
  Accessories: <Package size={16} />,
  Smartwatches: <Watch size={16} />,
};

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="mx-auto max-w-[1440px] px-6 pt-6 lg:px-10">
      <div className="scrollbar-hide flex items-center gap-3 overflow-x-auto pb-2">
        {productCategoryFilters.map((cat) => {
          const isActive = cat === activeCategory;

          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors hover:shadow ${
                isActive
                  ? "bg-[#4F46E5] text-white"
                  : "border border-gray-200 bg-white text-gray-700"
              }`}
            >
              {iconMap[cat]}
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;