import { CheckCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

interface OrderData {
  name: string;
  phone: string;
  district: string;
  address: string;
  size: string;
  color: string;
  hijab: string;
  hijabPrice: number;
  productPrice: number;
  deliveryCharge: number;
  total: number;
}

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state as OrderData | null;

  // Purchase event is already fired in OrderForm.tsx after successful SheetDB response

  return (
    <div className="min-h-screen max-w-[640px] mx-auto bg-card shadow-xl flex items-center justify-center px-4 py-8">
      <div className="w-full space-y-6 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            আপনার অর্ডার টি কনফার্ম করা হয়েছে
          </h1>
          <p className="text-muted-foreground text-sm">
            আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।
          </p>
        </div>

        {order && (
          <div className="bg-secondary rounded-xl p-5 space-y-3 text-foreground">
            <h2 className="font-bold text-lg border-b border-border pb-2 mb-3">অর্ডার সামারি</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">নাম:</span>
                <span className="font-medium">{order.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">মোবাইল:</span>
                <span className="font-medium">{order.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">জেলা:</span>
                <span className="font-medium">{order.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ঠিকানা:</span>
                <span className="font-medium text-right max-w-[60%]">{order.address}</span>
              </div>

              <hr className="border-border my-2" />

              <div className="flex justify-between">
                <span className="text-muted-foreground">সাইজ:</span>
                <span className="font-medium">{order.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">কালার:</span>
                <span className="font-medium">{order.color}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">হিজাব:</span>
                <span className="font-medium">{order.hijab}</span>
              </div>

              <hr className="border-border my-2" />

              <div className="flex justify-between">
                <span className="text-muted-foreground">আবায়া মূল্য:</span>
                <span>৳{order.productPrice}</span>
              </div>
              {order.hijabPrice > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">হিজাব:</span>
                  <span>৳{order.hijabPrice}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">ডেলিভারি চার্জ:</span>
                <span>৳{order.deliveryCharge}</span>
              </div>
              <hr className="border-border my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>মোট বিল:</span>
                <span className="text-primary">৳{order.total}</span>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => window.location.href = "/"}
            className="gold-btn px-8 py-3 text-lg"
          >
            হোম পেজে ফিরে যান
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
