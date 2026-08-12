import { Star, Quote, BadgeCheck, ShieldCheck, Undo2 } from "lucide-react";
import { assets } from "../assets/assets";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Amazing experience! Fast shipping and the product is exactly as described.",
    name: "Sarah Johnson",
    role: "Verified Buyer",
    avatar: assets.avatar1,
  },
  {
    id: "t2",
    quote:
      "Great selection of tech and some of the best prices I could find online.",
    name: "Michael Roberts",
    role: "Verified Buyer",
    avatar: assets.avatar2,
  },
  {
    id: "t3",
    quote:
      "Customer support was incredibly helpful and resolved my issue quickly.",
    name: "Emily Khan",
    role: "Verified Buyer",
    avatar: assets.avatar3,
  },
];

const stats = [
  { value: "10K+", label: "Happy Customers", icon: BadgeCheck },
  { value: "4.9/5", label: "Average Rating", icon: Star },
  { value: "30-Day", label: "Easy Returns", icon: Undo2 },
  { value: "100%", label: "Secure Checkout", icon: ShieldCheck },
];

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-[#F8F9FC] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#4F46E5]/10 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-[320px] w-[320px] rounded-full bg-[#F59E0B]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-[1280px]">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-[#EEF2FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4F46E5]">
            Customer Stories
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
            Loved by <span className="text-[#4F46E5]">Tech Lovers</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#6B7280] sm:text-base">
            Thousands of customers trust TechGear for quality products, fast
            delivery and reliable support.
          </p>

          {/* Aggregate rating chip */}
          <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-full border border-[#E5E7EB] bg-white px-5 py-2.5 shadow-sm">
            <div className="flex -space-x-2">
              {[assets.avatar1, assets.avatar2, assets.avatar3].map((a, i) => (
                <img
                  key={i}
                  src={a}
                  alt=""
                  className="h-7 w-7 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <span className="h-4 w-px bg-[#E5E7EB]" />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
              ))}
            </div>
            <span className="text-xs font-semibold text-[#111827]">
              4.9/5 <span className="font-normal text-[#6B7280]">from 2.3K reviews</span>
            </span>
          </div>
        </div>

        {/* Testimonials — all same size */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D8D6FE] hover:shadow-xl hover:shadow-[#4F46E5]/10 sm:p-7"
            >
             
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>

             
              <p className="relative mt-5 min-h-[84px] flex-1 text-[15px] leading-7 text-[#374151]">
                “{testimonial.quote}”
              </p>

            
              <div className="mt-7 flex items-center gap-3 border-t border-[#E5E7EB] pt-5">
                <div className="rounded-full bg-gradient-to-br from-[#4F46E5] to-[#818CF8] p-[2px]">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-[#111827]">
                      {testimonial.name}
                    </p>
                    <BadgeCheck className="h-4 w-4 text-[#4F46E5]" fill="#EEF2FF" />
                  </div>
                  <p className="mt-0.5 text-xs text-[#6B7280]">{testimonial.role}</p>
                </div>
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-6 h-0.5 w-0 rounded-full bg-[#4F46E5] transition-all duration-300 group-hover:w-10" />
            </article>
          ))}
        </div>

        {/* Trust stats */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-6 text-center shadow-sm transition-shadow hover:shadow-md sm:py-7"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF2FF]">
                  <Icon className="h-4.5 w-4.5 text-[#4F46E5]" />
                </div>
                <p className="text-xl font-bold tracking-tight text-[#111827] sm:text-2xl">
                  {stat.value}
                </p>
                <p className="text-[11px] font-medium text-[#6B7280] sm:text-xs">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;