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

const Categories = () => {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      
      {/* Section Header */}
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#4F46E5]">
          Shop By Category
        </span>

        <h2 className="mt-3 text-3xl font-bold text-[#111827] sm:text-4xl">
          Find What Fits You
        </h2>

        <p className="mt-3 text-sm text-[#6B7280] sm:text-base">
          Explore our wide range of premium technology products.
        </p>
      </div>

      {/* Categories + Deal */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-2">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              image={category.image}
              imageAlt={category.imageAlt}
            />
          ))}
        </div>

        {/* Deal Banner */}
        <DealBanner />
      </div>
    </section>
  );
};

export default Categories;