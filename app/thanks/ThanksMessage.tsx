"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

/**
 * /thanks doubles as the landing page for the email flows (2026-10-24):
 *   ?subscribed=1        confirmed — welcome
 *   ?subscribed=expired  link too old or already used — ask again
 *   ?unsubscribed=1      off the list
 * Client-side so the page itself stays static.
 */
const Inner = () => {
  const q = useSearchParams();
  const subscribed = q.get("subscribed");
  const unsubscribed = q.get("unsubscribed");
  let text: string | null = null;
  if (subscribed === "1") text = "You're on the list. UAE job-search tips, about twice a month — and one click to leave whenever you like.";
  else if (subscribed === "expired") text = "That confirmation link has expired or was already used. Sign up again below and tap the new link within a week.";
  else if (unsubscribed === "1") text = "You're off the list. No more emails from us — and no hard feelings.";
  if (!text) return null;
  return (
    <p role="status" className="mx-auto mt-6 max-w-xl rounded-2xl border border-line bg-sheet px-5 py-4 text-base text-ink">
      {text}
    </p>
  );
};

export const ThanksMessage = () => (
  <Suspense fallback={null}>
    <Inner />
  </Suspense>
);
