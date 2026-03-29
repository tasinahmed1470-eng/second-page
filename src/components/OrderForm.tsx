import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const sizes = ["50", "52", "54", "56"];
const colors = ["কালো", "নোড", "সি গ্রিন"];
const hijabOptions = [
  { value: "without", label: "হিজাব ছাড়া" },
  { value: "with", label: "হিজাব সহ (+৳২৫০)" },
];
const districts = [
  "ঢাকা", "চট্টগ্রাম", "রাজশাহী", "খুলনা", "বরিশাল", "সিলেট", "রংপুর", "ময়মনসিংহ",
  "গাজীপুর", "নারায়ণগঞ্জ", "কুমিল্লা", "টাঙ্গাইল", "কিশোরগঞ্জ", "মানিকগঞ্জ", "ফরিদপুর",
  "নরসিংদী", "মুন্সীগঞ্জ", "গোপালগঞ্জ", "মাদারীপুর", "শরীয়তপুর", "নেত্রকোনা", "জামালপুর",
  "শেরপুর", "ব্রাহ্মণবাড়িয়া", "চাঁদপুর", "লক্ষ্মীপুর", "নোয়াখালী", "ফেনী", "খাগড়াছড়ি",
  "রাঙ্গামাটি", "বান্দরবান", "কক্সবাজার", "পটুয়াখালী", "ভোলা", "পিরোজপুর", "ঝালকাঠি",
  "বরগুনা", "সাতক্ষীরা", "যশোর", "মাগুরা", "ঝিনাইদহ", "নড়াইল", "কুষ্টিয়া", "চুয়াডাঙ্গা",
  "মেহেরপুর", "নাটোর", "নওগাঁ", "নবাবগঞ্জ", "পাবনা", "সিরাজগঞ্জ", "বগুড়া", "জয়পুরহাট",
  "দিনাজপুর", "ঠাকুরগাঁও", "পঞ্চগড়", "নীলফামারী", "লালমনিরহাট", "কুড়িগ্রাম", "গাইবান্ধা",
  "সুনামগঞ্জ", "হবিগঞ্জ", "مৌলভীবাজার", "রাজবাড়ী", "মাদারীপুর", "শরীয়তপুর", "নরসিংদী",
];

const PRODUCT_PRICE = 999;
const HIJAB_PRICE = 250;
const DHAKA_SUB_AREAS = ["সাভার", "savar", "কেরানিগঞ্জ", "keraniganj"];

interface OrderItem {
  id: number;
  color: string;
  size: string;
  hijab: string;
  quantity: number;
}

const getDeliveryCharge = (district: string, address: string) => {
  if (!district) return 0;
  if (district === "ঢাকা") {
    const lowerAddress = address.toLowerCase();
    const isSubArea = DHAKA_SUB_AREAS.some((area) => lowerAddress.includes(area.toLowerCase()));
    return isSubArea ? 120 : 80;
  }
  return 150;
};

let nextId = 1;

