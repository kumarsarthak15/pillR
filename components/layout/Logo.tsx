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
 * MediGrab logo — faithful SVG recreation of the brand pill mark.
 *
 * Design matches the original flying-pill identity:
 *   • Pill capsule: WHITE left half, TEAL (#1DB89A) right half — the
 *     classic two-tone capsule look. White cross on teal half.
 *   • Speed lines: 13 lines (1 centre + 6 pairs) all converging at the
 *     pill's tail. Each pair gets shorter and more transparent outward,
 *     creating the radial-burst impression from the pill's rear end.
 *     All lines share the pill's -18° rotation (same <g> group).
 *   • Wordmark: "Medi" white + "Grab" teal, Syne ExtraBold.
 *     Single <text> + two <tspan> = zero gap between the two halves.
 *
 * ViewBox 260 × 52  →  size="md" renders ~200 × 40 px
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
         * translate(64, 26) → pill centre in the left quarter.
         * rotate(-18)       → nose points upper-right, tail lower-left.
         *
         * All speed-line x-values end at ≈ −22, which is just inside the
         * pill's rear cap (cx=−14, r=13, left edge=−27), so the lines
         * appear to burst from the tail — same visual as the source PNG.
         */}
        <g transform="translate(64,26) rotate(-18)">

          {/* ── Speed lines — 13 total, converging at x ≈ −22 ── */}
          {/* Centre — longest, full opacity */}
          <rect x="-66" y="-2.5"  width="44" height="5"   rx="2.5"  fill="#1DB89A" opacity="1.00" />
          {/* ±1 pair */}
          <rect x="-63" y="-8"    width="41" height="4.5" rx="2.25" fill="#1DB89A" opacity="0.90" />
          <rect x="-63" y="3.5"   width="41" height="4.5" rx="2.25" fill="#1DB89A" opacity="0.90" />
          {/* ±2 pair */}
          <rect x="-58" y="-13.5" width="36" height="4"   rx="2"    fill="#1DB89A" opacity="0.75" />
          <rect x="-58" y="9.5"   width="36" height="4"   rx="2"    fill="#1DB89A" opacity="0.75" />
          {/* ±3 pair */}
          <rect x="-52" y="-19"   width="30" height="3.5" rx="1.75" fill="#1DB89A" opacity="0.55" />
          <rect x="-52" y="15.5"  width="30" height="3.5" rx="1.75" fill="#1DB89A" opacity="0.55" />
          {/* ±4 pair */}
          <rect x="-45" y="-24"   width="23" height="2.5" rx="1.25" fill="#1DB89A" opacity="0.35" />
          <rect x="-45" y="21.5"  width="23" height="2.5" rx="1.25" fill="#1DB89A" opacity="0.35" />
          {/* ±5 pair — outermost wisps */}
          <rect x="-38" y="-28.5" width="16" height="2"   rx="1"    fill="#1DB89A" opacity="0.18" />
          <rect x="-38" y="26.5"  width="16" height="2"   rx="1"    fill="#1DB89A" opacity="0.18" />
          {/* ±6 pair — faintest */}
          <rect x="-32" y="-32.5" width="10" height="1.5" rx="0.75" fill="#1DB89A" opacity="0.08" />
          <rect x="-32" y="31"    width="10" height="1.5" rx="0.75" fill="#1DB89A" opacity="0.08" />

          {/* ── Pill capsule — white left half, teal right half ── */}
          {/* Left (white) half */}
          <circle cx="-14" cy="0" r="13" fill="white" />
          <rect   x="-14" y="-13" width="14" height="26" fill="white" />
          {/* Right (teal) half */}
          <rect   x="0"   y="-13" width="14" height="26" fill="#1DB89A" />
          <circle cx="14"  cy="0" r="13" fill="#1DB89A" />
          {/* Centre seam */}
          <line x1="0" y1="-13" x2="0" y2="13"
                stroke="rgba(13,31,51,0.20)" strokeWidth="1.5" />

          {/* White medical cross on teal half */}
          <rect x="8.5" y="-6"   width="3"  height="12" rx="1.5" fill="white" />
          <rect x="3.5" y="-1.5" width="11" height="3"  rx="1.5" fill="white" />

          {/* Gloss arc on white half */}
          <ellipse cx="-5" cy="-8" rx="7.5" ry="3"
                   fill="rgba(255,255,255,0.28)"
                   transform="rotate(-10,-5,-8)" />
        </g>

        {/* ── Wordmark ──
         *  tspan with no x on the second span → "Grab" starts exactly
         *  where "Medi" ends, guaranteed zero gap.
         */}
        <text
          y="34"
          fontFamily="Syne, system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="22"
          letterSpacing="-0.5"
        >
          <tspan x="98" fill="#FFFFFF">Medi</tspan>
          <tspan fill="#1DB89A">Grab</tspan>
        </text>
      </svg>
    </Link>
  );
}
