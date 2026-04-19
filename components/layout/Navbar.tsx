"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_LINKS, whatsappUrl } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const headerCls = `fixed top-0 inset-x-0 z-50 transition-colors duration-base ${
    scrolled || open
      ? "bg-pillr-black/95 backdrop-blur-lg border-b border-pillr-section"
      : "bg-transparent"
  }`;

  return (
    <>
      <header className={headerCls}>
        <div className="mx-auto max-w-container h-16 md:h-[72px] px-4 md:px-6 flex items-center justify-between">
          <Logo priority size="md" />

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link font-body">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/for-shops" className="btn-base btn-outline-red">
              Partner With Us
            </Link>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-whatsapp"
            >
              <MessageCircle size={18} />
              Order Now
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-12 h-12 -mr-2 text-white"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={reduce ? { opacity: 1 } : { opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: "easeOut" }}
            className="md:hidden fixed inset-0 z-40 bg-pillr-black pt-16 px-6 pb-8 flex flex-col"
          >
            <nav className="flex-1 flex flex-col items-center justify-center gap-8" aria-label="Mobile">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-heading font-bold text-white hover:text-pillr-red transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/for-shops"
                onClick={() => setOpen(false)}
                className="text-lg text-pillr-red font-heading font-bold mt-4"
              >
                Partner With Us
              </Link>
            </nav>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-whatsapp w-full"
            >
              <MessageCircle size={18} />
              Order on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
