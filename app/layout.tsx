import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Nunito, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas"
});

const nunito = Nunito({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito"
});

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  keywords: [
    "medicine delivery Pune",
    "WhatsApp medicine order",
    "30 minute medicine delivery",
    "online pharmacy Pune",
    "CDSCO licensed pharmacy",
    "PillR"
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
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE_CONFIG.name }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ["/og-image.png"]
  },
  robots: { index: true, follow: true },
  // TODO: replace placeholder verification tokens with real ones from Meta + GSC.
  verification: {
    google: "PLACEHOLDER_GOOGLE_SITE_VERIFICATION",
    other: {
      "facebook-domain-verification": "PLACEHOLDER_META_DOMAIN_VERIFICATION"
    }
  }
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/logo.png`,
  sameAs: SOCIAL_LINKS.map((s) => s.href),
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.address,
    addressLocality: SITE_CONFIG.city,
    addressRegion: "MH",
    addressCountry: "IN"
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    contactType: "customer support",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi", "Marathi"]
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_CONFIG.name,
  image: `${SITE_CONFIG.url}/logo.png`,
  url: SITE_CONFIG.url,
  telephone: SITE_CONFIG.phone,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.address,
    addressLocality: SITE_CONFIG.city,
    addressRegion: "MH",
    addressCountry: "IN"
  },
  geo: { "@type": "GeoCoordinates", latitude: 18.5204, longitude: 73.8567 },
  areaServed: { "@type": "City", name: SITE_CONFIG.city }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_CONFIG.url}/?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID; // e.g. G-XXXXXXXXXX

  return (
    <html lang="en" className={`${bebas.variable} ${nunito.variable} ${inter.variable}`}>
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
      </head>
      <body className="bg-pillr-black text-white antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-pillr-red focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
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
