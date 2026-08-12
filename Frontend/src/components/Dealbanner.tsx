import { assets } from "../assets/assets";

const DealBanner = () => {
  return (
    <div className="relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl bg-[#0B1020] p-6 sm:p-7">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#4F46E5]/20 blur-3xl" />

      {/* Content */}
      <div className="relative z-10">

        {/* Label */}
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6366F1]">
          Limited Time Offer
        </span>

        {/* Heading */}
        <h3 className="mt-3 text-2xl font-bold leading-tight text-white">
          Weekend Tech Drop
        </h3>

        {/* Description */}
        <p className="mt-2 max-w-xs text-sm leading-6 text-gray-300">
          Upgrade your setup. Save more on premium electronics.
        </p>

        {/* Discount */}
        <p className="mt-5 text-3xl font-bold text-white">
          Up to{" "}
          <span className="text-[#6366F1]">
            30% OFF
          </span>
        </p>

      </div>

      {/* Product Image */}
      <div className="relative z-10 my-5 h-32 w-full overflow-hidden rounded-xl sm:h-36">
        <img
          src={assets.dealHeadphones}
          alt="Premium headphones"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* CTA */}
      <div className="relative z-10 mt-auto">

        <button
          type="button"
          className="w-full rounded-lg bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#6366F1] hover:shadow-lg hover:shadow-[#4F46E5]/20"
        >
          Shop Deals Now →
        </button>

        <p className="mt-3 text-xs text-gray-400">
          Ends Sunday, 11:59 PM
        </p>

      </div>

    </div>
  );
};

export default DealBanner;