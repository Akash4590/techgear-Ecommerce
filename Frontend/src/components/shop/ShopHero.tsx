import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

interface ShopHeroProps {
  title?: string;
  description?: string;
}

const ShopHero: React.FC<ShopHeroProps> = ({
  title = "Explore Our Products",
  description = "Discover top-quality electronics and accessories with the best deals and warranty.",
}) => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-4">

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#F8F9FF] via-[#F8F9FF] to-[#ECEBFF]">
          <div className="flex flex-col lg:flex-row lg:items-center">

            {/* Left: Breadcrumb + Title + Description */}
            <div className="relative z-10 flex-1 px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              {/* Breadcrumb */}
              <nav className="mb-4 flex items-center gap-2 text-xs sm:text-sm">
                <Link
                  to="/"
                  className="text-gray-600 transition-colors hover:text-[#4F46E5]"
                >
                  Home
                </Link>
                <span className="text-gray-400">›</span>
                <span className="font-medium text-[#1F2937]">Shop</span>
              </nav>

              {/* Title + Description */}
              <div className="max-w-[480px]">
                <h1 className="mb-2 text-3xl font-bold leading-tight text-[#0B0B14] sm:text-4xl">
                  {title}
                </h1>
                <p className="text-sm leading-6 text-[#4B5563] sm:text-base">
                  {description}
                </p>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative hidden h-[180px] flex-shrink-0 items-center justify-center lg:flex lg:h-[200px] lg:w-[420px] xl:w-[460px]">
              <img
                src={assets.shophero}
                alt="Featured products"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopHero;