"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageSquare, Building2, Zap } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";

const STEPS = [
  {
    n: "1",
    Icon: MessageSquare,
    title: "WhatsApp Us",
    body: "Send your medicine name or prescription photo on WhatsApp. That's your entire order."
  },
  {
    n: "2",
    Icon: Building2,
    title: "Pharmacy Confirms",
    body: "Your nearest CDSCO-licensed pharmacy checks stock and packs your order."
  },
  {
    n: "3",
    Icon: Zap,
    title: "Delivered in 30 Min",
    body: "Our delivery partner brings it to your door. Cash on delivery or pay via link."
  }
];

export function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-pillr-card py-12 md:py-24" aria-labelledby="hiw-heading">
      <div className="mx-auto max-w-container px-6">
        <header className="text-center mb-8 md:mb-12">
          <h2 id="hiw-heading" className="font-heading font-bold text-[28px] md:text-[36px] text-white">
            How It Works
          </h2>
          <p className="mt-3 text-pillr-muted text-lg">Three steps. That&apos;s it.</p>
        </header>

        <div className="relative">
          <svg
            aria-hidden="true"
            className="hidden md:block absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-2 pointer-events-none"
            viewBox="0 0 1200 4"
            preserveAspectRatio="none"
          >
            <line
              x1="120"
              y1="2"
              x2="1080"
              y2="2"
              stroke="#DC191E"
              strokeOpacity="0.3"
              strokeWidth="1.5"
              strokeDasharray="4 8"
            />
            {!reduce && (
              <motion.circle
                cx="120"
                cy="2"
                r="6"
                fill="#DC191E"
                initial={{ cx: 120 }}
                whileInView={{ cx: 1080 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
              />
            )}
          </svg>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{ visible: { transition: { staggerChildren: 0.18 } } }}
            className="relative grid gap-6 md:grid-cols-3"
          >
            {STEPS.map((s) => (
              <motion.div
                key={s.n}
                variants={fadeUp}
                className="rounded-[20px] bg-pillr-section p-6 md:p-8 border border-transparent hover:border-pillr-red/20 hover:-translate-y-1.5 hover:shadow-hover transition-all duration-base"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-5xl text-pillr-red leading-none">{s.n}</span>
                  <s.Icon size={28} className="text-pillr-red" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-2">{s.title}</h3>
                <p className="text-base text-[#D1D5DB]">{s.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
