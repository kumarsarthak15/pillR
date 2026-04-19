"use client";

import { ReactNode, useRef } from "react";
import { PillMotion } from "./PillMotion";

interface HeroAnimationProps {
  children: ReactNode;
  ariaLabelledBy?: string;
}

export function HeroAnimation({
  children,
  ariaLabelledBy,
}: HeroAnimationProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      aria-labelledby={ariaLabelledBy}
      className="relative min-h-screen flex items-center overflow-hidden bg-pillr-black"
    >
      <PillMotion containerRef={sectionRef} />
      <div className="relative z-10 w-full pointer-events-none">
        <div className="pointer-events-auto">{children}</div>
      </div>
    </section>
  );
}
