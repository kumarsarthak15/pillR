export const SITE_CONFIG = {
  name: "PillR.in",
  domain: "pillr.in",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pillr.in",
  tagline: "Fast Medicine Delivery",
  description:
    "Get medicines delivered in 30 minutes via WhatsApp. From CDSCO-licensed pharmacies in Pune.",
  city: "Pune",

  // PLACEHOLDERS — replace before launch (also flow through env at runtime where applicable)
  legalEntity: "[Legal Entity Name Pvt. Ltd.]",
  address: "[Registered Business Address, Pune, Maharashtra, India — PIN]",
  phone: "+91 XXXXX XXXXX",
  email: "hello@pillr.in",

  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "91XXXXXXXXXX",
  whatsappOrderMessage:
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ?? "Hi PillR, I need medicines",
  whatsappPartnerMessage: "Hi PillR! I'd like to partner my pharmacy with you."
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/for-shops", label: "For Shops" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;

export const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund", label: "Refund Policy" }
] as const;

export const SOCIAL_LINKS = [
  { href: "https://instagram.com/pillr.in", label: "Instagram", icon: "instagram" },
  { href: "https://twitter.com/pillrin", label: "Twitter / X", icon: "twitter" },
  { href: "https://www.linkedin.com/company/pillr-in", label: "LinkedIn", icon: "linkedin" }
] as const;

export const COVERAGE_AREAS = [
  "Koregaon Park",
  "Viman Nagar",
  "Aundh",
  "Baner",
  "Kothrud",
  "Hinjewadi"
] as const;

export const CDSCO_DISCLAIMER =
  "PillR.in is a medicine delivery facilitation service. We do not provide medical advice, diagnosis, or treatment. All medicines are dispensed by licensed pharmacy partners.";

export function whatsappUrl(message: string = SITE_CONFIG.whatsappOrderMessage): string {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
