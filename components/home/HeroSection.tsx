import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CvPreviewCard } from "./CvPreviewCard";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Faint warm wash behind the document — the only decoration here. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 78% 18%, rgba(14, 124, 74, 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 py-20 md:py-24 lg:grid-cols-5 lg:gap-10">
        {/* Left — copy block (3/5) */}
        <div className="text-center lg:col-span-3 lg:text-left">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            <MapPin size={13} />
            Built for Dubai, Abu Dhabi &amp; GCC hiring
          </p>

          <h1 className="mt-5 font-display text-[40px] font-bold leading-[1.06] tracking-tight-2 text-ink md:text-[52px] lg:text-[56px]">
            Land the UAE job.
            <br />
            Start with a CV recruiters{" "}
            <span className="text-accent">actually open.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted lg:mx-0">
            Recruiters in Dubai spend 6 seconds per CV. Ours are built to
            survive that — ATS-clean, visa-ready, and designed for the Gulf
            market.
          </p>

          {/* Single primary CTA; templates as a quiet secondary path. */}
          <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row lg:justify-start">
            <Button
              href="https://app.makemycv.ae"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              withArrow
              data-event="home_hero_cta_click"
            >
              Build My CV — Free
            </Button>
            <a
              href="/templates"
              className="text-sm font-semibold text-ink-2 underline-offset-4 transition-colors duration-150 hover:text-accent hover:underline"
              data-event="home_hero_templates_click"
            >
              or browse the templates first
            </a>
          </div>

          {/* Trust woven into copy — no badge strip. Verifiable facts only. */}
          <p className="mt-7 text-sm leading-relaxed text-muted">
            Free, no sign-up, no watermark. Your data never leaves your
            browser.
          </p>
          <p className="mt-1.5 text-[13px] text-muted">
            Built for the 2026 UAE hiring season.
          </p>
        </div>

        {/* Right — the product itself: a filled CV document (2/5) */}
        <div className="lg:col-span-2">
          <div className="mx-auto max-w-sm lg:max-w-none">
            <CvPreviewCard />
            <p className="mt-4 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
              The Classic template — ATS-safe, visa-ready
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
