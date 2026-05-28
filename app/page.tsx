import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { WhatsAppDemo } from "@/components/sections/WhatsAppDemo";
import { WhyPillr } from "@/components/sections/WhyPillr";
import { SpeedComparison } from "@/components/sections/SpeedComparison";
import { StatsBar } from "@/components/sections/StatsBar";
import { Testimonials } from "@/components/sections/Testimonials";
import { ForShopsTeaser } from "@/components/sections/ForShopsTeaser";
import { Coverage } from "@/components/sections/Coverage";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LandingOverlay } from "@/components/sections/LandingOverlay";

export const metadata: Metadata = {
  title: "MediGrab — Medicines in 30 Minutes via WhatsApp | Pune",
  description:
    "Order medicines via WhatsApp and get them delivered in 30 minutes from CDSCO-licensed pharmacies in Pune. No app needed, no queue. Trusted by 50+ pharmacies.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "MediGrab — Medicines in 30 Minutes via WhatsApp",
    description: "Get medicines delivered in 30 minutes from CDSCO-licensed pharmacies in Pune. Just WhatsApp your prescription.",
    url: "/"
  }
};

export default function HomePage() {
  return (
    <>
      <LandingOverlay />
      <Hero />
      <WhatsAppDemo />
      <WhyPillr />
      <SpeedComparison />
      <StatsBar />
      <Testimonials />
      <ForShopsTeaser />
      <Coverage />
      <FinalCTA />
    </>
  );
}
