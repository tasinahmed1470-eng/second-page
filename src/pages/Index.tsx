import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";
import CountdownBanner from "@/components/CountdownBanner";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import OrderForm from "@/components/OrderForm";
import FAQSection from "@/components/FAQSection";
import FloatingButtons from "@/components/FloatingButtons";

const Index = () => (
  <div className="min-h-screen max-w-[640px] mx-auto bg-card shadow-xl">
    <HeroSection />
    <ProductSection />
    <CountdownBanner />
    <FeaturesSection />
    <TestimonialsSection />
    <OrderForm />
    <FAQSection />
    <FloatingButtons />
  </div>
);

export default Index;
