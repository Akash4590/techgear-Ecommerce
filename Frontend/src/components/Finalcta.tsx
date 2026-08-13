import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { assets } from "../assets/assets";

const contentVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const FinalCTA = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const springBtnX = useSpring(btnX, { stiffness: 200, damping: 15 });
  const springBtnY = useSpring(btnY, { stiffness: 200, damping: 15 });

  // Magnetic pull — button drifts slightly toward the cursor within its own bounds
  const handleBtnMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    btnX.set(relX * 0.35);
    btnY.set(relY * 0.35);
  };

  const handleBtnLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[380px] overflow-hidden rounded-2xl bg-[#4F46E5] p-8 sm:p-12 lg:min-h-[420px] lg:p-16"
      >

        {/* Background Glow — breathing */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-white/5 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Content */}
        <motion.div
          className="relative z-20 flex h-full max-w-xl flex-col justify-center"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >

          <motion.span
            variants={itemVariants}
            className="inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90"
          >
            Ready to upgrade?
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            Upgrade your everyday tech
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-md text-sm leading-6 text-white/80 sm:text-base"
          >
            Discover thousands of premium electronics and make your everyday
            life smarter.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-7 flex flex-wrap items-center gap-4">
            <motion.button
              ref={btnRef}
              type="button"
              onMouseMove={handleBtnMove}
              onMouseLeave={handleBtnLeave}
              style={{ x: springBtnX, y: springBtnY }}
              whileHover={{ scale: 1.04, boxShadow: "0 16px 32px -8px rgba(0,0,0,0.25)" }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#4F46E5]"
            >
              Explore store
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </motion.button>

            <div className="flex items-center gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
                Secure checkout
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5" strokeWidth={2} />
                Fast delivery
              </span>
            </div>
          </motion.div>

        </motion.div>

        {/* CTA Image — gentle parallax float */}
        <div className="absolute bottom-0 right-0 z-10 hidden h-full w-[50%] lg:block">

          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#4F46E5] via-[#4F46E5]/30 to-transparent" />

          <motion.img
            src={assets.finalcta}
            alt="Premium technology setup"
            className="h-full w-full object-cover object-center opacity-90"
            initial={{ scale: 1.08, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.9 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />

        </div>

      </motion.div>
    </section>
  );
};

export default FinalCTA;