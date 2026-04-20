"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/constants";
import { viewportOnce } from "@/lib/animations";

export function FinalCTA() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden py-14 md:py-20"
      aria-labelledby="final-cta-heading"
    >
      <motion.div
        aria-hidden="true"
        initial={reduce ? { clipPath: "inset(0 0 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0 0 0)" }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0 bg-pillr-red"
      />

      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="relative mx-auto max-w-container px-5 md:px-6 text-center"
      >
        <h2
          id="final-cta-heading"
          className="font-heading font-extrabold text-[32px] md:text-[44px] text-white mb-3 leading-tight"
        >
          Your Medicines. 30 Minutes Away.
        </h2>
        <p className="text-lg text-[#FFE4E4] mb-8">No app. No signup. Just WhatsApp.</p>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-base btn-on-red rounded-[20px] inline-flex shadow-[0_8px_28px_rgba(0,0,0,0.35)]"
        >
          <MessageCircle size={20} />
          Order on WhatsApp
        </a>
        <p className="mt-4 text-sm text-[#FFE4E4]">It takes 10 seconds to start.</p>
      </motion.div>
    </section>
  );
}
