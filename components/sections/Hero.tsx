"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { whatsappUrl } from "@/lib/constants";

const TRUST_BADGES = [
  "CDSCO Licensed Pharmacies",
  "30-Minute Delivery",
  "No App Needed",
  "Pune, India"
];

const HEADLINE_WORDS = ["Medicines", "in", "30", "Minutes."];

export function Hero() {
  const reduce = useReducedMotion();

  const wordVariants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.6 + i * 0.065, duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-pillr-black"
      aria-labelledby="hero-heading"
    >
      {/* Static pill background — right-aligned, vertically centered */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 pointer-events-none"
        style={{
          width: "min(34vw, 520px)",
          aspectRatio: "1800 / 505",
          transform: "translateY(-50%)",
          mixBlendMode: "screen",
        }}
      >
        <Image
          src="/pill-mark.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 520px, (min-width: 640px) 34vw, 0px"
          className="object-contain select-none"
          draggable={false}
        />
      </div>

      {/* Soft red ambient glow on the right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 78% 50%, rgba(220,25,30,0.18) 0%, rgba(220,25,30,0.05) 32%, transparent 62%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-container w-full px-6 py-20">
        <div className="max-w-3xl">
          <ul className="flex flex-wrap gap-2 mb-7" aria-label="Trust signals">
            {TRUST_BADGES.map((b, i) => (
              <motion.li
                key={b}
                initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + i * 0.08, duration: 0.35, ease: "easeOut" }}
                className="inline-flex items-center gap-1.5 rounded-full bg-pillr-card px-3 py-1 text-[13px] font-heading font-semibold text-pillr-muted"
              >
                <ShieldCheck size={14} className="text-verified" />
                {b}
              </motion.li>
            ))}
          </ul>

          <h1
            id="hero-heading"
            className="font-display text-hero text-white mb-5 flex flex-wrap gap-x-3 leading-[0.95]"
          >
            {HEADLINE_WORDS.map((w, i) => {
              const isAccent = w === "30" || w === "Minutes.";
              return (
                <motion.span
                  key={`${w}-${i}`}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  className={`inline-block ${isAccent ? "text-pillr-red" : ""}`}
                >
                  {w}
                </motion.span>
              );
            })}
          </h1>

          <motion.p
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="text-lg md:text-xl text-pillr-muted max-w-xl mb-8"
          >
            No app. No queue. Just WhatsApp.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md sm:max-w-none">
            <motion.a
              initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
              animate={
                reduce
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, scale: [0.85, 1, 1.08, 1] }
              }
              transition={
                reduce
                  ? {}
                  : { delay: 1.3, times: [0, 0.45, 0.75, 1], duration: 0.6, ease: "easeOut" }
              }
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-whatsapp btn-full-mobile"
            >
              <MessageCircle size={20} />
              Order on WhatsApp
            </motion.a>

            <motion.a
              initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.38, duration: 0.45, ease: "easeOut" }}
              href="/for-shops"
              className="btn-base btn-outline-red btn-full-mobile"
            >
              For Pharmacy Owners
            </motion.a>
          </div>

          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.4 }}
            className="mt-6 flex items-center gap-2 text-sm text-pillr-muted"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-verified animate-pulse" />
            Trusted by 50+ pharmacies across Pune
          </motion.div>
        </div>
      </div>
    </section>
  );
}
