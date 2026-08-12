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
    <div className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#D8D6FE] hover:shadow-lg">

      {/* Category Image */}
      <div className="relative h-48 w-full overflow-hidden bg-[#F8F9FC] sm:h-52">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="text-base font-semibold text-[#111827] sm:text-lg">
          {name}
        </h3>

        <button
          type="button"
          className="text-sm font-semibold text-[#4F46E5] transition-colors hover:text-[#6366F1]"
        >
          Shop →
        </button>
      </div>

    </div>
  );
};

export default CategoryCard;