import { Lock, Highlighter, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * JdMatchFinalCTA — closes the JD Match page. CTA lands in the builder
 * (app.makemycv.ae): you build or import a CV first, then paste a job to match.
 */
export function JdMatchFinalCTA() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, #0a0f1e 0%, #111827 50%, #0a0f1e 100%)",
      }}
    >
      <div className="hero-spotlight" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <h2 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight-2 text-white md:text-5xl">
          See how your CV matches your next UAE job.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300 md:text-xl">
          Build or import your CV, paste the job description, and read exactly
          where you stand — green for covered, amber for the gaps. Free.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            href="https://app.makemycv.ae"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            withArrow
            data-event="jd_match_cta_click"
            data-cta-location="page-final"
          >
            Build &amp; match my CV — Free
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Highlighter size={14} className="text-blue-400" />
            Green/amber heatmap on the real job ad
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Lock size={14} className="text-blue-400" />
            Your CV stays in your browser
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} className="text-blue-400" />
            UAE-optimised
          </span>
        </div>
      </div>
    </section>
  );
}
