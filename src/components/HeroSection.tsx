import { ShieldCheck, Truck, Palette, ShoppingCart } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'AddToCart', { content_name: 'Abaya Order Button - Hero' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Abaya Collection" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsla(0,0%,0%,0.5), hsla(0,0%,0%,0.7))" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-16 max-w-lg mx-auto">
        <p className="tracking-[0.3em] text-sm mb-4" style={{ color: "hsla(40,50%,80%,0.8)" }}>
          ─── NUSU BORKA GALLERY ───
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4" style={{ color: "hsl(0,0%,100%)" }}>
          এক্সক্লুসিভ আবায়া ও বোরকা কালেকশন
        </h1>
        <p className="text-lg font-semibold mb-2" style={{ color: "hsl(37,55%,65%)" }}>
          প্রিমিয়াম কোয়ালিটি, আভিজাত্য ও শালীনতার নিখুঁত মেলবন্ধন!
        </p>
        <p className="text-sm mb-10" style={{ color: "hsla(0,0%,100%,0.7)" }}>
          প্রিমিয়াম দুবাই চেরি ফেব্রিক এবং নিখুঁত এমব্রয়ডারি ডিজাইনের নতুন কালেকশন।
        </p>

        {/* Feature badges */}
        <div className="space-y-3 mb-10">
          {[
            { icon: ShieldCheck, text: "১০০% অরিজিনাল ফেব্রিক" },
            { icon: Truck, text: "সারা বাংলাদেশে হোম ডেলিভারি" },
            { icon: Palette, text: "কালার গ্যারান্টি" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="glass-card mx-auto max-w-xs flex items-center gap-3 px-5 py-3" style={{ background: "hsla(0,0%,100%,0.12)", backdropFilter: "blur(10px)", borderColor: "hsla(0,0%,100%,0.2)" }}>
              <Icon className="w-5 h-5 flex-shrink-0" style={{ color: "hsl(37,55%,65%)" }} />
              <span className="font-medium" style={{ color: "hsla(0,0%,100%,0.9)" }}>{text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button onClick={scrollToOrder} className="gold-btn flex items-center gap-3 mx-auto animate-pulse-gold">
          <ShoppingCart className="w-6 h-6" />
          <div className="text-left">
            <div className="text-lg font-bold">অর্ডার করুন</div>
            <div className="text-xs opacity-80">ক্যাশ অন ডেলিভারি</div>
          </div>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
