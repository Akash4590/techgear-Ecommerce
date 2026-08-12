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

const TrustStrip = () => {
  return (
    <section className="relative z-10 mx-auto -mt-8 max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow-md sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:p-8">
        {trustItems.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-center gap-3">
            <Icon className="h-6 w-6 shrink-0 text-[#4F46E5]" strokeWidth={2} />
            <div>
              <p className="text-sm font-semibold text-[#111827]">{title}</p>
              <p className="text-xs text-[#6B7280]">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustStrip;