import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import review1 from "@/assets/review-1.png";
import review2 from "@/assets/review-2.png";
import review3 from "@/assets/review-3.png";
import review4 from "@/assets/review-4.png";

const reviewImages = [review1, review2, review3, review4];

const AUTOPLAY_INTERVAL = 3000;

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c === reviewImages.length - 1 ? 0 : c + 1)), []);
  const prev = useCallback(() => setCurrent((c) => (c === 0 ? reviewImages.length - 1 : c - 1)), []);

  useEffect(() => {
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    reviewImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <section className="py-12 px-4" style={{ background: "hsl(var(--cream))" }}>
      <h2 className="section-title">আমাদের সম্মানিত ক্রেতাদের মতামত</h2>
      <div className="gold-divider mb-6" />

      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-6 h-6 fill-current text-primary" />
          ))}
        </div>
        <span className="text-muted-foreground text-sm">৫০+ সন্তুষ্ট ক্রেতা</span>
      </div>

      <div className="max-w-sm mx-auto mb-8">
        <div className="relative overflow-hidden rounded-xl border border-border aspect-[3/4]">
          {reviewImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`রিভিউ ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${i === current ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 border border-border flex items-center justify-center z-10"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 border border-border flex items-center justify-center z-10"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
        <div className="flex justify-center gap-1.5 mt-3">
          {reviewImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-4" : "bg-muted-foreground/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
