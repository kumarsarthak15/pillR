"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowLeft, CheckCheck, MapPin, MoreVertical, Phone, Pill, Video } from "lucide-react";

/**
 * Sticky scroll-jacked WhatsApp chat replay.
 *
 * Section is ~250vh tall. The phone sticks at top of viewport while
 * the user scrolls through the section, with messages fading + sliding
 * in based on scrollYProgress. No GSAP, no DOM thrash — pure transforms.
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

export function WhatsAppDemo() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Per-message reveal — 5 messages, each timed to a scroll window
  const o0 = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
  const y0 = useTransform(scrollYProgress, [0.08, 0.18], [16, 0]);
  const o1 = useTransform(scrollYProgress, [0.22, 0.32], [0, 1]);
  const y1 = useTransform(scrollYProgress, [0.22, 0.32], [16, 0]);
  const o2 = useTransform(scrollYProgress, [0.38, 0.48], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.38, 0.48], [16, 0]);
  const o3 = useTransform(scrollYProgress, [0.54, 0.64], [0, 1]);
  const y3 = useTransform(scrollYProgress, [0.54, 0.64], [16, 0]);
  const o4 = useTransform(scrollYProgress, [0.74, 0.86], [0, 1]);
  const y4 = useTransform(scrollYProgress, [0.74, 0.86], [16, 0]);

  const opacities = [o0, o1, o2, o3, o4];
  const yOffsets = [y0, y1, y2, y3, y4];

  // Step caption highlights — sync with messages
  const step1 = useTransform(scrollYProgress, [0.08, 0.32], [0.35, 1]);
  const step2 = useTransform(scrollYProgress, [0.38, 0.64], [0.35, 1]);
  const step3 = useTransform(scrollYProgress, [0.7, 0.86], [0.35, 1]);

  // Final "delivered" badge in the chat header
  const deliveredOpacity = useTransform(scrollYProgress, [0.78, 0.88], [0, 1]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="demo-heading"
      className="relative bg-pillr-card"
      style={{ minHeight: "240vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center px-5 md:px-6 overflow-hidden">
        <div className="mx-auto max-w-container w-full grid md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_360px] gap-8 lg:gap-14 items-center">
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
              Scroll to watch a real WhatsApp order play out — start to door — in 27 minutes.
            </p>

            <ol className="hidden md:block space-y-4">
              <StepCaption
                n={1}
                title="Send your medicine"
                body="Type the name or send a prescription photo."
                progress={step1}
                reduce={!!reduce}
              />
              <StepCaption
                n={2}
                title="Pharmacy confirms"
                body="The nearest licensed pharmacy checks stock and price."
                progress={step2}
                reduce={!!reduce}
              />
              <StepCaption
                n={3}
                title="Rider delivers"
                body="At your door — average 27 minutes."
                progress={step3}
                reduce={!!reduce}
              />
            </ol>
          </div>

          {/* RIGHT: phone */}
          <div className="flex justify-center md:justify-end">
            <PhoneFrame
              opacities={opacities}
              yOffsets={yOffsets}
              deliveredOpacity={deliveredOpacity}
              reduce={!!reduce}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── */

function StepCaption({
  n,
  title,
  body,
  progress,
  reduce,
}: {
  n: number;
  title: string;
  body: string;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  return (
    <motion.li
      style={reduce ? undefined : { opacity: progress }}
      className="flex gap-4 items-start"
    >
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-pillr-red/15 border border-pillr-red/30 inline-flex items-center justify-center font-display text-pillr-red text-xl">
        {n}
      </div>
      <div>
        <h3 className="font-heading font-bold text-white text-base mb-0.5">{title}</h3>
        <p className="text-sm text-pillr-muted">{body}</p>
      </div>
    </motion.li>
  );
}

/* ──────────────────────────────────────────────────────────── */

function PhoneFrame({
  opacities,
  yOffsets,
  deliveredOpacity,
  reduce,
}: {
  opacities: MotionValue<number>[];
  yOffsets: MotionValue<number>[];
  deliveredOpacity: MotionValue<number>;
  reduce: boolean;
}) {
  return (
    <div
      className="relative w-[260px] sm:w-[280px] md:w-[300px] lg:w-[330px] aspect-[9/19] rounded-[40px] bg-black border-[6px] border-[#1A1A1A] shadow-[0_30px_80px_rgba(0,0,0,0.6),inset_0_0_1px_rgba(255,255,255,0.08)] overflow-hidden"
      aria-hidden="true"
    >
      {/* Status bar */}
      <div className="h-7 bg-[#0B141A] flex items-center justify-between px-5 text-[10px] font-semibold text-white">
        <span>10:41</span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 inline-block">📶</span>
          <span className="w-3 h-3 inline-block">🔋</span>
        </span>
      </div>

      {/* WhatsApp chat header */}
      <div className="bg-[#1F2C34] flex items-center gap-2.5 px-3 py-2 border-b border-black/30">
        <ArrowLeft size={16} className="text-white/80" />
        <div className="w-8 h-8 rounded-full bg-pillr-red/90 inline-flex items-center justify-center flex-shrink-0">
          <Pill size={14} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-semibold text-white truncate">PillR Partner</div>
          <motion.div
            style={reduce ? undefined : { opacity: deliveredOpacity }}
            className="text-[10px] text-[#16A34A] font-medium"
          >
            ● order delivered
          </motion.div>
        </div>
        <Video size={14} className="text-white/70" />
        <Phone size={14} className="text-white/70" />
        <MoreVertical size={14} className="text-white/70" />
      </div>

      {/* Chat body — WhatsApp dark wallpaper feel */}
      <div
        className="relative px-2.5 py-3 flex flex-col gap-1.5 h-[calc(100%-7rem)]"
        style={{
          background:
            "linear-gradient(180deg, #0B141A 0%, #0B141A 100%), radial-gradient(circle at 20% 30%, rgba(255,255,255,0.02) 0%, transparent 40%)",
        }}
      >
        {MESSAGES.map((m, i) => (
          <motion.div
            key={i}
            style={reduce ? undefined : { opacity: opacities[i], y: yOffsets[i] }}
            initial={{ opacity: 0 }}
            className={`flex ${m.side === "user" ? "justify-end" : "justify-start"}`}
          >
            <Bubble msg={m} />
          </motion.div>
        ))}
      </div>

      {/* Bottom input bar (non-functional, just visual) */}
      <div className="absolute bottom-0 inset-x-0 bg-[#1F2C34] px-3 py-2 flex items-center gap-2 border-t border-black/30">
        <div className="flex-1 h-7 rounded-full bg-[#2A3942] px-3 flex items-center text-[10px] text-white/40">
          Message
        </div>
        <div className="w-7 h-7 rounded-full bg-[#00A884] inline-flex items-center justify-center">
          <span className="text-white text-[10px]">🎙</span>
        </div>
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.side === "user";
  const base =
    "relative max-w-[78%] px-2.5 py-1.5 text-[12px] leading-snug rounded-lg shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]";
  const tone = isUser
    ? "bg-[#005C4B] text-white rounded-br-[2px]"
    : "bg-[#1F2C34] text-white rounded-bl-[2px]";

  if (msg.kind === "location") {
    return (
      <div className={`${base} ${tone}`}>
        <div className="rounded-md bg-black/30 p-1.5 mb-1 flex items-center gap-1.5">
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
      <div className={`${base} ${tone} bg-[#003D33]`}>
        <div className="flex items-center gap-1.5 font-semibold">
          <span className="text-[#16A34A] text-base">✓</span>
          Delivered — 27 min
        </div>
        <Meta time={msg.time} delivered />
      </div>
    );
  }
  return (
    <div className={`${base} ${tone}`}>
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
