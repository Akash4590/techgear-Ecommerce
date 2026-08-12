import { BadgeCheck, Lock, RotateCcw, Truck } from "lucide-react";

const features = [
  { icon: BadgeCheck, label: "100% Genuine Products" },
  { icon: Lock, label: "Secure & Encrypted Payments" },
  { icon: RotateCcw, label: "30-Day Returns" },
  { icon: Truck, label: "Fast & Reliable Delivery" },
];

const TrustFeatures = () => {
  return (
    <section className="bg-[#0B1020] py-5">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 sm:justify-between sm:px-6 lg:px-8">
        {features.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-[#6366F1]" strokeWidth={2} />
            <span className="text-xs font-medium text-gray-300 sm:text-sm">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustFeatures;