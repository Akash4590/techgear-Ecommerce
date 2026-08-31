import React, { useState } from "react";
import { Check, FileText } from "lucide-react";
import type { Product } from "../../types/product";
import ReviewsSection from "./ReviewsSection";

interface ProductTabsProps {
  product: Product;
  onReviewAdded?: () => void; 
}

type TabId = "description" | "specifications" | "reviews" | "shipping";

const tabs: { id: TabId; label: string }[] = [
  { id: "description", label: "Description" },
  { id: "specifications", label: "Specifications" },
  { id: "reviews", label: "Reviews" },
  { id: "shipping", label: "Shipping & Returns" },
];

const ProductTabs: React.FC<ProductTabsProps> = ({ product, onReviewAdded }) => {
  const [activeTab, setActiveTab] = useState<TabId>("description");

  return (
    <div className="mb-12">
      {/* Tab headers */}
      <div className="flex items-center gap-8 border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "text-[#4F46E5]"
                : "text-gray-500 hover:text-gray-700"
            }`}>
            {tab.label}
            {tab.id === "reviews" && ` (${product.reviewsCount})`}
            {activeTab === tab.id && (
              <span className="absolute -bottom-[1px] left-0 h-[2px] w-full bg-[#4F46E5]" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pt-6">
        {activeTab === "description" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-base font-semibold text-[#0B0B14] mb-3">
                Product Description
              </h3>
              {product.description ? (
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {product.description}
                </p>
              ) : (
                <p className="text-sm text-gray-400 italic mb-4">
                  No description available for this product yet.
                </p>
              )}
            </div>

            <div>
              <h3 className="text-base font-semibold text-[#0B0B14] mb-3">
                What's in the Box
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <FileText size={14} className="text-gray-400" />
                  {product.name}
                </li>
                <li className="flex items-center gap-2">
                  <FileText size={14} className="text-gray-400" />
                  Charging Cable
                </li>
                <li className="flex items-center gap-2">
                  <FileText size={14} className="text-gray-400" />
                  Documentation
                </li>
              </ul>

              <h3 className="text-base font-semibold text-[#0B0B14] mt-6 mb-3">
                Delivery & Returns
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#4F46E5]" />
                  Free shipping on orders over $50
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#4F46E5]" />
                  Estimated delivery: 2-5 business days
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#4F46E5]" />
                  30-day returns and exchanges
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="max-w-2xl">
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
              {[
                { label: "Category", value: product.category },
                { label: "Price", value: `$${product.price.toLocaleString()}` },
                { label: "Rating", value: `${product.rating.toFixed(1)} / 5.0` },
                { label: "Reviews", value: `${product.reviewsCount} reviews` },
                { label: "Availability", value: product.inStock === false ? "Out of Stock" : "In Stock" },
              ].map((spec) => (
                <div key={spec.label} className="flex items-center justify-between px-4 py-3 text-sm">
                  <span className="text-gray-500">{spec.label}</span>
                  <span className="font-medium text-[#0B0B14]">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Naya: reviews tab ab real ReviewsSection component use karta hai */}
        {activeTab === "reviews" && (
          <ReviewsSection product={product} onReviewAdded={onReviewAdded} />
        )}

        {activeTab === "shipping" && (
          <div className="max-w-2xl space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Check size={14} className="text-[#4F46E5]" />
              Free shipping on all orders over $50
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-[#4F46E5]" />
              Standard delivery: 2-5 business days
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-[#4F46E5]" />
              30-day hassle-free returns
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-[#4F46E5]" />
              Items must be unused and in original packaging
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;