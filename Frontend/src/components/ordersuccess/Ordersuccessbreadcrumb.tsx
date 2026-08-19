import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const OrderSuccessBreadcrumb: React.FC = () => {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
      <Link to="/" className="hover:text-[#4F46E5] transition-colors">
        Home
      </Link>
      <ChevronRight size={14} />
      <Link to="/checkout" className="hover:text-[#4F46E5] transition-colors">
        Checkout
      </Link>
      <ChevronRight size={14} />
      <span className="text-[#0B0B14] font-medium">Order Success</span>
    </nav>
  );
};

export default OrderSuccessBreadcrumb;