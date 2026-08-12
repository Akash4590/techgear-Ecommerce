import { Bot, Sparkles } from "lucide-react";
import { assets } from "../assets/assets";

const AIAssistant = () => {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-2xl bg-[#0B1020] p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:p-14">

        {/* Left: Copy + AI Illustration */}
        <div className="relative">

          {/* Glow */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#4F46E5]/20 blur-3xl" />

          <div className="relative z-10">

            {/* Label */}
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#6366F1]">
              <Sparkles
                className="h-3.5 w-3.5"
                strokeWidth={2}
              />
              Smart Shopping Assistant
            </span>

            {/* Heading */}
            <h2 className="mt-3 max-w-lg text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Not Sure What to Buy?
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-md text-sm leading-6 text-gray-300 sm:text-base">
              Ask our AI assistant for personalized product recommendations
              based on your needs, preferences and budget.
            </p>

            {/* Button */}
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#4F46E5] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#6366F1] hover:shadow-lg hover:shadow-[#4F46E5]/20"
            >
              Ask AI Assistant
              <Sparkles className="h-4 w-4" />
            </button>

            {/* AI Robot Image */}
            <div className="mt-8 flex items-center">

              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[#4F46E5]/10">

                {/* Glow behind robot */}
                <div className="absolute inset-3 rounded-full bg-[#6366F1]/20 blur-2xl" />

                <img
                  src={assets.aiassistant}
                  alt="AI Shopping Assistant"
                  className="relative z-10 h-28 w-28 object-contain drop-shadow-2xl"
                />

              </div>

              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-medium text-gray-300">
                    AI Assistant Online
                  </span>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  Ready to help you shop
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Right: Chat UI */}
        <div className="rounded-2xl bg-white p-4 shadow-2xl sm:p-6">

          {/* Chat Header */}
          <div className="mb-4 flex items-center gap-3 border-b border-[#E5E7EB] pb-4">

            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#EEF2FF]">

              <img
                src={assets.aiassistant}
                alt="AI Assistant"
                className="h-9 w-9 object-contain"
              />

            </div>

            <div>
              <p className="text-sm font-semibold text-[#111827]">
                AI Assistant
              </p>

              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                <p className="text-xs text-[#10B981]">
                  Online
                </p>
              </div>
            </div>

          </div>

          {/* User Question */}
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#4F46E5] px-4 py-2.5 text-sm leading-5 text-white">
              I need a laptop under $1000 for work and light gaming.
            </div>
          </div>

          {/* AI Response */}
          <div className="mt-3 flex items-start gap-2">

            <img
              src={assets.aiassistant}
              alt="AI Assistant"
              className="mt-1 h-7 w-7 shrink-0 object-contain"
            />

            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#F8F9FC] px-4 py-2.5 text-sm leading-5 text-[#111827]">
              Great! Here are 3 laptops that match your requirements.
            </div>

          </div>

          {/* Recommended Products */}
          <div className="mt-4 grid grid-cols-3 gap-2">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group aspect-square overflow-hidden rounded-lg bg-[#F8F9FC]"
              >
                <img
                  src={
                    item === 1
                      ? assets.macbook
                      : item === 2
                      ? assets.laptop
                      : assets.macbook
                  }
                  alt={`Recommended laptop ${item}`}
                  className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}

          </div>

          {/* CTA */}
          <button
            type="button"
            className="mt-4 w-full rounded-lg border border-[#E5E7EB] px-4 py-2.5 text-xs font-semibold text-[#4F46E5] transition-colors hover:bg-[#F8F9FC]"
          >
            View Recommendations →
          </button>

        </div>

      </div>
    </section>
  );
};

export default AIAssistant;