import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustStrip from "../components/Truststrip";
import LifestyleSection from "../components/Lifestylesection";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/Featuredproducts";
import WhyTechGear from "../components/Whytechgear";
import Testimonials from "../components/Testimonials";
import AIAssistant from "../components/Aiassistant";
import Newsletter from "../components/Newsletter";
import FinalCTA from "../components/Finalcta";
import TrustFeatures from "../components/Trustfeatures";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <Navbar />
      <Hero />
      <TrustStrip />
      <LifestyleSection />
      <Categories />
      <FeaturedProducts />
      <WhyTechGear />
      <Testimonials />
      <AIAssistant />
      <Newsletter />
      <FinalCTA />
      <TrustFeatures />
      <Footer />
    </div>
  );
};

export default Home;