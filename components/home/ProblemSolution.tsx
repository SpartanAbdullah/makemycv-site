import { CheckCircle2, XCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const problems = [
  {
    title: "The ATS filter eats 75% before anyone reads them.",
    body: "ENOC, Emaar, Majid Al Futtaim, ADCB — every major UAE employer screens with software first. Fancy columns, headers, and icons break the parser. Your CV never reaches a human.",
  },
  {
    title: "Generic templates scream “expat import”.",
    body: "Gulf recruiters spot a Canva/Word template in one glance. Missing visa status, no nationality, no Emirates ID mention — it signals you don’t understand the market.",
  },
  {
    title: "Walls of text lose the 6-second scan.",
    body: "UAE recruiters average 6.2 seconds on a first pass. If your impact isn’t scannable in bullet points with numbers, you’re filtered out before your degree is read.",
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
              className="flex h-full flex-col rounded-xl border border-line bg-sheet p-6 shadow-xs transition-all duration-150 hover:border-red-300 hover:shadow-[0_8px_24px_rgba(220,38,38,0.10)]"
            >
              <XCircle
                size={24}
                className="text-red-500/80"
                strokeWidth={2}
                aria-hidden="true"
              />
              <h3 className="mt-4 font-display text-lg font-bold leading-snug text-ink">
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
