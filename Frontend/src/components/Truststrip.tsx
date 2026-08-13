import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";

const trustItems = [
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "2-5 business days delivery",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "We're here to help",
  },
];

// list ko duplicate kiya taake loop seamless lage
const loopItems = [...trustItems, ...trustItems];

const TrustStrip = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="relative z-10 mx-auto -mt-8 max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-md lg:p-8">
        <motion.div
          className="flex w-max gap-10 sm:gap-14 cursor-pointer"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 18,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
        >
          {loopItems.map(({ icon: Icon, title, description }, index) => (
            <div
              key={`${title}-${index}`}
              className="flex shrink-0 items-center gap-3"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4F46E5]/10">
                <Icon className="h-5 w-5 text-[#4F46E5]" strokeWidth={2} />
              </div>
              <div className="whitespace-nowrap">
                <p className="text-sm font-semibold text-[#111827]">{title}</p>
                <p className="text-xs text-[#6B7280]">{description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStrip;