import {
  Gem,
  DollarSign,
  Lock,
  Headset,
  ArrowUpRight,
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

          <span className="inline-flex items-center rounded-full bg-[#EEF2FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4F46E5]">
            Why Choose TechGear
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
            Built Around Your{" "}
            <span className="text-[#4F46E5]">Tech Experience</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#6B7280] sm:text-base">
            From quality products to reliable support, we make buying
            technology simple, secure and enjoyable.
          </p>

        </div>

        {/* Benefits */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-[#E5E7EB] bg-[#F8F9FC]">

          <div className="grid grid-cols-1 divide-y divide-[#E5E7EB] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">

            {benefits.map(
              ({ icon: Icon, title, description }, index) => (
                <div key={title} className="group relative p-7 transition-all duration-300 hover:bg-white sm:p-8">

                  {/* Icon */}
                  <div className="mt-7 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-[#E5E7EB] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#4F46E5] group-hover:ring-[#4F46E5] group-hover:shadow-lg group-hover:shadow-[#4F46E5]/20">

                    <Icon
                      className="h-5 w-5 text-[#4F46E5] transition-colors duration-300 group-hover:text-white"
                      strokeWidth={2}
                    />

                  </div>

                  {/* Content */}
                  <h3 className="mt-6 text-base font-bold text-[#111827]">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                    {description}
                  </p>

                  <div className="mt-6 h-0.5 w-0 rounded-full bg-[#4F46E5] transition-all duration-300 group-hover:w-10" />

                </div>
              )
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTechGear;