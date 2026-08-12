import { Star } from "lucide-react";
import { assets } from "../assets/assets";

const Hero = () => {
  const avatars = [
    assets.avatar1,
    assets.avatar2,
    assets.avatar3,
  ];

  return (
    <section className="bg-[#0b0b14] px-6 pt-12 pb-12 lg:px-14 lg:pt-16 lg:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">

          {/* Left Content */}
          <div className="flex flex-col justify-center text-center lg:text-left">

            <p className="text-xs font-semibold tracking-widest text-white/50">
              THE FUTURE OF EVERYDAY TECH
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[64px]">
              Technology <br />
              that <span className="text-indigo-400">fits</span> your life.
            </h1>

            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/50 lg:mx-0">
              Discover premium electronics, smart gadgets and innovative
              technology designed to make your everyday life better.
            </p>

            {/* CTA Buttons */}
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              
              <button
                type="button"
                className="rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
              >
                Explore Products →
              </button>

              <button
                type="button"
                className="rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Deals
              </button>

            </div>

            {/* Social Proof */}
            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">

              {/* Customer Avatars */}
              <div className="flex items-center gap-2">

                <div className="flex -space-x-2">
                  {avatars.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Happy customer ${index + 1}`}
                      className="h-8 w-8 rounded-full border-2 border-[#0b0b14] object-cover"
                    />
                  ))}
                </div>

                <span className="text-sm font-medium text-white">
                  10,000+{" "}
                  <span className="text-white/50">
                    Happy Customers
                  </span>
                </span>

              </div>

              {/* Rating */}
              <div className="flex items-center gap-1.5">

                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400"
                    />
                  ))}
                </div>

                <span className="text-sm text-white/50">
                  4.9/5 (2.3K Reviews)
                </span>

              </div>

            </div>
          </div>

          {/* Right Hero Image */}
          <div className="relative min-h-[320px] lg:min-h-0">

            <div className="h-full w-full overflow-hidden rounded-3xl">
              <img
                src={assets.hero}
                alt="Premium technology products"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -top-5 right-5 hidden w-48 rounded-xl border border-white/10 bg-[#13131f]/95 p-3.5 shadow-2xl backdrop-blur sm:block">

              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-amber-400"
                  />
                ))}
              </div>

              <p className="mt-1.5 text-xs font-semibold leading-snug text-white">
                Trusted by Tech Lovers Worldwide
              </p>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;