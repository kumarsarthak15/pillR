"use client";

import Link from "next/link";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** kept for API compatibility — SVG logos don't need preloading */
  priority?: boolean;
};

const HEIGHTS: Record<NonNullable<Props["size"]>, number> = {
  sm: 30,
  md: 40,
  lg: 56,
};

/**
 * MediGrab logo — pixel-faithful vector recreation of the official brand identity.
 *
 * Key geometry (local coords inside the rotation group):
 *   Pill: cap radius 13, total 62 × 26 capsule. ENTIRELY teal #1DB89A —
 *         no white left half, single solid colour throughout.
 *   White medical cross on the right half. Gloss arc upper-left.
 *   5 speed-lines fan from the rear (left end) at the same -18° tilt as
 *   the pill (all live in the same rotation group so they tilt together).
 *
 *   Wordmark: "Medi" white + "Grab" teal, Syne ExtraBold 22 px.
 *   Uses a single <text> with two <tspan> children so "Grab" starts exactly
 *   where "Medi" ends — zero manual offset, zero gap.
 *
 * ViewBox: 260 × 52  →  at size="md" renders ~200 × 40 px
 */
export function Logo({ className = "", size = "md" }: Props) {
  const h = HEIGHTS[size];
  const w = Math.round((260 / 52) * h);

  return (
    <Link
      href="/"
      aria-label="MediGrab — fast medicine delivery, home"
      className={`inline-flex items-center flex-shrink-0 ${className}`}
    >
      <svg
        width={w}
        height={h}
        viewBox="0 0 260 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/*
         * Flying-pill group.
         * translate(58, 26) centres the pill in the left quarter.
         * rotate(-18) tilts nose up-right / tail down-left, matching brand kit.
         */}
        <g transform="translate(58,26) rotate(-18)">

          {/* ── Speed lines (drawn first — behind pill) ── */}
          {/* Centre: longest, highest opacity */}
          <rect x="-58" y="-2"    width="38" height="4"   rx="2"    fill="#1DB89A" opacity="0.90" />
          {/* ±1 row */}
          <rect x="-52" y="-8.5"  width="31" height="3"   rx="1.5"  fill="#1DB89A" opacity="0.64" />
          <rect x="-52" y="5.5"   width="31" height="3"   rx="1.5"  fill="#1DB89A" opacity="0.64" />
          {/* ±2 row — outermost, faintest */}
          <rect x="-44" y="-14.5" width="22" height="2.5" rx="1.25" fill="#1DB89A" opacity="0.32" />
          <rect x="-44" y="12"    width="22" height="2.5" rx="1.25" fill="#1DB89A" opacity="0.32" />

          {/* ── Pill capsule — entirely teal, matching brand identity ── */}
          <circle cx="-16" cy="0" r="13" fill="#1DB89A" />
          <rect   x="-16" y="-13" width="32" height="26" fill="#1DB89A" />
          <circle cx="16"  cy="0" r="13" fill="#1DB89A" />

          {/* White medical cross on right half */}
          <rect x="9.5" y="-6.5" width="3"   height="13" rx="1.5" fill="white" />
          <rect x="4"   y="-2"   width="12"  height="4"  rx="2"   fill="white" />

          {/* Gloss arc — upper-left of capsule */}
          <ellipse cx="-4" cy="-8" rx="8" ry="3"
                   fill="rgba(255,255,255,0.28)"
                   transform="rotate(-10,-4,-8)" />
        </g>

        {/* ── Wordmark ──
         *  Single <text> + two <tspan>s.
         *  The second <tspan> has no x="…" so it flows pixel-exactly after
         *  the first — no gap, no overlap, regardless of font metrics.
         */}
        <text
          y="34"
          fontFamily="Syne, system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="22"
          letterSpacing="-0.5"
        >
          <tspan x="96" fill="#FFFFFF">Medi</tspan>
          <tspan fill="#1DB89A">Grab</tspan>
        </text>
      </svg>
    </Link>
  );
}
