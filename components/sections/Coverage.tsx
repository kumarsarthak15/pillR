"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { COVERAGE_AREAS, SITE_CONFIG } from "@/lib/constants";
import { DeliveryRoute } from "./DeliveryRoute";

export function Coverage() {
  return (
    <section className="bg-pillr-black py-12 md:py-24" aria-labelledby="coverage-heading">
      <div className="mx-auto max-w-container px-5 md:px-6">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-10 md:mb-14"
        >
          <h2
            id="coverage-heading"
            className="font-heading font-extrabold text-[28px] md:text-[40px] text-white mb-3"
          >
            Now <span className="text-pillr-red">LIVE</span> in {SITE_CONFIG.city}
          </h2>
          <p className="text-base md:text-lg text-pillr-muted max-w-xl mx-auto">
            From your nearest licensed pharmacy to your door. Watch it move.
          </p>
        </motion.header>

        <div className="mb-10 md:mb-16">
          <DeliveryRoute />
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-start max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
            <h3 className="font-heading font-bold text-lg md:text-xl text-white mb-3">
              Serviceable neighbourhoods
            </h3>
            <p className="text-base text-[#D1D5DB] leading-relaxed">
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
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
            <h3 className="font-heading font-bold text-lg md:text-xl text-white mb-3">
              Don&apos;t see your area?
            </h3>
            <WaitlistForm />
          </motion.div>
        </div>
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

