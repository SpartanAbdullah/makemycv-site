import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/seo";
import { ctaAttrs } from "@/lib/inline-cta";

/**
 * Shared server-rendered blocks for the three calculators, built from the
 * calculator-pain research (Reddit/forums/competitor teardowns, 2026-07):
 *  • TrustBadge — we have no email gate/ads; say so (competitors gate PDFs).
 *  • WageBasisExplainer — gratuity & leave use BASIC wage, notice in-lieu
 *    uses FULL wage; users read the difference as a bug unless told.
 *  • SettlementFooter — the estimate is one line of a final settlement that
 *    also includes leave encashment, notice pay, unpaid salary and a ticket,
 *    all due within 14 days (Art. 53), with the free MOHRE complaint path.
 */

export function TrustBadge() {
  return (
    <p className="mb-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-accent/20 bg-accent-soft px-4 py-1.5 text-[13px] font-medium text-accent-deep">
      <ShieldCheck size={14} className="shrink-0" />
      No sign-up · No email · No ads · Nothing stored
    </p>
  );
}

/**
 * NextRoleCta — sits directly under the tool, where the result appears.
 * Search Console (3 months to 2026-10-29) sends the calculators ~42K
 * impressions. In the GA4 landing-page report (Oct 3–30, Hostname as the
 * secondary dimension) the gratuity, notice and leave landings have no row
 * with app.makemycv.ae events and the resignation generator has 2 sessions
 * (96 landed). The only builder link was a card ~75 % down the page.
 * Someone working out gratuity, notice or leave is usually changing jobs,
 * so the CV offer goes next to the number.
 * Tracked as `cta_click` with `<tool>_result_build_cv` / `calculator_result`.
 * The guide link is a plain internal link (blog links stay untracked).
 */
export type CalculatorTool = "gratuity" | "notice" | "leave" | "resignation";

export function NextRoleCta({ tool }: { tool: CalculatorTool }) {
  return (
    <div className="mt-6 rounded-2xl border border-accent/20 bg-accent-soft p-5 md:p-6">
      <p className="font-display text-lg font-bold text-ink">
        Applying for your next role?
      </p>
      <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">
        Build a UAE-format CV &mdash; free. Visa status and availability have
        their own fields, and there is no sign-up.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-cta transition-all duration-200 hover:-translate-y-px hover:shadow-cta-hover hover:brightness-[1.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          {...ctaAttrs(`${tool}_result_build_cv`, "calculator_result")}
        >
          Build my UAE CV &mdash; free
          <ArrowRight size={14} aria-hidden="true" />
        </a>
        <Link
          href="/blog/uae-cv-mistakes"
          className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
        >
          15 UAE CV mistakes to fix first
          <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export function WageBasisExplainer() {
  return (
    <section className="bg-paper pb-4">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-2xl bg-paper-2 p-5 text-sm leading-relaxed text-muted">
          <strong className="text-ink">
            Why our calculators use different salaries on purpose:
          </strong>{" "}
          end-of-service gratuity and unused-leave encashment are paid on your{" "}
          <strong>basic wage</strong> (Articles 51 &amp; 29), while notice
          payment in lieu is paid on your <strong>full wage including
          allowances</strong> (Article 43). It&rsquo;s a legal distinction, not
          an inconsistency — enter the salary each tool asks for.
        </div>
      </div>
    </section>
  );
}

const settlementItems = [
  {
    label: "End-of-service gratuity",
    href: "/gratuity-calculator",
    note: "21/30 days of basic pay per year",
  },
  {
    label: "Unused annual-leave encashment",
    href: "/annual-leave-calculator",
    note: "cannot be forfeited — no minimum service (Art. 29)",
  },
  {
    label: "Notice pay (if applicable)",
    href: "/notice-period-calculator",
    note: "on the full wage, either direction (Art. 43)",
  },
];

export function SettlementFooter({ currentPath }: { currentPath: string }) {
  return (
    <section className="bg-paper py-10 md:py-12">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-[28px] bg-paper-2 p-7 shadow-float md:p-8">
          <h2 className="font-display text-lg font-bold text-ink md:text-xl">
            Your full final settlement is more than this one number
          </h2>
          <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-ink-2">
            {settlementItems.map((item) =>
              item.href === currentPath ? (
                <li key={item.href} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    <strong className="text-ink">{item.label}</strong>{" "}
                    <span className="text-muted">— {item.note} (this calculator)</span>
                  </span>
                </li>
              ) : (
                <li key={item.href} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                    >
                      {item.label}
                      <ArrowRight size={13} />
                    </Link>{" "}
                    <span className="text-muted">— {item.note}</span>
                  </span>
                </li>
              ),
            )}
            <li className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-ink">Plus</strong>{" "}
                <span className="text-muted">
                  — any unpaid salary days, and a one-way repatriation ticket if
                  you&rsquo;re leaving the UAE and not joining another employer
                  here.
                </span>
              </span>
            </li>
          </ul>
          <p className="mt-5 rounded-xl bg-accent-soft px-4 py-3 text-sm leading-relaxed text-ink-2">
            Everything above is due within <strong>14 days of your last
            working day</strong> (Article 53). Paid less than the law says?
            Filing a MOHRE complaint is free — call{" "}
            <strong>600&nbsp;590&nbsp;000</strong> or use the MOHRE app.
          </p>
        </div>
      </div>
    </section>
  );
}
