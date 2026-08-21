import { useState } from "react";
import { Mail, Send, Lock, Link2, ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

   
    console.log("Send reset link to:", email);
  };

  return (
    <div className="min-h-screen bg-[#F3F1FB] px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-sm lg:grid-cols-2">
          {/* Left: Form */}
          <div className="p-8 sm:p-12">
            <Link to="/" className="mb-10 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F46E5] text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 8V6a6 6 0 0 1 12 0v2m-14 0h16l-1.2 12a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 8Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-lg font-bold text-[#0B0B14]">
                TechGear
              </span>
            </Link>

            <Link
              to="/login"
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-[#4F46E5] hover:bg-indigo-100 transition-colors"
            >
              <ArrowLeft size={15} />
              Back to Sign In
            </Link>

            <h1 className="text-3xl font-bold text-[#0B0B14] mb-2 leading-tight">
              Forgot your
              <br />
              password?
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              No worries! Enter your email address and we'll send you a link
              to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#0B0B14] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-lg border border-gray-200 py-3 pl-11 pr-4 text-sm text-[#0B0B14] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4F46E5] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA]"
              >
                <Send size={16} />
                Send Reset Link
              </button>
            </form>

            <div className="mt-6 flex items-start gap-3 rounded-lg bg-indigo-50/60 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[#4F46E5]">
                <Lock size={17} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0B0B14]">
                  Secure Password Reset
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  We'll send you a secure link to your email address. The
                  link will expire in 15 minutes for your security.
                </p>
              </div>
            </div>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">
                Password reset process
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5]">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0B0B14]">
                    1. Check your email
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    We'll send a reset link to your email address.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5]">
                  <Link2 size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0B0B14]">
                    2. Click the reset link
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Click the link in the email to create a new password.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5]">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0B0B14]">
                    3. Create new password
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Your new password must be different from your previous
                    password.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              Still having trouble?{" "}
              <Link
                to="/contact"
                className="text-[#4F46E5] font-semibold hover:underline"
              >
                Contact our support team
              </Link>
            </p>
          </div>

          {/* Right: Illustration */}
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#EDEBFB] to-[#DAD5F7] lg:block">
            <div className="absolute right-10 top-10 grid grid-cols-4 gap-2.5">
              {Array.from({ length: 20 }).map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-[#B7ADEB]"
                />
              ))}
            </div>

            <div className="flex h-full items-center justify-center p-10">
              <img
                src={assets.forget}
                alt="Reset password on TechGear"
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;