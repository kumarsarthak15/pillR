"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { COVERAGE_AREAS, SITE_CONFIG } from "@/lib/constants";

export function Coverage() {
  return (
    <section className="bg-pillr-black py-16 md:py-24" aria-labelledby="coverage-heading">
      <div className="mx-auto max-w-container px-6 grid gap-10 md:grid-cols-2 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
          <h2
            id="coverage-heading"
            className="font-heading font-extrabold text-[28px] md:text-[36px] text-white mb-3"
          >
            Now Live in {SITE_CONFIG.city}
          </h2>
          <p className="text-lg text-pillr-muted mb-6">
            We&apos;re currently serving select neighbourhoods in {SITE_CONFIG.city}. Expanding
            fast.
          </p>

          <p className="text-base text-[#D1D5DB] mb-8 leading-relaxed">
            {COVERAGE_AREAS.map((a, i) => (
              <span key={a}>
                {a}
                {i < COVERAGE_AREAS.length - 1 && (
                  <span className="text-pillr-red mx-2" aria-hidden="true">
                    •
                  </span>
                )}
              </span>
            ))}
          </p>

          <h3 className="font-heading font-bold text-base text-white mb-3">
            Don&apos;t see your area?
          </h3>
          <WaitlistForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="relative aspect-square max-w-[460px] mx-auto w-full"
          aria-hidden="true"
        >
          <CityMap />
        </motion.div>
      </div>
    </section>
  );
}

function WaitlistForm() {
  // TODO Phase 1: replace mailto handoff with Airtable / webhook submission.
  const [email, setEmail] = useState("");
  const subject = encodeURIComponent("PillR — area waitlist");
  const body = encodeURIComponent(
    `Hi PillR team, please notify me when you start delivering in my area.\n\nMy email: ${email}`
  );
  const href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email) window.location.href = href;
      }}
      className="flex flex-col sm:flex-row gap-2"
    >
      <label className="sr-only" htmlFor="waitlist-email">
        Email
      </label>
      <input
        id="waitlist-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="h-12 flex-1 rounded-md bg-pillr-card border border-pillr-section px-3 text-white placeholder:text-pillr-muted focus:outline-none focus:border-pillr-red transition-colors"
      />
      <button type="submit" className="btn-base btn-whatsapp sm:w-auto">
        Notify Me
      </button>
    </form>
  );
}

function CityMap() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#111111" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#grid)" />
      <path
        d="M80 110 L160 70 L260 90 L330 160 L320 260 L240 330 L130 320 L70 240 Z"
        fill="none"
        stroke="#1A1A1A"
        strokeWidth="1.5"
      />
      <g transform="translate(200 200)">
        {[0, 0.6, 1.2].map((delay, i) => (
          <motion.circle
            key={i}
            r="20"
            fill="none"
            stroke="#DC191E"
            strokeWidth="2"
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, delay, ease: "easeOut" }}
            style={{ originX: "50%", originY: "50%" }}
          />
        ))}
        <motion.circle
          r="8"
          fill="#DC191E"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </g>
    </svg>
  );
}
