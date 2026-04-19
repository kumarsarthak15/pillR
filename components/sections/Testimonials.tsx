"use client";

import { motion } from "framer-motion";
import { slideFromLeft, viewportOnce } from "@/lib/animations";

// TODO: Replace with real testimonials from pilot users.
const ITEMS = [
  {
    quote:
      "Ordered my mother's BP medicines at 11 PM. They reached in 14 minutes. I didn't even have to download anything.",
    name: "Priya S.",
    role: "Koregaon Park"
  },
  {
    quote:
      "Genuine medicines, fair price, and the delivery guy waited while I checked the pack. This is what India needed.",
    name: "Rohit K.",
    role: "Viman Nagar"
  },
  {
    quote:
      "I run a small pharmacy in Aundh. PillR sends me 8-12 extra orders a day. No fees, no fuss.",
    name: "Mr. Deshmukh",
    role: "Partner Pharmacy"
  }
];

export function Testimonials() {
  return (
    <section className="bg-pillr-section py-16 md:py-24" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-container px-6">
        <header className="text-center mb-12">
          <h2
            id="testimonials-heading"
            className="font-heading font-bold text-[28px] md:text-[36px] text-white"
          >
            What People Are Saying
          </h2>
        </header>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex md:grid gap-6 md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0"
        >
          {ITEMS.map((t, i) => (
            <motion.li
              key={i}
              variants={slideFromLeft}
              className="relative flex-shrink-0 w-[85%] md:w-auto snap-start rounded-[20px] bg-pillr-card p-8 border border-pillr-section"
            >
              <span
                aria-hidden="true"
                className="absolute -top-2 left-4 font-display text-[64px] text-pillr-red opacity-30 leading-none select-none"
              >
                &ldquo;
              </span>
              <blockquote className="relative italic text-lg text-[#D1D5DB] leading-relaxed">
                {t.quote}
              </blockquote>
              <footer className="mt-5">
                <div className="font-heading font-semibold text-base text-white">{t.name}</div>
                <div className="text-sm text-pillr-muted">{t.role}</div>
              </footer>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
