"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { whatsappUrl } from "@/lib/constants";

const TRUST_BADGES = [
  "CDSCO Licensed Pharmacies",
  "30-Minute Delivery",
  "No App Needed",
  "Pune, India",
];

const HEADLINE_WORDS = ["Medicines", "in", "30", "Minutes."];


export function Hero() {
  const reduce = useReducedMotion();

  const wordVariants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.6 + i * 0.065, duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section
      className="relative md:min-h-[calc(100dvh-4rem)] flex items-start md:items-center overflow-hidden bg-medigrab-navy"
      aria-labelledby="hero-heading"
    >
      {/* ── Delivery rider illustration (desktop) ── */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute bottom-0 right-0 pointer-events-none"
        style={{
          right: "3%",
          width: "min(38vw, 480px)",
        }}
      >
        {/* Soft teal glow behind rider */}
        <div
          className="absolute inset-0"
          style={{
            filter: "blur(60px)",
            background: "radial-gradient(ellipse at 50% 60%, rgba(29,184,154,0.20) 0%, transparent 70%)",
            transform: "scale(1.3)",
          }}
        />

        {/* Rider entrance + gentle float */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={reduce ? {} : {
              y: [0, -8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/hero-rider.png"
              alt=""
              width={874}
              height={732}
              className="w-full h-auto"
              style={{
                filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.3))",
              }}
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Teal ambient glow — mobile: top-centre, desktop: right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(29,184,154,0.22) 0%, rgba(29,184,154,0.06) 38%, transparent 68%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background:
            "radial-gradient(ellipse at 75% 60%, rgba(29,184,154,0.16) 0%, rgba(29,184,154,0.04) 40%, transparent 65%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-container w-full px-5 md:px-6 pt-6 pb-10 md:py-20">
        <div className="max-w-3xl">
          {/* Trust badges */}
          <ul className="flex flex-wrap gap-1.5 md:gap-2 mb-5 md:mb-7" aria-label="Trust signals">
            {TRUST_BADGES.map((b, i) => (
              <motion.li
                key={b}
                initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + i * 0.08, duration: 0.35, ease: "easeOut" }}
                className="inline-flex items-center gap-1 md:gap-1.5 rounded-full bg-medigrab-card px-2.5 md:px-3 py-1 text-[11px] md:text-[13px] font-heading font-semibold text-medigrab-muted"
              >
                <ShieldCheck size={12} className="text-verified md:hidden" />
                <ShieldCheck size={14} className="text-verified hidden md:inline" />
                {b}
              </motion.li>
            ))}
          </ul>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="font-display text-hero text-white mb-7 md:mb-5 flex flex-wrap gap-x-3 leading-[0.95]"
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
                  className={`inline-block ${isAccent ? "text-medigrab-teal" : ""}`}
                >
                  {w}
                </motion.span>
              );
            })}
          </h1>

          {/* Subline */}
          <motion.p
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="text-base md:text-xl text-medigrab-muted max-w-xl mb-6 md:mb-8"
          >
            No app. No queue. Just WhatsApp.
          </motion.p>

          {/* CTAs */}
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
              className="btn-base btn-outline-teal btn-full-mobile"
            >
              For Pharmacy Owners
            </motion.a>
          </div>

          {/* Social proof */}
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.4 }}
            className="mt-5 md:mt-6 flex items-center gap-2 text-sm text-medigrab-muted"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-verified animate-pulse" />
            Trusted by 50+ pharmacies across Pune
          </motion.div>
        </div>
      </div>
    </section>
  );
}
