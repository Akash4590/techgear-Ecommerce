import React from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { assets } from "../../assets/assets";

const AIAssistantBanner: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl bg-[#F8F9FC] px-6 py-6 sm:px-8 mb-12">
      <div className="flex items-center gap-4 text-center sm:text-left">
        <img
          src={assets.aiassistant}
          alt="AI Assistant"
          className="hidden sm:block h-16 w-16 flex-shrink-0 object-contain"
        />
        <div>
          <h3 className="text-base font-semibold text-[#0B0B14]">
            Need Help Choosing the Right Product?
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            Ask our AI assistant to find the perfect product for your needs.
          </p>
        </div>
      </div>

      <Link
        to="/ai-agent"
        className="flex items-center gap-2 rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4338CA] transition-colors whitespace-nowrap"
      >
        <Sparkles size={16} />
        Ask AI Assistant
      </Link>
    </div>
  );
};

export default AIAssistantBanner;