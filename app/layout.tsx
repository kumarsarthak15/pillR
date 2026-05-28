import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import "./globals.css";

const syne = Syne({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne"
});

const dmSans = DM_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans"
});

const dmMono = DM_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — Medicines in 30 Minutes | Pune`,
    template: `%s | ${SITE_CONFIG.name}`
  },
  description:
    "Order medicines via WhatsApp and get them delivered in 30 minutes from CDSCO-licensed pharmacies in Pune. No app needed.",
  applicationName: SITE_CONFIG.name,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  category: "Health",
  keywords: [
    "medicine delivery Pune",
    "WhatsApp medicine order",
    "30 minute medicine delivery",
    "online pharmacy Pune",
    "CDSCO licensed pharmacy",
    "MediGrab",
    "pharmacy delivery Pune",
    "medicine home delivery",
    "quick medicine delivery India",
    "Pune pharmacy online",
    "order medicine online Pune",
    "medicine delivery near me",
    "fast pharmacy delivery",
    "medicine delivery app Pune",
    "WhatsApp pharmacy order India"
  ],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" }
    ],
    apple: "/icon.png"
  },
  openGraph: {
    type: "website",
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — Medicines in 30 Minutes via WhatsApp`,
    description:
      "Get medicines delivered in 30 minutes from CDSCO-licensed pharmacies in Pune. Just WhatsApp your prescription — no app, no queue.",
    url: SITE_CONFIG.url,
    locale: "en_IN",
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "MediGrab — Medicines in 30 Minutes via WhatsApp in Pune"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@medigrab_in",
    creator: "@medigrab_in",
    title: `${SITE_CONFIG.name} — Medicines in 30 Minutes`,
    description:
      "Order medicines via WhatsApp. Delivered from CDSCO-licensed pharmacies in 30 minutes. Pune, India.",
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.png`,
        alt: "MediGrab — Fast Medicine Delivery in Pune"
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  alternates: {
    canonical: SITE_CONFIG.url
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_META_VERIFICATION
      ? { "facebook-domain-verification": process.env.NEXT_PUBLIC_META_VERIFICATION }
      : undefined
  }
};

export const viewport: Viewport = {
  themeColor: "#0D1F33",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_CONFIG.url}/#organization`,
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_CONFIG.url}/logo.png`,
    width: 1935,
    height: 459
  },
  image: `${SITE_CONFIG.url}/og-image.png`,
  description: SITE_CONFIG.description,
  foundingDate: "2024",
  foundingLocation: { "@type": "Place", name: "Pune, Maharashtra, India" },
  sameAs: SOCIAL_LINKS.map((s) => s.href),
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.address,
    addressLocality: SITE_CONFIG.city,
    addressRegion: "MH",
    postalCode: "411001",
    addressCountry: "IN"
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Marathi"]
    },
    {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phone,
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"]
    }
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_CONFIG.url}/#localbusiness`,
  name: SITE_CONFIG.name,
  image: [
    `${SITE_CONFIG.url}/logo.png`,
    `${SITE_CONFIG.url}/og-image.png`
  ],
  url: SITE_CONFIG.url,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "UPI, Credit Card, Debit Card, Cash on Delivery",
  description: "Fast medicine delivery service in Pune. Order via WhatsApp and get medicines delivered in 30 minutes from CDSCO-licensed pharmacies.",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.address,
    addressLocality: SITE_CONFIG.city,
    addressRegion: "MH",
    postalCode: "411001",
    addressCountry: "IN"
  },
  geo: { "@type": "GeoCoordinates", latitude: 18.5204, longitude: 73.8567 },
  areaServed: [
    { "@type": "City", name: "Pune" },
    { "@type": "Place", name: "Koregaon Park, Pune" },
    { "@type": "Place", name: "Viman Nagar, Pune" },
    { "@type": "Place", name: "Aundh, Pune" },
    { "@type": "Place", name: "Baner, Pune" },
    { "@type": "Place", name: "Kothrud, Pune" },
    { "@type": "Place", name: "Hinjewadi, Pune" }
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "08:00",
    closes: "22:00"
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Medicine Delivery Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "30-Minute Medicine Delivery",
          description: "Order medicines via WhatsApp and receive delivery within 30 minutes from the nearest CDSCO-licensed pharmacy."
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pharmacy Partnership Program",
          description: "Zero-cost partnership for pharmacies to receive additional orders and grow revenue."
        }
      }
    ]
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "50",
    bestRating: "5",
    worstRating: "1"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_CONFIG.url}/#website`,
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  description: SITE_CONFIG.description,
  publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
  inLanguage: "en-IN"
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_CONFIG.url}/#service`,
  name: "MediGrab Medicine Delivery",
  description: "30-minute medicine delivery via WhatsApp from CDSCO-licensed pharmacies in Pune.",
  provider: { "@id": `${SITE_CONFIG.url}/#organization` },
  serviceType: "Medicine Delivery",
  areaServed: { "@type": "City", name: "Pune" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Delivery Options",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Express Medicine Delivery",
          description: "Medicines delivered in 30 minutes via local pharmacy network"
        }
      }
    ]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID; // e.g. G-XXXXXXXXXX

  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      <body className="bg-medigrab-navy text-white antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-medigrab-teal focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="pt-16 md:pt-[72px]">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
        <MetaPixel />
      </body>
    </html>
  );
}
