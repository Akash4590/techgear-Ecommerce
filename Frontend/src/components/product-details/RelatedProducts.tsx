import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "../../data/Products";
import type { Product } from "../../data/Products";
import ProductCard from "../shop/ProductCard";

interface RelatedProductsProps {
  currentProduct: Product;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProduct }) => {
  // Same category ke products nikaalo, current product ko exclude karke
  const relatedProducts = products
    .filter(
      (p) => p.category === currentProduct.category && p.id !== currentProduct.id
    )
    .slice(0, 5);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-[#0B0B14]">You May Also Like</h2>
        <Link
          to={`/shop?category=${encodeURIComponent(currentProduct.category)}`}
          className="flex items-center gap-1 text-sm font-medium text-[#4F46E5] hover:underline"
        >
          View All
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;