import { ArrowRight } from "lucide-react";
import { assets } from "../assets/assets";

const FinalCTA = () => {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
      <div className="relative min-h-[380px] overflow-hidden rounded-2xl bg-[#4F46E5] p-8 sm:p-12 lg:min-h-[420px] lg:p-16">

        {/* Background Glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        {/* Content */}
        <div className="relative z-20 flex h-full max-w-xl flex-col justify-center">

          <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
            Ready to Upgrade?
          </span>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Upgrade Your Everyday Tech?
          </h2>

          <p className="mt-4 max-w-md text-sm leading-6 text-white/80 sm:text-base">
            Discover thousands of premium electronics and make your everyday
            life smarter.
          </p>

          <button
            type="button"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#4F46E5] transition-all duration-200 hover:bg-white/90 hover:shadow-lg"
          >
            Explore Store
            <ArrowRight className="h-4 w-4" />
          </button>

        </div>

        {/* CTA Image */}
        <div className="absolute bottom-0 right-0 z-10 hidden h-full w-[50%] lg:block">

          {/* Image overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#4F46E5] via-[#4F46E5]/30 to-transparent" />

          <img
            src={assets.finalcta}
            alt="Premium technology setup"
            className="h-full w-full object-cover object-center opacity-90"
          />

        </div>

      </div>
    </section>
  );
};

export default FinalCTA;