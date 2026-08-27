import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { API_BASE_URL } from "../config/api";
import type { Product } from "../types/product";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/product-details/Breadcrumb";
import ProductGallery from "../components/product-details/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import FeatureBar from "../components/product-details/FeatureBar";
import ProductTabs from "../components/product-details/ProductTabs";
import RelatedProducts from "../components/product-details/RelatedProducts";
import AIAssistantBanner from "../components/product-details/AIAssistantBanner";
import Footer from "../components/Footer"

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      if (!id) {
        setProduct(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const result: {
          data?: Partial<Product> & {
            _id?: string;
            reviewCount?: number;
            stockQuantity?: number;
            discountPercent?: number;
          };
        } = await response.json();

        if (!result.data?._id) {
          throw new Error("Product not found");
        }

        setProduct({
          ...result.data,
          _id: result.data._id,
          image: result.data.image ?? "/placeholder-product.png",
          images: result.data.images?.length
            ? result.data.images
            : [result.data.image ?? "/placeholder-product.png"],
          reviewsCount: result.data.reviewsCount ?? result.data.reviewCount ?? 0,
          stock: result.data.stock ?? result.data.stockQuantity ?? 0,
          discount: result.data.discount ?? result.data.discountPercent ?? 0,
          brand: result.data.brand ?? "",
          description: result.data.description ?? "",
          price: result.data.price ?? 0,
          category: result.data.category ?? "",
          name: result.data.name ?? "",
          rating: result.data.rating ?? 0,
          isFeatured: result.data.isFeatured ?? false,
          isDeal: result.data.isDeal ?? false,
          createdAt: result.data.createdAt ?? "",
          updatedAt: result.data.updatedAt ?? "",
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setProduct(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchProduct();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex min-h-[50vh] items-center justify-center text-gray-500">
          Loading product...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20 text-center">
          <h2 className="text-xl font-semibold text-[#0B0B14] mb-2">
            Product not found
          </h2>
          <p className="text-gray-500 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-[#4F46E5] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#4338CA] transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = Array.from({ length: 4 }, (_, index) =>
    product.images[index] ?? product.image
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-6">
        <Breadcrumb category={product.category} productName={product.name} />

      
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 items-start">

          
          <div className="w-full max-w-[600px]">
           <ProductGallery
               images={galleryImages}
              productName={product.name}/>
          </div>

          {/* Right: Info */}
          <ProductInfo product={product} />
        </div>
       <FeatureBar/>
       <ProductTabs product={product} />
       <RelatedProducts currentProduct={product} />
       <AIAssistantBanner/>
      </div>
       <Footer/>
    </div>
  );
};

export default ProductDetailsPage;