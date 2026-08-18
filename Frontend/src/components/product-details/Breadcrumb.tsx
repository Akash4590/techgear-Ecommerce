import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  category: string;
  productName: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ category, productName }) => {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
      <Link to="/" className="hover:text-[#4F46E5] transition-colors">
        Home
      </Link>
      <ChevronRight size={14} />
      <Link to="/shop" className="hover:text-[#4F46E5] transition-colors">
        Shop
      </Link>
      <ChevronRight size={14} />
      <Link
        to={`/shop?category=${encodeURIComponent(category)}`}
        className="hover:text-[#4F46E5] transition-colors"
      >
        {category}
      </Link>
      <ChevronRight size={14} />
      <span className="text-[#0B0B14] font-medium">{productName}</span>
    </nav>
  );
};

export default Breadcrumb;