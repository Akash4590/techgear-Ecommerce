import { useParams, Link } from "react-router-dom";

import { products } from "../data/Products";
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
  const product = products.find((p) => p.id === id);

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-6">
        <Breadcrumb category={product.category} productName={product.name} />

        {/* Zaroori: items-start + explicit column widths */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 items-start">

          {/* Left: Gallery */}
          <div className="w-full max-w-[600px]">
           <ProductGallery
               images={[
                      product.image,
                      product.image,
                      product.image,
                      product.image,
                                      ]}
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