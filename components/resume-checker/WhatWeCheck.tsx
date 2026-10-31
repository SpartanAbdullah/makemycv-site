import Link from "next/link";
import { FileText, LayoutList, ScanSearch, Ruler, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  CHECK_COUNT,
  checkFamilies,
  type CheckFamilyId,
} from "@/lib/checkerChecklist";

/**
 * B2 — the itemised "what the checker looks at" section, server-rendered.
 *
 * The count and the rule families come from lib/checkerChecklist.ts — the one
 * place on this site that states what the app's scoring engine checks. That
 * module documents the contract with the app
 * (GET app.makemycv.ae/api/resume-checker/checklist) and the CI script that
 * catches drift (`npm run check:checklist`). Edit the numbers and the wording
 * there, not here; this file only decides how they look.
 */

const familyIcons: Record<CheckFamilyId, LucideIcon> = {
  content: FileText,
  sections: LayoutList,
  atsEssentials: ScanSearch,
  design: Ruler,
};

export function WhatWeCheck() {
  return (
    <section id="what-we-check" className="relative bg-paper-2 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              The scan
            </p>
            <h2 className="mt-4 font-display text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-ink md:text-[48px]">
              What the checker looks at.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-muted">
            Four categories, {CHECK_COUNT} individual checks in the current
            rule engine. Every check appears in your report with a good,
            review or error status &mdash; nothing is held back.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {checkFamilies.map((c) => {
            const Icon = familyIcons[c.id];
            return (
              <article
                key={c.id}
                className="group relative rounded-2xl bg-paper p-8 shadow-float"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                    <Icon size={22} strokeWidth={2.25} />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {c.count} checks
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.015em] text-ink">
                  {c.name}
                </h3>
                <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-muted">
                  {c.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-muted">
          <strong className="text-ink">What it doesn&rsquo;t do:</strong> it
          does not match your CV against a specific job ad (that is{" "}
          <Link
            href="/jd-match"
            className="font-semibold text-accent underline underline-offset-2"
          >
            JD Match
          </Link>
          ), it cannot judge fonts, colours or page layout &mdash; it only sees
          the text a parser extracts &mdash; and it does not check for
          nationality, which stays your call to include.
        </p>

        {/* Privacy summary — must stay in step with app/privacy/page.tsx
            ("AI features" and "ATS checker reports" sections) and with the
            app's route (text extracted in the browser, report stored in KV
            with a 24h TTL, rawText never returned to the client). */}
        <div className="mt-10 rounded-2xl border border-line bg-paper p-8">
          <h3 className="flex items-center gap-2 font-display text-xl font-semibold tracking-[-0.015em] text-ink">
            <Lock size={18} className="text-accent" aria-hidden="true" />
            What happens to your file
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Your PDF or DOCX is read in your browser; only the extracted plain
            text is sent to our server. That text goes on to Anthropic (the AI
            provider behind Claude) to be turned into structured fields &mdash;
            under Anthropic&rsquo;s commercial API terms it is not used to train
            their models &mdash; and our fixed scoring rules then run on the
            result. The report, including the parsed CV content and the
            extracted text, is saved under a random, unguessable link so you can
            reopen it, and is deleted automatically after 24 hours. Nothing is
            kept beyond that, nothing is shared with employers or recruiters,
            and the raw text is never sent back to the browser. Want it gone
            sooner? Email us the report link &mdash; details in the{" "}
            <Link
              href="/privacy"
              className="font-semibold text-accent underline underline-offset-2"
            >
              privacy policy
            </Link>
            .
          </p>
        </div>

        <div className="mt-14 flex flex-col items-center gap-5 rounded-[28px] bg-gradient-to-br from-sheet via-sheet to-accent-soft/60 p-10 text-center shadow-float md:flex-row md:justify-between md:text-left">
          <div>
            <h3 className="font-display text-xl font-semibold tracking-[-0.015em] text-ink md:text-2xl">
              See what we&apos;d find in yours.
            </h3>
            <p className="mt-1.5 text-[15px] text-muted">
              Drop your PDF. We&apos;ll hand back every issue in about a minute.
            </p>
          </div>
          <Button
            href="https://app.makemycv.ae/resume-checker"
            size="lg"
            withArrow
            data-event="resume_checker_cta_click"
            data-cta-location="categories"
          >
            Check my CV — Free
          </Button>
        </div>
      </div>
    </section>
  );
}
