import { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Truck,
  Award,
  Headphones,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth(); 

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Login failed");
        return;
      }

      login(data.data.token, data.data.user);
      navigate("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F1FB] px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-sm lg:grid-cols-2">
          {/* Left: Form */}
          <div className="p-8 sm:p-12">
            <Link to="/" className="mb-10 flex items-center gap-2 cursor-pointer">
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

            <span className="inline-block mb-5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-[#4F46E5]">
              Welcome back!
            </span>

            <h1 className="text-3xl font-bold text-[#0B0B14] mb-2 leading-tight">
              Sign in to your
              <br />
              account
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              Access your account to continue shopping the best tech
              products.
            </p>

            {error && (
              <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-600">
                {error}
              </div>
            )}

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

              <div>
                <label className="block text-sm font-semibold text-[#0B0B14] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-gray-200 py-3 pl-11 pr-11 text-sm text-[#0B0B14] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#4F46E5] focus:ring-[#4F46E5]/30 cursor-pointer"
                  />
                  Remember me
                </label>
                <Link
                  to="/forgotpassword"
                  className="text-sm font-medium text-[#4F46E5] hover:underline cursor-pointer"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4F46E5] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">or continue with</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 text-sm font-medium text-[#0B0B14] hover:border-gray-300 transition-colors cursor-pointer"
              >
                <img src={assets.google} alt="Google" className="h-[18px] w-[18px]" />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 text-sm font-medium text-[#0B0B14] hover:border-gray-300 transition-colors cursor-pointer"
              >
                <img src={assets.aple} alt="Apple" className="h-[18px] w-[18px]" />
                Apple
              </button>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-lg bg-indigo-50/60 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[#4F46E5]">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0B0B14]">
                  Secure & Protected
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Your data is protected with 256-bit SSL encryption and
                  secure authentication.
                </p>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#4F46E5] font-semibold hover:underline cursor-pointer">
                Create account
              </Link>
            </p>
          </div>

          {/* Right: Illustration */}
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#EDEBFB] to-[#DAD5F7] lg:block">
            <div className="absolute right-10 top-10 grid grid-cols-4 gap-2.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-[#B7ADEB]"
                />
              ))}
            </div>

            <div className="flex h-full items-center justify-center p-10">
              <img
                src={assets.signin}
                alt="TechGear products"
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-8 grid grid-cols-2 gap-6 rounded-2xl bg-white p-8 shadow-sm sm:grid-cols-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0B0B14]">
                Secure Payments
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Your payments are safe and encrypted.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5]">
              <Truck size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0B0B14]">
                Fast Delivery
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Quick delivery to your doorstep.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5]">
              <Award size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0B0B14]">
                Premium Quality
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Original products with warranty.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5]">
              <Headphones size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0B0B14]">
                24/7 Support
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                We're here to help you anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;