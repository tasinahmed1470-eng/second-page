import { useState } from "react";
import { Check } from "lucide-react";
import productBlack from "@/assets/fc-black.jpeg";
import productNode from "@/assets/fc-node.jpeg";
import productSeaGreen from "@/assets/fc-torre.jpeg";

const products = [
  { id: "black", name: "কালো কালার", image: productBlack },
  { id: "node", name: "নোড কালার", image: productNode },
  { id: "seagreen", name: "সি গ্রিন কালার", image: productSeaGreen },
];

const ProductSection = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section className="py-12 px-4 bg-card">
      <h2 className="section-title">আমাদের কালেকশন</h2>
      <div className="gold-divider mb-8" />

      <div className="max-w-lg mx-auto">
        {/* Main image */}
        <div className="relative rounded-2xl overflow-hidden border border-border mb-4">
          <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-sm font-bold" style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>
            ২৬% ছাড়!
          </span>
          <img
            src={products[selected].image}
            alt={products[selected].name}
            className="w-full aspect-[3/4] object-contain bg-background transition-all duration-500"
          />
        </div>

        {/* Product info */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-foreground">{products[selected].name}</h3>
          <div className="flex items-center justify-center gap-3 mt-1">
            <span className="line-through text-muted-foreground">৳১,৩৫০</span>
            <span className="text-2xl font-bold text-primary">৳৯৯৯</span>
          </div>
          <div className="flex items-center justify-center gap-1 mt-1 text-success font-medium text-sm">
            <Check className="w-4 h-4" /> স্টকে আছে
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 justify-center">
          {products.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                setSelected(i);
                if (typeof window !== 'undefined' && (window as any).fbq) {
                  (window as any).fbq('track', 'ViewContent', {
                    content_name: p.name,
                    content_category: 'Abaya Color',
                    currency: 'BDT',
                    value: 999,
                  });
                }
              }}
              className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${i === selected ? "border-primary ring-2 ring-primary/30" : "border-border"}`}
            >
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
