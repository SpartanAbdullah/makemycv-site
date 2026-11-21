import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, ScanSearch, X } from "lucide-react";
import { buildPageMetadata, APP_URL, canonicalUrl } from "@/lib/seo";
import { ctaAttrs } from "@/lib/inline-cta";
import { faqPageSchema } from "@/lib/seo-schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { AiAnswer } from "@/components/seo/AiAnswer";
import { ReadNext } from "@/components/seo/ReadNext";
import {
  ROLE_EXAMPLES,
  SOURCES_CHECKED,
  getRoleExample,
  roleQuestion,
  rolePath,
} from "@/lib/cv-role-examples";

/**
 * Role-specific CV example pages (growth roadmap 2026-11, item 16: a ten-page
 * pilot, judged in Search Console after 28 days). Everything a page says comes
 * from lib/cv-role-examples.ts; this file is only the layout. Slugs outside
 * that file 404 rather than render on demand.
 */
export const dynamicParams = false;

type Props = { params: Promise<{ role: string }> };

export function generateStaticParams() {
  return ROLE_EXAMPLES.map((r) => ({ role: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params;
  const example = getRoleExample(role);
  if (!example) return {};
  return buildPageMetadata({
    title: example.metaTitle,
    description: example.metaDescription,
    path: rolePath(example.slug),
  });
}

export default async function RoleCvExamplePage({ params }: Props) {
  const { role } = await params;
  const example = getRoleExample(role);
  if (!example) notFound();

  const question = roleQuestion(example);
  const ctaId = `cv_example_${example.slug.replace(/-/g, "_")}_build_cv`;
  const others = ROLE_EXAMPLES.filter((r) => r.slug !== example.slug);

  // One FAQPage per page: the quick answer plus the visible FAQ list below.
  const faqSchema = faqPageSchema([
    { q: question, a: example.answer.text },
    ...example.faqs,
  ]);

  // Mirrors the visible breadcrumb trail rendered in the hero.
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "UAE CV Examples",
        item: canonicalUrl("/cv-examples-uae"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${example.role} CV`,
        item: canonicalUrl(rolePath(example.slug)),
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-paper py-14 md:py-18">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 55% at 76% 32%, rgba(14, 124, 74, 0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
              <li>
                <Link href="/" className="hover:text-accent">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li>
                <Link href="/cv-examples-uae" className="hover:text-accent">
                  UAE CV Examples
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li aria-current="page" className="font-medium text-ink">
                {example.role} CV
              </li>
            </ol>
          </nav>
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            {example.sector} · Free to copy
          </p>
          <h1 className="mt-4 text-balance font-display text-[clamp(34px,4vw,52px)] font-bold leading-[1.08] tracking-tight-2 text-ink">
            {example.role} CV Example
            <br />
            <span className="text-accent">for UAE Jobs</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{example.heroSub}</p>
        </div>
      </section>

      {/* Direct answer (schema folded into faqSchema) */}
      <AiAnswer
        question={question}
        lead={example.answer.lead}
        answer={example.answer.text}
        emitSchema={false}
        className="bg-paper pb-12 md:pb-14"
      />

      {/* Weak vs strong bullets */}
      <section className="bg-paper pb-16 md:pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display text-[28px] font-bold leading-[1.1] tracking-tight-2 text-ink md:text-[36px]">
            {example.role} CV bullets: weak vs strong
          </h2>
          <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            These bullets are illustrative, written to show the pattern. They
            are not taken from a real CV, and the numbers are placeholders.
            Copy the structure and replace every fact with your own.
          </p>

          <div className="mt-8 space-y-8">
            {example.bullets.map((b) => (
              <article key={b.weak}>
                <h3 className="font-display text-lg font-bold text-ink">
                  {b.topic}
                </h3>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border-2 border-red-100 bg-red-50/60 p-5">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-red-700">
                      <X size={14} strokeWidth={2.5} /> Weak
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
                      &ldquo;{b.weak}&rdquo;
                    </p>
                  </div>
                  <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/60 p-5">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                      <Check size={14} strokeWidth={2.5} /> Strong
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink">
                      &ldquo;{b.strong}&rdquo;
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  <strong className="text-ink">Why it works:</strong> {b.why}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* UAE Essentials */}
      <section className="bg-paper-2 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-[28px] font-bold leading-[1.1] tracking-tight-2 text-ink md:text-[36px]">
            UAE Essentials for {example.article} {example.role} CV
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            {example.essentialsIntro}
          </p>
          <dl className="mt-8 space-y-4">
            {example.essentials.map((e) => (
              <div key={e.label} className="rounded-2xl bg-sheet p-6 shadow-float">
                <dt className="font-display text-base font-bold text-ink">
                  {e.label}
                </dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-muted">
                  {e.text}
                  {e.link && (
                    <>
                      {" "}
                      <Link
                        href={e.link.href}
                        className="font-medium text-accent underline underline-offset-2"
                      >
                        {e.link.label}
                      </Link>
                      .
                    </>
                  )}
                  {e.sources && e.sources.length > 0 && (
                    <span className="mt-2 block text-[13px] text-muted">
                      Source:{" "}
                      {e.sources.map((s, i) => (
                        <span key={s.url}>
                          {i > 0 && "; "}
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2 hover:text-accent"
                          >
                            {s.label}
                          </a>
                        </span>
                      ))}
                      {" "}(checked {SOURCES_CHECKED}).
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-[28px] font-bold leading-[1.1] tracking-tight-2 text-ink md:text-[36px]">
            Skills an ATS looks for on {example.article} {example.role} CV
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            {example.skillsNote}
          </p>
          <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-ink">
            Usually expected
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {example.skills.must.map((s) => (
              <li
                key={s}
                className="rounded-full border border-accent/25 bg-accent-soft px-3 py-1.5 text-sm font-medium text-accent-deep"
              >
                {s}
              </li>
            ))}
          </ul>
          <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-ink">
            Worth adding if true
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {example.skills.nice.map((s) => (
              <li
                key={s}
                className="rounded-full border border-ink/10 bg-paper-2 px-3 py-1.5 text-sm text-ink-2"
              >
                {s}
              </li>
            ))}
          </ul>

          {/* CTA into the builder */}
          <div className="mt-12 rounded-2xl bg-paper-2 p-8 shadow-float">
            <h2 className="font-display text-2xl font-bold tracking-[-0.015em] text-ink">
              Build your {example.role} CV
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {example.ctaLine} The builder is free, needs no account, and has
              a UAE Essentials step for visa status, notice period and driving
              licence.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display font-bold text-white transition hover:bg-accent-deep"
                {...ctaAttrs(ctaId, "role_example_cta")}
              >
                Build my CV free
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-0.5"
                />
              </a>
              <Link
                href="/resume-checker"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent underline underline-offset-2"
              >
                <ScanSearch size={16} /> Already have a CV? Check it against
                ATS rules
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper-2 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-[28px] font-bold leading-[1.1] tracking-tight-2 text-ink md:text-[36px]">
            {example.role} CV in the UAE: questions, answered
          </h2>
          <dl className="mt-8 space-y-4">
            {example.faqs.map((item) => (
              <div key={item.q} className="rounded-2xl bg-sheet p-6 shadow-float">
                <dt className="font-display text-base font-bold text-ink">
                  {item.q}
                </dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-muted">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ReadNext
        eyebrow="Guides"
        title={`Before you send your ${example.role} CV`}
        slugs={example.guides}
      />

      {/* Other roles */}
      <section className="bg-paper pb-16 md:pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-xl font-bold text-ink">
            More UAE CV examples by role
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {others.map((r) => (
              <li key={r.slug}>
                <Link
                  href={rolePath(r.slug)}
                  className="group flex items-center justify-between rounded-xl bg-paper-2 px-4 py-3 text-[15px] font-medium text-ink transition hover:text-accent"
                >
                  {r.role} CV example
                  <ArrowRight
                    size={15}
                    className="text-muted transition group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            Looking for a sector rather than a job title? See the{" "}
            <Link
              href="/cv-examples-uae"
              className="font-medium text-accent underline underline-offset-2"
            >
              weak vs strong bullets by sector
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
