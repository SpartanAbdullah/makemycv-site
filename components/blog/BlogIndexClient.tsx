"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BlogCover } from "./BlogCover";

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
    "shrink-0 rounded-full px-4 py-2 text-[13.5px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      {/* Controls */}
      <div className="flex flex-col gap-5">
        {/* Search */}
        <label className="relative block">
          <span className="sr-only">Search guides</span>
          <svg
            aria-hidden="true"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
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
            className="h-12 w-full rounded-xl border border-line bg-sheet pl-11 pr-4 text-[15px] text-ink shadow-xs outline-none transition placeholder:text-muted focus:border-accent/50"
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
                ? "bg-accent text-white"
                : "border border-line text-muted hover:border-line-strong hover:text-ink"
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
                    ? "bg-accent text-white"
                    : "border border-line text-muted hover:border-line-strong hover:text-ink"
                }`}
              >
                {c.name}
                <span className="ml-1.5 opacity-60">{c.count}</span>
              </button>
            );
          })}
        </div>

        {/* Result count */}
        <p className="text-[13px] text-muted">
          <span className="font-semibold text-accent">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "guide" : "guides"}
          {cat !== "All" ? ` in ${cat}` : ""}
          {query.trim() ? ` matching “${query.trim()}”` : ""}
        </p>
      </div>

      {/* Grid */}
      {shown.length > 0 ? (
        <div className="mt-8 grid grid-flow-row-dense gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <Card key={p.slugPath} p={p} eager={i === 0} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl bg-sheet p-10 text-center shadow-float">
          <p className="text-lg font-semibold text-ink">No guides match that yet.</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Try a different category or clear your search — the full library is still here.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              selectCat("All");
            }}
            className="mt-5 inline-flex h-10 items-center rounded-full border border-line px-5 text-sm font-semibold text-ink transition-all duration-200 hover:border-line-strong hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Load more */}
      {remaining > 0 && (
        <div className="flex justify-center pt-12">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE)}
            className="inline-flex h-12 items-center gap-2.5 rounded-full bg-sheet px-7 text-[14.5px] font-semibold text-ink shadow-float transition-all duration-200 hover:-translate-y-px hover:shadow-float-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            Load more guides
            <span className="text-[12px] text-muted">
              {remaining} left
            </span>
          </button>
        </div>
      )}
    </section>
  );
}

function Card({ p, eager = false }: { p: CardPost; eager?: boolean }) {
  return (
    <article className={p.featured ? "sm:col-span-2 lg:col-span-2" : ""}>
      <Link
        href={`/blog/${p.slugPath}`}
        className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-sheet shadow-float transition-all duration-200 hover:-translate-y-0.5 hover:shadow-float-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        <div className="relative">
          <BlogCover coverImage={p.coverImage} category={p.category} title={p.title} eager={eager} />
          {p.featured && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white shadow-sm-soft">
              ★ Featured
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <span className="self-start rounded-full bg-paper-2 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-2">
            {p.category}
          </span>
          <h2
            className={`mt-3 line-clamp-3 font-semibold leading-[1.25] text-ink transition-colors group-hover:text-accent ${
              p.featured ? "text-[28px]" : "text-[22px]"
            }`}
          >
            {p.title}
          </h2>
          <p className="mt-2.5 line-clamp-2 text-base leading-relaxed text-muted">
            {p.excerpt}
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-5 text-[12px] text-muted">
            <span>{p.readingTime} min</span>
            <span className="h-1 w-1 rounded-full bg-line-strong" />
            <span>{p.dateFormatted}</span>
            <span className="h-1 w-1 rounded-full bg-line-strong" />
            <span>{p.author}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
