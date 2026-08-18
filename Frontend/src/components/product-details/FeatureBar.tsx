import React from "react";
import { Truck, RotateCcw, ShieldCheck, Heart } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    subtitle: "On orders over $50",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    subtitle: "Hassle-free returns",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    subtitle: "100% secure payment",
  },
  {
    icon: Heart,
    title: "1 Year Warranty",
    subtitle: "Official warranty",
  },
];

const FeatureBar: React.FC = () => {
  return (
    <div className="border-t border-b border-gray-100 py-6 my-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#4F46E5]/10 text-[#4F46E5]">
                <Icon size={18} strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0B0B14]">{feature.title}</p>
                <p className="text-xs text-gray-500">{feature.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureBar;