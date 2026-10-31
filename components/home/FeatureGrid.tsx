import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Three differentiators, full-width rows — not a 6-card SaaS grid.
 * Each row: bold claim on the left, the substance on the right.
 * Table-stakes features live in one quiet footnote line below.
 */
const differentiators = [
  {
    claim: "Built for UAE applications — not adapted to them.",
    body: "The builder has a dedicated UAE Essentials step: nationality, visa status, driving licence, notice period, availability — the fields Gulf recruiters expect and Western CV builders don't have. All built in, all optional, so your CV reads local from the first line. Photo included or not — that switch is yours too.",
  },
  {
    claim: "Structured to survive the ATS filter.",
    body: "ENOC, Emaar, Majid Al Futtaim, ADCB — every major UAE employer screens with software before a human reads anything. Our templates keep single-column, parser-safe structure so your CV arrives intact, and you can verify it with the free ATS checker.",
  },
  {
    claim: "Your CV stays on your device.",
    body: "No account, no CV database on our side — your CV is built and saved locally in your browser, and the PDF downloads straight from your device. The optional AI helpers — bullet rewriter, cover letter, ATS checker — send only the text each one needs, listed on our privacy page, nothing else. Nothing to leak, nothing to sell.",
  },
];

export function FeatureGrid() {
  return (
    <section className="bg-paper-2 py-20 md:py-28">
      <Reveal className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Why MakeMyCV"
          title="Built around how UAE hiring actually works."
          subcopy="Three things set it apart. Everything else — live preview, instant PDF — is just table stakes done properly."
        />

        <div className="mt-14 divide-y divide-line border-y border-line">
          {differentiators.map((d) => (
            <article
              key={d.claim}
              className="grid gap-3 py-10 transition-colors duration-150 md:grid-cols-5 md:gap-10 md:py-12"
            >
              <h3 className="font-display text-[24px] font-semibold leading-[1.25] tracking-tight-1-5 text-ink md:col-span-2 md:text-[30px]">
                {d.claim}
              </h3>
              <p className="text-base leading-relaxed text-ink-2 md:col-span-3">
                {d.body}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Also included: live preview as you type · instant PDF &amp; DOCX
          export · free AI bullet rewriter · a cover letter written from your
          CV · no watermark, ever.
        </p>
        {/* Honest-AI claim (backlog B4). Backed by code in makemycv-app: the
            ai-improve, cover-letter and linkedin-message prompts forbid invented
            figures and ask for the literal {{number}} token instead;
            lib/ai/placeholders.ts normalises every variant to that token and
            hasPlaceholder() blocks insert/copy/export while one remains. Keep
            this sentence in step with those prompts. */}
        <p className="mt-3 text-center text-sm text-muted">
          The AI helpers are built not to invent figures: they are instructed to
          use only what is in your CV, and any number they would otherwise add
          is turned into a placeholder for you to fill in. Read every draft
          before you send it.
        </p>
      </Reveal>
    </section>
  );
}
