import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPostBySlug, type Post } from "@/lib/blog";

/**
 * B5 — "Read next": three contextual blog links on the money pages, so the
 * guides that answer the follow-up questions (ATS mechanics, CV format, photo
 * rules, hiring timing) are one click from the tool, not buried in /blog.
 *
 * Server component: titles and excerpts come from the Velite `posts`
 * collection at build time, so the links are in the server-rendered HTML.
 * Pass the slugs per page (the part after /blog/). A slug that does not
 * resolve to a published post is skipped rather than rendered as a dead
 * link; in development a warning names it so the map can be fixed.
 */

type Props = {
  slugs: readonly string[];
  eyebrow?: string;
  title?: string;
  /** Background utility — alternate with the neighbouring sections. */
  className?: string;
};

export function ReadNext({
  slugs,
  eyebrow = "Read next",
  title = "Guides worth reading before you apply.",
  className = "bg-paper",
}: Props) {
  const posts: Post[] = [];
  for (const slug of slugs) {
    const post = getPostBySlug(slug);
    if (post) {
      posts.push(post);
    } else if (process.env.NODE_ENV !== "production") {
      console.warn(`[ReadNext] no published post for slug "${slug}"`);
    }
  }
  if (posts.length === 0) return null;

  return (
    <section className={`${className} py-14 md:py-16`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              {eyebrow}
            </p>
            <h2 className="mt-3 font-display text-[28px] font-bold leading-[1.1] tracking-tight-2 text-ink md:text-[32px]">
              {title}
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent underline-offset-4 hover:underline"
          >
            All guides
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slugPath}>
              <Link
                href={`/blog/${post.slugPath}`}
                className="group flex h-full flex-col rounded-2xl bg-sheet p-5 shadow-float transition-all duration-200 hover:-translate-y-0.5 hover:shadow-float-hover"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                  {post.category}
                </span>
                <span className="mt-2 flex items-start gap-1 font-display text-[15px] font-bold leading-snug text-ink">
                  {post.title}
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="mt-1 shrink-0 transition group-hover:translate-x-0.5"
                  />
                </span>
                <span className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-2">
                  {post.excerpt}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
