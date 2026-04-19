"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";

const BENEFITS = ["Extra orders daily", "No upfront cost", "Keep your existing customers"];

export function ForShopsTeaser() {
  return (
    <section className="bg-pillr-card py-16 md:py-24" aria-labelledby="shops-teaser-heading">
      <div className="mx-auto max-w-container px-6 grid gap-10 md:grid-cols-[55fr_45fr] items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <p className="font-heading font-semibold text-[13px] tracking-[0.2em] uppercase text-pillr-red mb-4">
            For Pharmacy Owners
          </p>
          <h2
            id="shops-teaser-heading"
            className="font-heading font-extrabold text-[28px] md:text-[36px] text-white mb-4 leading-tight"
          >
            Grow Your Pharmacy With Zero Investment
          </h2>
          <p className="text-lg text-[#D1D5DB] mb-8 max-w-xl">
            Join 50+ pharmacies already earning more orders through PillR. No sign-up fee. No
            commission on medicines. Just more customers walking through your WhatsApp.
          </p>
          <Link href="/for-shops" className="btn-base btn-primary">
            Become a Partner <ArrowRight size={18} />
          </Link>
          <p className="mt-3 text-sm text-pillr-muted">Zero cost to join. Cancel anytime.</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="hidden md:block relative rounded-[20px] bg-pillr-section p-8 overflow-hidden"
        >
          <motion.span
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="absolute left-0 top-0 w-1 bg-pillr-red"
            aria-hidden="true"
          />
          <ul className="space-y-4">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-white">
                <span className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-pillr-red/15 text-pillr-red flex-shrink-0">
                  <Check size={16} strokeWidth={3} />
                </span>
                <span className="font-body text-base">{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
