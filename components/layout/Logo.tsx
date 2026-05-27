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
 * MediGrab logo — vector recreation of the flying-pill identity.
 *
 * Geometry (local coords, before rotation):
 *   Pill: 50 × 24 px capsule. Left half white, right half teal.
 *   White cross on teal half. Gloss arc on white half.
 *   7 speed-lines fan from the pill's left edge, all at the same tilt
 *   as the pill (-14°), so the whole thing rotates together.
 *   Wordmark: "Medi" (#FFF) + "Grab" (#1DB89A) in Syne ExtraBold.
 */
export function Logo({ className = "", size = "md" }: Props) {
  const h = HEIGHTS[size];
  // viewBox is 230 × 52
  const w = Math.round((230 / 52) * h);

  return (
    <Link
      href="/"
      aria-label="MediGrab — fast medicine delivery, home"
      className={`inline-flex items-center flex-shrink-0 ${className}`}
    >
      <svg
        width={w}
        height={h}
        viewBox="0 0 230 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/*
         * Flying-pill group.
         * translate(68, 26) puts the pill centre in the left third.
         * rotate(-14) tilts everything -14° (nose up, tail down-left).
         * All speed-lines live inside this group so they share the tilt.
         */}
        <g transform="translate(68,26) rotate(-14)">

          {/* ── Speed lines (drawn first / behind pill) ── */}
          {/* Centre (longest) */}
          <rect x="-62" y="-1.5" width="34" height="3"   rx="1.5"  fill="#1DB89A" />
          {/* ±1 row */}
          <rect x="-56" y="-6.5" width="28" height="2.5" rx="1.25" fill="#1DB89A" opacity="0.78" />
          <rect x="-56" y="4"    width="28" height="2.5" rx="1.25" fill="#1DB89A" opacity="0.78" />
          {/* ±2 row */}
          <rect x="-49" y="-11.5" width="21" height="2"  rx="1"    fill="#1DB89A" opacity="0.52" />
          <rect x="-49" y="9.5"   width="21" height="2"  rx="1"    fill="#1DB89A" opacity="0.52" />
          {/* ±3 row (outermost, faintest) */}
          <rect x="-41" y="-16.5" width="13" height="1.5" rx="0.75" fill="#1DB89A" opacity="0.28" />
          <rect x="-41" y="15"    width="13" height="1.5" rx="0.75" fill="#1DB89A" opacity="0.28" />

          {/* ── Pill capsule ── */}
          {/* White left half: left cap + centre-left rect */}
          <circle cx="-14" cy="0" r="12" fill="white" />
          <rect   x="-14" y="-12" width="14" height="24" fill="white" />
          {/* Teal right half: centre-right rect + right cap */}
          <rect   x="0"  y="-12" width="14" height="24" fill="#1DB89A" />
          <circle cx="14" cy="0" r="12" fill="#1DB89A" />
          {/* Centre seam */}
          <line x1="0" y1="-12" x2="0" y2="12"
                stroke="rgba(13,31,51,0.18)" strokeWidth="1.5" />
          {/* White cross on teal (medical symbol) */}
          <rect x="8.5" y="-5"   width="2.5" height="10" rx="1.25" fill="white" />
          <rect x="4"   y="-1.5" width="11"  height="3"  rx="1.5"  fill="white" />
          {/* Gloss highlight on white half */}
          <ellipse cx="-5" cy="-7" rx="7" ry="3"
                   fill="rgba(255,255,255,0.30)"
                   transform="rotate(-10,-5,-7)" />
        </g>

        {/* ── Wordmark ── */}
        {/* "Medi" — white */}
        <text
          x="102" y="33"
          fontFamily="Syne, system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="22"
          fill="#FFFFFF"
          letterSpacing="-0.4"
        >
          Medi
        </text>
        {/* "Grab" — teal */}
        <text
          x="161" y="33"
          fontFamily="Syne, system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="22"
          fill="#1DB89A"
          letterSpacing="-0.4"
        >
          Grab
        </text>
      </svg>
    </Link>
  );
}
