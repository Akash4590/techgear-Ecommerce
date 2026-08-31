import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { assets } from "../assets/assets";

const AIAssistantButton = () => {
  return (
    <Link
      to="/ai-agent"
      className="fixed bottom-6 right-6 z-[100] group"
      aria-label="Open AI Assistant"
    >
      <div className="relative">
        <img
          src={assets.aiassistant}
          alt="AI Assistant"
          className="h-20 w-20 object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
        />

        {/* Online indicator */}
        <span className="absolute right-1 top-2 h-3 w-3 rounded-full border-2 border-white bg-green-500" />

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 hidden whitespace-nowrap rounded-lg bg-[#0B0B14] px-3 py-2 text-xs font-medium text-white shadow-lg group-hover:block">
          Ask AI Assistant
        </div>

        {/* Small AI icon */}
        <span className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#4F46E5] text-white shadow">
          <Sparkles size={11} />
        </span>
      </div>
    </Link>
  );
};

export default AIAssistantButton;