import { BriefcaseBusiness, Headphones, Camera } from "lucide-react";
import LifestyleCard from "./Lifestylecard";
import { assets } from "../assets/assets";

const lifestyleData = [
  {
    icon: BriefcaseBusiness,
    iconBg: "#4F46E5",
    title: "Work Smarter",
    description: "Powerful tools and devices to boost your productivity.",
    image: assets.workSmarter,
    imageAlt: "Modern laptop workspace",
  },
  {
    icon: Headphones,
    iconBg: "#10B981",
    title: "Stay Connected",
    description: "Stay connected with reliable devices for your daily life.",
    image: assets.stayConnected,
    imageAlt: "Person using headphones in the city",
  },
  {
    icon: Camera,
    iconBg: "#10B981",
    title: "Travel Better",
    description: "Compact, lightweight tech for your next adventure.",
    image: assets.travelBetter,
    imageAlt: "Camera overlooking a mountain lake",
  },
];

const LifestyleSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">

        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#4F46E5]">
            Built for the way you live
          </span>

          <h2 className="mt-2 text-3xl font-bold text-[#111827]">
            Technology for Every Lifestyle
          </h2>

          <p className="mt-3 text-sm text-[#6B7280] sm:text-base">
            Whether you're working, staying connected or exploring the world,
            we have the right tech for you.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {lifestyleData.map((item) => (
            <LifestyleCard
              key={item.title}
              icon={item.icon}
              iconBg={item.iconBg}
              title={item.title}
              description={item.description}
              image={item.image}
              imageAlt={item.imageAlt}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default LifestyleSection;