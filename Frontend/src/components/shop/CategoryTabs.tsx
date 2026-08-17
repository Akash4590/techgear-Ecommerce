import React from "react";
import { LayoutGrid, Smartphone, Laptop, Headphones, Watch } from "lucide-react";
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
  Accessories: <Watch size={16} />,
};

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-6">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {productCategoryFilters.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-[#4F46E5] text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-[#4F46E5]/40"
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