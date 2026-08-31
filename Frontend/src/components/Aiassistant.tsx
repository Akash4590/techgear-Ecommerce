import { useRef, useState, useEffect, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import { Bot, Sparkles } from "lucide-react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const leftVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const chatBubbles = [
  { delay: 0.3, type: "user" as const },
  { delay: 1.1, type: "ai" as const },
  { delay: 1.9, type: "products" as const },
  { delay: 2.3, type: "cta" as const },
];

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const generateStars = (count: number): Star[] =>
  Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.6 + 0.6,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 3,
  }));

const StarField = () => {
  const stars = useMemo(() => generateStars(60), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}

      {/* Shooting stars */}
      {[0, 1].map((i) => (
        <motion.span
          key={`bright-${i}`}
          className="absolute h-[3px] w-[3px] rounded-full bg-[#818CF8]"
          style={{
            left: `${20 + i * 45}%`,
            top: `${15 + i * 30}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.6, 0.8],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  );
};

const AIAssistant = () => {
  const navigate = useNavigate();

  const robotRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = {
    stiffness: 150,
    damping: 18,
    mass: 0.5,
  };

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [14, -14]),
    springConfig
  );

  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-14, 14]),
    springConfig
  );

  const handleRobotMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = robotRef.current?.getBoundingClientRect();

    if (!rect) return;

    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleRobotLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const [visibleStep, setVisibleStep] = useState(0);

  useEffect(() => {
    const timers = chatBubbles.map((bubble, i) =>
      window.setTimeout(
        () => setVisibleStep(i + 1),
        bubble.delay * 1000
      )
    );

    return () => timers.forEach(window.clearTimeout);
  }, []);

  // Open AI Agent Chat Page
  const handleOpenAIChat = () => {
    navigate("/ai-agent");
  };

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="relative grid grid-cols-1 gap-8 overflow-hidden rounded-2xl bg-[#0B1020] p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:p-14">

        {/* Star field */}
        <StarField />

        {/* Left: Copy + AI Illustration */}
        <motion.div
          className="relative"
          variants={leftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Glow */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#4F46E5]/20 blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative z-10">

            {/* Label */}
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#6366F1]"
            >
              <motion.span
                animate={{ rotate: [0, 15, -10, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles
                  className="h-3.5 w-3.5"
                  strokeWidth={2}
                />
              </motion.span>

              Smart Shopping Assistant
            </motion.span>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="mt-3 max-w-lg text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              Not Sure What to Buy?
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-md text-sm leading-6 text-gray-300 sm:text-base"
            >
              Ask our AI assistant for personalized product
              recommendations based on your needs, preferences
              and budget.
            </motion.p>

            {/* Ask AI Button */}
            <motion.button
              variants={itemVariants}
              type="button"
              onClick={handleOpenAIChat}
              whileHover={{
                scale: 1.03,
                backgroundColor: "#6366F1",
                boxShadow:
                  "0 12px 28px -6px rgba(79,70,229,0.45)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
              className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#4F46E5] px-6 py-3 text-sm font-semibold text-white"
            >
              Ask AI assistant

              <motion.span
                animate={{ rotate: [0, 20, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.span>
            </motion.button>

            {/* AI Robot */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex items-center"
            >
              <div
                ref={robotRef}
                onMouseMove={handleRobotMove}
                onMouseLeave={handleRobotLeave}
                onClick={handleOpenAIChat}
                className="relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-full bg-[#4F46E5]/10"
                style={{ perspective: 600 }}
              >
                {/* Robot Glow */}
                <motion.div
                  className="absolute inset-3 rounded-full bg-[#6366F1]/20 blur-2xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Orbit 1 */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#6366F1]" />
                </motion.div>

                {/* Orbit 2 */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <span className="absolute bottom-2 right-1 h-1 w-1 rounded-full bg-[#818CF8]" />
                </motion.div>

                {/* AI Robot */}
                <motion.img
                  src={assets.aiassistant}
                  alt="AI Shopping Assistant"
                  className="relative z-10 h-28 w-28 object-contain drop-shadow-2xl mix-blend-multiply"
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <motion.span
                    className="h-2 w-2 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <span className="text-xs font-medium text-gray-300">
                    AI Assistant Online
                  </span>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  Ready to help you shop
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Chat Preview */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
            rotateX: 8,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            rotateX: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformPerspective: 1200 }}
          className="relative z-10 rounded-2xl bg-white p-4 shadow-2xl sm:p-6"
        >
          {/* Chat Header */}
          <div className="mb-4 flex items-center gap-3 border-b border-[#E5E7EB] pb-4">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#EEF2FF]">
              <img
                src={assets.aiassistant}
                alt="AI Assistant"
                className="h-9 w-9 object-contain mix-blend-multiply"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#111827]">
                AI Assistant
              </p>

              <div className="flex items-center gap-1.5">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-[#10B981]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <p className="text-xs text-[#10B981]">
                  Online
                </p>
              </div>
            </div>
          </div>

          {/* User Message */}
          <AnimatePresence>
            {visibleStep >= 1 && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex justify-end"
              >
                <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#4F46E5] px-4 py-2.5 text-sm leading-5 text-white">
                  I need a laptop under $1000 for work and light gaming.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Typing */}
          <AnimatePresence mode="wait">
            {visibleStep === 1 && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-3 flex items-center gap-2"
              >
                <img
                  src={assets.aiassistant}
                  alt=""
                  className="h-7 w-7 shrink-0 object-contain mix-blend-multiply"
                />

                <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-[#F8F9FC] px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-[#9CA3AF]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* AI Response */}
            {visibleStep >= 2 && (
              <motion.div
                key="ai-response"
                initial={{
                  opacity: 0,
                  y: 10,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-3 flex items-start gap-2"
              >
                <img
                  src={assets.aiassistant}
                  alt="AI Assistant"
                  className="mt-1 h-7 w-7 shrink-0 object-contain mix-blend-multiply"
                />

                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#F8F9FC] px-4 py-2.5 text-sm leading-5 text-[#111827]">
                  Great! Here are 3 laptops that match your requirements.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recommended Products */}
          <AnimatePresence>
            {visibleStep >= 3 && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
                className="mt-4 grid grid-cols-3 gap-2"
              >
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    variants={{
                      hidden: {
                        opacity: 0,
                        scale: 0.85,
                      },
                      visible: {
                        opacity: 1,
                        scale: 1,
                      },
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      y: -3,
                      scale: 1.05,
                    }}
                    className="group aspect-square cursor-pointer overflow-hidden rounded-lg bg-[#F8F9FC]"
                  >
                    <img
                      src={
                        item === 1
                          ? assets.macbook
                          : item === 2
                          ? assets.laptop
                          : assets.macbook
                      }
                      alt={`Recommended laptop ${item}`}
                      className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* View Recommendations */}
          <AnimatePresence>
            {visibleStep >= 4 && (
              <motion.button
                type="button"
                onClick={handleOpenAIChat}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  backgroundColor: "#F8F9FC",
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="mt-4 w-full cursor-pointer rounded-lg border border-[#E5E7EB] px-4 py-2.5 text-xs font-semibold text-[#4F46E5]"
              >
                View recommendations →
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default AIAssistant;