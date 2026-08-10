/**
 * Analytics transport.
 *
 * GA4 on this site is delivered by Google Tag Manager (container GTM-5H2LMVJT),
 * NOT by a direct gtag install. That distinction decides how events must be
 * sent, and getting it wrong is silent:
 *
 *   `window.gtag` DOES NOT EXIST HERE. The global `gtag()` function comes from
 *   the manual gtag.js install snippet — `function gtag(){dataLayer.push(arguments)}`
 *   — which this site has never run. GTM injects gtag.js itself but never
 *   defines that wrapper. Any `window.gtag(...)` call is therefore a no-op.
 *
 * That is not hypothetical: the delegated [data-event] dispatcher in
 * app/layout.tsx guarded on `typeof window.gtag !== 'function'` and returned
 * early on every single click from the day it shipped. All 21 CTA call sites
 * across the site recorded nothing, which is why the 10 Aug 2026 GA4 audit
 * found seven event types, all Google automatics, and zero custom events.
 *
 * The correct transport is a dataLayer push. GTM picks it up with a Custom
 * Event trigger keyed on the `event` property and forwards it to GA4.
 *
 * IMPORTANT — this is only half the pipeline. A push with no matching trigger
 * and GA4 Event tag inside the container goes nowhere: the code looks right,
 * the build passes, and GA4 stays empty. Every event name sent from here needs
 * a counterpart configured AND PUBLISHED in GTM.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Push a custom event to the GTM dataLayer.
 *
 * Safe to call from anywhere: it no-ops during SSR and when the container is
 * absent (localhost and preview deploys, where NEXT_PUBLIC_GTM_ID is unset by
 * design — see app/layout.tsx — or when an ad blocker has removed GTM).
 * Analytics must never throw into product code.
 *
 * Never pass PII. No names, emails, phone numbers or CV content — parameters
 * are enums, counts and outcomes only.
 */
export function track(
  event: string,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
