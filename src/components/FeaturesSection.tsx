import { Diamond, RotateCcw, Ruler } from "lucide-react";

const features = [
  {
    icon: Diamond,
    title: "প্রিমিয়াম ফেব্রিক",
    desc: "উন্নত মানের প্রিমিয়াম দুবাই চেরি ফেব্রিক — আরামদায়ক ও টেকসই।",
  },
  {
    icon: RotateCcw,
    title: "সহজেই রিটার্ন করার সুবিধা",
    desc: "প্রোডাক্ট এ কোন প্রকার সমস্যা পেলে ডেলিভারি ম্যান এর কাছে সাথে সাথে ফেরত দিবেন। ১ টাকাও দিতে হবে না।",
  },
  {
    icon: Ruler,
    title: "সব সাইজ অ্যাভেইলেবল",
    desc: "লং সাইজ: ৫০, ৫২, ৫৪, ৫৬\nহিজাব সাইজ: ৯০/৩০ ফুল কভারেজ",
  },
];

const FeaturesSection = () => (
  <section className="py-12 px-4 bg-background">
    <h2 className="section-title">কেন আমাদের আবায়া বেছে নেবেন?</h2>
    <div className="gold-divider mb-10" />

    <div className="max-w-lg mx-auto space-y-4">
      {features.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="bg-card rounded-xl p-5 border border-border">
          <div className="flex items-start gap-4">
            <div className="feature-icon flex-shrink-0">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesSection;
