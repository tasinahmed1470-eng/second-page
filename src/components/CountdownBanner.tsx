import { useState, useEffect } from "react";
import { Clock, Flame, ShoppingBag } from "lucide-react";

const CountdownBanner = () => {
  const [time, setTime] = useState({ h: 1, m: 59, s: 30 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 0; m = 0; s = 0; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-4 px-4" style={{ background: "hsl(var(--urgency-bg))" }}>
      <div className="max-w-lg mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-urgency-text" />
          <span className="font-bold text-sm text-foreground">অফার শেষ হবে:</span>
          <div className="flex gap-1">
            {[pad(time.h), pad(time.m), pad(time.s)].map((v, i) => (
              <span key={i} className="flex items-center">
                <span className="px-2 py-1 rounded font-bold text-sm" style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>{v}</span>
                {i < 2 && <span className="mx-0.5 font-bold text-foreground">:</span>}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span className="flex items-center gap-1 text-sm font-medium text-urgency-text">
            <Flame className="w-4 h-4" /> মাত্র ১২ পিস বাকি আছে!
          </span>
          <button
            onClick={scrollToOrder}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all"
            style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}
          >
            <ShoppingBag className="w-4 h-4" /> এখনই অর্ডার করুন
          </button>
        </div>
      </div>
    </section>
  );
};

export default CountdownBanner;
