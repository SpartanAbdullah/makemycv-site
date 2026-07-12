"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * One subtle fade-in per section (opacity + 10px rise, 0.3s).
 *
 * Progressive enhancement only: content is rendered visible on the server
 * and is hidden *after* hydration, and only when it is genuinely below the
 * fold — so crawlers, no-JS visitors, and above-fold content never see a
 * hidden state. Honors prefers-reduced-motion.
 *
 * Implementation note: the reveal classes are applied straight to the DOM
 * node (no React state) — this is an animation-only concern, avoids any
 * re-render, and React never rewrites the className since nothing here
 * triggers a render.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    // Already (nearly) on screen — don't flash it out and back in.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.classList.add("reveal-init");
    const show = () => {
      el.classList.add("reveal-in");
      el.classList.remove("reveal-init");
    };

    // Safety net: if the observer NEVER fires (throttled/background
    // renderers, embedded webviews), reveal anyway — content must never
    // stay invisible. Any callback at all proves the observer is alive,
    // so the first one (even a non-intersecting initial report) disarms
    // the failsafe and the reveal then waits for real intersection.
    const failsafe = window.setTimeout(show, 2500);
    const io = new IntersectionObserver(
      (entries) => {
        window.clearTimeout(failsafe);
        if (entries.some((e) => e.isIntersecting)) {
          show();
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

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
