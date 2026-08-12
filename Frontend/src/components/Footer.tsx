import { MapPin, Mail, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
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

const Footer = () => {
  return (
    <footer className="bg-[#050914] pt-14">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F46E5] text-sm font-bold text-white">
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
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-300 transition-colors hover:bg-[#4F46E5] hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold text-white">
              Shop
            </h4>

            <ul className="mt-4 space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white">
              Support
            </h4>

            <ul className="mt-4 space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white">
              Company
            </h4>

            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white">
              Contact Us
            </h4>

            <ul className="mt-4 space-y-3">
              
              {/* Location */}
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0"
                  strokeWidth={2}
                />

                <span>Karachi, Pakistan</span>
              </li>

              {/* Email */}
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0"
                  strokeWidth={2}
                />

                <span>support@techgear.com</span>
              </li>

              {/* Phone */}
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0"
                  strokeWidth={2}
                />

                <span>+92 300 1234567</span>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
          
          {/* Copyright */}
          <p className="text-xs text-gray-500">
            © 2026 TechGear. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-3">
            <span className="rounded border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-gray-300">
              VISA
            </span>

            <span className="rounded border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-gray-300">
              Mastercard
            </span>

            <span className="rounded border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-gray-300">
              PayPal
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;