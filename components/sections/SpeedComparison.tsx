"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Zap, MapPin, Package, type LucideIcon } from "lucide-react";
import { useCountUp } from "@/lib/useCountUp";

/**
 * Speed comparison — redesigned as side-by-side delivery cards.
 *
 * Each card shows: method icon, label, animated time value + unit,
 * a thin progress bar, and a description. MediGrab is visually elevated
 * with a teal glow and full-width shimmer bar.
 *
 * Bar widths reflect relative speed:
 *   MediGrab (30 min) = 100%
 *   Local run (60 min) = 50%
 *   E-pharmacy (3 days) = ~3.5% — visually communicates the chasm
 */

type Card = {
  Icon: LucideIcon;
  label: string;
  sublabel: string;
  value: number;
  unit: "min" | "days";
  barPct: number;      // visual bar width %
  highlight?: boolean;
};

const CARDS: Card[] = [
  {
    Icon: Zap,
    label: "MediGrab",
    sublabel: "WhatsApp → nearest licensed pharmacy",
    value: 30,
    unit: "min",
    barPct: 100,
    highlight: true,
  },
  {
    Icon: MapPin,
    label: "Local pharmacy run",
    sublabel: "Drive, queue, hope they have stock",
    value: 60,
    unit: "min",
    barPct: 50,
  },
  {
    Icon: Package,
    label: "E-pharmacy apps",
    sublabel: "Online order → warehouse dispatch",
    value: 3,
    unit: "days",
    barPct: 3.5,
  },
];

export function SpeedComparison() {
  return (
    <section
      className="bg-medigrab-navy py-12 md:py-24"
      aria-labelledby="speed-heading"
    >
      <div className="mx-auto max-w-container px-5 md:px-6">
        {/* Header */}
        <header className="text-center mb-10 md:mb-16 max-w-2xl mx-auto">
          <p className="font-heading font-bold text-medigrab-teal text-sm tracking-widest uppercase mb-2">
            The Real Numbers
          </p>
          <h2
            id="speed-heading"
            className="font-heading font-extrabold text-[28px] md:text-[40px] text-white leading-tight"
          >
            Speed that actually means something.
          </h2>
        </header>

        {/* Cards grid */}
        <div className="grid gap-4 md:gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {CARDS.map((card, i) => (
            <DeliveryCard key={card.label} card={card} delay={i * 0.12} />
          ))}
        </div>

        <p className="mt-8 md:mt-12 text-center text-xs md:text-sm text-medigrab-muted">
          Times are typical for serviceable areas of Pune. Yours may vary.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────── */

function DeliveryCard({ card, delay }: { card: Card; delay: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const value = useCountUp({
    from: 0,
    to: card.value,
    duration: 1000,
    start: inView && !reduce,
  });

  const displayed = reduce ? card.value : Math.round(value);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative flex flex-col rounded-2xl p-6 md:p-8 overflow-hidden
        transition-all duration-300
        ${card.highlight
          ? "bg-medigrab-teal/[0.06] border border-medigrab-teal/60 shadow-[0_0_48px_rgba(29,184,154,0.14)]"
          : "bg-medigrab-card border border-medigrab-section"
        }
      `}
    >
      {/* Glow blob behind featured card */}
      {card.highlight && (
        <div
          aria-hidden="true"
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(29,184,154,0.18) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      )}

      {/* Card header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
              ${card.highlight ? "bg-medigrab-teal/20" : "bg-medigrab-section"}`}
          >
            <card.Icon
              size={17}
              className={card.highlight ? "text-medigrab-teal" : "text-medigrab-muted"}
            />
          </div>
          <span
            className={`font-heading font-bold text-[15px] leading-tight
              ${card.highlight ? "text-white" : "text-medigrab-muted"}`}
          >
            {card.label}
          </span>
        </div>

        {card.highlight && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-medigrab-teal text-[11px] font-heading font-bold text-white flex-shrink-0">
            <Zap size={10} />
            YOU
          </span>
        )}
      </div>

      {/* Big time value */}
      <div className={`mb-5 ${card.highlight ? "" : "opacity-70"}`}>
        <div className="flex items-end gap-2 leading-none">
          <span
            className={`font-display text-[72px] md:text-[80px] leading-none tabular-nums
              ${card.highlight ? "text-medigrab-teal" : "text-white"}`}
          >
            {displayed}
          </span>
          <span
            className={`font-heading font-bold text-xl pb-2
              ${card.highlight ? "text-medigrab-teal/70" : "text-medigrab-muted"}`}
          >
            {card.unit}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div
          className="relative h-1.5 rounded-full overflow-hidden"
          style={{ background: card.highlight ? "rgba(29,184,154,0.15)" : "rgba(255,255,255,0.06)" }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.0, delay: delay + 0.15, ease: [0.65, 0, 0.35, 1] }}
            style={{
              transformOrigin: "left center",
              width: `${card.barPct}%`,
              background: card.highlight
                ? "linear-gradient(to right, #1DB89A, #3ECFB0)"
                : "rgba(255,255,255,0.18)",
            }}
            className="absolute inset-y-0 left-0 rounded-full"
          />
          {/* Shimmer on highlight bar */}
          {card.highlight && !reduce && inView && (
            <motion.div
              className="absolute inset-y-0 w-12 rounded-full"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)",
                width: "30%",
              }}
              animate={{ x: ["-30%", "140%"] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
            />
          )}
        </div>
        {/* Bar label: show % for competitors, "Fastest" for MediGrab */}
        <div className="flex justify-between mt-1.5">
          {card.highlight ? (
            <span className="text-[11px] font-heading font-semibold text-medigrab-teal">
              Fastest option
            </span>
          ) : (
            <span className="text-[11px] text-medigrab-muted/60">
              {card.unit === "days"
                ? "144× slower than MediGrab"
                : `${Math.round(100 / (card.value / 30))}% as fast`}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className={`text-[13px] leading-relaxed mt-auto
        ${card.highlight ? "text-medigrab-teal/70" : "text-medigrab-muted/60"}`}
      >
        {card.sublabel}
      </p>
    </motion.div>
  );
}
