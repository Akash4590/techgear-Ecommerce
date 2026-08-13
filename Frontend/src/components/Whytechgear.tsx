import {
  Gem,
  DollarSign,
  Lock,
  Headset,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    icon: Gem,
    number: "01",
    title: "Premium Quality",
    description:
      "Carefully selected products from trusted and leading tech brands.",
  },
  {
    icon: DollarSign,
    number: "02",
    title: "Best Prices",
    description:
      "Get competitive prices without compromising on quality or performance.",
  },
  {
    icon: Lock,
    number: "03",
    title: "Secure Shopping",
    description:
      "Shop confidently with secure payments and protected customer data.",
  },
  {
    icon: Headset,
    number: "04",
    title: "Expert Support",
    description:
      "Our support team is always ready to help whenever you need us.",
  },
];

const WhyTechGear = () => {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1280px]">

        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">

          <span className="inline-flex items-center rounded-full bg-[#EEF2FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4F46E5] cursor-pointer">
            Why Choose TechGear
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl lg:text-5xl cursor-pointer">
            Built Around Your{" "}
            <span className="text-[#4F46E5]">Tech Experience</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#6B7280] sm:text-base">
            From quality products to reliable support, we make buying
            technology simple, secure and enjoyable.
          </p>

        </div>

        {/* Benefits */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {benefits.map(({ icon: Icon, number, title, description }) => (
            <div
              key={title}
              className="group relative flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#4F46E5]/30 hover:shadow-[0_16px_32px_-12px_rgba(79,70,229,0.18)] cursor-pointer">

              {/* Icon */}
              <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2FF] transition-colors duration-300 group-hover:bg-[#4F46E5]">
                <Icon
                  className="h-5 w-5 text-[#4F46E5] transition-colors duration-300 group-hover:text-white"
                  strokeWidth={2}
                />
              </div>

              {/* Content */}
              <h3 className="mt-5 text-base font-bold text-[#111827]">
                {title}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-6 text-[#6B7280]">
                {description}
              </p>

              {/* Affordance — signals the card leads somewhere, appears on hover */}
              <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-[#4F46E5] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Learn more
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default WhyTechGear;