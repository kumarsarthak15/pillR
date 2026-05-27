"use client";

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

/**
 * Large flying-pill SVG that replaces pill-mark.png.
 * Geometry mirrors the logo's flying-pill concept but blown up dramatically.
 * Used with mixBlendMode:"screen" so teal glows on navy.
 * ViewBox 1800×510 to match the original pill-mark aspect ratio.
 */
function HeroPillMark() {
  return (
    <svg
      viewBox="0 0 1800 510"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/*
       * Pill group — centred at (1400, 255), tilted -10°.
       * White left half + teal right half + cross + gloss + 8 speed lines.
       * All in one <g> so tilt is shared.
       */}
      <g transform="translate(1400,255) rotate(-10)">

        {/* ── Speed lines ── (end at pill left boundary x ≈ −390) */}
        {/* Centre line — longest, brightest */}
        <rect x="-760" y="-6"   width="366" height="12"  rx="6"   fill="#1DB89A" opacity="0.92" />
        {/* ±1 */}
        <rect x="-690" y="-26"  width="296" height="10"  rx="5"   fill="#1DB89A" opacity="0.72" />
        <rect x="-690" y="16"   width="296" height="10"  rx="5"   fill="#1DB89A" opacity="0.72" />
        {/* ±2 */}
        <rect x="-610" y="-48"  width="216" height="8"   rx="4"   fill="#1DB89A" opacity="0.50" />
        <rect x="-610" y="40"   width="216" height="8"   rx="4"   fill="#1DB89A" opacity="0.50" />
        {/* ±3 */}
        <rect x="-530" y="-68"  width="136" height="6"   rx="3"   fill="#1DB89A" opacity="0.30" />
        <rect x="-530" y="62"   width="136" height="6"   rx="3"   fill="#1DB89A" opacity="0.30" />
        {/* ±4 (outer wisp) */}
        <rect x="-460" y="-88"  width="66"  height="5"   rx="2.5" fill="#1DB89A" opacity="0.15" />
        <rect x="-460" y="83"   width="66"  height="5"   rx="2.5" fill="#1DB89A" opacity="0.15" />

        {/* ── Pill capsule ──
         *  Total: 780 wide × 240 tall  → cap radius 120
         *  Left cap centre (−270, 0) | Right cap centre (+270, 0)
         *  Centre rect: x=−270 … +270, y=−120 … +120
         */}
        {/* White left half */}
        <circle cx="-270" cy="0"  r="120" fill="white"    opacity="0.90" />
        <rect   x="-270" y="-120" width="270" height="240" fill="white"    opacity="0.90" />
        {/* Teal right half */}
        <rect   x="0"   y="-120" width="270" height="240" fill="#1DB89A" />
        <circle cx="270" cy="0"  r="120"  fill="#1DB89A" />
        {/* Seam */}
        <line x1="0" y1="-120" x2="0" y2="120"
              stroke="rgba(13,31,51,0.12)" strokeWidth="4" />
        {/* Cross on teal half (medical ✚) */}
        <rect x="160" y="-50" width="22" height="100" rx="11" fill="white" opacity="0.92" />
        <rect x="105" y="-16" width="115" height="32" rx="16" fill="white" opacity="0.92" />
        {/* Gloss highlight on white half */}
        <ellipse cx="-85" cy="-75" rx="115" ry="44"
                 fill="rgba(255,255,255,0.18)"
                 transform="rotate(-8,-85,-75)" />

        {/* Soft teal corona glow around the whole pill */}
        <ellipse cx="0" cy="0" rx="420" ry="155"
                 fill="none"
                 stroke="#1DB89A"
                 strokeWidth="60"
                 opacity="0.06" />
      </g>
    </svg>
  );
}

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
      {/* ── MediGrab flying pill mark (desktop only) ── */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute top-1/2 right-0 pointer-events-none"
        style={{
          width: "min(38vw, 580px)",
          aspectRatio: "1800 / 510",
          transform: "translateY(-50%)",
          mixBlendMode: "screen",
        }}
      >
        <HeroPillMark />
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
            "radial-gradient(circle at 80% 50%, rgba(29,184,154,0.14) 0%, rgba(29,184,154,0.04) 36%, transparent 64%)",
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
