import { Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { APP_URL } from "@/lib/seo";
import Link from "next/link";

export function CvMakerHero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Faint warm wash — same radial as the homepage hero. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 55% at 76% 32%, rgba(14, 124, 74, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center px-6 py-12 text-center md:px-10 md:py-24 lg:py-[104px] xl:px-14">
        <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent md:text-xs">
          <MapPin size={13} aria-hidden="true" />
          Free CV Maker · Built for Dubai &amp; UAE hiring
        </p>

        <h1 className="mt-6 font-display text-[clamp(40px,5.8vw,72px)] font-bold leading-[1.06] tracking-tight-2 text-ink">
          Free CV Maker for Dubai Jobs
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
          Build an ATS-ready CV in the format Dubai recruiters actually open.
          Visa status, photo optional, clean PDF — five minutes, no sign-up.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            withArrow
            data-event="cv_maker_dubai_cta_click"
            data-cta-location="hero"
          >
            Start Building — Free
          </Button>
          <Link
            href="/templates"
            className="text-sm font-medium text-accent hover:underline underline-offset-4"
          >
            See all templates &rarr;
          </Link>
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            "No sign-up, no watermark",
            "ATS-safe formatting",
            "Your CV stays on your device",
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
    </section>
  );
}
