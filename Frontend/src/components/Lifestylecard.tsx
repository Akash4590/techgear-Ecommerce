import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface LifestyleCardProps {
  icon: LucideIcon;
  iconBg: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const LifestyleCard = ({
  icon: Icon,
  iconBg,
  title,
  description,
  image,
  imageAlt,
}: LifestyleCardProps) => {
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-2xl p-[1.5px]">
      {/* Rotating light — only visible as a thin border strip because inner card covers the center */}
      <motion.div
        className="absolute inset-[-60%] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, #4F46E5 8%, transparent 22%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Static faint ring so the card has a visible edge even when not hovering */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#E5E7EB] transition-opacity duration-300 group-hover:opacity-0" />

      {/* Actual card content sits on top, covers everything except the 1.5px border */}
      <motion.div
        className="relative z-10 overflow-hidden rounded-2xl bg-white"
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
      >
        {/* Lifestyle Image */}
        <div className="aspect-[4/3] w-full overflow-hidden bg-[#F8F9FC]">
          <motion.img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="p-6">
          {/* Icon */}
          <motion.span
            className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ backgroundColor: iconBg }}
            whileHover={{ scale: 1.12, rotate: 6 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Icon className="h-4 w-4 text-white" strokeWidth={2} />
          </motion.span>

          {/* Content */}
          <h3 className="text-lg font-semibold text-[#111827]">{title}</h3>
          <p className="mt-1 text-sm text-[#6B7280]">{description}</p>

          {/* CTA */}
          <motion.button
            type="button"
            className="mt-4 inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-[#4F46E5]"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Explore Now
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              →
            </motion.span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LifestyleCard;