"use client";

import { KofiIcon } from "@/components/KofiIcon";

interface TipJarProps {
  variant?: "full" | "compact";
  context?: string;
  onDismiss?: () => void;
}

const KOFI_USERNAME =
  process.env.NEXT_PUBLIC_KOFI_USERNAME || "makemycv_ae";
const PAYPAL_HANDLE =
  process.env.NEXT_PUBLIC_PAYPAL_ME_HANDLE || "Abdullah2431";

const KOFI_URL = `https://ko-fi.com/${KOFI_USERNAME}`;
const PAYPAL_URL = `https://paypal.me/${PAYPAL_HANDLE}`;

function markTipped() {
  try {
    localStorage.setItem("mmcv_tipped_at", new Date().toISOString());
  } catch {
    // localStorage unavailable (private mode, quota) — silent fail is fine
  }
}

export const TipJar = ({
  variant = "full",
  context,
  onDismiss,
}: TipJarProps) => {
  const isCompact = variant === "compact";

  const handleKofiClick = () => {
    markTipped();
    if (onDismiss) setTimeout(onDismiss, 500);
  };

  const handlePaypalClick = () => {
    markTipped();
    if (onDismiss) setTimeout(onDismiss, 500);
  };

  return (
    <div
      data-context={context}
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card-blue card-lift ${
        isCompact ? "p-6" : "p-6 md:p-8"
      }`}
    >
      {!isCompact && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, #2563eb 0%, #4f46e5 50%, #2563eb 100%)",
          }}
        />
      )}

      <div className="flex items-baseline justify-between gap-3">
        <h3
          className={`font-display font-bold text-slate-900 ${
            isCompact ? "text-lg" : "text-2xl md:text-3xl"
          }`}
        >
          Support a free tool
        </h3>
        {!isCompact && (
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#2563eb]">
            Tip Jar
          </span>
        )}
      </div>

      <p
        className={`mt-2 text-brand-muted ${
          isCompact ? "text-sm" : "text-base"
        }`}
      >
        MakeMyCV is free for everyone. Tips help cover hosting and AI costs.
      </p>

      {/* Primary CTA — Ko-fi */}
      <a
        href={KOFI_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleKofiClick}
        data-event="tipjar_kofi_click"
        data-context={context}
        className={`mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-xl btn-primary text-center font-bold text-white transition-all ${
          isCompact ? "px-5 py-3 text-base" : "px-6 py-4 text-lg"
        }`}
      >
        <KofiIcon size={isCompact ? 20 : 22} />
        <span>Tip via Ko-fi</span>
      </a>

      {/* Secondary — PayPal */}
      <div className="mt-4 text-center">
        <a
          href={PAYPAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handlePaypalClick}
          data-event="tipjar_paypal_click"
          data-context={context}
          className="text-sm font-medium text-slate-600 underline-offset-4 hover:text-[#2563eb] hover:underline"
        >
          Prefer PayPal? Tip via PayPal instead &rarr;
        </a>
      </div>

      {/* Reassurance */}
      <p className="mt-5 text-center text-xs leading-relaxed text-slate-500">
        Built by Abdullah, a solo developer in Dubai. Ko-fi accepts cards
        without a PayPal account; tips go directly to him.
      </p>
    </div>
  );
};

export default TipJar;
