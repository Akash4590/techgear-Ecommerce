import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  ArrowUp,
  ArrowRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
} from "react-icons/fa";

const shopLinks = [
  "Smartphones",
  "Laptops",
  "Audio",
  "Accessories",
  "Deals",
];

const supportLinks = [
  "Contact Us",
  "Shipping Info",
  "Returns",
  "FAQ",
];

const companyLinks = [
  "About Us",
  "Privacy Policy",
  "Terms & Conditions",
];

const socialIcons = [
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaTwitter, label: "Twitter" },
  { icon: FaYoutube, label: "YouTube" },
  { icon: FaLinkedinIn, label: "LinkedIn" },
];

// Lightweight scroll-reveal hook — no extra dependencies required.
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

const FooterColumn = ({
  title,
  links,
  delay,
}: {
  title: string;
  links: string[];
  delay: number;
}) => {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: inView ? `${delay}ms` : "0ms",
      }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        inView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      <h4 className="text-sm font-semibold tracking-wide text-white">
        {title}
      </h4>

      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="group inline-flex items-center gap-1 text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              <ArrowRight
                className="h-3 w-3 shrink-0 -translate-x-2 text-[#4F46E5] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                strokeWidth={2.5}
              />

              <span className="transition-transform duration-200 group-hover:translate-x-1">
                {link}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  const [brandRef, brandInView] = useInView();
  const [contactRef, contactInView] = useInView();
  const [bottomRef, bottomInView] = useInView();

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  return (
    <footer className="relative overflow-hidden bg-[#050914] pt-14">

      {/* Signature element: animated gradient scanline */}
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
        <div className="h-full w-[200%] animate-[shimmer_6s_linear_infinite] bg-[linear-gradient(90deg,transparent,#4F46E5,#22D3EE,transparent)] motion-reduce:animate-none" />
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[#4F46E5]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">

          {/* Brand */}
          <div
            ref={brandRef}
            style={{
              transitionDelay: brandInView ? "0ms" : "0ms",
            }}
            className={`col-span-2 transition-all duration-700 ease-out motion-reduce:transition-none sm:col-span-3 lg:col-span-1 ${
              brandInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#22D3EE] text-sm font-bold text-white shadow-[0_0_20px_-4px_rgba(79,70,229,0.7)]">
                TG
              </span>

              <span className="text-lg font-bold text-white">
                TechGear
              </span>
            </div>

            {/* Description */}
            <p className="mt-3 text-sm text-gray-400">
              Technology that fits your life.
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex items-center gap-3">
              {socialIcons.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="group flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-br hover:from-[#4F46E5] hover:to-[#22D3EE] hover:text-white hover:shadow-[0_4px_16px_-4px_rgba(79,70,229,0.8)]"
                >
                  <Icon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <FooterColumn
            title="Shop"
            links={shopLinks}
            delay={80}
          />

          {/* Support */}
          <FooterColumn
            title="Support"
            links={supportLinks}
            delay={160}
          />

          {/* Company */}
          <FooterColumn
            title="Company"
            links={companyLinks}
            delay={240}
          />

          {/* Contact */}
          <div
            ref={contactRef}
            style={{
              transitionDelay: contactInView ? "320ms" : "0ms",
            }}
            className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
              contactInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <h4 className="text-sm font-semibold tracking-wide text-white">
              Contact Us
            </h4>

            <ul className="mt-4 space-y-3">

              {/* Location */}
              <li className="group flex items-start gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-white">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#4F46E5] transition-transform duration-200 group-hover:scale-110"
                  strokeWidth={2}
                />

                <span>Punjab, Pakistan</span>
              </li>

              {/* Email */}
              <li className="group flex items-start gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-white">
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#4F46E5] transition-transform duration-200 group-hover:scale-110"
                  strokeWidth={2}
                />

                <span>akashjaved4590@gmail.com</span>
              </li>

              {/* Phone */}
              <li className="group flex items-start gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-white">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#4F46E5] transition-transform duration-200 group-hover:scale-110"
                  strokeWidth={2}
                />

                <span>+92 301 9304590</span>
              </li>
            </ul>

            {/* Payment Methods */}
            <div className="mt-6">
              <h5 className="text-xs font-semibold tracking-wide text-white">
                We Accept
              </h5>

              <div className="mt-3 flex items-center gap-2">

                {/* VISA */}
                <div
                  className="flex h-9 w-14 items-center justify-center rounded-md border border-blue-500/30 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  title="Visa"
                >
                  <FaCcVisa className="h-6 w-6 text-[#1A1F71]" />
                </div>

                {/* Mastercard */}
                <div
                  className="flex h-9 w-14 items-center justify-center rounded-md border border-red-500/20 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  title="Mastercard"
                >
                  <FaCcMastercard className="h-6 w-6 text-[#EB001B]" />
                </div>

                {/* PayPal */}
                <div
                  className="flex h-9 w-14 items-center justify-center rounded-md border border-blue-500/20 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  title="PayPal"
                >
                  <FaPaypal className="h-6 w-6 text-[#003087]" />
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          ref={bottomRef}
          className={`mt-12 flex items-center justify-center border-t border-white/10 py-6 transition-all duration-700 ease-out motion-reduce:transition-none ${
            bottomInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          {/* Copyright */}
          <p className="text-center text-xs text-gray-500">
            © 2026 TechGear. All rights reserved.
          </p>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="group absolute bottom-6 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-300 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-[#4F46E5] hover:to-[#22D3EE] hover:text-white sm:right-8"
      >
        <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-50%);
          }

          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;