"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Link2, Check, Share2 } from "lucide-react";
import { copyText } from "@/components/tools/copyText";
import { IconLinkedInGlyph, IconWhatsAppGlyph, IconXGlyph } from "@/components/SocialIcons";

/**
 * Share row for blog posts. Deliberately built from plain anchors + the Web
 * Share API rather than a third-party widget (AddThis/ShareThis): those are
 * tracking scripts, they cost real CWV budget, and they'd contradict what the
 * resume-checker FAQ promises users about third parties.
 *
 * The network row is the SSR baseline so it works with no JS at all. The native
 * share button is layered on after mount when navigator.share exists — content
 * only ever gets added, never swapped out, so there's no hydration mismatch and
 * no flash of removed buttons on mobile.
 *
 * WhatsApp leads the row on purpose: the corridor guides (Nepal, Philippines,
 * Kenya/Nigeria, India) travel through diaspora jobseeker groups, not LinkedIn
 * feeds. See COWORK_CHANGELOG for the reasoning.
 */

type Props = {
  /** Absolute canonical URL — share targets reject relative paths. */
  url: string;
  title: string;
};

const pill =
  "inline-flex items-center gap-2 rounded-full border border-line bg-sheet px-3.5 py-2 text-sm text-ink-2 transition-colors duration-150 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/* Capability detection has to disagree between server and client, so it goes
   through useSyncExternalStore rather than an effect + setState: the server
   snapshot is false, the client snapshot reads navigator, and React reconciles
   the difference itself without a hydration warning. */
const subscribeToNothing = () => () => {};
const getShareSupport = () =>
  typeof navigator !== "undefined" && typeof navigator.share === "function";
const getServerShareSupport = () => false;

export const SharePost = ({ url, title }: Props) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canNativeShare = useSyncExternalStore(
    subscribeToNothing,
    getShareSupport,
    getServerShareSupport
  );

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const onCopy = async () => {
    const ok = await copyText(url);
    if (!ok) return;
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  const onNativeShare = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      /* User dismissed the sheet, or the request was cancelled — not an error. */
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const targets = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      Icon: IconWhatsAppGlyph,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: IconLinkedInGlyph,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(title)}`,
      Icon: IconXGlyph,
    },
  ];

  return (
    <div className="mt-12 pt-8 border-t border-line">
      <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
        Share this guide
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {canNativeShare && (
          <button type="button" onClick={onNativeShare} className={pill}>
            <Share2 size={16} aria-hidden="true" />
            Share
          </button>
        )}

        {targets.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share this guide on ${label}`}
            className={pill}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </a>
        ))}

        <button type="button" onClick={onCopy} className={pill}>
          {copied ? (
            <Check size={16} aria-hidden="true" className="text-accent" />
          ) : (
            <Link2 size={16} aria-hidden="true" />
          )}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>

      {/* Announced to screen readers without stealing focus from the button. */}
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
};
