import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { LINKEDIN_URL, INSTAGRAM_URL } from "@/lib/social";
import { IconLinkedInGlyph, IconInstagramGlyph } from "@/components/SocialIcons";

/* Two columns by intent: Pages = the site itself; Free Tools = the GEO
   utility pages (kept out of Pages so the footer never reads as link soup). */
const pageLinks = [
  { href: "/", label: "Home" },
  { href: "/templates", label: "Templates" },
  { href: "/support", label: "Support" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const toolLinks = [
  { href: "/resume-checker", label: "ATS Checker" },
  { href: "/gratuity-calculator", label: "Gratuity Calculator" },
  { href: "/notice-period-calculator", label: "Notice Period Calculator" },
  { href: "/annual-leave-calculator", label: "Annual Leave Calculator" },
  { href: "/resignation-letter-generator", label: "Resignation Letter Generator" },
  { href: "/cv-examples-uae", label: "UAE CV Examples" },
];

export const Footer = () => (
  <footer className="border-t border-white/10 bg-ink text-white">
    {/* Container mirrors the nav/hero 1400px rhythm. */}
    <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-6 py-16 sm:grid-cols-2 md:grid-cols-4 md:px-10 xl:px-14">
      {/* Brand — white logo variant for dark backgrounds (same as the app) */}
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/logo-white.svg"
          alt="makemycv.ae"
          width={399}
          height={100}
          className="h-8 w-auto"
        />
        <p className="mt-2 text-sm text-white/60">
          Built for UAE job seekers.
          <br />
          Free, fast, ATS-friendly.
        </p>
        <p className="mt-4 text-xs text-white/50">
          Contact:{" "}
          <a
            href="mailto:hello@makemycv.ae"
            className="text-white/60 transition-colors duration-150 hover:text-gold-light"
          >
            hello@makemycv.ae
          </a>
        </p>
        <p className="mt-2 text-xs text-white/50">
          <Link
            href="/support"
            className="transition-colors duration-150 hover:text-gold-light"
          >
            Built by Abdullah in Dubai.
          </Link>
        </p>
        {/* Social — LinkedIn + Instagram only for now */}
        <div className="mt-4 flex items-center gap-3">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MakeMyCV on LinkedIn"
            className="text-white/60 transition-colors duration-150 hover:text-gold-light"
          >
            <IconLinkedInGlyph className="h-[18px] w-[18px]" />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MakeMyCV on Instagram"
            className="text-white/60 transition-colors duration-150 hover:text-gold-light"
          >
            <IconInstagramGlyph className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
          Pages
        </p>
        <div className="flex flex-col gap-2">
          {pageLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 transition-colors duration-150 hover:text-gold-light"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Free tools (GEO utility pages) */}
      <div>
        <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
          Free Tools
        </p>
        <div className="flex flex-col gap-2">
          {toolLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 transition-colors duration-150 hover:text-gold-light"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* App CTA */}
      <div>
        <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
          Build Your CV
        </p>
        <a
          href="https://app.makemycv.ae"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-block rounded-xl px-5 py-2.5 text-sm font-bold text-white"
        >
          Start Free &rarr;
        </a>
        <p className="mt-2 text-xs text-white/50">
          No account needed. Takes 5 minutes.
        </p>
      </div>
    </div>

    {/* Bottom bar */}
    <div>
      <div className="mb-6 h-px bg-white/10" />
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-2 px-6 pb-6 text-xs text-white/55 sm:flex-row md:px-10 xl:px-14">
        <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>&copy; 2026 makemycv.ae &mdash; All rights reserved.</span>
          <span aria-hidden="true" className="hidden text-white/25 sm:inline">
            ·
          </span>
          <Link
            href="/privacy"
            className="whitespace-nowrap transition-colors duration-150 hover:text-gold-light"
          >
            Privacy Policy
          </Link>
        </span>
        <span className="flex items-center gap-1.5 text-xs text-white/55">
          Made with
          <Heart size={14} className="fill-red-500 text-red-500" />
          in
          <MapPin size={14} className="text-gold-light" />
          UAE
        </span>
      </div>
    </div>
  </footer>
);
