import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { BadgeCheck, Lock, RotateCcw, Truck } from "lucide-react";

const features = [
  { icon: BadgeCheck, label: "100% Genuine Products" },
  { icon: Lock, label: "Secure & Encrypted Payments" },
  { icon: RotateCcw, label: "30-Day Returns" },
  { icon: Truck, label: "Fast & Reliable Delivery" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
   opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const TrustFeatures = () => {
  return (
    <section className="bg-[#0B1020] py-5">
      <motion.div
        className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 sm:justify-between sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {features.map(({ icon: Icon, label }) => (
          <motion.div
            key={label}
            className="flex cursor-default items-center gap-2"
            variants={itemVariants}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}>
            <motion.span
              className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6366F1]/10"
              whileHover={{ scale: 1.15, backgroundColor: "rgba(99,102,241,0.2)" }}
              transition={{ duration: 0.2 }} >
              <Icon className="h-4 w-4 text-[#6366F1]" strokeWidth={2} />
            </motion.span>
            <span className="text-xs font-medium text-gray-300 transition-colors duration-200 group-hover:text-white sm:text-sm">
              {label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TrustFeatures;