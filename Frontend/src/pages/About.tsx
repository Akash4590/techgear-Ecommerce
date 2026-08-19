import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ShoppingBag,
  Rocket,
  Users,
  Package,
  ShieldCheck,
  Check,
  Gem,
  Lightbulb,
  Globe,
  Link2,
  AtSign,
  Mail,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";

const stats = [
  {
    icon: Rocket,
    value: "5+",
    title: "Years of Excellence",
    description: "Delivering quality tech products worldwide.",
  },
  {
    icon: Users,
    value: "100K+",
    title: "Happy Customers",
    description: "Trusted by customers across the globe.",
  },
  {
    icon: Package,
    value: "10K+",
    title: "Products",
    description: "Wide range of authentic tech products.",
  },
  {
    icon: ShieldCheck,
    value: "30-Day",
    title: "Easy Returns",
    description: "Hassle-free returns and refunds policy.",
  },
];

const missionPoints = [
  "Curated selection of the latest tech",
  "Competitive prices you can trust",
  "Authentic products with brand warranty",
  "Exceptional customer support",
];

const values = [
  {
    icon: Gem,
    title: "Quality First",
    description: "We never compromise on quality. Only the best products make the cut.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    description: "Honest information, clear policies, and transparent pricing.",
  },
  {
    icon: Users,
    title: "Customer Centric",
    description: "Our customers are at the heart of everything we do.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace innovation and bring you the latest technology.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "We aim to make technology accessible and beneficial for everyone.",
  },
];

const team = [
  { name: "Aarav Mehta", role: "Founder & CEO", image: "avatar1" },
  { name: "Priya Sharma", role: "Head of Operations", image: "avatar2" },
  { name: "Rohan Verma", role: "CTO", image: "avatar4" },
  { name: "Ananya Iyer", role: "Customer Experience Lead", image: "avatar3" },
];

// Reusable scroll-reveal animation settings
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#4F46E5] transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-[#0B0B14] font-medium">About Us</span>
        </nav>

        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:items-stretch mb-16"
        >
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl lg:text-[42px] font-bold text-[#0B0B14] mb-4 leading-tight">
              About Us
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-5">
              Discover the story behind TechGear and our mission to bring you the best in
              technology.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-7">
              TechGear was founded with a simple idea: technology should enhance lives. We curate
              the latest and greatest tech products to help you stay connected, productive, and
              inspired.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-fit">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-[#4F46E5] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#4338CA] transition-colors"
              >
                <ShoppingBag size={16} />
                Shop Our Products
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ scale: 1.015 }}
            style={{ perspective: 1000 }}
            className="min-h-[280px] lg:min-h-0 rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={assets.abouthero}
              alt="About TechGear"
              className="h-full w-full object-cover rounded-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-200 rounded-2xl p-8 mb-16 shadow-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-4"
                >
                  <motion.div
                    whileHover={{ rotate: 6, scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#4F46E5]/10 text-[#4F46E5]"
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </motion.div>
                  <div>
                    <p className="text-xl font-bold text-[#0B0B14]">{stat.value}</p>
                    <p className="text-sm font-semibold text-[#0B0B14] mb-1">{stat.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{stat.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="bg-[#F8F9FC] rounded-2xl p-8 lg:p-10 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:items-stretch">
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#4F46E5] mb-3">
                Our Mission
              </p>
              <h2 className="text-2xl lg:text-[28px] font-bold text-[#0B0B14] mb-4 leading-tight">
                Empowering people through technology
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                We believe technology has the power to transform the way we live, work, and
                connect. Our mission is to make premium technology accessible to everyone, with a
                focus on quality, affordability, and exceptional service.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {missionPoints.map((point, i) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#4F46E5]">
                      <Check size={12} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-[#0B0B14]">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.015 }}
              className="min-h-[280px] lg:min-h-0 rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={assets.aboutmission}
                alt="Our Mission"
                className="h-full w-full object-cover rounded-2xl"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Values Section */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-wide text-[#4F46E5] mb-3"
          >
            Our Values
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-2xl lg:text-[28px] font-bold text-[#0B0B14] mb-10"
          >
            The principles that drive us
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col items-center text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4F46E5]/10 text-[#4F46E5] mb-4"
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </motion.div>
                  <h3 className="text-sm font-semibold text-[#0B0B14] mb-1.5">{value.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-200 rounded-2xl p-8 mb-16 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,280px)_1fr] gap-8 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#4F46E5] mb-3">
                Meet the Team
              </p>
              <h2 className="text-2xl font-bold text-[#0B0B14] mb-3 leading-tight">
                The people behind TechGear
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                A passionate team of tech enthusiasts working together to bring you the best
                experience.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 border border-gray-200 text-[#0B0B14] px-5 py-2.5 rounded-lg text-sm font-medium hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors"
              >
                Join Our Team
                <ArrowRight size={15} />
              </motion.button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="h-[100px] w-[100px] mx-auto rounded-xl overflow-hidden mb-3 bg-gray-100 shadow-sm"
                  >
                    <img
                      src={(assets as any)[member.image]}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                  <h3 className="text-sm font-semibold text-[#0B0B14]">{member.name}</h3>
                  <p className="text-xs text-gray-500 mb-2.5">{member.role}</p>

                  {/* Social icons — ab proper clickable circular buttons hain */}
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      aria-label={`${member.name} LinkedIn`}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all hover:bg-[#4F46E5] hover:text-white"
                    >
                      <Link2 size={13} />
                    </button>
                    <button
                      type="button"
                      aria-label={`${member.name} Twitter`}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all hover:bg-[#4F46E5] hover:text-white"
                    >
                      <AtSign size={13} />
                    </button>
                    <button
                      type="button"
                      aria-label={`${member.name} Email`}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all hover:bg-[#4F46E5] hover:text-white"
                    >
                      <Mail size={13} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;