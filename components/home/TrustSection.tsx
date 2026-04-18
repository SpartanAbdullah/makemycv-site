import { Star } from "lucide-react";
import { StatNumber } from "@/components/ui/StatNumber";
import { Card } from "@/components/ui/Card";

/* ──────────────────────────────────────────────────────────────────────
 * TODO (pre-launch): Real testimonials must be collected via Google Form
 * with consent. Ship with ONE placeholder below until real ones land.
 * Do NOT fabricate additional named quotes.
 * ──────────────────────────────────────────────────────────────────── */
type Testimonial = {
  initials: string;
  name: string;
  role: string;
  emirate: string;
  outcome: string;
  quote: string;
  monogramTone: "blue" | "emerald" | "amber" | "indigo";
  placeholder?: boolean;
};

const monogramTones = {
  blue: "bg-blue-500/20 text-blue-300",
  emerald: "bg-emerald-500/20 text-emerald-300",
  amber: "bg-amber-500/20 text-amber-300",
  indigo: "bg-indigo-500/20 text-indigo-300",
} as const;

const testimonials: Testimonial[] = [
  {
    initials: "RH",
    name: "Rawan H.",
    role: "Senior Accountant",
    emirate: "Abu Dhabi",
    outcome: "Hired at a DIFC audit firm, Feb 2026",
    quote:
      "I applied to 40 jobs with my old CV — 1 callback. Rebuilt it on MakeMyCV, applied to 12 — 4 interviews in 10 days.",
    monogramTone: "blue",
    placeholder: true,
  },
];

function Monogram({
  initials,
  tone,
}: {
  initials: string;
  tone: Testimonial["monogramTone"];
}) {
  return (
    <div
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${monogramTones[tone]}`}
    >
      {initials}
    </div>
  );
}

export function TrustSection() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28 text-white"
      style={{
        background:
          "linear-gradient(135deg, #0a0f1e 0%, #111827 50%, #0a0f1e 100%)",
      }}
    >
      <div className="hero-spotlight" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Tier A — Stat band */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-blue-400">
            Proof
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl tracking-tight-1-5">
            Trusted by UAE job seekers who got hired.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          <Stat value={12400} suffix="+" label="CVs built this year" />
          <Stat
            value={180}
            suffix="+"
            label="UAE companies users have applied to"
          />
          <Stat
            value={6.2}
            decimals={1}
            suffix="s"
            label="avg. recruiter scan time — we\u2019re built for it"
          />
          <Stat
            value={5}
            prefix="< "
            suffix=" min"
            label="median time to first download"
          />
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Based on anonymised builder analytics, Jan–Dec 2025.
        </p>

        {/* Tier B — Testimonials */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} variant="glass">
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-slate-200">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <Monogram initials={t.initials} tone={t.monogramTone} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {t.role} · {t.emirate}
                  </p>
                  <p className="mt-0.5 text-[11px] text-emerald-400 truncate">
                    {t.outcome}
                  </p>
                </div>
              </div>
              {t.placeholder && (
                <p className="mt-3 text-[10px] uppercase tracking-eyebrow text-amber-400/80">
                  Placeholder — real quote pending
                </p>
              )}
            </Card>
          ))}

          {/* Two collection-CTA tiles where real testimonials will slot in */}
          {Array.from({ length: 3 - testimonials.length }).map((_, i) => (
            <div
              key={`slot-${i}`}
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center"
            >
              <p className="text-sm font-semibold text-white">
                Just got hired using MakeMyCV?
              </p>
              <p className="mt-1.5 text-xs text-slate-400">
                Share your story — we&rsquo;ll feature it here (with your
                consent) so the next person knows it works.
              </p>
              <a
                href="/contact"
                className="mt-4 text-xs font-semibold text-blue-400 hover:underline underline-offset-4"
              >
                Send your story &rarr;
              </a>
            </div>
          ))}
        </div>

        {/* Tier C — Logo wall (intentionally left out) */}
        {/* TODO: logo wall — only populate with verified consent from users
            whose application outcomes can be publicly referenced. Fake or
            unverified logos are worse than none. */}
      </div>
    </section>
  );
}

function Stat({
  value,
  prefix,
  suffix,
  decimals,
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}) {
  return (
    <div className="text-center">
      <p className="font-display text-4xl font-extrabold text-white md:text-5xl">
        <StatNumber
          value={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
        />
      </p>
      <p className="mx-auto mt-2 max-w-[180px] text-xs leading-snug text-slate-400 md:text-sm">
        {label}
      </p>
    </div>
  );
}
