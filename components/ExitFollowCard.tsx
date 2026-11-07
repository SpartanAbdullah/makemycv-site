"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IconLinkedInGlyph } from "@/components/SocialIcons";
import { track } from "@/lib/analytics";
import { readConsent } from "@/lib/consent";
import { LINKEDIN_URL } from "@/lib/social";

/**
 * ExitFollowCard (2026-11-07): a small "follow us" card for a desktop visitor
 * whose pointer leaves through the top of the window.
 *
 * A non-modal region, not a dialog: it covers nothing that matters, takes no
 * focus and never blocks the page. Phones get no equivalent because they have
 * no reliable exit signal; the footer and AuthorBlock cover them.
 *
 * Holds no personal data: localStorage keeps a timestamp so the card stays
 * quiet for 30 days after being shown and a year after a click.
 *
 * `exit_prompt_shown` is the denominator for the stop rule in
 * docs/human-review-launch-2026-11/PLAN.md, so its name must be in the GTM
 * trigger regex. The link's click uses the existing `cta_click` event.
 */

const SHOWN_KEY = "mmcv_exit_follow_shown_at";
const CLICKED_KEY = "mmcv_exit_follow_clicked_at";
const QUIET_DAYS = 30;
const CLICKED_QUIET_DAYS = 365;
const MIN_MS_ON_PAGE = 15_000;
/* The consent banner is fixed bottom-centre, up to 640px wide. A 320px card at
   right:16 clears it only at this viewport width and above. */
const CLEARS_BANNER_PX = 1320;

/* Pages where tab-switching is normal, or where a follow ask would get in the way. */
const EXCLUDED_PREFIXES = [
  "/support",
  "/thanks",
  "/privacy",
  "/contact",
  "/human-cv-review",
  "/resume-checker",
  "/jd-match",
  "/gratuity-calculator",
  "/notice-period-calculator",
  "/annual-leave-calculator",
  "/resignation-letter-generator",
];

const within = (key: string, days: number) => {
  try {
    const v = window.localStorage.getItem(key);
    return !!v && Date.now() - Date.parse(v) < days * 86400000;
  } catch {
    // Storage unavailable: stay quiet rather than show on every visit.
    return true;
  }
};
const mark = (key: string) => {
  try {
    window.localStorage.setItem(key, new Date().toISOString());
  } catch {
    /* private mode */
  }
};

export const ExitFollowCard = ({ consentBanner }: { consentBanner: boolean }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (EXCLUDED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const arrived = Date.now();
    const onOut = (e: MouseEvent) => {
      if (e.relatedTarget || e.clientY > 0) return;
      if (Date.now() - arrived < MIN_MS_ON_PAGE) return;
      if (within(SHOWN_KEY, QUIET_DAYS) || within(CLICKED_KEY, CLICKED_QUIET_DAYS)) return;
      if (consentBanner && readConsent() === null && window.innerWidth < CLEARS_BANNER_PX) return;
      mark(SHOWN_KEY);
      track("exit_prompt_shown", { surface: "exit_card" });
      setOpen(true);
      document.removeEventListener("mouseout", onOut);
    };
    document.addEventListener("mouseout", onOut);
    return () => document.removeEventListener("mouseout", onOut);
  }, [pathname, consentBanner]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      role="region"
      aria-label="Follow MakeMyCV"
      data-exit-follow-card
      className="fixed bottom-4 right-4 z-[900] w-[320px] rounded-2xl border border-line bg-sheet p-4 shadow-float"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-snug text-ink">
          Before you go: follow MakeMyCV on LinkedIn for UAE job tips.
        </p>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="-mr-2 -mt-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted hover:bg-paper-2 hover:text-ink"
        >
          ✕
        </button>
      </div>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-event="cta_click"
        data-cta-id="social_linkedin"
        data-cta-location="exit_card"
        onClick={() => {
          mark(CLICKED_KEY);
          close();
        }}
        className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-deep"
      >
        <IconLinkedInGlyph className="h-4 w-4" />
        Follow on LinkedIn
      </a>
    </div>
  );
};
