import { useState } from "react";
import { Search, Heart, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Shop", hasDropdown: true },
  { label: "Categories", hasDropdown: true },
  { label: "Deals", hasDropdown: false },
  { label: "About Us", hasDropdown: false },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = 2;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB]">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F46E5] text-sm font-bold text-white">
            TG
          </span>
          <span className="text-lg font-bold text-[#111827]">TechGear</span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-[#111827] transition-colors hover:text-[#4F46E5]"
            >
              {link.label}
              {link.hasDropdown && <ChevronDown className="h-4 w-4" strokeWidth={2} />}
            </button>
          ))}
        </nav>

        {/* Search bar - desktop */}
        <div className="hidden flex-1 max-w-xs mx-6 md:flex lg:mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full rounded-lg border border-[#E5E7EB] bg-white py-2 pl-4 pr-10 text-sm text-[#111827] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
              aria-label="Search for products"
            />
            <Search
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Right actions - desktop */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            aria-label="Wishlist"
            className="text-[#111827] transition-colors hover:text-[#4F46E5]"
          >
            <Heart className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Cart"
            className="relative text-[#111827] transition-colors hover:text-[#4F46E5]"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#4F46E5] text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="rounded-lg bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#6366F1]"
          >
            Login
          </button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            type="button"
            aria-label="Cart"
            className="relative text-[#111827]"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#4F46E5] text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="text-[#111827]"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div className="border-t border-[#E5E7EB] bg-white px-4 pb-6 pt-4 md:hidden">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full rounded-lg border border-[#E5E7EB] bg-white py-2 pl-4 pr-10 text-sm text-[#111827] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
              aria-label="Search for products"
            />
            <Search
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
              strokeWidth={2}
            />
          </div>

          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                className="flex items-center justify-between rounded-lg px-2 py-3 text-left text-sm font-medium text-[#111827] hover:bg-[#F8F9FC]"
              >
                {link.label}
                {link.hasDropdown && <ChevronDown className="h-4 w-4" strokeWidth={2} />}
              </button>
            ))}
          </nav>

          <div className="mt-4 flex items-center gap-4 border-t border-[#E5E7EB] pt-4">
            <button
              type="button"
              className="flex items-center gap-2 text-sm font-medium text-[#111827]"
            >
              <Heart className="h-5 w-5" strokeWidth={2} />
              Wishlist
            </button>
          </div>

          <button
            type="button"
            className="mt-4 w-full rounded-lg bg-[#4F46E5] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#6366F1]"
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;