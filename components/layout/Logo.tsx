import Image from "next/image";
import Link from "next/link";

const NATURAL_W = 333;
const NATURAL_H = 192;

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
};

const HEIGHTS: Record<NonNullable<Props["size"]>, number> = {
  sm: 36,
  md: 44,
  lg: 64
};

export function Logo({ className = "", size = "md", priority = false }: Props) {
  const h = HEIGHTS[size];
  const w = Math.round((NATURAL_W / NATURAL_H) * h);
  return (
    <Link
      href="/"
      aria-label="PillR.in — fast medicine delivery, home"
      className={`inline-flex items-center ${className}`}
      style={{ height: h }}
    >
      <Image
        src="/logo.png"
        alt="PillR.in"
        width={w}
        height={h}
        priority={priority}
        sizes={`${w}px`}
        style={{ width: w, height: h }}
        className="object-contain"
      />
    </Link>
  );
}
