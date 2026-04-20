"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Building2, Home, Pill } from "lucide-react";

/**
 * Scroll-driven delivery route animation.
 * SVG path is drawn as user scrolls; scooter rides along it via
 * getPointAtLength (works at any responsive size). Pharmacy + home
 * clusters are absolutely positioned over the SVG using percentage
 * coordinates that match the viewBox endpoints.
 *
 * No GSAP — pure framer-motion to keep the bundle small and avoid
 * another set of prod-parity surprises after the recent Tailwind hunt.
 */

const PATH_D = "M 110 130 C 280 30, 520 230, 690 130";
const VIEW_W = 800;
const VIEW_H = 240;

export function DeliveryRoute() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 30%"],
  });

  const draw = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);
  const smoothDraw = useSpring(draw, { stiffness: 90, damping: 24, mass: 0.7 });

  // Measure path length once mounted
  useEffect(() => {
    if (pathRef.current) {
      setPathLen(pathRef.current.getTotalLength());
    }
  }, []);

  // Scooter position from path
  const scooterX = useMotionValue(110);
  const scooterY = useMotionValue(130);
  const scooterAngle = useMotionValue(0);

  useEffect(() => {
    if (!pathRef.current || !pathLen) return;
    const path = pathRef.current;
    const update = (p: number) => {
      const dist = Math.max(0, Math.min(1, p)) * pathLen;
      const pt = path.getPointAtLength(dist);
      const ahead = path.getPointAtLength(Math.min(pathLen, dist + 1));
      const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
      scooterX.set(pt.x);
      scooterY.set(pt.y);
      scooterAngle.set(angle);
    };
    const unsub = smoothDraw.on("change", update);
    update(smoothDraw.get());
    return () => unsub();
  }, [pathLen, smoothDraw, scooterX, scooterY, scooterAngle]);

  // Mid-route ETA badge
  const badgeOpacity = useTransform(
    smoothDraw,
    [0.3, 0.45, 0.75, 0.9],
    [0, 1, 1, 0]
  );
  const badgeY = useTransform(smoothDraw, [0.3, 0.5], [12, 0]);

  // End-point pulse (lights up when scooter arrives)
  const endPulse = useTransform(smoothDraw, [0.82, 1], [0, 1]);
  const endPulseScale = useTransform(smoothDraw, [0.82, 1], [0.6, 1]);

  // Subtle parallax on cluster icons (move opposite directions)
  const leftClusterY = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const rightClusterY = useTransform(scrollYProgress, [0, 1], [12, -12]);

  // Hover speed boost
  const [boost, setBoost] = useState(false);

  return (
    <div
      ref={sectionRef}
      className="relative w-full max-w-3xl mx-auto delivery-route-frame"
    >
      {/* Underlying SVG: path + scooter + pulses */}
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#DC191E" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF4D52" stopOpacity="1" />
          </linearGradient>
          <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background dashed track — full path always visible */}
        <path
          ref={pathRef}
          d={PATH_D}
          fill="none"
          stroke="rgba(220,25,30,0.16)"
          strokeWidth="3"
          strokeDasharray="2 8"
          strokeLinecap="round"
        />

        {/* Active stroke — drawn as user scrolls */}
        <motion.path
          d={PATH_D}
          fill="none"
          stroke="url(#routeGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          style={
            reduce ? { pathLength: 1 } : { pathLength: smoothDraw }
          }
          initial={{ pathLength: 0 }}
        />

        {/* Pharmacy point pulse (always pulsing) */}
        <g>
          <motion.circle
            cx="110"
            cy="130"
            r="14"
            fill="#DC191E"
            opacity="0.25"
            animate={
              reduce
                ? undefined
                : { scale: [1, 1.6, 1], opacity: [0.35, 0, 0.35] }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            style={{ transformOrigin: "110px 130px" }}
          />
          <circle cx="110" cy="130" r="7" fill="#DC191E" filter="url(#dotGlow)" />
          <circle cx="110" cy="130" r="3" fill="#fff" />
        </g>

        {/* Home point — only lights up after delivery */}
        <motion.g style={{ opacity: endPulse }}>
          <motion.circle
            cx="690"
            cy="130"
            r="14"
            fill="#16A34A"
            opacity="0.25"
            animate={
              reduce
                ? undefined
                : { scale: [1, 1.6, 1], opacity: [0.35, 0, 0.35] }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            style={{ transformOrigin: "690px 130px" }}
          />
          <motion.circle
            cx="690"
            cy="130"
            r="7"
            fill="#16A34A"
            filter="url(#dotGlow)"
            style={{ scale: endPulseScale, transformOrigin: "690px 130px" }}
          />
          <circle cx="690" cy="130" r="3" fill="#fff" />
        </motion.g>

        {/* Scooter — riding the path */}
        <motion.g
          style={{
            x: scooterX,
            y: scooterY,
            rotate: scooterAngle,
          }}
          onHoverStart={() => setBoost(true)}
          onHoverEnd={() => setBoost(false)}
          className="cursor-pointer"
        >
          {/* Boost streak — shows on hover */}
          <motion.line
            x1="-30"
            y1="0"
            x2="-10"
            y2="0"
            stroke="#FF4D52"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: boost ? 0.85 : 0, x1: boost ? -36 : -22 }}
            transition={{ duration: 0.25 }}
          />
          <motion.line
            x1="-26"
            y1="-4"
            x2="-12"
            y2="-4"
            stroke="#FF4D52"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: boost ? 0.6 : 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.line
            x1="-26"
            y1="4"
            x2="-12"
            y2="4"
            stroke="#FF4D52"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: boost ? 0.6 : 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* Scooter body — simple inline shape, scales with SVG */}
          <motion.g
            animate={boost ? { scale: 1.18 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
          >
            {/* Glow under wheels */}
            <ellipse cx="0" cy="9" rx="14" ry="2" fill="rgba(220,25,30,0.4)" />
            {/* Wheels */}
            <circle cx="-9" cy="6" r="4.5" fill="#1A1A1A" stroke="#fff" strokeWidth="1" />
            <circle cx="9" cy="6" r="4.5" fill="#1A1A1A" stroke="#fff" strokeWidth="1" />
            {/* Body */}
            <path
              d="M -10 -2 L 4 -2 Q 8 -2 10 2 L 12 6 L -8 6 Q -12 6 -12 2 Z"
              fill="#DC191E"
              stroke="#fff"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            {/* Rider helmet */}
            <circle cx="0" cy="-7" r="3.5" fill="#1A1A1A" />
            <rect x="-2" y="-9" width="4" height="2.5" rx="1" fill="rgba(255,255,255,0.4)" />
            {/* Handlebar */}
            <line
              x1="6"
              y1="-2"
              x2="11"
              y2="-7"
              stroke="#1A1A1A"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </motion.g>
        </motion.g>
      </svg>

      {/* Pharmacy cluster — left side. Mobile: just the main pin. */}
      <motion.div
        style={reduce ? undefined : { y: leftClusterY }}
        className="absolute left-[4%] md:left-[6%] top-1/2 -translate-y-1/2 md:-translate-x-1/4 flex flex-col items-center gap-2"
      >
        <Floating delay={0}>
          <ClusterPin Icon={Pill} label="Pharmacy" />
        </Floating>
        <div className="hidden md:flex gap-2">
          <Floating delay={0.7} className="opacity-70 scale-75">
            <ClusterPin Icon={Building2} compact />
          </Floating>
          <Floating delay={1.2} className="opacity-60 scale-75">
            <ClusterPin Icon={Building2} compact />
          </Floating>
        </div>
      </motion.div>

      {/* Home cluster — right side. Mobile: just the main pin. */}
      <motion.div
        style={reduce ? undefined : { y: rightClusterY }}
        className="absolute right-[4%] md:right-[6%] top-1/2 -translate-y-1/2 md:translate-x-1/4 flex flex-col items-center gap-2"
      >
        <Floating delay={0.4}>
          <ClusterPin Icon={Home} label="You" tone="green" />
        </Floating>
        <div className="hidden md:flex gap-2">
          <Floating delay={1.0} className="opacity-70 scale-75">
            <ClusterPin Icon={Home} tone="green" compact />
          </Floating>
          <Floating delay={1.5} className="opacity-60 scale-75">
            <ClusterPin Icon={Home} tone="green" compact />
          </Floating>
        </div>
      </motion.div>

      {/* ETA badge — fades in mid-route. Sits inside the frame on mobile
          (no negative top) so it can't crash into the section header. */}
      <motion.div
        style={reduce ? undefined : { opacity: badgeOpacity, y: badgeY }}
        className="absolute left-1/2 top-2 md:-top-4 -translate-x-1/2 px-3 md:px-3.5 py-1 md:py-1.5 rounded-full bg-pillr-card border border-pillr-red/40 text-[11px] md:text-sm font-heading font-bold text-white shadow-[0_4px_18px_rgba(220,25,30,0.35)] whitespace-nowrap"
        initial={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span className="text-pillr-red">⚡</span> ~20 min delivery
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── */

function ClusterPin({
  Icon,
  label,
  tone = "red",
  compact,
}: {
  Icon: typeof Pill;
  label?: string;
  tone?: "red" | "green";
  compact?: boolean;
}) {
  const ring = tone === "red" ? "border-pillr-red/40" : "border-verified/40";
  const dot = tone === "red" ? "bg-pillr-red" : "bg-verified";
  const size = compact ? "w-9 h-9" : "w-10 h-10 md:w-14 md:h-14";
  const iconSize = compact ? 16 : 18;

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${size} rounded-2xl bg-pillr-card border ${ring} inline-flex items-center justify-center shadow-lg`}
      >
        <Icon size={iconSize} className={tone === "red" ? "text-pillr-red" : "text-verified"} />
      </div>
      {label && (
        <div className="flex items-center gap-1 text-[10px] md:text-xs font-heading font-bold text-white">
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${dot}`} />
          {label}
        </div>
      )}
    </div>
  );
}

function Floating({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      animate={reduce ? undefined : { y: [0, -4, 0] }}
      transition={
        reduce
          ? undefined
          : {
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
