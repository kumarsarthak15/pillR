import type { Metadata } from "next";
import Link from "next/link";
import { Zap, ShieldCheck, Smartphone, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About PillR | Fast Medicine Delivery in Pune",
  description:
    "Built in Pune. For Pune. The story behind PillR — why we are rebuilding medicine access on WhatsApp."
};

const VALUES = [
  { Icon: Zap, title: "Speed", body: "30 minutes is the new standard. Anything slower fails the patient." },
  { Icon: ShieldCheck, title: "Trust", body: "Only CDSCO-licensed pharmacies. Only verified medicine. No shortcuts." },
  { Icon: Smartphone, title: "Simplicity", body: "If your grandparent can't use it, we built it wrong." },
  { Icon: MapPin, title: "Local-First", body: "Your neighbourhood pharmacy is the answer. We just connect the dots." }
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-pillr-black py-20">
        <div className="mx-auto max-w-container px-6 max-w-4xl">
          <h1 className="font-heading font-extrabold text-[36px] md:text-[52px] text-white mb-5 leading-tight">
            The Story Behind PillR
          </h1>
          <p className="text-lg md:text-xl text-pillr-muted max-w-3xl">
            Built in {SITE_CONFIG.city}. For {SITE_CONFIG.city}. By people who were tired of
            waiting 45 minutes for a Crocin.
          </p>
        </div>
      </section>

      <section className="bg-pillr-card py-20">
        <div className="mx-auto max-w-container px-6">
          <h2 className="font-heading font-bold text-[28px] md:text-[36px] text-white mb-10">
            The Problem We&apos;re Solving
          </h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="font-heading font-bold text-xl text-white mb-3">
                Medicine delivery in India is broken.
              </h3>
              <p className="text-[#D1D5DB] mb-3">
                Existing apps demand prescriptions through clunky uploads. E-pharmacies ship in
                2–4 days. Local shops close at 10 PM. And patients live in fear of fake or
                substituted medicine. {/* TODO: replace with real stat once available */}
              </p>
              <p className="text-[#D1D5DB]">
                When a parent calls at midnight asking for medicine, every existing option
                fails the patient.
              </p>
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-white mb-3">The PillR fix.</h3>
              <p className="text-[#D1D5DB] mb-3">
                WhatsApp-native. 30-minute delivery. Only licensed pharmacies. Human-first
                support — a real pharmacist, not a chatbot.
              </p>
              <p className="text-[#D1D5DB]">
                Asset-light. Pharmacy-friendly. Built for the 800M Indians who already live on
                WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-pillr-black py-20">
        <div className="mx-auto max-w-container px-6">
          <h2 className="font-heading font-bold text-[28px] md:text-[36px] text-white text-center mb-12">
            How We Work
          </h2>
          <div className="grid gap-6 md:grid-cols-3 text-center">
            {[
              { title: "Patients", body: "Order on WhatsApp. No app. No friction." },
              { title: "PillR", body: "We route, coordinate, and deliver. Facilitator only — never a pharmacy." },
              { title: "Pharmacies", body: "Licensed local partners. They dispense and bill. We handle the rest." }
            ].map((c) => (
              <div key={c.title} className="rounded-[20px] bg-pillr-card p-8">
                <h3 className="font-heading font-bold text-xl text-white mb-3">{c.title}</h3>
                <p className="text-[#D1D5DB] text-base">{c.body}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-pillr-muted mt-8 max-w-2xl mx-auto">
            PillR is a facilitator. We do not stock, dispense, or prescribe medicines. All
            medicines are dispensed by licensed pharmacy partners.
          </p>
        </div>
      </section>

      <section className="bg-pillr-section py-20">
        <div className="mx-auto max-w-container px-6">
          <h2 className="font-heading font-bold text-[28px] md:text-[36px] text-white text-center mb-12">
            What We Believe
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-[20px] bg-pillr-card p-8">
                <div className="w-12 h-12 rounded-full bg-pillr-red/10 inline-flex items-center justify-center mb-4">
                  <v.Icon size={24} className="text-pillr-red" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-2">{v.title}</h3>
                <p className="text-base text-[#D1D5DB]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pillr-black py-20">
        <div className="mx-auto max-w-container px-6 max-w-3xl">
          <h2 className="font-heading font-bold text-[28px] md:text-[36px] text-white mb-6">
            The Team
          </h2>
          <p className="text-[#D1D5DB] text-lg leading-relaxed">
            Operators, engineers, and pharmacists building the fastest, most reliable
            medicine delivery network in India — one neighbourhood at a time. We work
            directly with CDSCO-licensed pharmacies and stand behind every order we
            facilitate.
          </p>
        </div>
      </section>

      <section className="bg-pillr-card py-16">
        <div className="mx-auto max-w-container px-6 text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4">
            Want to partner or invest?
          </h2>
          <p className="text-pillr-muted mb-6">Let&apos;s talk.</p>
          <Link href="/contact" className="btn-base btn-primary">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
