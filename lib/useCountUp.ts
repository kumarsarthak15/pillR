"use client";

import { useEffect, useRef, useState } from "react";
import { easeOutCubic } from "./utils";

type Options = {
  to: number;
  from?: number;
  duration?: number;
  start?: boolean;
};

export function useCountUp({ to, from = 0, duration = 900, start = false }: Options): number {
  const [value, setValue] = useState<number>(from);
  const rafRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;

    const t0 = performance.now();
    const delta = to - from;

    const tick = (now: number) => {
      const elapsed = now - t0;
      const p = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(p);
      setValue(from + delta * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setValue(to);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, from, to, duration]);

  return value;
}
