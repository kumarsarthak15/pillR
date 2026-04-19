"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function LandingOverlay() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (reduce) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => setShow(false), 700);
    return () => clearTimeout(t);
  }, [reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="landing-overlay"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 100%)", transition: { delay: 0.2, duration: 0.5, ease: [0.65, 0, 0.35, 1] } }}
          exit={{ opacity: 0 }}
          aria-hidden="true"
          className="fixed inset-0 z-[60] bg-pillr-black pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}
