import { FileCheck2, MapPin, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TrustChip } from "@/components/ui/TrustChip";
import { CvPreviewCard } from "./CvPreviewCard";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, #0a0f1e 0%, #111827 50%, #0a0f1e 100%)",
      }}
    >
      <div className="hero-spotlight" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:py-32 lg:grid-cols-5">
        {/* Left — copy block (3/5) */}
        <div className="text-center lg:col-span-3 lg:text-left">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-blue-400">
            <MapPin size={14} />
            UAE-focused · Built for Dubai, Abu Dhabi &amp; GCC hiring
          </p>

          <h1 className="mt-5 font-display text-[44px] font-extrabold leading-[1.05] tracking-tight-2 text-white md:text-[64px] lg:text-[72px]">
            Land the UAE job.
            <br />
            Start with a CV recruiters{" "}
            <span className="text-blue-400">actually open.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl lg:mx-0">
            Recruiters in Dubai spend 6 seconds per CV. Ours are built to
            survive that — ATS-clean, visa-ready, and designed for the Gulf
            market. Free to build. No sign-up.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
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
            <Button
              href="/templates"
              variant="ghost"
              tone="dark"
              size="lg"
              data-event="home_hero_templates_click"
            >
              See Templates
            </Button>
          </div>

          {/* Trust chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <TrustChip icon={Shield} label="No sign-up" tone="dark" />
            <TrustChip icon={Zap} label="Ready in 5 min" tone="dark" />
            <TrustChip icon={FileCheck2} label="ATS-optimized" tone="dark" />
            <TrustChip icon={MapPin} label="UAE-specific fields" tone="dark" />
          </div>

          {/* Micro-proof */}
          <p className="mt-6 text-sm text-slate-400">
            Used by 12,400+ job seekers across Dubai, Abu Dhabi &amp; Sharjah
            this year.
          </p>
        </div>

        {/* Right — CV preview (2/5) */}
        <div className="lg:col-span-2">
          <div className="mx-auto max-w-sm lg:max-w-none">
            <CvPreviewCard />
          </div>
        </div>
      </div>
    </section>
  );
}
