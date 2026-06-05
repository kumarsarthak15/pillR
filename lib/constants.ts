export const SITE_CONFIG = {
  name: "MediGrab",
  domain: "medigrab.in",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://medigrab.in",
  tagline: "Your pharmacy, just a text away.",
  description:
    "Get medicines delivered in 30 minutes via WhatsApp. From CDSCO-licensed pharmacies in Pune.",
  city: "Pune",

  legalEntity: "Medigrab India Private Limited",
  address: "73/2/2 Ramradha Bangala, Radhakrushna Society, Katraj, Pune - 411046, Maharashtra",
  phone: "+91-8788876943",
  email: "contact@medigrab.in",

  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "91XXXXXXXXXX",
  whatsappOrderMessage:
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ?? "Hi MediGrab, I need medicines",
  whatsappPartnerMessage: "Hi MediGrab! I'd like to partner my pharmacy with you."
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/for-shops", label: "For Shops" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;

export const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund", label: "Refund Policy" }
] as const;

export const SOCIAL_LINKS = [
  { href: "https://instagram.com/medigrab.in", label: "Instagram", icon: "instagram" },
  { href: "https://twitter.com/medigrab_in", label: "Twitter / X", icon: "twitter" },
  { href: "https://www.linkedin.com/company/medigrab-in/", label: "LinkedIn", icon: "linkedin" }
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
  "MediGrab is a medicine delivery facilitation service. We do not provide medical advice, diagnosis, or treatment. All medicines are dispensed by licensed pharmacy partners.";

export function whatsappUrl(message: string = SITE_CONFIG.whatsappOrderMessage): string {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
