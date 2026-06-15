import { CheckCircle2, CreditCard, RefreshCw, Droplet } from "lucide-react";

/**
 * NoBaitBanner — answers the resume-builder category's #1 complaint head-on:
 * "free to build, pay/subscribe to download". We're free to build AND download.
 * Slim emerald-tinted band placed right under the hero for an immediate trust win.
 */
const promises = [
  { icon: CreditCard, label: "No credit card" },
  { icon: RefreshCw, label: "No subscription" },
  { icon: Droplet, label: "No watermark" },
];

export function NoBaitBanner() {
  return (
    <section className="border-y border-emerald-100 bg-emerald-50/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 py-7 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-start gap-3 md:items-center">
          <CheckCircle2
            size={26}
            className="mt-0.5 shrink-0 text-emerald-600 md:mt-0"
            strokeWidth={2.25}
            aria-hidden="true"
          />
          <p className="text-[15px] leading-snug text-slate-800 md:text-base">
            <span className="font-bold text-slate-900">
              Free to build. Free to download.
            </span>{" "}
            Most builders let you build free, then charge to export. We don&rsquo;t —
            tips are optional.
          </p>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {promises.map((p) => (
            <li
              key={p.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold text-emerald-800"
            >
              <p.icon size={14} strokeWidth={2.25} />
              {p.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
