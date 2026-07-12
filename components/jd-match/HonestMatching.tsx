import { ShieldCheck, Repeat2, Lock, Check, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

/**
 * HonestMatching — the wedge. When the AI can't truthfully back a keyword it
 * declines instead of inventing. The "SAP ERP" example is told as a 3-step
 * storyboard (think → scan → honest result) so the promise is felt, not read.
 * Dark section for weight; blue→amber→emerald echoes the heatmap.
 */
export function HonestMatching() {
  return (
    <section
      className="relative overflow-hidden py-20 text-white md:py-28"
      style={{
        background:
          "linear-gradient(135deg, #0a0f1e 0%, #111827 50%, #0a0f1e 100%)",
      }}
    >
      <div className="hero-spotlight" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-blue-400">
            Honest by design
          </p>
          <h2 className="mt-3 font-display text-[32px] font-bold leading-[1.15] tracking-tight-1-5 text-white md:text-[42px]">
            We help you tell the truth better — not lie better.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            When our AI rewords an experience bullet to fit a job, it
            re-expresses what you actually did. If your experience can&rsquo;t
            truthfully back a keyword, it says so — instead of inventing a number,
            a tool, or a certification you never had.
          </p>
        </div>

        {/* ── Storyboard: the "SAP ERP" example, told in 3 steps ── */}
        <div className="mx-auto mt-14 max-w-5xl">
          <p className="text-center text-[11px] font-semibold uppercase tracking-eyebrow text-slate-500">
            Watch it work — the job asks for &ldquo;SAP ERP&rdquo;
          </p>

          <ol className="mt-8 flex flex-col items-stretch gap-3 md:flex-row md:gap-2">
            <Step
              n={1}
              accent="#60a5fa"
              eyebrow="The situation"
              title={
                <>
                  The job wants{" "}
                  <span className="text-blue-300">&ldquo;SAP ERP&rdquo;</span>
                </>
              }
              body={
                <>
                  Your closest line is a retail bullet:{" "}
                  <span className="text-slate-200">
                    &ldquo;Greeted walk-in customers and arranged products on
                    shelves.&rdquo;
                  </span>
                </>
              }
              illustration={<ThinkingPerson />}
            />

            <Connector />

            <Step
              n={2}
              accent="#fbbf24"
              eyebrow="What we find"
              title={<>It doesn&rsquo;t back the keyword</>}
              body="We scan that bullet for anything that truthfully supports SAP ERP — and find nothing that does."
              illustration={<ScanGap />}
            />

            <Connector />

            <Step
              n={3}
              accent="#34d399"
              verified
              eyebrow="What we do"
              title={<>We flag the gap — we don&rsquo;t fake it</>}
              body="No invented system, no padded line. We leave it out and surface it as a real gap. The honest move is the one that survives the interview."
              illustration={<HonestCheck />}
            />
          </ol>
        </div>

        {/* Three supporting pillars */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-3">
          <Pillar
            icon={Repeat2}
            title="Smart, honest matching"
            body="Recognises the same skill worded differently — &ldquo;M365&rdquo; counts for &ldquo;Microsoft 365&rdquo;. But it won&rsquo;t claim you know Salesforce just because you listed HubSpot."
          />
          <Pillar
            icon={ShieldCheck}
            title="Rewrites, never fabricates"
            body="The AI re-words what your bullet already says to surface a keyword. When it can&rsquo;t do that truthfully, it declines — every suggestion is yours to review before it&rsquo;s applied."
          />
          <Pillar
            icon={Lock}
            title="Private by design"
            body="Your working CV draft is saved in your browser, not an account. To run a match or an AI rewrite, the relevant CV and job text is sent to our servers to generate the result &mdash; never sold, never shown to recruiters, never used to train AI models."
          />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Storyboard parts ───────────────────────── */

function Step({
  n,
  accent,
  eyebrow,
  title,
  body,
  illustration,
  verified = false,
}: {
  n: number;
  accent: string;
  eyebrow: string;
  title: ReactNode;
  body: ReactNode;
  illustration: ReactNode;
  verified?: boolean;
}) {
  return (
    <li className="group relative flex-1 list-none overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.05]">
      {/* accent top hairline */}
      <span
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        aria-hidden="true"
      />

      <div className="flex items-center gap-3">
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold"
          style={{
            color: accent,
            backgroundColor: `${accent}1f`,
            boxShadow: `inset 0 0 0 1px ${accent}55`,
          }}
        >
          {n}
        </span>
        <span
          className="text-[11px] font-semibold uppercase tracking-eyebrow"
          style={{ color: accent }}
        >
          {eyebrow}
        </span>
        {verified && (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
            <Check size={11} strokeWidth={3} aria-hidden="true" /> Verified honest
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center justify-center" aria-hidden="true">
        <div className="w-full max-w-[220px]">{illustration}</div>
      </div>

      <p className="mt-5 font-display text-base font-bold text-white">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{body}</p>
    </li>
  );
}

function Connector() {
  return (
    <div
      className="flex shrink-0 items-center justify-center text-white/25"
      aria-hidden="true"
    >
      <ChevronRight size={22} className="rotate-90 md:rotate-0" />
    </div>
  );
}

/* ───────────────────────── Illustrations ───────────────────────── */

function ThinkingPerson() {
  return (
    <svg viewBox="0 0 220 150" fill="none" className="h-auto w-full" aria-hidden="true">
      <ellipse cx="92" cy="141" rx="58" ry="7" fill="#60a5fa" opacity="0.08" />
      {/* shoulders + head — a person, mid-thought */}
      <path
        d="M48 142 C48 113 70 101 92 101 C114 101 136 113 136 142"
        fill="#60a5fa"
        fillOpacity="0.10"
        stroke="#60a5fa"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="92" cy="71" r="26" fill="#60a5fa" fillOpacity="0.10" stroke="#60a5fa" strokeWidth="2.5" />
      {/* thought trail */}
      <circle cx="131" cy="49" r="3.5" fill="#60a5fa" fillOpacity="0.55" className="motion-safe:animate-pulse" />
      <circle cx="142" cy="39" r="5" fill="#60a5fa" fillOpacity="0.4" />
      {/* thought bubble with the job's keyword */}
      <rect x="116" y="6" width="98" height="34" rx="12" fill="#0b1220" stroke="#60a5fa" strokeWidth="2" />
      <text
        x="165"
        y="28"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill="#93c5fd"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        SAP ERP?
      </text>
    </svg>
  );
}

function ScanGap() {
  return (
    <svg viewBox="0 0 220 150" fill="none" className="h-auto w-full" aria-hidden="true">
      <ellipse cx="108" cy="141" rx="66" ry="7" fill="#fbbf24" opacity="0.07" />
      {/* the bullet, being scanned */}
      <rect x="42" y="22" width="118" height="104" rx="12" fill="#0b1220" stroke="#fbbf24" strokeOpacity="0.5" strokeWidth="2" />
      <rect x="58" y="44" width="80" height="8" rx="4" fill="#ffffff" fillOpacity="0.22" />
      <rect x="58" y="62" width="58" height="8" rx="4" fill="#ffffff" fillOpacity="0.16" />
      {/* searched-for keyword */}
      <rect x="58" y="92" width="78" height="20" rx="6" fill="#fbbf24" fillOpacity="0.10" stroke="#fbbf24" strokeOpacity="0.5" />
      <text x="97" y="106" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fcd34d" fontFamily="ui-sans-serif, system-ui, sans-serif">
        SAP ERP
      </text>
      {/* magnifier — no match */}
      <g className="motion-safe:animate-pulse">
        <circle cx="150" cy="98" r="20" fill="#0b1220" stroke="#fbbf24" strokeWidth="3" />
        <path d="M143 91 l14 14 M157 91 l-14 14" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <line x1="165" y1="113" x2="179" y2="127" stroke="#fbbf24" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function HonestCheck() {
  return (
    <svg viewBox="0 0 220 150" fill="none" className="h-auto w-full" aria-hidden="true">
      <ellipse cx="100" cy="141" rx="66" ry="7" fill="#34d399" opacity="0.08" />
      {/* the honest CV — kept lines + a flagged gap */}
      <rect x="40" y="22" width="116" height="106" rx="12" fill="#0b1220" stroke="#34d399" strokeOpacity="0.5" strokeWidth="2" />
      <rect x="56" y="42" width="80" height="8" rx="4" fill="#ffffff" fillOpacity="0.22" />
      <rect x="56" y="60" width="62" height="8" rx="4" fill="#ffffff" fillOpacity="0.16" />
      {/* gap flagged, not faked (amber, honest) */}
      <rect x="56" y="88" width="84" height="20" rx="6" fill="#fbbf24" fillOpacity="0.10" stroke="#fbbf24" strokeOpacity="0.4" />
      <text x="98" y="102" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#fcd34d" fontFamily="ui-sans-serif, system-ui, sans-serif">
        SAP ERP · gap
      </text>
      {/* subtle green verification mark */}
      <g className="motion-safe:animate-pulse">
        <circle cx="170" cy="40" r="22" fill="#34d399" fillOpacity="0.15" stroke="#34d399" strokeWidth="2" />
      </g>
      <path d="M160 40 l7 8 l13 -16" fill="none" stroke="#34d399" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Pillar({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof ShieldCheck;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
        <Icon size={20} strokeWidth={2} />
      </span>
      <h3 className="mt-4 font-display text-base font-bold text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{body}</p>
    </div>
  );
}
