"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * One subtle fade-in per section (opacity + 10px rise, 0.3s).
 *
 * Progressive enhancement only: content is rendered visible on the server
 * and is hidden *after* hydration, and only when it is genuinely below the
 * fold — so crawlers, no-JS visitors, and above-fold content never see a
 * hidden state. Honors prefers-reduced-motion.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    // Already (nearly) on screen — don't flash it out and back in.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setState("hidden");
    // Safety net: if the observer never fires (throttled/background renderers,
    // embedded webviews), reveal anyway — content must never stay invisible.
    const failsafe = window.setTimeout(() => setState("shown"), 2500);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          window.clearTimeout(failsafe);
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);

  const cls =
    state === "hidden" ? "reveal-init" : state === "shown" ? "reveal-in" : "";

  return (
    <div ref={ref} className={`${cls} ${className}`.trim()}>
      {children}
    </div>
  );
}
