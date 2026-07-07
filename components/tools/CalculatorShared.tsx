import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

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
    <p className="mb-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[13px] font-medium text-emerald-800">
      <ShieldCheck size={14} className="shrink-0" />
      No sign-up · No email · No ads · Nothing stored
    </p>
  );
}

export function WageBasisExplainer() {
  return (
    <section className="bg-paper pb-4">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-2xl border border-line bg-paper-2 p-5 text-sm leading-relaxed text-slate-600">
          <strong className="text-slate-800">
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
        <div className="rounded-3xl border border-line bg-paper-2 p-7 md:p-8">
          <h2 className="font-display text-lg font-bold text-slate-900 md:text-xl">
            Your full final settlement is more than this one number
          </h2>
          <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-slate-700">
            {settlementItems.map((item) =>
              item.href === currentPath ? (
                <li key={item.href} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                  <span>
                    <strong className="text-slate-900">{item.label}</strong>{" "}
                    <span className="text-slate-500">— {item.note} (this calculator)</span>
                  </span>
                </li>
              ) : (
                <li key={item.href} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                  <span>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 font-semibold text-brand-blue hover:underline"
                    >
                      {item.label}
                      <ArrowRight size={13} />
                    </Link>{" "}
                    <span className="text-slate-500">— {item.note}</span>
                  </span>
                </li>
              ),
            )}
            <li className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
              <span>
                <strong className="text-slate-900">Plus</strong>{" "}
                <span className="text-slate-500">
                  — any unpaid salary days, and a one-way repatriation ticket if
                  you&rsquo;re leaving the UAE and not joining another employer
                  here.
                </span>
              </span>
            </li>
          </ul>
          <p className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-sm leading-relaxed text-slate-700">
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
