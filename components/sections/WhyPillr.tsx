"use client";

import { motion } from "framer-motion";
import { Clock, Shield, Smartphone } from "lucide-react";
import { scaleIn, viewportOnce } from "@/lib/animations";

const POINTS = [
  {
    Icon: Clock,
    title: "30-Minute Speed",
    body:
      "Not 2 days. Not 'same day'. Your nearest pharmacy is minutes away. We just connect you."
  },
  {
    Icon: Shield,
    title: "Genuine Medicines Only",
    body:
      "Every partner pharmacy holds a valid drug license. No unverified sources. No compromises."
  },
  {
    Icon: Smartphone,
    title: "No App Needed",
    body:
      "You already have WhatsApp. That's all you need. Zero downloads. Zero learning curve."
  }
];

export function WhyPillr() {
  return (
    <section className="bg-pillr-light py-16 md:py-24" aria-labelledby="why-heading">
      <div className="mx-auto max-w-container px-6">
        <header className="text-center mb-12">
          <h2 id="why-heading" className="font-heading font-bold text-[28px] md:text-[36px] text-black">
            Why PillR?
          </h2>
        </header>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{ visible: { transition: { staggerChildren: 0.13 } } }}
          className="grid gap-6 md:grid-cols-3"
        >
          {POINTS.map((p) => (
            <motion.div
              key={p.title}
              variants={scaleIn}
              className="rounded-[20px] bg-white p-8 shadow-sm transition-all duration-base hover:-translate-y-1 hover:shadow-card-light"
            >
              <div className="w-12 h-12 rounded-full bg-pillr-red/10 inline-flex items-center justify-center mb-4">
                <p.Icon size={24} className="text-pillr-red" />
              </div>
              <h3 className="font-heading font-bold text-xl text-black mb-2">{p.title}</h3>
              <p className="text-base text-[#374151]">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
