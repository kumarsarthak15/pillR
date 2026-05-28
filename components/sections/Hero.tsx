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

/** Floating orbs that drift around the pill mark */
const ORBS = [
  { size: 6,  x: "18%", y: "12%", delay: 0,   dur: 4.2 },
  { size: 4,  x: "82%", y: "22%", delay: 0.8, dur: 3.6 },
  { size: 5,  x: "75%", y: "78%", delay: 1.6, dur: 5.0 },
  { size: 3,  x: "25%", y: "85%", delay: 0.4, dur: 3.8 },
  { size: 4,  x: "55%", y: "8%",  delay: 1.2, dur: 4.5 },
  { size: 3,  x: "10%", y: "55%", delay: 2.0, dur: 3.4 },
];

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
      className="relative min-h-[calc(100dvh-4rem)] md:min-h-screen flex items-start md:items-center overflow-hidden bg-medigrab-navy"
      aria-labelledby="hero-heading"
    >
      {/* ── Pill mark visual system (desktop only) ── */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute top-1/2 pointer-events-none"
        style={{
          right: "4%",
          width: "min(42vw, 520px)",
          transform: "translateY(-50%)",
        }}
      >
        {/* Layer 1: Deep pulsing glow — big and soft */}
        <motion.div
          className="absolute inset-0"
          animate={reduce ? {} : {
            scale: [1.5, 1.7, 1.5],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            filter: "blur(80px)",
            background: "radial-gradient(ellipse at center, rgba(29,184,154,0.35) 0%, rgba(29,184,154,0.10) 45%, transparent 70%)",
            transform: "scale(1.5)",
          }}
        />

        {/* Layer 2: Sharper inner glow — concentrated teal light */}
        <motion.div
          className="absolute inset-0"
          animate={reduce ? {} : {
            scale: [1.1, 1.25, 1.1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{
            filter: "blur(40px)",
            background: "radial-gradient(ellipse at center, rgba(29,184,154,0.40) 0%, rgba(62,207,176,0.15) 40%, transparent 65%)",
            transform: "scale(1.1)",
          }}
        />

        {/* Layer 3: Floating teal orbs */}
        {!reduce && ORBS.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
              background: "radial-gradient(circle, rgba(62,207,176,0.9) 0%, rgba(29,184,154,0.4) 60%, transparent 100%)",
              boxShadow: `0 0 ${orb.size * 3}px rgba(29,184,154,0.6)`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 8, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: orb.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: orb.delay,
            }}
          />
        ))}

        {/* Layer 4: The actual pill — full color, vivid */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 40, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={reduce ? {} : {
              y: [0, -16, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/pill-mark.png"
              alt=""
              width={585}
              height={417}
              className="w-full h-auto relative"
              style={{
                filter: "drop-shadow(0 0 30px rgba(29,184,154,0.5)) drop-shadow(0 0 60px rgba(29,184,154,0.25))",
                opacity: 0.85,
              }}
              priority
            />

            {/* Shimmer sweep across the pill */}
            {!reduce && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Mobile pill mark (smaller, simpler) ── */}
      <div
        aria-hidden="true"
        className="md:hidden absolute top-6 right-0 pointer-events-none"
        style={{ width: "45vw", maxWidth: "200px", opacity: 0.15 }}
      >
        <Image
          src="/pill-mark.png"
          alt=""
          width={585}
          height={417}
          className="w-full h-auto"
          priority
        />
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
            "radial-gradient(ellipse at 72% 50%, rgba(29,184,154,0.22) 0%, rgba(29,184,154,0.06) 38%, transparent 65%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-container w-full px-5 md:px-6 pt-10 pb-14 md:py-20">
        <div className="max-w-3xl">
          {/* Trust badges */}
          <ul className="flex flex-wrap gap-1.5 md:gap-2 mb-7" aria-label="Trust signals">
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
            className="text-base md:text-xl text-medigrab-muted max-w-xl mb-9 md:mb-8"
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
            className="mt-8 md:mt-6 flex items-center gap-2 text-sm text-medigrab-muted"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-verified animate-pulse" />
            Trusted by 50+ pharmacies across Pune
          </motion.div>
        </div>
      </div>
    </section>
  );
}
