import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyPillr } from "@/components/sections/WhyPillr";
import { StatsBar } from "@/components/sections/StatsBar";
import { Testimonials } from "@/components/sections/Testimonials";
import { ForShopsTeaser } from "@/components/sections/ForShopsTeaser";
import { Coverage } from "@/components/sections/Coverage";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LandingOverlay } from "@/components/sections/LandingOverlay";

export const metadata: Metadata = {
  title: "PillR.in — Medicines in 30 Minutes | Pune",
  description:
    "Order medicines via WhatsApp. Delivered from CDSCO-licensed pharmacies in 30 minutes. Pune, India."
};

export default function HomePage() {
  return (
    <>
      <LandingOverlay />
      <Hero />
      <HowItWorks />
      <WhyPillr />
      <StatsBar />
      <Testimonials />
      <ForShopsTeaser />
      <Coverage />
      <FinalCTA />
    </>
  );
}
