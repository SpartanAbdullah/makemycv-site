import { Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CvPhotoCard } from "./CvPhotoCard";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Faint warm wash behind the document — the only decoration here. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 55% at 76% 32%, rgba(14, 124, 74, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Wide section, narrow readable text: the container runs near
          full-viewport; the copy column itself is capped at ~60ch. */}
      <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-16 px-6 py-20 md:px-10 md:py-24 lg:grid-cols-12 lg:gap-10 lg:py-[104px] xl:px-14">
        {/* Left — copy block */}
        <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent md:text-xs">
            <MapPin size={13} />
            Built for Dubai, Abu Dhabi &amp; GCC hiring
          </p>

          {/* Two-tier heading: one massive promise line, then the hook at
              display weight. One h1 for semantics/SEO, two visual tiers. */}
          <h1 className="mt-6 font-display tracking-tight-2 text-ink">
            <span className="block text-balance text-[clamp(46px,5.8vw,84px)] font-bold leading-[1.02]">
              Land the <span className="text-accent">UAE job.</span>
            </span>
            <span className="mt-5 block text-balance text-[clamp(21px,2.1vw,30px)] font-semibold leading-snug text-ink-2">
              Start with a CV recruiters actually open.
            </span>
          </h1>

          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-muted md:text-xl">
            Recruiters in Dubai spend 6 seconds per CV. Ours are built to
            survive that — ATS-clean, visa-ready, and designed for the Gulf
            market.
          </p>

          {/* One CTA. Nothing competes with it. */}
          <div className="mt-10">
            <Button
              href="https://app.makemycv.ae"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              withArrow
              className="md:px-10 md:py-5 md:text-xl"
              data-event="home_hero_cta_click"
            >
              Build My CV — Free
            </Button>
          </div>

          {/* Trust woven in below the button — facts, not badges. */}
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
            {[
              "Free, no sign-up",
              "No watermark",
              "Your data never leaves your browser",
            ].map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 text-sm text-muted"
              >
                <Check size={15} className="shrink-0 text-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — the product itself: a filled UAE-format CV */}
        <div className="lg:col-span-5">
          <div className="mx-auto max-w-[400px] lg:max-w-[460px]">
            <CvPhotoCard />
            <p className="mt-7 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
              The Professional template — photo, visa-ready, ATS-safe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
