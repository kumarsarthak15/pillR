"use client";

import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";

type Props = {
  label?: string;
  message?: string;
  fullWidthMobile?: boolean;
  source?: string;
  className?: string;
  variant?: "whatsapp" | "on-red";
};

export function WhatsAppButton({
  label = "Order on WhatsApp",
  message,
  fullWidthMobile = true,
  source = "unknown",
  className = "",
  variant = "whatsapp"
}: Props) {
  const variantCls = variant === "on-red" ? "btn-on-red" : "btn-whatsapp";
  const fullCls = fullWidthMobile ? "btn-full-mobile" : "";
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(source)}
      className={`btn-base ${variantCls} ${fullCls} ${className}`}
      aria-label="Order medicines on WhatsApp"
    >
      <MessageCircle size={18} />
      {label}
    </a>
  );
}
