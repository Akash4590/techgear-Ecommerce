import { useState } from "react";
import {
  Bot,
  Send,
  User,
  ShoppingBag,
  Tag,
  PackageSearch,
  GitCompare,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { assets } from "../assets/assets";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

interface BackendHistoryMessage {
  role: "user" | "model";
  text: string;
}

interface ChatResponse {
  success: boolean;
  reply?: string;
  message?: string;
  error?: string;
}

const AI_AGENT_AVATAR = "/images/ai-agent-avatar.png";

// Markdown ko chat bubble ke design system se match karne wale custom components
const markdownComponents: Components = {
  p: ({ children }) => (
    <p className="mb-2 last:mb-0 leading-6">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-inherit">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => (
    <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-6">{children}</li>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-[#4F46E5] underline underline-offset-2 hover:text-[#4338CA]"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">
      {children}
    </code>
  ),
};

const AIChatPage = () => {
  const { authFetch, user } = useAuth();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi!  I'm TechGear AI, your personal shopping assistant. I can help you find products, compare prices, check availability, discover deals, and answer questions about your orders.",
    },
  ]);
  const getUserAvatar = () => {
    if (!user) return null;

    const userData = user as typeof user & {
      avatar?: string;
      profileImage?: string;
      image?: string;
      photoURL?: string;
    };

    return (
      userData.avatar ||
      userData.profileImage ||
      userData.image ||
      userData.photoURL ||
      null
    );
  };

  const userAvatar = getUserAvatar();

  const sendMessage = async (text?: string) => {
    const userMessage = (text ?? message).trim();

    if (!userMessage || loading) return;

    setMessage("");

    const newUserMessage: Message = {
      id: Date.now(),
      role: "user",
      content: userMessage,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setLoading(true);

    try {
      const history: BackendHistoryMessage[] = messages
        .filter((item) => item.content.trim())
        .map((item) => ({
          role: item.role === "assistant" ? "model" : "user",
          text: item.content,
        }));

      const response = await authFetch(`${API_BASE_URL}/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history,
        }),
      });

      const data = (await response.json()) as ChatResponse;

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            data.error ||
            "Failed to get response from AI assistant"
        );
      }

      const aiMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          data.reply ||
          "Sorry, I couldn't generate a response right now.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    {
      icon: ShoppingBag,
      label: "Find a product",
      text: "Help me find the best smartphone",
    },
    {
      icon: Tag,
      label: "Best deals",
      text: "What are the best deals available?",
    },
    {
      icon: PackageSearch,
      label: "Check availability",
      text: "Which iPhone models are currently in stock?",
    },
    {
      icon: GitCompare,
      label: "Compare products",
      text: "Compare iPhone 15 Pro Max with other smartphones",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <Navbar />

      <main className="mx-auto flex w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">

        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 h-14 w-14 overflow-hidden rounded-2xl bg-[#4F46E5] shadow-lg shadow-indigo-200">
            <img
              src={assets.aiassistant}
              alt="TechGear AI"
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-bold text-[#0B0B14] sm:text-3xl">
              TechGear AI Assistant
            </h1>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Your personal AI shopping assistant
          </p>
        </div>

        <div className="mx-auto flex h-[650px] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
            <div className="relative">
              {/* AI Avatar */}
              <div className="h-10 w-10 overflow-hidden rounded-full bg-indigo-50">
                <img
                  src={assets.aiassistant}
                  alt="TechGear AI"
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* Online Indicator */}
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#0B0B14]">
                TechGear AI
              </p>

              <p className="text-xs text-green-600">
                Online • Ready to help
              </p>
            </div>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto bg-[#FCFCFE] p-5 sm:p-6">
            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {suggestions.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => void sendMessage(item.text)}
                      disabled={loading}
                      className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 text-left transition hover:border-[#4F46E5]/40 hover:bg-indigo-50/40 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5]">
                        <Icon size={17} />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.label}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-400">
                          Ask TechGear AI
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Chat Messages */}
            {messages.map((item) => (
              <div
                key={item.id}
                className={`flex gap-3 ${
                  item.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}>

                {item.role === "assistant" && (
                  <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-[#4F46E5]">
                    <img
                      src={AI_AGENT_AVATAR}
                      alt="TechGear AI"
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />

                    {/* Fallback icon */}
                    <div className="flex h-full w-full items-center justify-center text-white">
                      <Bot size={16} />
                    </div>
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    item.role === "user"
                      ? "whitespace-pre-wrap rounded-br-md bg-[#4F46E5] text-white leading-6"
                      : "rounded-bl-md border border-gray-100 bg-white text-gray-700 shadow-sm"
                  }`}
                >
                  {item.role === "assistant" ? (
                    <ReactMarkdown components={markdownComponents}>
                      {item.content}
                    </ReactMarkdown>
                  ) : (
                    item.content
                  )}
                </div>

                {item.role === "user" && (
                  <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-100">
                    {userAvatar ? (
                      <img
                        src={assets.avatar2}
                        alt="You"
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-500">
                        <User size={16} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3">
                {/* AI Avatar */}
                <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-[#4F46E5]">
                  <img
                    src={assets.aiassistant}
                    alt="TechGear AI"
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="flex h-full w-full items-center justify-center text-white">
                    <Bot size={16} />
                  </div>
                </div>
                <div className="rounded-2xl rounded-bl-md border border-gray-100 bg-white px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />

                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:120ms]" />

                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:240ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 bg-white p-4">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage();
              }}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-[#F8F9FC] p-2 focus-within:border-[#4F46E5]"
            >
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ask TechGear AI anything..."
                disabled={loading}
                className="flex-1 bg-transparent px-2 text-sm text-gray-800 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed"
              />

              <button
                type="submit"
                disabled={!message.trim() || loading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4F46E5] text-white transition hover:bg-[#4338CA] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={17} />
              </button>
            </form>

            <p className="mt-2 text-center text-[11px] text-gray-400">
              TechGear AI can help with products, deals, orders and
              shopping questions.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AIChatPage;