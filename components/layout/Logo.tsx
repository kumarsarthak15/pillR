"use client";

import Link from "next/link";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
};

const HEIGHTS: Record<NonNullable<Props["size"]>, number> = {
  sm: 32,
  md: 40,
  lg: 56
};

/**
 * MediGrab inline SVG wordmark.
 * "Medi" in white, "Grab" in brand teal #1DB89A.
 * Teal pill-capsule icon on the left.
 * Rendered as inline SVG so it looks crisp at all sizes and on all backgrounds.
 */
export function Logo({ className = "", size = "md" }: Props) {
  const h = HEIGHTS[size];
  // viewBox is 200 × 48, so width scales proportionally
  const w = Math.round((200 / 48) * h);

  return (
    <Link
      href="/"
      aria-label="MediGrab — fast medicine delivery, home"
      className={`inline-flex items-center flex-shrink-0 ${className}`}
    >
      <svg
        width={w}
        height={h}
        viewBox="0 0 200 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* ── Pill capsule icon ── */}
        {/* White left half */}
        <rect x="0" y="13" width="40" height="22" rx="11" fill="#FFFFFF" />
        {/* Teal right half (clipped) */}
        <clipPath id="mg-pill-right">
          <rect x="20" y="13" width="20" height="22" />
        </clipPath>
        <rect
          x="0"
          y="13"
          width="40"
          height="22"
          rx="11"
          fill="#1DB89A"
          clipPath="url(#mg-pill-right)"
        />
        {/* Center divider */}
        <rect x="19.5" y="13" width="1" height="22" fill="rgba(13,31,51,0.25)" />
        {/* White plus on teal half */}
        <rect x="30" y="18" width="2" height="12" rx="1" fill="white" />
        <rect x="25" y="23" width="12" height="2" rx="1" fill="white" />

        {/* ── Wordmark ── */}
        {/* "Medi" — white */}
        <text
          x="50"
          y="34"
          fontFamily="Syne, system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="24"
          fill="#FFFFFF"
          letterSpacing="-0.5"
        >
          Medi
        </text>
        {/* "Grab" — teal */}
        <text
          x="116"
          y="34"
          fontFamily="Syne, system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="24"
          fill="#1DB89A"
          letterSpacing="-0.5"
        >
          Grab
        </text>
      </svg>
    </Link>
  );
}
