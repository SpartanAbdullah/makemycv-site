import { CheckCircle2, XCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const problems = [
  {
    title: "Software reads your CV before a person does.",
    body: "Many large UAE employers screen with software first. Fancy columns, headers, and icons can break the parser, and a misread CV may never reach a human.",
  },
  // Reworded 2026-11 (product audit, owner-approved). The old body said a CV
  // with "no nationality" "signals you don't understand the market": the
  // builder treats nationality as the candidate's choice, so the site must
  // not present leaving it out as a mistake.
  {
    title: "Generic templates scream “expat import”.",
    body: "A generic template leaves out what UAE recruiters look for first: your visa status, your notice period and where you are based. When those are missing, a recruiter has to ask before they can shortlist you.",
  },
  // Reworded 2026-11: this card said "UAE recruiters average about 7
  // seconds". The figure is from a US eye-tracking study (CLAUDE.md, content
  // guardrails), so it is not attributed to UAE recruiters here. The hero
  // keeps its "7-second scan" brand line.
  {
    title: "Walls of text lose the first skim.",
    body: "Recruiters skim a CV before they read it. If your impact isn’t scannable in short bullet points with numbers, the strongest parts of your experience may never be read.",
  },
];

export function ProblemSolution() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <Reveal className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="The problem"
          title="Why most CVs fail in the UAE."
          subcopy="It’s rarely about your experience. It’s about how your CV is read — first by software, then by a recruiter with 40 other tabs open."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {problems.map((p) => (
            <article
              key={p.title}
              className="flex h-full flex-col rounded-2xl bg-sheet p-6 shadow-float"
            >
              <XCircle
                size={24}
                className="text-red-500/80"
                strokeWidth={2}
                aria-hidden="true"
              />
              <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                {p.body}
              </p>
            </article>
          ))}
        </div>

        {/* Solution banner */}
        <div className="mt-6 flex items-start gap-4 rounded-xl border border-accent/25 bg-accent-soft p-6 md:items-center md:p-8">
          <CheckCircle2
            size={30}
            className="shrink-0 text-accent"
            strokeWidth={2}
            aria-hidden="true"
          />
          <div>
            <p className="font-display text-lg font-bold text-ink md:text-xl">
              MakeMyCV solves all three — automatically.
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-2 md:text-base">
              ATS-parseable structure. UAE-native fields. Recruiter-scannable
              layout. You fill it in. We handle the rest.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
