"use client";

import Image from "next/image";
import { RefObject, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

interface PillMotionProps {
  containerRef: RefObject<HTMLElement>;
}

const STREAKS = [
  { top: "20%", width: "78%", h: 2, alpha: 0.85 },
  { top: "32%", width: "58%", h: 1.5, alpha: 0.5 },
  { top: "44%", width: "92%", h: 2, alpha: 0.75 },
  { top: "56%", width: "62%", h: 1.5, alpha: 0.55 },
  { top: "68%", width: "82%", h: 2, alpha: 0.8 },
];

export function PillMotion({ containerRef }: PillMotionProps) {
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Trajectory: from off-screen right → settle → subtle drift
  const xRaw = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    ["70%", "0%", "-12%"]
  );
  const yRaw = useTransform(scrollYProgress, [0, 0.5, 1], ["-4%", "0%", "8%"]);
  const rotRaw = useTransform(scrollYProgress, [0, 0.35, 1], [-6, 0, 4]);
  const scaleRaw = useTransform(scrollYProgress, [0, 0.35, 1], [1.08, 1, 0.94]);

  const x = useSpring(xRaw, { stiffness: 90, damping: 24, mass: 0.8 });
  const y = useSpring(yRaw, { stiffness: 70, damping: 22 });
  const rotate = useSpring(rotRaw, { stiffness: 75, damping: 22 });
  const scale = useSpring(scaleRaw, { stiffness: 80, damping: 22 });

  // Velocity → trail length, opacity, motion blur
  const velocity = useVelocity(scrollYProgress);
  const absVel = useTransform(velocity, (v) =>
    Math.min(Math.abs(v) * 0.55, 3)
  );
  const smoothVel = useSpring(absVel, { stiffness: 150, damping: 22 });
  const trailScaleX = useTransform(smoothVel, [0, 3], [1, 2.2]);
  const trailOpacity = useTransform(smoothVel, [0, 0.4, 3], [0.4, 0.75, 1]);
  const glowOpacity = useTransform(smoothVel, [0, 3], [0.55, 1]);
  const blurPx = useTransform(smoothVel, [0, 3], [0, 5]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  // Ambient gradient follows pill
  const gradX = useTransform(x, (v) => `calc(72% + ${v})`);
  const ambientBg = useMotionTemplate`radial-gradient(circle at ${gradX} 50%, rgba(220,25,30,0.20) 0%, rgba(220,25,30,0.06) 30%, transparent 60%)`;

  // Pointer magnetic pull
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const pullX = useSpring(mx, { stiffness: 130, damping: 16 });
  const pullY = useSpring(my, { stiffness: 130, damping: 16 });
  const hover = useMotionValue(0);
  const smoothHover = useSpring(hover, { stiffness: 120, damping: 18 });

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduce) return;
      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width * 0.72;
      const cy = r.top + r.height * 0.5;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const reach = Math.min(r.width, r.height) * 0.4;
      const strength = Math.max(0, 1 - dist / reach);
      mx.set(dx * 0.1 * strength);
      my.set(dy * 0.1 * strength);
      hover.set(strength);
    },
    [containerRef, mx, my, hover, reduce]
  );

  const onPointerLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
    hover.set(0);
  }, [mx, my, hover]);

  const combinedGlow = useTransform(
    [glowOpacity, smoothHover] as any,
    ([g, h]: number[]) => Math.min(1, g + h * 0.45)
  );

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {/* Ambient red wash */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: ambientBg }}
      />

      {/* Pill anchor: right-center, fixed sane size */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[clamp(240px,34vw,520px)] aspect-[1800/505] pointer-events-none">
        {/* Scroll-driven transform layer */}
        <motion.div
          style={reduce ? undefined : { x, y, rotate, scale, filter }}
          className="relative w-full h-full will-change-transform"
        >
          {/* Magnetic pull + idle float */}
          <motion.div
            style={reduce ? undefined : { x: pullX, y: pullY }}
            animate={reduce ? undefined : { y: [0, -5, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
            }
            className="relative w-full h-full will-change-transform"
          >
            {/* Red bloom halo */}
            <motion.div
              style={reduce ? undefined : { opacity: combinedGlow }}
              className="absolute inset-[-25%] pointer-events-none"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at 60% 50%, rgba(220,25,30,0.55) 0%, rgba(220,25,30,0.18) 40%, rgba(220,25,30,0) 72%)",
                  filter: "blur(24px)",
                }}
              />
            </motion.div>

            {/* Speed streaks — to the LEFT of pill, scale + fade with velocity */}
            <motion.div
              style={
                reduce
                  ? undefined
                  : { scaleX: trailScaleX, opacity: trailOpacity }
              }
              className="absolute top-[22%] bottom-[22%] right-[68%] w-[120%] origin-right pointer-events-none"
              aria-hidden="true"
            >
              {STREAKS.map((s, i) => (
                <div
                  key={i}
                  className="absolute right-0 rounded-full bg-pillr-red"
                  style={{
                    top: s.top,
                    width: s.width,
                    height: s.h,
                    opacity: s.alpha,
                    boxShadow: "0 0 10px rgba(220,25,30,0.7)",
                  }}
                />
              ))}
            </motion.div>

            {/* Pill image — mix-blend-mode: screen drops the black background
                so the red bloom shows through and the pill sits cleanly on dark bg */}
            <div
              className="relative w-full h-full"
              style={{ mixBlendMode: "screen" }}
            >
              <Image
                src="/hero_image.png"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 520px, (min-width: 640px) 34vw, 0px"
                className="object-contain select-none"
                draggable={false}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
