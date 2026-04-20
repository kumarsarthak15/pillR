"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, CheckCheck, MapPin, MoreVertical, Phone, Pill, Video } from "lucide-react";

/**
 * WhatsApp chat replay — viewport-triggered, NOT scroll-jacked.
 * When the section enters the viewport, messages stagger in over
 * about 1.6 seconds. No 240vh tall section to scroll through.
 */

type Msg =
  | { side: "user"; kind: "text"; text: string; time: string }
  | { side: "user"; kind: "location"; time: string }
  | { side: "shop"; kind: "text"; text: string; time: string }
  | { side: "shop"; kind: "delivered"; time: string };

const MESSAGES: Msg[] = [
  { side: "user", kind: "text", text: "Need Crocin 650 urgently 🤒", time: "10:14" },
  { side: "shop", kind: "text", text: "Got it. ₹18 for strip of 15. Address please?", time: "10:14" },
  { side: "user", kind: "location", time: "10:15" },
  { side: "shop", kind: "text", text: "Confirmed! Rider on the way 🛵", time: "10:16" },
  { side: "shop", kind: "delivered", time: "10:41" },
];

const STEPS = [
  { n: 1, title: "Send your medicine", body: "Type the name or send a prescription photo." },
  { n: 2, title: "Pharmacy confirms", body: "The nearest licensed pharmacy checks stock and price." },
  { n: 3, title: "Rider delivers", body: "At your door — average 27 minutes." },
];

export function WhatsAppDemo() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-120px" });
  const start = inView && !reduce;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="demo-heading"
      className="relative bg-pillr-card py-14 md:py-24"
    >
      <div className="mx-auto max-w-container w-full px-5 md:px-6 grid md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-center">
        {/* LEFT: copy + step captions */}
        <div className="text-center md:text-left">
          <p className="font-heading font-bold text-pillr-red text-sm tracking-widest uppercase mb-2">
            Live Demo
          </p>
          <h2
            id="demo-heading"
            className="font-heading font-extrabold text-[28px] md:text-[40px] text-white leading-[1.05] mb-4"
          >
            Order medicine the way <br className="hidden md:block" />
            you already chat.
          </h2>
          <p className="text-base md:text-lg text-pillr-muted mb-6 md:mb-8 max-w-md mx-auto md:mx-0">
            From WhatsApp to your door in 27 minutes — here&apos;s what a real order looks like.
          </p>

          <ol className="hidden md:block space-y-4">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, x: -16 }}
                animate={start ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.18, duration: 0.4, ease: "easeOut" }}
                className="flex gap-4 items-start"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-pillr-red/15 border border-pillr-red/30 inline-flex items-center justify-center font-display text-pillr-red text-xl">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-base mb-0.5">{s.title}</h3>
                  <p className="text-sm text-pillr-muted">{s.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* RIGHT: phone */}
        <div className="flex justify-center md:justify-end">
          <PhoneFrame start={start} reduce={!!reduce} />
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── */

function PhoneFrame({ start, reduce }: { start: boolean; reduce: boolean }) {
  return (
    <div
      className="relative w-[260px] sm:w-[280px] md:w-[300px] lg:w-[330px] aspect-[9/19] rounded-[40px] bg-black overflow-hidden"
      style={{
        border: "6px solid #1A1A1A",
        boxShadow:
          "0 30px 80px rgba(0,0,0,0.6), inset 0 0 1px rgba(255,255,255,0.08)",
      }}
      aria-hidden="true"
    >
      {/* Status bar */}
      <div
        className="h-7 flex items-center justify-between px-5 text-[10px] font-semibold text-white"
        style={{ background: "#0B141A" }}
      >
        <span>10:41</span>
        <span className="flex items-center gap-1">📶 🔋</span>
      </div>

      {/* WhatsApp chat header */}
      <div
        className="flex items-center gap-2.5 px-3 py-2 border-b border-black/30"
        style={{ background: "#1F2C34" }}
      >
        <ArrowLeft size={16} className="text-white/80" />
        <div className="w-8 h-8 rounded-full inline-flex items-center justify-center flex-shrink-0" style={{ background: "rgba(220,25,30,0.9)" }}>
          <Pill size={14} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-semibold text-white truncate">PillR Partner</div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={start ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.4 }}
            className="text-[10px] text-[#16A34A] font-medium"
          >
            ● order delivered
          </motion.div>
        </div>
        <Video size={14} className="text-white/70" />
        <Phone size={14} className="text-white/70" />
        <MoreVertical size={14} className="text-white/70" />
      </div>

      {/* Chat body */}
      <div
        className="relative px-2.5 py-3 flex flex-col gap-1.5 h-[calc(100%-7rem)]"
        style={{ background: "#0B141A" }}
      >
        {MESSAGES.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={start ? { opacity: 1, y: 0 } : reduce ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.25 + i * 0.28,
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`flex ${m.side === "user" ? "justify-end" : "justify-start"}`}
          >
            <Bubble msg={m} />
          </motion.div>
        ))}
      </div>

      {/* Bottom input bar (visual only) */}
      <div
        className="absolute bottom-0 inset-x-0 px-3 py-2 flex items-center gap-2 border-t border-black/30"
        style={{ background: "#1F2C34" }}
      >
        <div
          className="flex-1 h-7 rounded-full px-3 flex items-center text-[10px] text-white/40"
          style={{ background: "#2A3942" }}
        >
          Message
        </div>
        <div
          className="w-7 h-7 rounded-full inline-flex items-center justify-center text-white text-[10px]"
          style={{ background: "#00A884" }}
        >
          🎙
        </div>
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.side === "user";
  const bg = isUser ? "#005C4B" : "#1F2C34";
  const radius = isUser ? "8px 8px 2px 8px" : "8px 8px 8px 2px";
  const base = "relative max-w-[78%] px-2.5 py-1.5 text-[12px] leading-snug text-white";
  const shadow = "0 1px 0.5px rgba(0,0,0,0.13)";

  if (msg.kind === "location") {
    return (
      <div className={base} style={{ background: bg, borderRadius: radius, boxShadow: shadow }}>
        <div
          className="rounded-md p-1.5 mb-1 flex items-center gap-1.5"
          style={{ background: "rgba(0,0,0,0.3)" }}
        >
          <MapPin size={12} className="text-pillr-red" />
          <span className="text-[10px] font-medium">Location pin</span>
        </div>
        <span className="text-[10px] opacity-70">Koregaon Park</span>
        <Meta time={msg.time} delivered={isUser} />
      </div>
    );
  }
  if (msg.kind === "delivered") {
    return (
      <div
        className={base}
        style={{ background: "#003D33", borderRadius: radius, boxShadow: shadow }}
      >
        <div className="flex items-center gap-1.5 font-semibold">
          <span className="text-[#16A34A] text-base">✓</span>
          Delivered — 27 min
        </div>
        <Meta time={msg.time} delivered />
      </div>
    );
  }
  return (
    <div className={base} style={{ background: bg, borderRadius: radius, boxShadow: shadow }}>
      {msg.text}
      <Meta time={msg.time} delivered={!isUser} />
    </div>
  );
}

function Meta({ time, delivered }: { time: string; delivered?: boolean }) {
  return (
    <span className="block text-[9px] text-white/55 text-right mt-0.5 leading-none">
      {time}
      {delivered ? <CheckCheck size={10} className="inline ml-1 text-[#53BDEB]" /> : null}
    </span>
  );
}
