import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Heart, Star, ShoppingCart, Check } from "lucide-react";
import type { Product } from "../data/Products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { name, price, rating, reviewCount, imageAlt, image } = product;

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle tilt tracking the cursor — springed so it never feels jittery
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), springConfig);
  const glowX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleAddToCart = () => {
    if (isAdded) return;
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#E5E7EB] transition-shadow duration-300 hover:shadow-[0_12px_32px_-8px_rgba(17,24,39,0.12)]" >
      
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(320px circle at ${gx} ${gy}, rgba(79,70,229,0.06), transparent 70%)`
          ),
        }}
      />

      <motion.button
        type="button"
        aria-label={`Add ${name} to wishlist`}
        aria-pressed={isWishlisted}
        onClick={() => setIsWishlisted((v) => !v)}
        whileTap={{ scale: 0.85 }}
        className="absolute right-6 top-6 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-sm">
        <motion.div
          animate={isWishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} >
          <Heart
            className="h-4 w-4 transition-colors duration-200"
            strokeWidth={2}
            style={{
              fill: isWishlisted ? "#EF4444" : "transparent",
              color: isWishlisted ? "#EF4444" : "#111827",
            }} />
        </motion.div>
      </motion.button>

      {/* Product Image */}
      <div className="relative z-[1] flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-[#F8F9FC]">
        <motion.img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-contain p-4"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="relative z-[1] mt-4">
        <h3 className="text-sm font-semibold text-[#111827]">{name}</h3>

        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={false}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Star
                  className={`h-3.5 w-3.5 ${
                    i < Math.round(rating)
                      ? "fill-[#F59E0B] text-[#F59E0B]"
                      : "fill-[#E5E7EB] text-[#E5E7EB]"
                  }`}
                />
              </motion.div>
            ))}
          </div>
          <span className="text-xs text-[#6B7280]">({reviewCount})</span>
        </div>

        <p className="mt-2 text-base font-bold text-[#111827]">
          ${price.toLocaleString()}
        </p>

        <motion.button
          type="button"
          onClick={handleAddToCart}
          disabled={isAdded}
          whileHover={{ scale: isAdded ? 1 : 1.015 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="relative mt-3 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
          style={{ backgroundColor: isAdded ? "#10B981" : "#4F46E5" }}>
          <AnimatePresence mode="wait" initial={false}>
            {isAdded ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2"
              >
                <Check className="h-4 w-4" strokeWidth={2} />
                Added
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" strokeWidth={2} />
                Add to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;