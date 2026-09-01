import { useState, useRef } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Truck,
  Award,
  Headphones,
  MailCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { API_BASE_URL } from "../config/api";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.61H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.39l4-3.11z"
    />
    <path
      fill="#EA4335"
      d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.61l4 3.11C6.22 6.88 8.87 4.77 12 4.77z"
    />
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0B0B14">
    <path d="M16.36 1c.1 1.02-.31 2.02-.94 2.75-.65.75-1.72 1.33-2.76 1.25-.12-1 .35-2.06 1-2.75.68-.73 1.83-1.27 2.7-1.25zM20.7 17.34c-.5 1.16-1.1 2.28-1.98 3.31-.9 1.05-1.83 2.09-3.14 2.11-1.28.03-1.7-.76-3.16-.76-1.47 0-1.93.74-3.14.79-1.27.05-2.24-1.13-3.15-2.17-1.85-2.14-3.28-6.03-1.37-8.66.94-1.31 2.62-2.14 4.45-2.16 1.24-.02 2.42.83 3.17.83.75 0 2.17-1.03 3.66-.88.63.03 2.38.25 3.51 1.9-.09.06-2.1 1.22-2.08 3.63.02 2.88 2.55 3.84 2.23 4.06z" />
  </svg>
);

const SignUpPage = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ---- OTP step state ----
  const [step, setStep] = useState<"form" | "otp">("form");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 5) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, password }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Signup failed");
        return;
      }

      // Move to OTP verification step instead of navigating away
      setStep("otp");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return; // only allow single digit
    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasted)) {
      e.preventDefault();
      setOtp(pasted.split(""));
      otpInputsRef.current[5]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");
    setResendMsg("");

    const code = otp.join("");
    if (code.length !== 6) {
      setOtpError("Please enter the full 6-digit code.");
      return;
    }

    setVerifying(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });
      const data = await res.json();

      if (!data.success) {
        setOtpError(data.message || "Invalid code. Please try again.");
        return;
      }

      navigate("/login");
    } catch (err) {
      setOtpError("Something went wrong. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setResendMsg("");
    setOtpError("");
    setResending(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, password }),
      });
      const data = await res.json();

      if (!data.success) {
        setOtpError(data.message || "Could not resend code.");
        return;
      }
      setOtp(["", "", "", "", "", ""]);
      otpInputsRef.current[0]?.focus();
      setResendMsg("A new code has been sent to your email.");
    } catch (err) {
      setOtpError("Something went wrong while resending the code.");
    } finally {
      setResending(false);
    }
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

            {step === "form" ? (
              <>
                <h1 className="text-3xl font-bold text-[#0B0B14] mb-2">
                  Create your account
                </h1>
                <p className="text-sm text-gray-500 mb-8">
                  Join TechGear and enjoy the best technology at your
                  fingertips.
                </p>

                {error && (
                  <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#0B0B14] mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border border-gray-200 py-3 pl-11 pr-4 text-sm text-[#0B0B14] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
                      />
                    </div>
                  </div>

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
                        placeholder="Create a password"
                        className="w-full rounded-lg border border-gray-200 py-3 pl-11 pr-11 text-sm text-[#0B0B14] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    <p className="mt-1.5 text-xs text-gray-400">
                      Use at least 6 characters with a mix of letters, numbers
                      &amp; symbols.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0B0B14] mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className="w-full rounded-lg border border-gray-200 py-3 pl-11 pr-11 text-sm text-[#0B0B14] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((prev) => !prev)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#4F46E5] focus:ring-[#4F46E5]/30"
                    />
                    <span>
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-[#4F46E5] font-medium hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-[#4F46E5] font-medium hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4F46E5] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Creating account..." : "Create Account"}
                    {!loading && <ArrowRight size={16} />}
                  </button>
                </form>

                <div className="my-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-xs text-gray-400">
                    or continue with
                  </span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 text-sm font-medium text-[#0B0B14] hover:border-gray-300 transition-colors"
                  >
                    <GoogleIcon />
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 text-sm font-medium text-[#0B0B14] hover:border-gray-300 transition-colors"
                  >
                    <AppleIcon />
                    Apple
                  </button>
                </div>

                <p className="mt-8 text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#4F46E5] font-semibold hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </>
            ) : (
              <>
                {/* ---- OTP Verification Step ---- */}
                <div className="mb-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5]">
                    <MailCheck size={22} />
                  </div>
                  <h1 className="text-3xl font-bold text-[#0B0B14] mb-2">
                    Verify your email
                  </h1>
                  <p className="text-sm text-gray-500">
                    We've sent a 6-digit code to{" "}
                    <span className="font-semibold text-[#0B0B14]">
                      {email}
                    </span>
                    . Enter it below to activate your account.
                  </p>
                </div>

                {otpError && (
                  <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-600">
                    {otpError}
                  </div>
                )}
                {resendMsg && (
                  <div className="mb-5 rounded-lg bg-green-50 border border-green-200 px-4 py-2.5 text-sm text-green-600">
                    {resendMsg}
                  </div>
                )}

                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          otpInputsRef.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleOtpChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={handleOtpPaste}
                        className="h-14 w-12 rounded-lg border border-gray-200 text-center text-xl font-bold text-[#0B0B14] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 sm:w-14"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={verifying}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4F46E5] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {verifying ? "Verifying..." : "Verify & Continue"}
                    {!verifying && <ArrowRight size={16} />}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                  Didn't receive the code?{" "}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resending}
                    className="text-[#4F46E5] font-semibold hover:underline disabled:opacity-60"
                  >
                    {resending ? "Resending..." : "Resend code"}
                  </button>
                </p>

                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="mt-4 w-full text-center text-xs text-gray-400 hover:text-gray-600"
                >
                  ← Back to sign up
                </button>
              </>
            )}
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
                src={assets.signup}
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
                Your data is safe and protected.
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
                Original products you can trust.
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
                We are here to help you anytime.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          © 2026 TechGear. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;