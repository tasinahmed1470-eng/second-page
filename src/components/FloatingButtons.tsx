import { useState, useEffect } from "react";
import { ChevronUp, MessageCircle } from "lucide-react";

const FloatingButtons = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3">
      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all"
          style={{ background: "hsl(var(--gold))", color: "hsl(var(--primary-foreground))" }}
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
      <a
        href="https://wa.me/message/F6MYCUVVQN7TN1"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        style={{ background: "#25D366" }}
      >
        <MessageCircle className="w-7 h-7" style={{ color: "#fff" }} />
      </a>
    </div>
  );
};

export default FloatingButtons;
