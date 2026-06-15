import { Coffee, Heart } from "lucide-react";

/**
 * SupportTip — marketing-site tip surface. Mirrors the in-app TipJar:
 * Ko-fi primary, PayPal secondary, "Tip" wording (never "donation"), and the
 * "Built by Abdullah" trust anchor. Pay-it-forward frame ("keeps it free for
 * the next person"). Amounts are handled on Ko-fi's own page — we don't
 * deep-link an amount.
 *
 * Handles are public, non-secret tipping handles (safe to expose) and match
 * the app's NEXT_PUBLIC_KOFI_USERNAME / NEXT_PUBLIC_PAYPAL_ME_HANDLE defaults.
 */
const KOFI_URL = "https://ko-fi.com/makemycv_ae";
const PAYPAL_URL = "https://paypal.me/Abdullah2431";

export function SupportTip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm-soft ${className}`.trim()}
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
        <Coffee size={24} strokeWidth={2} />
      </span>

      <h3 className="mt-4 font-display text-xl font-bold text-slate-900">
        Tip the maker
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        MakeMyCV is free, with no ads and no paywall. If it helped your job
        search, an optional tip keeps it free for the next person.
      </p>

      {/* Primary — Ko-fi */}
      <a
        href={KOFI_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-brand-blue px-6 py-3.5 text-base font-bold text-white shadow-cta transition-all hover:shadow-cta-hover hover:-translate-y-0.5"
        data-event="support_tip_click"
        data-tip-rail="kofi"
      >
        <Coffee size={20} strokeWidth={2.25} />
        Tip via Ko-fi
      </a>

      {/* Secondary — PayPal */}
      <p className="mt-3 text-sm text-slate-500">
        Prefer PayPal?{" "}
        <a
          href={PAYPAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-blue underline-offset-4 hover:underline"
          data-event="support_tip_click"
          data-tip-rail="paypal"
        >
          Tip via PayPal
        </a>
      </p>

      <p className="mt-5 flex items-center justify-center gap-1.5 text-xs leading-relaxed text-slate-500">
        <Heart size={13} className="shrink-0 text-red-500 fill-red-500" />
        Built by Abdullah, a solo developer in Dubai. Ko-fi accepts cards
        without a PayPal account; tips go directly to him.
      </p>
    </div>
  );
}
