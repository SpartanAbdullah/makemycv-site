"use client";

import { useState, type KeyboardEvent } from "react";
import { KofiIcon } from "@/components/KofiIcon";
import { KOFI_URL, PAYPAL_URL, markTipped } from "@/components/TipJar";
import { track } from "@/lib/analytics";

/* The /support hero CTA (design handoff 2026-10-24, "Buy me a karak" v2).
   A three-way "how many karaks" picker that changes a reaction line and the
   Ko-fi button label. The count is playful framing only: it is sent as an
   analytics parameter and does NOT pre-fill Ko-fi (the URL is unchanged). */

type Cups = 1 | 3 | 5;

const OPTIONS: ReadonlyArray<{
  cups: Cups;
  label: string;
  note: string;
  reaction: string;
}> = [
  {
    cups: 1,
    label: "1 karak",
    note: "A thank-you sip",
    reaction: "Shukran! That's tonight's server bill sorted.",
  },
  {
    cups: 3,
    label: "3 karaks",
    note: "Fuel for a bug fix",
    reaction:
      "Three karaks — that's a whole evening of fixes and new templates.",
  },
  {
    cups: 5,
    label: "5 karaks",
    note: "A late-night shift",
    reaction: "Five?! Abdullah might actually sleep before 2am this week.",
  },
];

/* Decorative karak cup, pure CSS. The bob/steam keyframes live in
   app/globals.css (.karak-cup / .karak-steam) with a reduced-motion rule.
   Sizes: "big" when an option holds one cup, "md" otherwise, and "sm" on
   phones — at 375px each option is ~85px wide and five md cups (158px with
   gaps) spilled across the neighbouring options. */
type CupSize = "big" | "md" | "sm";
const CUP: Record<
  CupSize,
  {
    w: number; h: number; radius: string;
    handle: { right: number; top: number; w: number; h: number; border: number };
    steam: { left: number; step: number; h: number; w: number };
  }
> = {
  big: { w: 34, h: 40, radius: "3px 3px 12px 12px", handle: { right: -9, top: 9, w: 11, h: 16, border: 3 }, steam: { left: 9, step: 12, h: 14, w: 3 } },
  md: { w: 22, h: 28, radius: "3px 3px 8px 8px", handle: { right: -6, top: 6, w: 8, h: 11, border: 3 }, steam: { left: 5, step: 8, h: 10, w: 3 } },
  sm: { w: 16, h: 20, radius: "2px 2px 6px 6px", handle: { right: -5, top: 4, w: 6, h: 8, border: 2 }, steam: { left: 4, step: 6, h: 7, w: 2 } },
};

const Cup = ({
  index,
  active,
  size,
}: {
  index: number;
  active: boolean;
  size: CupSize;
}) => {
  const c = CUP[size];
  return (
    <span
      aria-hidden="true"
      data-active={active || undefined}
      className="karak-cup relative inline-block"
      style={{ width: c.w, height: c.h, animationDelay: `${index * 0.2}s` }}
    >
      {active &&
        [0, 1].map((i) => (
          <span
            key={i}
            className="karak-steam absolute bottom-full rounded-[3px] bg-line-strong"
            style={{
              left: c.steam.left + i * c.steam.step,
              width: c.steam.w,
              height: c.steam.h,
              animationDelay: `${i * 0.6 + index * 0.15}s`,
            }}
          />
        ))}
      {/* Body: foam on top, karak below */}
      <span
        className="absolute inset-0"
        style={{
          borderRadius: c.radius,
          background: active
            ? "linear-gradient(180deg, var(--color-gold-soft) 0 18%, var(--color-gold-light) 18% 100%)"
            : "linear-gradient(180deg, var(--color-paper-2) 0 18%, var(--color-line) 18% 100%)",
          boxShadow: `inset 0 -3px 0 rgba(127, 97, 31, ${active ? 0.35 : 0.08})`,
        }}
      />
      {/* Handle */}
      <span
        className="absolute rounded-r-lg border-l-0"
        style={{
          right: c.handle.right,
          top: c.handle.top,
          width: c.handle.w,
          height: c.handle.h,
          borderWidth: c.handle.border,
          borderStyle: "solid",
          borderLeftWidth: 0,
          borderColor: active ? "var(--color-gold)" : "var(--color-line-strong)",
        }}
      />
    </span>
  );
};

/* The cup row, twice: md cups from the sm breakpoint up, a wrapping row of
   sm cups below it. One-cup options use the big cup in both. */
