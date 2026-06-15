import { ShieldCheck, Repeat2, Lock } from "lucide-react";

/**
 * HonestMatching — the wedge. When the AI can't truthfully back a keyword it
 * declines instead of inventing. Paired with smart (alias-aware) matching and
 * the privacy promise. Dark section for weight; emerald/amber echo the heatmap.
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

        {/* Honest-decline example */}
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-slate-500">
            Example — the job asks for &ldquo;SAP ERP&rdquo;
          </p>

          <div className="mt-4 space-y-3 text-sm">
            <div className="rounded-lg bg-white/[0.04] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-slate-500">
                Your bullet
              </p>
              <p className="mt-1.5 text-slate-200">
                &ldquo;Greeted walk-in customers and arranged products on
                shelves.&rdquo;
              </p>
            </div>

            <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.06] p-4">
              <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-eyebrow text-emerald-300">
                <ShieldCheck size={13} /> What we do
              </p>
              <p className="mt-1.5 text-slate-200">
                Nothing here shows SAP ERP — so we leave it out and flag it as a
                real gap. No invented system, no padded line. The honest move is
                the one that survives the interview.
              </p>
            </div>
          </div>
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
            body="Your CV never leaves your browser. Only the job text you paste is sent for analysis, and it isn&rsquo;t stored. Imported files are read locally, on your device."
          />
        </div>
      </div>
    </section>
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
