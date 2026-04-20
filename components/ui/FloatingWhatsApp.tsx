"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";

/**
 * Persistent floating WhatsApp CTA shown on mobile only.
 * Appears after the user scrolls past the hero so it doesn't crowd
 * the initial CTA buttons. Hidden on md+ where the navbar already
 * has a visible "Order Now" button.
 */
export function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("floating")}
      aria-label="Order on WhatsApp"
      className={`md:hidden fixed bottom-5 right-5 z-40 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white transition-all duration-300 ${
        show
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
      style={{
        boxShadow:
          "0 6px 20px rgba(37,211,102,0.45), 0 2px 6px rgba(0,0,0,0.3)",
      }}
    >
      <MessageCircle size={26} />
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"
      />
    </a>
  );
}
