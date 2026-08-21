import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingCart, Menu, X, ChevronDown, UserCircle2 } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import { productCategoryFilters } from "../data/Products";

type NavLink = { label: string; hasDropdown: boolean; path: string };

const navLinks: NavLink[] = [
  { label: "Home", hasDropdown: false, path: "/" },
  { label: "Shop", hasDropdown: false, path: "/shop" },
  { label: "Categories", hasDropdown: true, path: "/shop" },
  { label: "Deals", hasDropdown: false, path: "/deals" },
  { label: "About Us", hasDropdown: false, path: "/about" },
];

const tap = { scale: 0.94 };
const springy = { type: "spring", stiffness: 400, damping: 25 } as const;

const MotionLink = motion(Link);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { cartCount, wishlistCount } = useShop();
  const { isAuthenticated } = useAuth(); // Naya
  const navigate = useNavigate();
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    setIsCategoryOpen(false);
    setIsMobileMenuOpen(false);
    if (category === "All Products") {
      navigate("/shop");
    } else {
      navigate(`/shop?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <motion.header
      animate={{
        boxShadow: isScrolled
          ? "0 4px 20px -8px rgba(17, 24, 39, 0.15)"
          : "0 0 0 0 rgba(17, 24, 39, 0)",
      }}
      transition={{ duration: 0.25 }}
      className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB]"
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <motion.div whileHover={{ scale: 1.04 }} whileTap={tap} transition={springy}>
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F46E5] text-sm font-bold text-white">
              TG
            </span>
            <span className="text-lg font-bold text-[#111827]">TechGear</span>
          </Link>
        </motion.div>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div key={link.label} ref={categoryRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setIsCategoryOpen((prev) => !prev)}
                    className="group relative flex items-center gap-1 text-sm font-medium text-[#111827] transition-colors hover:text-[#4F46E5]"
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isCategoryOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={2}
                    />
                    <span className="absolute -bottom-1.5 left-0 h-[1.5px] w-0 bg-[#4F46E5] transition-all duration-200 ease-out group-hover:w-full" />
                  </button>

                  <AnimatePresence>
                    {isCategoryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-3 w-52 rounded-xl border border-gray-100 bg-white p-2 shadow-lg"
                      >
                        {productCategoryFilters.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-[#111827] transition-colors hover:bg-[#F8F9FC] hover:text-[#4F46E5]"
                          >
                            {cat}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                to={link.path}
                className="group relative flex items-center gap-1 text-sm font-medium text-[#111827] transition-colors hover:text-[#4F46E5]"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-[1.5px] w-0 bg-[#4F46E5] transition-all duration-200 ease-out group-hover:w-full" />
              </Link>
            );
          })}
        </nav>

        {/* Search bar - desktop */}
        <form onSubmit={handleSearchSubmit} className="hidden flex-1 max-w-xs mx-6 md:flex lg:mx-8">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full rounded-lg border border-[#E5E7EB] bg-white py-2 pl-4 pr-10 text-sm text-[#111827] placeholder:text-[#6B7280] transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
              aria-label="Search for products"
            />
            <button
              type="submit"
              aria-label="Submit search"
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Search className="h-4 w-4 text-[#6B7280]" strokeWidth={2} />
            </button>
          </div>
        </form>

        {/* Right actions - desktop */}
        <div className="hidden items-center gap-4 md:flex">

          {/* Wishlist */}
          <MotionLink
            to="/wishlist"
            aria-label="Wishlist"
            whileHover={{ scale: 1.15 }}
            whileTap={tap}
            transition={springy}
            className="relative text-[#111827] transition-colors hover:text-[#4F46E5]"
          >
            <Heart className="h-5 w-5" strokeWidth={2} />
            <AnimatePresence>
              {wishlistCount > 0 && (
                <motion.span
                  key={wishlistCount}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={springy}
                  className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#4F46E5] text-[10px] font-semibold text-white"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </AnimatePresence>
          </MotionLink>

          {/* Cart */}
          <MotionLink
            to="/cart"
            aria-label="Cart"
            whileHover={{ scale: 1.15 }}
            whileTap={tap}
            transition={springy}
            className="relative text-[#111827] transition-colors hover:text-[#4F46E5]"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={2} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={springy}
                  className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#4F46E5] text-[10px] font-semibold text-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </MotionLink>

          {/* Naya: Auth-aware section — Login button ya My Account */}
          {isAuthenticated ? (
            <MotionLink
              to="/account"
              whileHover={{ scale: 1.03 }}
              whileTap={tap}
              transition={springy}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-[#111827] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors cursor-pointer"
            >
              <UserCircle2 size={18} />
              My Account
            </MotionLink>
          ) : (
            <motion.button
              type="button"
              onClick={() => navigate("/login")}
              whileHover={{ scale: 1.03 }}
              whileTap={tap}
              transition={springy}
              className="rounded-lg bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#6366F1] cursor-pointer"
            >
              Login
            </motion.button>
          )}
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-4 md:hidden">

          {/* Mobile Cart */}
          <MotionLink to="/cart" aria-label="Cart" whileTap={tap} className="relative text-[#111827]">
            <ShoppingCart className="h-5 w-5" strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#4F46E5] text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </MotionLink>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            whileTap={tap}
            className="text-[#111827]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isMobileMenuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" strokeWidth={2} />
                ) : (
                  <Menu className="h-6 w-6" strokeWidth={2} />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence initial={false}>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-[#E5E7EB] bg-white md:hidden"
          >
            <div className="px-4 pb-6 pt-4">

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full rounded-lg border border-[#E5E7EB] bg-white py-2 pl-4 pr-10 text-sm text-[#111827] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
                  aria-label="Search for products"
                />
                <button type="submit" aria-label="Submit search" className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="h-4 w-4 text-[#6B7280]" strokeWidth={2} />
                </button>
              </form>

              {/* Mobile Nav */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  if (link.hasDropdown) {
                    return (
                      <div key={link.label}>
                        <button
                          onClick={() => setIsCategoryOpen((prev) => !prev)}
                          className="flex w-full items-center justify-between rounded-lg px-2 py-3 text-left text-sm font-medium text-[#111827] hover:bg-[#F8F9FC]"
                        >
                          {link.label}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              isCategoryOpen ? "rotate-180" : ""
                            }`}
                            strokeWidth={2}
                          />
                        </button>
                        <AnimatePresence>
                          {isCategoryOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-4"
                            >
                              {productCategoryFilters.map((cat) => (
                                <button
                                  key={cat}
                                  onClick={() => handleCategoryClick(cat)}
                                  className="block w-full rounded-lg px-2 py-2.5 text-left text-sm text-gray-600 hover:bg-[#F8F9FC] hover:text-[#4F46E5]"
                                >
                                  {cat}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between rounded-lg px-2 py-3 text-left text-sm font-medium text-[#111827] hover:bg-[#F8F9FC]"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Wishlist */}
              <div className="mt-4 flex items-center gap-4 border-t border-[#E5E7EB] pt-4">
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium text-[#111827]"
                >
                  <Heart className="h-5 w-5" strokeWidth={2} />
                  Wishlist
                  {wishlistCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4F46E5] text-[10px] font-semibold text-white">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </div>
              {isAuthenticated ? (
                <motion.button
                  type="button"
                  onClick={() => {
                    navigate("/account");
                    setIsMobileMenuOpen(false);
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-[#111827]"
                >
                  <UserCircle2 size={18} />
                  My Account
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={() => {
                    navigate("/signup");
                    setIsMobileMenuOpen(false);
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-4 w-full rounded-lg bg-[#4F46E5] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#6366F1]"
                >
                  Login
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;