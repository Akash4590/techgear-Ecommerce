import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type Variants} from "framer-motion";
import { ArrowRight, BadgeDollarSign, Headphones, ShieldCheck, Star, TrendingUp, Truck} from "lucide-react";
import { assets } from "../assets/assets";
const container: Variants = {
  hidden: {},
  show: {
    transition: {staggerChildren: 0.09,delayChildren: 0.05},
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
const ORBIT_DURATION = 26;
const orbitBadges = [
  { icon: Truck, label: "Free Shipping", accent: "text-emerald-400 bg-emerald-400/15" },
  { icon: ShieldCheck, label: "2-Year Warranty", accent: "text-indigo-400 bg-indigo-400/15" },
  { icon: Headphones, label: "Live Agent Support", accent: "text-sky-400 bg-sky-400/15" },
  { icon: Star, label: "4.9/5 · 2.3K Reviews", accent: "text-amber-400 bg-amber-400/15" },
  { icon: BadgeDollarSign, label: "Reasonable Pricing", accent: "text-fuchsia-400 bg-fuchsia-400/15" },
  { icon: TrendingUp, label: "Trending Product", accent: "text-rose-400 bg-rose-400/15" },
];
const OrbitingBadges = () => {
  return (
    <div className="pointer-events-none absolute inset-0 hidden sm:block">
      {orbitBadges.map(({ icon: Icon, label, accent }, index) => (
        <motion.div key={label}
         className="pointer-events-auto absolute flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-[#13131f]/95 py-2 pl-2 pr-4 text-xs font-semibold text-white shadow-lg shadow-black/30 backdrop-blur"
          style={{ translateX: "-50%", translateY: "-50%" }}
          initial={{ opacity: 0 }}
          whileHover={{ scale: 1.08 }}
          animate={{opacity: 1,left: ["50%", "104%", "50%", "-4%", "50%"],
            top: ["-6%", "50%", "106%", "50%", "-6%"],
          }}
          transition={{
            opacity: { delay: 0.6 + index * 0.08, duration: 0.4 },
            scale: { type: "spring", stiffness: 300, damping: 15 },
            left: {
              duration: ORBIT_DURATION,
              repeat: Infinity,
              ease: "linear",
              delay: (index * ORBIT_DURATION) / orbitBadges.length,
            },
            top: {
              duration: ORBIT_DURATION,
              repeat: Infinity,
              ease: "linear",
              delay: (index * ORBIT_DURATION) / orbitBadges.length,
            },
          }}
        >
          <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${accent}`}>
            <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          {label}
        </motion.div>
      ))}
    </div>
  );
};

const Hero = () => {
  const avatars = [assets.avatar1, assets.avatar2, assets.avatar3];
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imageWrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {mouseX.set(0);mouseY.set(0)};
  return (
    <section className="relative overflow-hidden bg-[#0b0b14] px-6 pt-12 pb-12 lg:px-14 lg:pt-16 lg:pb-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-[120px]" />
        <div className="absolute -bottom-32 right-0 h-[380px] w-[380px] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center text-center lg:text-left">
            <motion.p
              variants={item}
              className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest text-white/50 lg:justify-start">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              THE FUTURE OF EVERYDAY TECH
            </motion.p>
            <motion.h1
              variants={item}
              className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[64px] cursor-pointer">Technology <br />
              that <span className="text-indigo-400">fits</span> your life.
            </motion.h1>

            <motion.p variants={item}
            className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/50 lg:mx-0">
              Discover premium electronics, smart gadgets and innovative
              technology designed to make your everyday life better.
            </motion.p>
            <motion.div variants={item}
           className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="group flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-600 cursor-pointer">
                Explore Products
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white cursor-pointer">
                View Deals
              </motion.button>
            </motion.div>
            <motion.div
              variants={item}
              className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {avatars.map((avatar, index) => (
                    <motion.img
                      key={index}
                      src={avatar}
                      alt={`Happy customer ${index + 1}`}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -3, zIndex: 10 }}
                      transition={{
                        delay: 0.4 + index * 0.08,
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300,
                      }}
                      className="h-8 w-8 rounded-full border-2 border-[#0b0b14] object-cover"
                    />
                  ))}
                </div>

                <span className="text-sm font-medium text-white">
                  10,000+{" "}
                  <span className="text-white/50">Happy Customers</span>
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.55 + i * 0.06, type: "spring", stiffness: 350 }}
                      className="flex"
                    >
                      <Star className="h-4 w-4 fill-amber-400" />
                    </motion.span>
                  ))}
                </div>

                <span className="text-sm text-white/50">4.9/5 (2.3K Reviews)</span>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            ref={imageWrapRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ perspective: 800 }}
            className="relative min-h-[320px] lg:min-h-0 lg:mx-8 cursor-pointer"
          >
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-indigo-600/25 blur-[110px]" />
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-violet-500/15 blur-[90px]" />
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                maskImage:
                  "radial-gradient(ellipse 90% 90% at center, black 55%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 90% 90% at center, black 55%, transparent 100%)",
              }}
              className="relative h-full w-full"
            >
              <img
                src={assets.hero}
                alt="Premium technology products"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-indigo-950/50 via-indigo-500/10 to-transparent mix-blend-overlay" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b14] via-transparent to-[#0b0b14]/40" />
            </motion.div>
            <OrbitingBadges />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;