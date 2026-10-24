"use client";

import { useState } from "react";
import { APP_URL } from "@/lib/seo";
import { track } from "@/lib/analytics";
import { useClientValue } from "@/components/consent/useClientValue";

/**
 * EmailSignup (2026-10-24) — the marketing site's opt-in for UAE job-search
 * tips. Posts cross-origin to the app's /api/subscribe (which owns the list,
 * the double opt-in and the unsubscribe flow), so the site never touches a
 * database key.
 *
 * Renders nothing unless NEXT_PUBLIC_EMAIL_SIGNUP=1 (set only once Supabase
 * + Resend exist on the app) and hides itself after a successful send on this
 * browser (mmcv_subscribed_at). The consent sentence here must stay in step
 * with CONSENT_TEXT in makemycv-app/lib/feedback/subscribe.ts — bump
 * CONSENT_TEXT_VERSION there if it changes.
 */

const ENABLED = process.env.NEXT_PUBLIC_EMAIL_SIGNUP === "1";
const KEY = "mmcv_subscribed_at";

export const EmailSignup = ({ source, compact = false }: { source: "blog" | "thanks"; compact?: boolean }) => {
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  // Browser-only read; false on the server and the first paint.
  const show = useClientValue(() => ENABLED && !window.localStorage.getItem(KEY), false);

  if (!show && phase === "idle") return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phase === "sending") return;
    setPhase("sending");
    try {
      const res = await fetch(`${APP_URL}/api/subscribe`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      if (res.ok) {
        try {
          window.localStorage.setItem(KEY, new Date().toISOString());
        } catch {
          /* private mode */
        }
        track("email_subscribe", { source });
        setPhase("sent");
      } else {
        setPhase("failed");
      }
    } catch {
      setPhase("failed");
    }
  };

  return (
    <div className={`rounded-2xl border border-line bg-sheet ${compact ? "p-5" : "p-6 md:p-8"} text-left`}>
      {phase === "sent" ? (
        <p className="text-base text-ink">Check your inbox — one tap to confirm, and you&apos;re in.</p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-3">
          <p className="font-display text-lg font-bold text-ink">UAE job-search tips, by email</p>
          <label htmlFor={`email-${source}`} className="text-sm leading-relaxed text-muted">
            About twice a month. Unsubscribe with one click, any time. We never share your address.
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id={`email-${source}`}
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="min-w-0 flex-1 rounded-full border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <button type="submit" disabled={phase === "sending"} className="btn-primary px-6 py-3 text-base font-semibold text-white">
              {phase === "sending" ? "Sending…" : "Send me tips"}
            </button>
          </div>
          {phase === "failed" && <p className="text-sm text-muted">Didn&apos;t go through — please try again later.</p>}
        </form>
      )}
    </div>
  );
};
