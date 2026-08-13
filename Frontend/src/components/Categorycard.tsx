import { motion } from "framer-motion";

interface CategoryCardProps {
  name: string;
  image: string;
  imageAlt: string;
}

const CategoryCard = ({
  name,
  image,
  imageAlt,
}: CategoryCardProps) => {
  return (
    <motion.div
      className="group cursor-pointer overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
      whileHover={{ y: -6, borderColor: "#D8D6FE" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
    >
      {/* Category Image */}
      <div className="relative h-48 w-full overflow-hidden bg-[#F8F9FC] sm:h-52">
        <motion.img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Subtle top-to-bottom shade so a future "Shop" overlay chip would read well; also adds depth on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/0 to-black/0 transition-colors duration-300 group-hover:from-black/5" />
      </div>

      {/* Content */}
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="text-base font-semibold text-[#111827] sm:text-lg">
          {name}
        </h3>

        <motion.button
          type="button"
          className="text-sm font-semibold text-[#4F46E5]"
          whileHover={{ x: 3, color: "#6366F1" }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          Shop →
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CategoryCard;