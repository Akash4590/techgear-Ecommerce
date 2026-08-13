import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

type NavLink = {
  label: string;
  hasDropdown: boolean;
};

const navLinks: NavLink[] = [
  { label: "Home", hasDropdown: false },
  { label: "Shop", hasDropdown: true },
  { label: "Categories", hasDropdown: true },
  { label: "Deals", hasDropdown: false },
  { label: "About Us", hasDropdown: false },
];

const tap = { scale: 0.94 };

const springy = {
  type: "spring",
  stiffness: 400,
  damping: 25,
} as const;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const cartCount = 2;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

        {/* Logo */}
        <motion.a
          href="/"
          whileHover={{ scale: 1.04 }}
          whileTap={tap}
          transition={springy}
          className="flex items-center gap-2 shrink-0"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F46E5] text-sm font-bold text-white">
            TG
          </span>

          <span className="text-lg font-bold text-[#111827]">
            TechGear
          </span>
        </motion.a>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              className="group relative flex items-center gap-1 text-sm font-medium text-[#111827] transition-colors hover:text-[#4F46E5]"
            >
              {link.label}

              {link.hasDropdown && (
                <ChevronDown
                  className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                  strokeWidth={2}
                />
              )}

              {/* Animated underline on hover */}
              <span className="absolute -bottom-1.5 left-0 h-[1.5px] w-0 bg-[#4F46E5] transition-all duration-200 ease-out group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Search bar - desktop */}
        <div className="hidden flex-1 max-w-xs mx-6 md:flex lg:mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full rounded-lg border border-[#E5E7EB] bg-white py-2 pl-4 pr-10 text-sm text-[#111827] placeholder:text-[#6B7280] transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
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

          {/* Wishlist */}
          <motion.button
            type="button"
            aria-label="Wishlist"
            whileHover={{ scale: 1.15 }}
            whileTap={tap}
            transition={springy}
            className="text-[#111827] transition-colors hover:text-[#4F46E5]"
          >
            <Heart
              className="h-5 w-5"
              strokeWidth={2}
            />
          </motion.button>

          {/* Cart */}
          <motion.button
            type="button"
            aria-label="Cart"
            whileHover={{ scale: 1.15 }}
            whileTap={tap}
            transition={springy}
            className="relative text-[#111827] transition-colors hover:text-[#4F46E5]"
          >
            <ShoppingCart
              className="h-5 w-5"
              strokeWidth={2}
            />

            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  exit={{
                    scale: 0,
                    opacity: 0,
                  }}
                  transition={springy}
                  className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#4F46E5] text-[10px] font-semibold text-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Login */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={tap}
            transition={springy}
            className="rounded-lg bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#6366F1]"
          >
            Login
          </motion.button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-4 md:hidden">

          {/* Mobile Cart */}
          <motion.button
            type="button"
            aria-label="Cart"
            whileTap={tap}
            className="relative text-[#111827]"
          >
            <ShoppingCart
              className="h-5 w-5"
              strokeWidth={2}
            />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#4F46E5] text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            aria-label={
              isMobileMenuOpen
                ? "Close menu"
                : "Open menu"
            }
            onClick={() =>
              setIsMobileMenuOpen((prev) => !prev)
            }
            whileTap={tap}
            className="text-[#111827]"
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.span
                key={
                  isMobileMenuOpen
                    ? "close"
                    : "open"
                }
                initial={{
                  rotate: -90,
                  opacity: 0,
                }}
                animate={{
                  rotate: 0,
                  opacity: 1,
                }}
                exit={{
                  rotate: 90,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.15,
                }}
                className="flex"
              >
                {isMobileMenuOpen ? (
                  <X
                    className="h-6 w-6"
                    strokeWidth={2}
                  />
                ) : (
                  <Menu
                    className="h-6 w-6"
                    strokeWidth={2}
                  />
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
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
            className="overflow-hidden border-t border-[#E5E7EB] bg-white md:hidden"
          >
            <div className="px-4 pb-6 pt-4">

              {/* Mobile Search */}
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

              {/* Mobile Nav */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    type="button"
                    initial={{
                      opacity: 0,
                      x: -8,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: i * 0.04,
                      duration: 0.2,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="flex items-center justify-between rounded-lg px-2 py-3 text-left text-sm font-medium text-[#111827] hover:bg-[#F8F9FC]"
                  >
                    {link.label}

                    {link.hasDropdown && (
                      <ChevronDown
                        className="h-4 w-4"
                        strokeWidth={2}
                      />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* Wishlist */}
              <div className="mt-4 flex items-center gap-4 border-t border-[#E5E7EB] pt-4">
                <button
                  type="button"
                  className="flex items-center gap-2 text-sm font-medium text-[#111827]"
                >
                  <Heart
                    className="h-5 w-5"
                    strokeWidth={2}
                  />

                  Wishlist
                </button>
              </div>

              {/* Login */}
              <motion.button
                type="button"
                whileTap={{
                  scale: 0.97,
                }}
                className="mt-4 w-full rounded-lg bg-[#4F46E5] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#6366F1]"
              >
                Login
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;