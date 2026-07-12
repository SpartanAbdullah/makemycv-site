import { Mail, MapPin, Phone } from "lucide-react";

/**
 * Server-rendered mini CV — NOT an image.
 * Visual facsimile of the Classic template, styled as an actual sheet of
 * paper (stacked-page depth, tight corner radius, neutral document shadow).
 * Kept in HTML/CSS for perf + crisp scaling.
 */
export function CvPreviewCard() {
  return (
    <div className="relative">
      {/* Second sheet peeking out behind — stacked-paper depth. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-md border border-line bg-sheet/70"
      />

      {/* The document itself. */}
      <div className="relative rounded-md border border-line bg-sheet p-6 shadow-sheet md:p-7">
        {/* Header */}
        <div className="border-b border-line pb-4">
          <p className="font-display text-xl font-bold tracking-tight-1-5 text-ink">
            SARAH AL-RASHIDI
          </p>
          <p className="text-sm font-medium text-ink-2">
            Senior Marketing Manager
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin size={11} /> Dubai, UAE
            </span>
            <span className="inline-flex items-center gap-1">
              <Mail size={11} /> sarah.r@email.com
            </span>
            <span className="inline-flex items-center gap-1">
              <Phone size={11} /> +971 50 000 0000
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent-deep">
              Residence Visa
            </span>
            <span className="rounded-full bg-paper-2 px-2 py-0.5 text-[10px] font-semibold text-ink-2">
              UAE Driving Licence
            </span>
          </div>
        </div>

        {/* Experience */}
        <div className="mt-4">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">
            Experience
          </p>
          <div className="mt-2">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-semibold text-ink">
                Senior Marketing Manager
              </p>
              <p className="shrink-0 text-[11px] text-muted">2021 – Present</p>
            </div>
            <p className="text-xs text-muted">Emirates Group · Dubai</p>
            <ul className="mt-1.5 space-y-0.5 text-[11px] leading-snug text-ink-2">
              <li>
                · Led GCC digital campaigns reaching{" "}
                <span className="font-semibold text-ink">2.1M users</span>,
                +45% YoY engagement
              </li>
              <li>
                · Cut CPA <span className="font-semibold text-ink">32%</span>{" "}
                via paid-search restructure
              </li>
              <li>· Managed AED 4.2M annual marketing budget across 6 markets</li>
            </ul>
          </div>
        </div>

        {/* Education */}
        <div className="mt-3.5">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">
            Education
          </p>
          <div className="mt-1.5 flex items-baseline justify-between gap-2">
            <p className="text-sm font-semibold text-ink">BBA, Marketing</p>
            <p className="shrink-0 text-[11px] text-muted">2016</p>
          </div>
          <p className="text-xs text-muted">American University of Sharjah</p>
        </div>

        {/* Skills */}
        <div className="mt-3.5">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">
            Skills
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {[
              "Digital Marketing",
              "Google Ads",
              "HubSpot",
              "Brand Strategy",
              "GA4",
              "Arabic",
            ].map((s) => (
              <span
                key={s}
                className="rounded-full bg-paper-2 px-2 py-0.5 text-[11px] text-ink-2"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
