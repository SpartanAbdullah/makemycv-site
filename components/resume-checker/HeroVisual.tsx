"use client";

import { useEffect, useState } from "react";

// Animated score preview. Counter ticks from 0 → 87 each mount,
// and the arc / number colour shifts red → amber → green to make
// the diagnostic feel live and authentic.
export function HeroVisual() {
  const targetScore = 87;
  const [score, setScore] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setScore(targetScore);
      return;
    }

    const duration = 1800;
    const start = Date.now();
    const interval = setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setScore(Math.round(eased * targetScore));
      if (t >= 1) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const circumference = 2 * Math.PI * 80;
  const dash = (score / 100) * circumference;

  // Colour tiers — red (low), amber (medium), green (high).
  const tier =
    score < 50
      ? { stroke: "#DC2626", text: "#B91C1C", chipBg: "bg-rose-50", chipText: "text-rose-700", chipDot: "bg-rose-500", label: "Needs work" }
      : score < 75
        ? { stroke: "#D97706", text: "#B45309", chipBg: "bg-amber-50", chipText: "text-amber-700", chipDot: "bg-amber-500", label: "Almost there" }
        : { stroke: "#059669", text: "#047857", chipBg: "bg-emerald-50", chipText: "text-emerald-700", chipDot: "bg-emerald-500", label: "Good" };

  const categories = [
    { label: "Content", value: 92, tone: "#059669" },
    { label: "Structure", value: 88, tone: "#059669" },
    { label: "ATS", value: 79, tone: "#D97706" },
    { label: "Design", value: 90, tone: "#059669" },
  ];

  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-blue-100/60 via-white to-blue-50/40" aria-hidden="true" />

      <div
        className="relative rounded-[24px] border border-line bg-paper p-7"
        style={{ boxShadow: "var(--shadow-lg-soft)" }}
      >
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          <span>Your CV · Sample report</span>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-colors duration-300 ${tier.chipBg} ${tier.chipText}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${tier.chipDot}`} /> {tier.label}
          </span>
        </div>

        <div className="mt-6 flex items-center gap-6">
          <svg
            width="180"
            height="180"
            viewBox="0 0 180 180"
            role="img"
            aria-label={`Sample CV score ${score} out of 100`}
          >
            <circle cx="90" cy="90" r="80" fill="none" stroke="#E2E8F0" strokeWidth="12" />
            <circle
              cx="90"
              cy="90"
              r="80"
              fill="none"
              stroke={tier.stroke}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference}`}
              transform="rotate(-90 90 90)"
              style={{ transition: "stroke 300ms ease" }}
            />
            <text
              x="90"
              y="86"
              textAnchor="middle"
              className="font-display"
              fontSize="44"
              fontWeight="800"
              fill={tier.text}
              letterSpacing="-2"
              style={{ transition: "fill 300ms ease" }}
            >
              {score}
            </text>
            <text x="90" y="110" textAnchor="middle" fontSize="12" fill="#64748B" letterSpacing="1">
              / 100
            </text>
          </svg>

          <div className="flex-1 space-y-3">
            {categories.map((c) => (
              <div key={c.label}>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-medium text-slate-700">{c.label}</span>
                  <span className="font-mono font-semibold text-slate-900">{c.value}</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${c.value}%`, background: c.tone }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-paper-2 p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">3 fixes to get to 95+</p>
          <ul className="mt-2 space-y-1.5 text-[13px] text-slate-600">
            <li className="flex gap-2">
              <span className="mt-0.5 text-amber-600">•</span>Add nationality &amp; visa status
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-amber-600">•</span>Replace 2 passive verbs with action verbs
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-amber-600">•</span>Quantify 4 achievements with numbers
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