const OrderForm = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<OrderItem[]>([
    { id: nextId++, color: colors[0], size: sizes[0], hijab: hijabOptions[0].value, quantity: 1 },
  ]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryCharge = getDeliveryCharge(district, address);

  const getItemPrice = (item: OrderItem) => {
    const base = PRODUCT_PRICE + (item.hijab === "with" ? HIJAB_PRICE : 0);
    return base * item.quantity;
  };

  const subtotal = items.reduce((sum, item) => sum + getItemPrice(item), 0);
  const total = subtotal + deliveryCharge;

  const updateItem = (id: number, updates: Partial<OrderItem>) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
    // Track selection events
    if (typeof window !== 'undefined' && window.fbq) {
      const key = Object.keys(updates)[0];
      if (key === 'size' || key === 'color' || key === 'hijab') {
        window.fbq('trackCustom', 'ProductOptionSelected', {
          option_type: key,
          option_value: Object.values(updates)[0],
          content_name: 'Borka',
        });
      }
    }
  };

  const addItem = () => {
    setItems((prev) => [...prev, { id: nextId++, color: colors[0], size: sizes[0], hijab: hijabOptions[0].value, quantity: 1 }]);
  };

  const removeItem = (id: number) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = async () => {
    const hasIncompleteItem = items.some((item) => !item.color || !item.size || !item.hijab);
    if (!name || !phone || !district || !address || hasIncompleteItem) {
      alert("অনুগ্রহ করে সব তথ্য পূরণ করুন!");
      return;
    }

    setIsSubmitting(true);

    // InitiateCheckout event
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        value: total,
        currency: 'BDT',
        content_name: 'Borka Order Form Submit',
        num_items: items.length,
      });
    }

    const isSingle = items.length === 1;
    const firstItem = items[0];

    let orderNotes = notes;
    if (!isSingle) {
      const itemDetails = items.map((item, i) =>
        `পণ্য ${i + 1}: কালার-${item.color}, সাইজ-${item.size}, ${item.hijab === "with" ? "হিজাব সহ" : "হিজাব ছাড়া"}, পরিমাণ-${item.quantity}`
      ).join(" | ");
      orderNotes = orderNotes ? `${itemDetails} || ${orderNotes}` : itemDetails;
    }

    const orderData = {
      name,
      phone,
      district,
      address,
      size: isSingle ? firstItem.size : "মাল্টি",
      color: isSingle ? firstItem.color : "মাল্টি",
      total_price: total,
      hijab_status: isSingle ? (firstItem.hijab === "with" ? "হিজাব সহ" : "হিজাব ছাড়া") : "মাল্টি",
      notes: orderNotes,
      order_date: new Date().toLocaleString("bn-BD"),
      status: "confirmed",
    };

    // SMS message
    const smsMessage = `প্রিয় ${name}, আপনার অর্ডার কনফার্ম হয়েছে। মোট বিল: ৳${total} (ডেলিভারি চার্জ সহ)। ক্যাশ অন ডেলিভারি। ধন্যবাদ - Nusu Borka Gallery`;

    try {
      // Google Apps Script webhook + BulkSMSBD SMS simultaneously
      const [sheetResponse] = await Promise.all([
        fetch("https://script.google.com/macros/s/AKfycbwNizNduR5ilDqQrrzE2yIiIwG91YnFSMduhaVsKVuhQefvgEOX2n6MJ3483sPeY57e/exec", {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(orderData),
        }),
        fetch(`https://bulksmsbd.net/api/smsapi?api_key=XDLYaTXAPLMZDctMss5H&type=text&number=${encodeURIComponent(phone)}&senderid=8809617000000&message=${encodeURIComponent(smsMessage)}`, {
          method: "GET",
          mode: "no-cors",
        }).catch((err) => console.warn("SMS send failed:", err)),
      ]);

      // Google Apps Script with no-cors always returns opaque response, treat as success
      // Purchase pixel event
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Purchase', {
          value: total,
          currency: 'BDT',
          content_name: 'Abaya/Borka',
        });
      }

      navigate("/order-confirmed", {
        state: {
          name,
          phone,
          district,
          address,
          size: isSingle ? firstItem.size : "মাল্টি",
          color: isSingle ? firstItem.color : "মাল্টি",
          hijab: isSingle ? (firstItem.hijab === "with" ? "হিজাব সহ" : "হিজাব ছাড়া") : "মাল্টি",
          hijabPrice: items.reduce((s, i) => s + (i.hijab === "with" ? HIJAB_PRICE * i.quantity : 0), 0),
          productPrice: items.reduce((s, i) => s + PRODUCT_PRICE * i.quantity, 0),
          deliveryCharge,
          total,
        },
      });
    } catch (error) {
      console.error("Connection Error:", error);
      alert("ইন্টারনেট কানেকশন চেক করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order-section" className="py-12 px-4 bg-card">
      <h2 className="section-title text-center text-2xl font-bold mb-4">অর্ডার কনফার্ম করুন</h2>
      <div className="gold-divider mb-8 mx-auto" style={{ width: "80px", height: "2px", backgroundColor: "#D4AF37" }} />

      <div className="max-w-lg mx-auto bg-card rounded-2xl border border-border p-5 space-y-5">
        {/* Product Item Cards */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="relative rounded-xl border border-border bg-secondary/30 p-5 space-y-5">
              {items.length > 1 && (
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">পণ্য {index + 1}</span>
                  <button onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive/80 transition-colors p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Size Selection */}
              <div>
                <p className="text-sm font-bold text-foreground mb-2">📏 লং সাইজ নির্বাচন করুন:</p>
                <div className="flex gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateItem(item.id, { size: s })}
                      className={`flex-1 py-2.5 rounded-lg border text-sm font-bold transition-all ${item.size === s ? "bg-primary text-primary-foreground border-primary" : "bg-background border-input text-foreground hover:border-primary/50"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <p className="text-sm font-bold text-foreground mb-2">🎨 কালার নির্বাচন করুন:</p>
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => updateItem(item.id, { color: c })}
                      className={`flex-1 py-2.5 rounded-lg border text-sm font-bold transition-all ${item.color === c ? "bg-primary text-primary-foreground border-primary" : "bg-background border-input text-foreground hover:border-primary/50"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hijab Selection */}
              <div>
                <p className="text-sm font-bold text-foreground mb-2">🧕 হিজাব:</p>
                <div className="grid grid-cols-2 gap-2">
                  {hijabOptions.map((h) => (
                    <button
                      key={h.value}
                      onClick={() => updateItem(item.id, { hijab: h.value })}
                      className={`py-3 rounded-lg border text-sm font-bold transition-all ${item.hijab === h.value ? "bg-primary text-primary-foreground border-primary" : "bg-background border-input text-foreground hover:border-primary/50"}`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-border" />

              {/* Item subtotal */}
              <div className="text-right text-sm text-muted-foreground">
                সাবটোটাল: <span className="font-semibold text-foreground">৳{getItemPrice(item)}</span>
              </div>
            </div>
          ))}
        </div>


        <hr className="border-border" />

        {/* Customer Info */}
        <div className="space-y-5">
          <div>
            <p className="text-sm font-bold text-foreground mb-2">আপনার নাম:</p>
            <input type="text" placeholder="সম্পূর্ণ নাম লিখুন" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground mb-2">মোবাইল নাম্বার:</p>
            <input type="tel" placeholder="০১XXXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground mb-2">📍 জেলা নির্বাচন করুন:</p>
            <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground">
              <option value="">-- জেলা সিলেক্ট করুন --</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground mb-2">সম্পূর্ণ ডেলিভারি ঠিকানা:</p>
            <textarea placeholder="গ্রাম/মহল্লা, থানা, বিস্তারিত ঠিকানা লিখুন" value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground resize-none" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground mb-2">বিশেষ নির্দেশনা (ঐচ্ছিক):</p>
            <textarea placeholder="একাধিক বোরকা নিতে চাইলে এখানে কালার ও সাইজ লিখে দিন..." value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground resize-none" />
          </div>
        </div>

        {/* Bill Summary */}
        <div className="bg-secondary rounded-xl p-4 space-y-2 text-foreground">
          {items.map((item, index) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {items.length > 1 ? `পণ্য ${index + 1}` : "আবায়া মূল্য"} 
                {item.quantity > 1 ? ` (×${item.quantity})` : ""}
                {item.hijab === "with" ? " + হিজাব" : ""}
              </span>
              <span>৳{getItemPrice(item)}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm">
            <span>ডেলিভারি চার্জ:</span>
            <span>{district ? `৳${deliveryCharge}` : "জেলা নির্বাচন করুন"}</span>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between font-bold text-lg">
            <span>মোট বিল:</span>
            <span className="text-primary">৳{total}</span>
          </div>
        </div>

        <button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-primary text-primary-foreground py-4 rounded-xl flex items-center justify-center gap-3 text-xl font-bold hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed">
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              অর্ডার প্রসেস হচ্ছে...
            </>
          ) : (
            <>
              <ShoppingBag className="w-6 h-6" /> অর্ডার কনফার্ম করুন
            </>
          )}
        </button>
      </div>
    </section>
  );
};

export default OrderForm;
