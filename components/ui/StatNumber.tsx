"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Formatter hook — use for decimals like 6.2 */
  decimals?: number;
  durationMs?: number;
  className?: string;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function formatNumber(n: number, decimals: number): string {
  const fixed = n.toFixed(decimals);
  if (decimals === 0) {
    return Number(fixed).toLocaleString("en-US");
  }
  return fixed;
}

export function StatNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  durationMs = 1200,
  className = "",
}: Props) {
  const [display, setDisplay] = useState<number>(
    () => (prefersReducedMotion() ? value : 0),
  );
  const ref = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const from = 0;
            const to = value;
            const tick = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(1, elapsed / durationMs);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(from + (to - from) * eased);
              if (progress < 1) requestAnimationFrame(tick);
              else setDisplay(to);
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className}`.trim()}>
      {prefix}
      {formatNumber(display, decimals)}
      {suffix}
    </span>
  );
}
