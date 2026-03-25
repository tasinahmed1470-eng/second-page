import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "ডেলিভারি কতদিনে পাবো?", a: "ঢাকার মধ্যে ১-২ দিন এবং ঢাকার বাইরে ৩-৫ দিনের মধ্যে ডেলিভারি পাবেন।" },
  { q: "ক্যাশ অন ডেলিভারি আছে?", a: "জি, সম্পূর্ণ ক্যাশ অন ডেলিভারি। পণ্য হাতে পেয়ে পেমেন্ট করবেন।" },
  { q: "রিটার্ন পলিসি কী?", a: "ডেলিভারি ম্যান এর সামনে চেক করে নিতে পারবেন। প্রোডাক্ট পছন্দ না হলে ডেলিভারি চার্জ দিয়ে রিটার্ন করতে পারবেন।" },
  { q: "সাইজ কিভাবে নির্বাচন করবো?", a: "আপনার উচ্চতা অনুযায়ী সাইজ নির্বাচন করুন। ৫০-৫৬ সাইজ পর্যন্ত পাওয়া যায়।" },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-12 px-4" style={{ background: "hsl(var(--cream))" }}>
      <h2 className="section-title">সচরাচর জিজ্ঞাসা</h2>
      <div className="gold-divider mb-8" />

      <div className="max-w-lg mx-auto space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <span className="font-bold text-foreground text-sm">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && (
              <div className="px-4 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
