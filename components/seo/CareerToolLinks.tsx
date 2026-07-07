import Link from "next/link";
import { ArrowRight, Banknote, ScanSearch, Timer, CalendarDays } from "lucide-react";

/**
 * E3 — compact internal-linking strip: the free UAE career tools, cross-linked
 * from the money pages so authority flows tools ⇄ calculators ⇄ examples
 * (the JobXDubai single-domain compounding model). Server component, SSR links.
 */
const tools = [
  {
    href: "/cv-examples-uae",
    icon: ScanSearch,
    title: "UAE CV Examples",
    blurb: "Weak vs strong bullets, six sectors.",
  },
  {
    href: "/gratuity-calculator",
    icon: Banknote,
    title: "Gratuity Calculator",
    blurb: "Your end-of-service benefit.",
  },
  {
    href: "/notice-period-calculator",
    icon: Timer,
    title: "Notice Period Calculator",
    blurb: "Notice days and pay in lieu.",
  },
  {
    href: "/annual-leave-calculator",
    icon: CalendarDays,
    title: "Annual Leave Calculator",
    blurb: "Entitlement and unused-leave payout.",
  },
];

export function CareerToolLinks() {
  return (
    <section className="bg-paper-2 py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-xl font-bold tracking-[-0.015em] text-slate-900 md:text-2xl">
          More free UAE career tools from MakeMyCV
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group flex items-start gap-3 rounded-2xl border border-line bg-white p-5 transition hover:border-brand-blue/40"
            >
              <t.icon className="mt-0.5 shrink-0 text-brand-blue" size={20} />
              <span>
                <span className="flex items-center gap-1 font-display text-[15px] font-bold text-slate-900">
                  {t.title}
                  <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
                </span>
                <span className="mt-0.5 block text-[13px] text-slate-600">
                  {t.blurb}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
