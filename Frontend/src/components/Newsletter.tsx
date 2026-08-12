import { useState, FormEvent } from "react";
import { ShieldCheck, Mail, Check, Sparkles } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMsg("Enter your email to subscribe.");
      setStatus("error");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMsg("That email doesn't look right.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    // Replace with your actual API call
    await new Promise((resolve) => setTimeout(resolve, 900));

    setStatus("success");
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="relative overflow-hidden rounded-3xl bg-[#0B0B14]">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#4F46E5]/30 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-[#818CF8]/20 blur-[100px]" />

        <div className="relative grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-8 lg:p-14">
          {/* Left: copy + form */}
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#A5B4FC]">
              <Sparkles className="h-3.5 w-3.5" />
              Stay Updated
            </span>

            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Join Our Newsletter
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/50 sm:text-base">
              Get the latest deals, new arrivals and exclusive offers
              delivered straight to your inbox.
            </p>

            {status === "success" ? (
              <div className="mt-6 flex max-w-md items-center gap-3 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-3.5">
                <Check className="h-5 w-5 shrink-0 text-emerald-400" />
                <p className="text-sm font-medium text-white">
                  You're subscribed! Check your inbox for a confirmation.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row sm:items-start"
              >
                <div className="w-full">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder="Enter your email"
                      aria-invalid={status === "error"}
                      aria-describedby={status === "error" ? "newsletter-error" : undefined}
                      className={`w-full rounded-lg border bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 ${
                        status === "error"
                          ? "border-red-400/50 focus:ring-red-400/30"
                          : "border-white/10 focus:ring-[#4F46E5]/40"
                      }`}
                    />
                  </div>
                  {status === "error" && (
                    <p id="newsletter-error" className="mt-1.5 text-xs text-red-400">
                      {errorMsg}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="shrink-0 rounded-lg bg-[#4F46E5] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#6366F1] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? "Subscribing…" : "Subscribe"}
                </button>
              </form>
            )}

            <p className="mt-3 flex items-center gap-1.5 text-xs text-white/40">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" strokeWidth={2} />
              No spam. Unsubscribe anytime.
            </p>
          </div>

          {/* Right: value props */}
          <div className="flex flex-col justify-center gap-4 border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {[
              { label: "Early access to deals", value: "Every Friday" },
              { label: "Subscriber-only discounts", value: "Up to 30%" },
              { label: "New arrivals first look", value: "Before launch" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4">
                <span className="text-sm text-white/50">{item.label}</span>
                <span className="text-sm font-semibold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;