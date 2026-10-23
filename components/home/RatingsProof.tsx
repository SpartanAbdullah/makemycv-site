import { APP_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { webApplicationSchema } from "@/lib/seo-schema";

/**
 * RatingsProof (2026-10-24) — the first social proof on the homepage, and the
 * only kind the hard rule allows: real, first-party, consented.
 *
 * Source: app.makemycv.ae/api/ratings/summary — one-tap stars collected after
 * an export or an ATS report, plus the quotes a human approved in the
 * database. Nothing renders until there are at least MIN ratings, because a
 * 5.0 from four people is noise dressed as proof.
 *
 * The aggregateRating node is emitted here, on the page where the number is
 * visible, which is exactly the condition lib/seo-schema.ts sets for ever
 * adding one. It merges into the site-wide WebApplication node by @id.
 */

const MIN = 25;

type Summary = { count: number; average: number; quotes: { quote: string; name: string; role: string }[] };

async function load(): Promise<Summary | null> {
  try {
    const res = await fetch(`${APP_URL}/api/ratings/summary`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return (await res.json()) as Summary;
  } catch {
    return null;
  }
}

export async function RatingsProof() {
  const s = await load();
  if (!s || s.count < MIN) return null;
  const webapp = webApplicationSchema() as { "@id": string };
  const quotes = s.quotes.filter((q) => q.quote).slice(0, 3);

  return (
    <section className="bg-paper py-16 md:py-20" aria-labelledby="ratings-heading">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "@id": webapp["@id"],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: s.average,
            bestRating: 5,
            worstRating: 1,
            ratingCount: s.count,
          },
        }}
      />
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">From people who built a CV here</p>
        <h2 id="ratings-heading" className="mt-3 font-display text-[clamp(28px,3.2vw,40px)] font-bold leading-tight tracking-tight-2 text-ink">
          Rated <span className="text-accent">{s.average.toFixed(1)} / 5</span> by {s.count.toLocaleString("en-AE")} job seekers
        </h2>
        <p className="mt-3 text-sm text-muted">
          One-tap ratings collected right after a CV export or ATS report. No cherry-picking: every star counts.
        </p>
        {quotes.length > 0 && (
          <ul className="mt-10 grid gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
            {quotes.map((q, i) => (
              <li key={i} className="rounded-2xl border border-line bg-sheet p-6">
                <p className="text-base leading-relaxed text-ink">&ldquo;{q.quote}&rdquo;</p>
                {(q.name || q.role) && (
                  <p className="mt-4 text-sm text-muted">
                    {q.name}
                    {q.name && q.role ? ", " : ""}
                    {q.role}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
