import { Highlighter, ListChecks, FileDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HeatmapPreview } from "@/components/jd-match/HeatmapPreview";

const points = [
  {
    icon: Highlighter,
    title: "A heatmap on the real job ad",
    body: "Paste any job description — we light it green where your CV already covers it, amber where there's a gap.",
  },
  {
    icon: ListChecks,
    title: "A coach, not a wall of gaps",
    body: "Walks you through the highest-impact fixes one at a time, showing the score lift each one earns.",
  },
  {
    icon: FileDown,
    title: "Tailor & download per job",
    body: "Download a copy focused on that role while your master CV keeps everything. A fresh CV for every application.",
  },
];

/**
 * JdMatchSection — home-page flagship teaser for JD Match. Light section to
 * alternate with the dark hero above it. Reuses the HeatmapPreview visual.
 */
export function JdMatchSection() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-brand-blue">
              New · Free
            </p>
            <h2 className="mt-3 font-display text-[32px] font-bold leading-[1.12] tracking-tight-1-5 text-slate-900 md:text-[42px]">
              JD Match — see how your CV fits the job, before you apply.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Stop guessing why applications go quiet. Paste a UAE job
              description and get an instant match score plus every requirement
              marked matched or missing — then close the gaps honestly.
            </p>

            <ul className="mt-8 space-y-5">
              {points.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                    <p.icon size={20} strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button
                href="https://app.makemycv.ae"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                withArrow
                data-event="home_jd_match_cta_click"
                data-cta-location="home-jd-section"
              >
                Build &amp; match my CV — Free
              </Button>
              <Link
                href="/jd-match"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:underline underline-offset-4"
                data-event="home_jd_match_learn_click"
              >
                How JD Match works
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Visual — heatmap preview on a dark panel so the green/amber reads */}
          <div className="rounded-3xl bg-brand-ink p-6 shadow-lg-soft md:p-8">
            <HeatmapPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
