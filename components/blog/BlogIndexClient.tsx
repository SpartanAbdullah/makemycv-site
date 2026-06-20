"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BlogCover } from "./BlogCover";
import { categoryColor } from "./categoryMeta";

export type CardPost = {
  slugPath: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  dateFormatted: string;
  readingTime: number;
  coverImage?: string;
  featured: boolean;
  author: string;
};

const PAGE = 6;

export function BlogIndexClient({
  posts,
  categories,
}: {
  posts: CardPost[];
  categories: { name: string; count: number }[];
}) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [visible, setVisible] = useState(PAGE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = posts.filter((p) => {
      const catOk = cat === "All" || p.category === cat;
      const qOk =
        !q || (p.title + " " + p.excerpt + " " + p.category).toLowerCase().includes(q);
      return catOk && qOk;
    });
    return [...list].sort(
      (a, b) =>
        (b.featured ? 1 : 0) - (a.featured ? 1 : 0) ||
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [posts, query, cat]);

  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  function selectCat(next: string) {
    setCat(next);
    setVisible(PAGE);
  }
  function onSearch(value: string) {
    setQuery(value);
    setVisible(PAGE);
  }

  const tabBase =
    "shrink-0 rounded-full px-4 py-2 text-[13.5px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]";

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      {/* Controls */}
      <div className="flex flex-col gap-5">
        {/* Search */}
        <label className="relative block">
          <span className="sr-only">Search guides</span>
          <svg
            aria-hidden="true"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search guides — try “ATS”, “freshers”, “Dubai”…"
            className="h-12 w-full rounded-xl border border-white/12 bg-white/[0.04] pl-11 pr-4 text-[15px] text-white outline-none transition placeholder:text-white/40 focus:border-white/30 focus:bg-white/[0.06]"
          />
        </label>

        {/* Category tabs */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-1"
          role="group"
          aria-label="Filter guides by category"
        >
          <button
            type="button"
            aria-pressed={cat === "All"}
            onClick={() => selectCat("All")}
            className={`${tabBase} ${
              cat === "All"
                ? "bg-white text-[#0a0f1e]"
                : "border border-white/12 text-white/65 hover:text-white"
            }`}
          >
            All
            <span className="ml-1.5 opacity-60">{posts.length}</span>
          </button>
          {categories.map((c) => {
            const active = cat === c.name;
            return (
              <button
                key={c.name}
                type="button"
                aria-pressed={active}
                onClick={() => selectCat(c.name)}
                className={`${tabBase} ${
                  active
                    ? "text-[#0a0f1e]"
                    : "border border-white/12 text-white/65 hover:text-white"
                }`}
                style={active ? { background: categoryColor(c.name) } : undefined}
              >
                {c.name}
                <span className="ml-1.5 opacity-60">{c.count}</span>
              </button>
            );
          })}
        </div>

        {/* Result count */}
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[13px] text-white/55">
          <span className="font-semibold text-[#34d399]">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "guide" : "guides"}
          {cat !== "All" ? ` in ${cat}` : ""}
          {query.trim() ? ` matching “${query.trim()}”` : ""}
        </p>
      </div>

      {/* Grid */}
      {shown.length > 0 ? (
        <div className="mt-6 grid grid-flow-row-dense gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <Card key={p.slugPath} p={p} eager={i === 0} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
          <p className="text-lg font-semibold text-white">No guides match that yet.</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/55">
            Try a different category or clear your search — the full library is still here.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              selectCat("All");
            }}
            className="mt-5 inline-flex h-10 items-center rounded-lg border border-white/15 px-4 text-sm font-semibold text-white transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Load more */}
      {remaining > 0 && (
        <div className="flex justify-center pt-10">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE)}
            className="inline-flex h-12 items-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.04] px-6 text-[14.5px] font-semibold text-white transition hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
          >
            Load more guides
            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] text-white/45">
              {remaining} left
            </span>
          </button>
        </div>
      )}
    </section>
  );
}

function Card({ p, eager = false }: { p: CardPost; eager?: boolean }) {
  const color = categoryColor(p.category);
  return (
    <article className={p.featured ? "sm:col-span-2 lg:col-span-2" : ""}>
      <Link
        href={`/blog/${p.slugPath}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
      >
        <div className="relative border-b border-white/10">
          <BlogCover coverImage={p.coverImage} category={p.category} title={p.title} eager={eager} />
          {p.featured && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#2563eb] px-2.5 py-1 text-[11px] font-bold text-white shadow-lg">
              ★ Featured
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span
            className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ color }}
          >
            {p.category}
          </span>
          <h2
            className={`mt-2 line-clamp-3 font-bold leading-snug text-white/90 transition group-hover:text-white ${
              p.featured ? "text-2xl" : "text-lg"
            }`}
          >
            {p.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/55">
            {p.excerpt}
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-4 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] text-white/45">
            <span>{p.readingTime} min</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>{p.dateFormatted}</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>{p.author}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
