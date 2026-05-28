"use client";

import Link from "next/link";
import Image from "next/image";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** If true, preloads the logo image (use for above-the-fold placement) */
  priority?: boolean;
};

const HEIGHTS: Record<NonNullable<Props["size"]>, number> = {
  sm: 28,
  md: 36,
  lg: 48,
};

/**
 * MediGrab logo — uses the actual brand PNG (pill-icon.png) for the icon
 * mark and renders the "MediGrab" wordmark as styled text so it adapts
 * to the dark background (white "Medi" + teal "Grab").
 */
export function Logo({ className = "", size = "md", priority = false }: Props) {
  const h = HEIGHTS[size];
  // Pill icon aspect ratio from the cropped PNG: 585 × 417 ≈ 1.4:1
  const iconW = Math.round(h * (585 / 417));

  return (
    <Link
      href="/"
      aria-label="MediGrab — fast medicine delivery, home"
      className={`inline-flex items-center gap-2 flex-shrink-0 ${className}`}
    >
      <Image
        src="/pill-icon.png"
        alt=""
        width={iconW}
        height={h}
        priority={priority}
        className="flex-shrink-0"
      />
      <span className="font-heading font-extrabold tracking-tight leading-none" style={{ fontSize: h * 0.6 }}>
        <span className="text-white">Medi</span>
        <span className="text-medigrab-teal">Grab</span>
      </span>
    </Link>
  );
}
