"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Zap } from "lucide-react";
import { useCountUp } from "@/lib/useCountUp";

/**
 * Animated comparison bars. Bars race in from left as the section
 * enters the viewport; numbers count up alongside. The PillR bar has
 * speed-line motion overlay to imply movement.
 *
 * No competitor names — generic categories so we stay legally clean.
 */

type Row = {
  label: string;
  sublabel: string;
  /** width as % of bar track (relative scale, not absolute) */
  width: number;
  /** counter target for visible ETA */
  value: number;
  unit: string;
  highlight?: boolean;
  /** Truncate the bar visually? Used for "days" rows. */
  truncate?: boolean;
};

const ROWS: Row[] = [
  {
    label: "PillR",
    sublabel: "WhatsApp + nearest licensed pharmacy",
    width: 100,
    value: 30,
    unit: "min",
    highlight: true,
  },
  {
    label: "Local pharmacy run",
    sublabel: "Drive, queue, hope they have stock",
    width: 60,
    value: 60,
    unit: "min",
  },
  {
    label: "E-pharmacy apps",
    sublabel: "Order online, wait for warehouse dispatch",
    width: 95,
    value: 3,
    unit: "days",
    truncate: true,
  },
];

export function SpeedComparison() {
  return (
    <section
      className="bg-pillr-black py-12 md:py-24"
      aria-labelledby="speed-heading"
    >
      <div className="mx-auto max-w-container px-5 md:px-6">
        <header className="text-center mb-8 md:mb-14 max-w-2xl mx-auto">
          <p className="font-heading font-bold text-pillr-red text-sm tracking-widest uppercase mb-2">
            The Real Numbers
          </p>
          <h2
            id="speed-heading"
            className="font-heading font-extrabold text-[28px] md:text-[40px] text-white leading-tight"
          >
            Speed that actually means something.
          </h2>
        </header>

        <ul className="space-y-5 md:space-y-7 max-w-3xl mx-auto">
          {ROWS.map((r, i) => (
            <ComparisonBar key={r.label} row={r} delay={i * 0.18} />
          ))}
        </ul>

        <p className="mt-8 md:mt-12 text-center text-xs md:text-sm text-pillr-muted">
          Times are typical for serviceable areas of Pune. Yours will vary slightly.
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── */

function ComparisonBar({ row, delay }: { row: Row; delay: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const value = useCountUp({
    from: 0,
    to: row.value,
    duration: 1100,
    start: inView && !reduce,
  });

  return (
    <li ref={ref} className="grid grid-cols-[1fr] md:grid-cols-[180px_1fr_auto] gap-2 md:gap-5 items-center">
      {/* Label block */}
      <div className="md:text-right">
        <div
          className={`font-heading font-bold text-base md:text-lg ${
            row.highlight ? "text-white" : "text-pillr-muted"
          }`}
        >
          {row.label}
          {row.highlight && (
            <span className="ml-1.5 inline-flex items-center gap-0.5 text-[10px] md:text-xs font-bold text-pillr-red align-middle">
              <Zap size={11} className="inline" /> YOU
            </span>
          )}
        </div>
        <div className="text-[11px] md:text-xs text-pillr-muted/70 leading-snug">
          {row.sublabel}
        </div>
      </div>

      {/* Bar */}
      <div className="relative h-9 md:h-11 rounded-md bg-pillr-section overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: row.width / 100 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 1.1,
            delay,
            ease: [0.65, 0, 0.35, 1],
          }}
          /* Gradients via inline style — Tailwind purge strips arbitrary
             color stops like via-[#FF323A] in the prod build. */
          style={{
            transformOrigin: "left center",
            background: row.highlight
              ? "linear-gradient(to right, #DC191E 0%, #FF323A 50%, #FF6B70 100%)"
              : "linear-gradient(to right, #3F3F3F 0%, #5A5A5A 100%)",
          }}
          className="absolute inset-y-0 left-0 w-full rounded-md"
        >
          {/* Speed lines on the highlight bar */}
          {row.highlight && !reduce && <SpeedLines />}
          {/* Truncation fade for very long bars */}
          {row.truncate && (
            <div
              className="absolute inset-y-0 right-0 w-16 md:w-24"
              style={{
                background:
                  "linear-gradient(to left, rgba(0,0,0,0.9), transparent)",
              }}
            />
          )}
        </motion.div>
        {row.truncate && (
          <div className="absolute right-2 inset-y-0 flex items-center text-pillr-muted/60 text-base font-bold tracking-widest">
            ⋯
          </div>
        )}
      </div>

      {/* ETA value */}
      <div
        className={`hidden md:flex items-baseline gap-1 min-w-[72px] justify-end ${
          row.highlight ? "text-pillr-red" : "text-pillr-muted"
        }`}
      >
        <span className="font-display text-3xl leading-none">
          {reduce ? row.value : Math.round(value)}
        </span>
        <span className="text-sm font-heading font-bold">{row.unit}</span>
      </div>

      {/* Mobile-only ETA — sits below the bar */}
      <div
        className={`md:hidden flex items-baseline gap-1 ${
          row.highlight ? "text-pillr-red" : "text-pillr-muted"
        }`}
      >
        <span className="font-display text-2xl leading-none">
          {reduce ? row.value : Math.round(value)}
        </span>
        <span className="text-xs font-heading font-bold">{row.unit}</span>
      </div>
    </li>
  );
}

/** Animated diagonal lines slipping across the highlight bar. */
function SpeedLines() {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
    >
      <motion.div
        className="absolute inset-y-0 -left-10 w-32 opacity-25"
        style={{
          background:
            "repeating-linear-gradient(110deg, transparent 0, transparent 8px, rgba(255,255,255,0.55) 8px, rgba(255,255,255,0.55) 10px)",
        }}
        animate={{ x: [0, 200] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}
