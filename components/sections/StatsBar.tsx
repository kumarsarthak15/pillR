"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useCountUp } from "@/lib/useCountUp";

type Stat = {
  target: number;
  suffix?: string;
  label: string;
  reverse?: boolean;
};

const STATS: Stat[] = [
  { target: 30, label: "Minute Delivery" },
  { target: 50, suffix: "+", label: "Partner Pharmacies" },
  { target: 0, label: "Apps Needed", reverse: true }
];

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-pillr-black py-16" aria-label="Key stats">
      <div className="mx-auto max-w-container px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-pillr-section gap-8 md:gap-0">
          {STATS.map((s, i) => (
            <StatItem key={i} stat={s} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, start }: { stat: Stat; start: boolean }) {
  const reduce = useReducedMotion();
  const from = stat.reverse ? 5 : 0;
  const to = stat.reverse ? 0 : stat.target;
  const value = useCountUp({ from, to, duration: 900, start: start && !reduce });
  const display = reduce ? stat.target : Math.round(value);

  return (
    <div className="flex flex-col items-center justify-center text-center md:px-6">
      <motion.div
        initial={false}
        animate={start && !reduce ? { scale: [1, 1.1, 1] } : {}}
        transition={{ delay: 0.95, duration: 0.4, ease: "easeOut" }}
        className="relative inline-flex items-end"
      >
        <span className="font-display text-stat text-pillr-red leading-none">
          {display}
          {stat.suffix ?? ""}
        </span>
        {start && !reduce && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.18, 0] }}
            transition={{ delay: 1, duration: 0.6 }}
            style={{
              background: "radial-gradient(circle, rgba(220,25,30,0.6) 0%, transparent 70%)",
              filter: "blur(20px)"
            }}
          />
        )}
      </motion.div>
      <div className="mt-3 text-base text-white font-body">{stat.label}</div>
    </div>
  );
}
