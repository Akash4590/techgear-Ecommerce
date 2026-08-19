
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const DealBanner = () => {
  return (
    <div className="relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl bg-[#0B1020] p-6 sm:p-7">

      {/* Background Glow */}
      <motion.div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#4F46E5]/20 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10">

        {/* Label */}
        <motion.span
          className="inline-block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6366F1]"
          animate={{
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Limited Time Offer
        </motion.span>

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
      <motion.div
        className="relative z-10 my-5 h-32 w-full cursor-pointer overflow-hidden rounded-xl sm:h-36"
        whileHover={{ scale: 1.03 }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.img
          src={assets.dealHeadphones}
          alt="Premium headphones"
          className="h-full w-full object-cover"
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* CTA */}
      <div className="relative z-10 mt-auto">

        <motion.div
          whileHover={{
            scale: 1.02,
            boxShadow: "0 8px 20px rgba(79,70,229,0.3)",
          }}
          whileTap={{
            scale: 0.97,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
        >
          <Link
            to="/deals"
            className="block w-full rounded-lg bg-[#4F46E5] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#6366F1]"
          >
            Shop Deals Now →
          </Link>
        </motion.div>

        <p className="mt-3 text-xs text-gray-400">
          Ends Sunday, 11:59 PM
        </p>

      </div>

    </div>
  );
};

export default DealBanner;

