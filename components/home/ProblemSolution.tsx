import { CheckCircle2, XCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const problems = [
  {
    title: "The ATS filter eats 75% before anyone reads them.",
    body: "ENOC, Emaar, Majid Al Futtaim, ADCB — every major UAE employer screens with software first. Fancy columns, headers, and icons break the parser. Your CV never reaches a human.",
  },
  {
    title: "Generic templates scream \u201Cexpat import\u201D.",
    body: "Gulf recruiters spot a Canva/Word template in one glance. Missing visa status, no nationality, no Emirates ID mention — it signals you don\u2019t understand the market.",
  },
  {
    title: "Walls of text lose the 6-second scan.",
    body: "UAE recruiters average 6.2 seconds on a first pass. If your impact isn\u2019t scannable in bullet points with numbers, you\u2019re filtered out before your degree is read.",
  },
];

export function ProblemSolution() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Why most CVs fail in the UAE."
          subcopy="It\u2019s rarely about your experience. It\u2019s about how your CV is read — first by software, then by a recruiter with 40 other tabs open."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {problems.map((p) => (
            <article
              key={p.title}
              className="flex h-full flex-col rounded-2xl border border-red-100 bg-red-50/40 p-6"
            >
              <XCircle
                size={28}
                className="text-red-500"
                strokeWidth={2}
                aria-hidden="true"
              />
              <h3 className="mt-4 font-display text-lg font-bold leading-snug text-slate-900">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {p.body}
              </p>
            </article>
          ))}
        </div>

        {/* Solution banner */}
        <div className="mt-6 flex items-start gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 md:items-center md:p-8">
          <CheckCircle2
            size={32}
            className="shrink-0 text-emerald-600"
            strokeWidth={2}
            aria-hidden="true"
          />
          <div>
            <p className="font-display text-lg font-bold text-slate-900 md:text-xl">
              MakeMyCV solves all three — automatically.
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 md:text-base">
              ATS-parseable structure. UAE-native fields. Recruiter-scannable
              layout. You fill it in. We handle the rest.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
