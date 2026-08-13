import { motion, type Variants } from "framer-motion";
import CategoryCard from "./Categorycard";
import DealBanner from "./Dealbanner";
import { assets } from "../assets/assets";

const categories = [
  {
    name: "Smartphones",
    image: assets.categorySmartphones,
    imageAlt: "Latest smartphones",
  },
  {
    name: "Laptops",
    image: assets.categoryLaptops,
    imageAlt: "Modern laptops",
  },
  {
    name: "Audio",
    image: assets.categoryAudio,
    imageAlt: "Premium headphones",
  },
  {
    name: "Accessories",
    image: assets.categoryAccessories,
    imageAlt: "Smart watches and accessories",
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const bannerVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

const Categories = () => {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">

      {/* Section Header */}
      <motion.div
        className="mb-10 text-center"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-[#4F46E5]">
          Shop By Category
        </span>

        <h2 className="mt-3 text-3xl font-bold text-[#111827] sm:text-4xl">
          Find What Fits You
        </h2>

        <p className="mt-3 text-sm text-[#6B7280] sm:text-base">
          Explore our wide range of premium technology products.
        </p>
      </motion.div>

      {/* Categories + Deal */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Category Cards */}
        <motion.div
          className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-2"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((category) => (
            <motion.div key={category.name} variants={cardVariants}>
              <CategoryCard
                name={category.name}
                image={category.image}
                imageAlt={category.imageAlt}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Deal Banner */}
        <motion.div
          variants={bannerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <DealBanner />
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;