const CupRow = ({ count, active }: { count: number; active: boolean }) => (
  <>
    <span className="flex h-[84px] items-end justify-center gap-3 max-sm:hidden">
      {Array.from({ length: count }, (_, k) => (
        <Cup key={k} index={k} active={active} size={count === 1 ? "big" : "md"} />
      ))}
    </span>
    <span className="flex h-[84px] flex-wrap items-end justify-center gap-1 sm:hidden">
      {Array.from({ length: count }, (_, k) => (
        <Cup key={k} index={k} active={active} size={count === 1 ? "big" : "sm"} />
      ))}
    </span>
  </>
);

export function KarakPicker({ context = "support-page" }: { context?: string }) {
  const [cups, setCups] = useState<Cups>(3);
  const selectedIndex = OPTIONS.findIndex((o) => o.cups === cups);
  const current = OPTIONS[selectedIndex];
  const ctaLabel = cups === 1 ? "Buy me a karak" : `Buy me ${cups} karaks`;

  // Radiogroup keyboard contract: arrows move and select, Home/End jump.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let next = selectedIndex;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      next = (selectedIndex + 1) % OPTIONS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      next = (selectedIndex - 1 + OPTIONS.length) % OPTIONS.length;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = OPTIONS.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setCups(OPTIONS[next].cups);
    e.currentTarget
      .querySelectorAll<HTMLButtonElement>('[role="radio"]')
      [next]?.focus();
  };

  const handleKofiClick = () => {
    track("tip_click", { rail: "kofi", context, cups });
    markTipped();
  };
  const handlePaypalClick = () => {
    track("tip_click", { rail: "paypal", context, cups });
    markTipped();
  };

  return (
    <div
      data-context={context}
      className="relative mx-auto mt-12 max-w-[640px] overflow-hidden rounded-3xl bg-sheet p-6 shadow-[var(--shadow-float),0_24px_48px_rgba(11,15,12,0.06)] md:p-8"
    >
      {/* Top gradient bar, carried over from TipJar */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, #0E7C4A 0%, #C49A48 50%, #0E7C4A 100%)",
        }}
      />

      <p
        id="karak-prompt"
        className="text-center text-[22px] font-semibold tracking-[-0.01em] text-ink"
      >
        How many karaks did your CV earn?
      </p>

      <div
        role="radiogroup"
        aria-labelledby="karak-prompt"
        onKeyDown={onKeyDown}
        className="mt-6 grid grid-cols-3 gap-3"
      >
        {OPTIONS.map((o) => {
          const selected = o.cups === cups;
          return (
            <button
              key={o.cups}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              data-cups={o.cups}
              onClick={() => setCups(o.cups)}
              className={`flex flex-col items-center gap-1.5 rounded-2xl px-2.5 pt-4 pb-[18px] text-center transition-all duration-200 ease-in-out ${
                selected
                  ? "-translate-y-0.5 bg-accent-soft shadow-[0_0_0_2px_var(--color-accent)]"
                  : "bg-paper shadow-[0_0_0_1px_var(--color-line)] hover:-translate-y-0.5 hover:bg-sheet hover:shadow-[0_0_0_1px_var(--color-line-strong)]"
              }`}
            >
              <CupRow count={o.cups} active={selected} />
              <span className="text-lg font-bold text-ink">{o.label}</span>
              <span className="text-[13px] leading-[1.4] text-muted [text-wrap:balance]">
                {o.note}
              </span>
            </button>
          );
        })}
      </div>

      <p
        aria-live="polite"
        className="mt-5 min-h-6 text-center text-[15px] leading-normal text-ink-2"
      >
        {current.reaction}
      </p>

      {/* Primary CTA — Ko-fi. Same URL, tracking and markTipped() as TipJar. */}
      <a
        href={KOFI_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleKofiClick}
        data-event="tipjar_kofi_click"
        data-context={context}
        data-cups={cups}
        className="btn-primary mt-5 flex w-full items-center justify-center gap-2.5 px-6 py-4 text-center text-lg font-semibold text-white transition-all duration-200"
      >
        <KofiIcon size={22} />
        <span>{ctaLabel}</span>
      </a>

      {/* Secondary — PayPal */}
      <a
        href={PAYPAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handlePaypalClick}
        data-event="tipjar_paypal_click"
        data-context={context}
        data-cups={cups}
        className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-full bg-sheet px-6 py-3.5 text-[15px] font-semibold text-ink shadow-float transition-all duration-200 ease-in-out hover:-translate-y-px hover:shadow-float-hover"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- 18px static mark, no optimisation needed */}
        <img
          src="/paypal/paypal-mark.svg"
          alt=""
          aria-hidden="true"
          width={18}
          height={18}
        />
        <span>Tip via PayPal instead</span>
      </a>

      <p className="mt-5 border-t border-line pt-4 text-center text-xs leading-relaxed text-muted">
        Ko-fi accepts cards without a PayPal account; tips go directly to
        Abdullah. No pressure either way &mdash; the tool stays free.
      </p>
    </div>
  );
}

export default KarakPicker;
