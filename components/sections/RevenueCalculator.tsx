"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { TrendingUp, Receipt, Wallet } from "lucide-react";
import { useCountUp } from "@/lib/useCountUp";

/**
 * Animated revenue snapshot for the /for-shops page.
 *
 * Shows what a typical PillR partner pharmacy sees on a normal day
 * once they're live. Numbers tick up when the section enters the
 * viewport. A 7-bar daily-orders chart fills in alongside.
 *
 * Numbers based on early Pune pilot averages — round + conservative.
 */

// Daily order counts for the last 7 days
const DAILY = [6, 9, 11, 8, 12, 14, 10];
const DAILY_MAX = Math.max(...DAILY);
const DAILY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export function RevenueCalculator() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const start = inView && !reduce;

  const orders = useCountUp({ from: 0, to: 12, duration: 1300, start });
  const revenue = useCountUp({ from: 0, to: 18400, duration: 1700, start });
  const margin = useCountUp({ from: 0, to: 22, duration: 1500, start });

  return (
    <section className="bg-pillr-black py-12 md:py-24" aria-labelledby="rev-heading">
      <div className="mx-auto max-w-container px-5 md:px-6">
        <header className="text-center mb-8 md:mb-12 max-w-2xl mx-auto">
          <p className="font-heading font-bold text-pillr-red text-sm tracking-widest uppercase mb-2">
            Real Numbers
          </p>
          <h2
            id="rev-heading"
            className="font-heading font-extrabold text-[28px] md:text-[40px] text-white leading-tight"
          >
            What a typical partner sees in a week.
          </h2>
        </header>

        <motion.div
          ref={sectionRef}
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto rounded-[24px] bg-gradient-to-br from-pillr-card to-pillr-section border border-pillr-red/20 p-6 md:p-10 overflow-hidden"
        >
          {/* Subtle red glow corner */}
          <div
            aria-hidden="true"
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(220,25,30,0.18) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          <div className="relative grid gap-6 md:gap-8 md:grid-cols-3">
            <Stat
              Icon={Receipt}
              value={Math.round(orders)}
              label="Extra orders today"
              note="avg of pilot pharmacies"
              accent
            />
            <Stat
              Icon={Wallet}
              value={`₹${Math.round(revenue).toLocaleString("en-IN")}`}
              label="Extra revenue / month"
              note="at average ticket size ₹52"
              accent
            />
            <Stat
              Icon={TrendingUp}
              value={`+${Math.round(margin)}%`}
              label="Footfall lift"
              note="vs. pre-PillR baseline"
            />
          </div>

          {/* Mini bar chart — last 7 days */}
          <div className="relative mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/5">
            <div className="flex items-end justify-between mb-2">
              <div className="font-heading font-bold text-white text-sm md:text-base">
                Orders this week
              </div>
              <div className="text-xs text-pillr-muted">
                {DAILY.reduce((a, b) => a + b, 0)} total
              </div>
            </div>
            <div className="flex items-end gap-1.5 md:gap-2 h-24 md:h-32">
              {DAILY.map((v, i) => (
                <BarColumn
                  key={i}
                  value={v}
                  max={DAILY_MAX}
                  label={DAILY_LABELS[i]}
                  delay={0.1 + i * 0.06}
                  start={start}
                  highlight={i === DAILY.length - 1}
                />
              ))}
            </div>
          </div>

          <p className="relative mt-5 md:mt-6 text-[12px] md:text-sm text-pillr-muted">
            Numbers reflect early Pune pilot averages. Your store&apos;s mix of repeat
            customers, location, and stock depth will move these up or down.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── */

function Stat({
  Icon,
  value,
  label,
  note,
  accent,
}: {
  Icon: typeof Receipt;
  value: number | string;
  label: string;
  note: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-2 md:mb-3">
        <div
          className={`w-9 h-9 md:w-10 md:h-10 rounded-xl inline-flex items-center justify-center ${
            accent ? "bg-pillr-red/15 text-pillr-red" : "bg-verified/15 text-verified"
          }`}
        >
          <Icon size={18} />
        </div>
      </div>
      <div className="font-display text-[44px] md:text-[56px] leading-none text-white tracking-tight">
        {value}
      </div>
      <div className="font-heading font-bold text-sm md:text-base text-white mt-2">
        {label}
      </div>
      <div className="text-[11px] md:text-xs text-pillr-muted mt-0.5">{note}</div>
    </div>
  );
}

function BarColumn({
  value,
  max,
  label,
  delay,
  start,
  highlight,
}: {
  value: number;
  max: number;
  label: string;
  delay: number;
  start: boolean;
  highlight?: boolean;
}) {
  const heightPct = (value / max) * 100;
  return (
    <div className="flex-1 flex flex-col items-center gap-1.5">
      <div className="relative w-full flex-1 flex items-end">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={start ? { scaleY: heightPct / 100 } : {}}
          transition={{ duration: 0.7, delay, ease: [0.65, 0, 0.35, 1] }}
          style={{
            transformOrigin: "bottom center",
            background: highlight
              ? "linear-gradient(to top, #DC191E, #FF6B70)"
              : "linear-gradient(to top, rgba(220,25,30,0.35), rgba(220,25,30,0.15))",
          }}
          className="w-full rounded-t-md"
        >
          <div className="h-full" style={{ minHeight: "4px" }} />
        </motion.div>
      </div>
      <div className="text-[10px] md:text-xs text-pillr-muted font-heading font-semibold">
        {label}
      </div>
    </div>
  );
}
