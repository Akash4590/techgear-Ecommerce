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
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#E5E7EB] transition-shadow hover:shadow-md">
      {/* Lifestyle Image */}
      <div className="aspect-[4/3] w-full overflow-hidden bg-[#F8F9FC]">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-6">
        {/* Icon */}
        <span
          className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ backgroundColor: iconBg }}
        >
          <Icon
            className="h-4 w-4 text-white"
            strokeWidth={2}
          />
        </span>

        {/* Content */}
        <h3 className="text-lg font-semibold text-[#111827]">
          {title}
        </h3>

        <p className="mt-1 text-sm text-[#6B7280]">
          {description}
        </p>

        {/* CTA */}
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#4F46E5] transition-colors hover:text-[#6366F1]"
        >
          Explore Now →
        </button>
      </div>
    </div>
  );
};

export default LifestyleCard;