/**
 * AiAnswer — the reusable "Quick Answer for AI Search" block (Phase B0).
 *
 * Structure engineered for answer engines (ChatGPT, Perplexity, Gemini, Google
 * AI Overview), modelled on Labeeb.ae's highest-leverage pattern:
 *   • a small pill label ("QUICK ANSWER"),
 *   • a question-shaped H2 that mirrors how people prompt AI,
 *   • a boxed, self-contained answer that LEADS with the brand name and a
 *     bolded first clause.
 *
 * Rules for callers (enforced by convention, see the brief §1b item 1):
 *   • `answer` is factual, 40–65 words, entity/geo-dense, NO hype words,
 *     and readable with zero page context.
 *   • `answer` must start with `lead` verbatim (so the bolded opening is a
 *     true prefix and the schema text matches the visible text exactly).
 *
 * Server component — no client hooks, so the answer text and its JSON-LD are
 * present in the initial HTML response (the whole point: if AI can't read it,
 * AI can't cite it).
 *
 * Schema: by default this emits a single-question FAQPage. On pages that
 * already render their own FAQPage (home, /resume-checker, /jd-match) pass
 * `emitSchema={false}` and fold this Q/A into that page's FAQPage instead, so
 * each page ships exactly one FAQPage entity.
 */
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/seo-schema";

type AiAnswerProps = {
  /** Question-shaped heading, e.g. "What is the best free ATS CV checker for UAE jobs?" */
  question: string;
  /** Full answer text (40–65 words). Must start with `lead` verbatim. */
  answer: string;
  /** Opening clause to bold. Must be a prefix of `answer`. Leads with "MakeMyCV…". */
  lead: string;
  /** Pill label. Defaults to "Quick Answer". */
  label?: string;
  /** Emit a single-question FAQPage for this block. Default true. Set false when
   *  the host page folds this Q/A into an existing FAQPage. */
  emitSchema?: boolean;
  /** Optional wrapper class override for section spacing/background. */
  className?: string;
};

export function AiAnswer({
  question,
  answer,
  lead,
  label = "Quick Answer",
  emitSchema = true,
  className = "bg-paper py-14 md:py-16",
}: AiAnswerProps) {
  // Split the answer so the opening clause renders bold without changing the
  // text. If `lead` isn't a real prefix, fall back to the plain answer.
  const rest = answer.startsWith(lead) ? answer.slice(lead.length) : null;

  return (
    <section className={className}>
      {emitSchema && (
        <JsonLd data={faqPageSchema([{ q: question, a: answer }])} />
      )}
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-2xl border border-line bg-paper-2 p-8 shadow-xs md:p-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {label}
          </p>
          <h2
            className="mt-4 font-display font-bold text-ink tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)", lineHeight: 1.2 }}
          >
            {question}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-2 md:text-lg">
            {rest === null ? (
              answer
            ) : (
              <>
                <strong className="font-semibold text-ink">{lead}</strong>
                {rest}
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
