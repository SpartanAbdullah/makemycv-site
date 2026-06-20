import { categoryColor } from "./categoryMeta";

const DEFAULT_COVER = "/blog/default-cover.png";

/**
 * One reusable cover for every post.
 * - If the post has a real `coverImage` (our 1200×630 SVG banners), render it at
 *   its natural aspect ratio so the artwork + text are fully visible (never cropped).
 * - Otherwise generate a clean category-coloured cover from category + title,
 *   with padded text that cannot touch the edges or overflow.
 */
export function BlogCover({
  coverImage,
  category,
  title,
  eager = false,
}: {
  coverImage?: string;
  category: string;
  title: string;
  eager?: boolean;
}) {
  const color = categoryColor(category);
  const hasRealCover = !!coverImage && coverImage !== DEFAULT_COVER;

  if (hasRealCover) {
    return (
      <div className="relative aspect-[1200/630] w-full overflow-hidden bg-[#0a0f1e]">
        {/* SVG banners — natural ratio matches the box, so object-cover never crops */}
        <img
          src={coverImage}
          alt={`${category} guide`}
          width={1200}
          height={630}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </div>
    );
  }

  // Generated fallback — text is padded (p-6) and clamped so it never clips.
  return (
    <div
      className="relative aspect-[1200/630] w-full overflow-hidden bg-[#0a0f1e]"
      role="img"
      aria-label={`${category} guide: ${title}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute inset-y-0 left-0 w-1.5" style={{ background: color }} />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <span
          className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color }}
        >
          {category}
        </span>
        <span className="mt-2 line-clamp-3 pr-6 text-lg font-bold leading-snug text-white">
          {title}
        </span>
      </div>
    </div>
  );
}
