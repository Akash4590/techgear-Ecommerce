import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { API_BASE_URL } from "../../config/api";
import type { Product } from "../../types/product";
import ProductCard from "../shop/ProductCard";

interface RelatedProductsProps {
  currentProduct: Product;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`, {
          signal: controller.signal,
        });
        if (!response.ok) return;

        const result: { data?: Product[] } = await response.json();
        setRelatedProducts(
          (result.data ?? [])
            .filter(
              (product) =>
                product.category === currentProduct.category &&
                product._id !== currentProduct._id
            )
            .slice(0, 5)
        );
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setRelatedProducts([]);
        }
      }
    };

    void fetchRelatedProducts();
    return () => controller.abort();
  }, [currentProduct._id, currentProduct.category]);

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
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;