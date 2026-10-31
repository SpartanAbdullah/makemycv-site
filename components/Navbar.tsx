"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* /support deliberately lives in the FOOTER only (2026-08-11). The tip ask
   doesn't belong in the primary nav — it competes with the tool links for the
   one row of attention that actually drives usage. It stays linked sitewide
   from the footer, so it keeps its internal links and remains crawlable. */
/* `ctaId` marks the nav links that open a product surface; the delegated
   [data-event] dispatcher in app/layout.tsx turns the data-* attributes into a
   `cta_click` push (GA4 audit §8, 2026-10-31). Plain pages stay untracked. */
const links: { href: string; label: string; ctaId?: string }[] = [
  { href: "/", label: "Home" },
  { href: "/templates", label: "Templates" },
  { href: "/jd-match", label: "JD Match", ctaId: "navbar_jd_match" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/* Mobile menu ids carry a `_mobile` suffix, matching navbar_build_cv_mobile. */
const ctaAttrs = (ctaId: string | undefined, suffix = "") =>
  ctaId
    ? { "data-event": "cta_click", "data-cta-id": `${ctaId}${suffix}`, "data-cta-location": "navbar" }
    : undefined;

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-xl transition-shadow duration-150 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      {/* Container mirrors the hero: 1400px, same responsive gutters — the
          nav must not read narrower than the sections under it. */}
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-3.5 md:px-10 xl:px-14">
        {/* Logo — the shared brand mark (source: makemycv-app/public/logos)
            with the wordmark set live in Outfit. The old logo-horizontal.svg
            carried a Poppins-outlined wordmark that clashed with the 2026-08
            Outfit reskin; live text stays pixel-sharp and on-face, and the
            mark tile gets the same 3D-glass depth as the CTAs. */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="MakeMyCV — home"
        >
          <span className="logo-mark-3d shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/logo-mark.svg"
              alt=""
              width={64}
              height={64}
              className="h-9 w-9 md:h-10 md:w-10"
            />
          </span>
          <span className="font-display text-[19px] font-semibold leading-none tracking-tight-2 md:text-[21px]">
            <span className="text-[#1B2A4A]">makemycv</span>
            <span className="text-gold-deep">.ae</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                {...ctaAttrs(link.ctaId)}
                className={`relative text-sm font-semibold transition-colors duration-150 after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-150 ${
                  isActive
                    ? "text-accent after:w-full"
                    : "text-ink-2 hover:text-accent after:w-0 hover:after:w-full"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/resume-checker"
            className="inline-flex items-center gap-1.5 rounded-full bg-sheet px-5 py-2.5 text-sm font-semibold text-ink shadow-float transition-all duration-200 hover:-translate-y-px hover:text-accent hover:shadow-float-hover"
            data-cta-location="navbar-ats-checker"
            data-event="navbar_ats_checker_click"
          >
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
            />
            ATS Checker
          </Link>
          <a
            href="https://app.makemycv.ae"
            className="btn-primary px-5 py-2.5 text-sm font-semibold text-white"
            data-event="cta_click"
            data-cta-id="navbar_build_cv"
            data-cta-location="navbar"
          >
            Start Building Free &rarr;
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`h-0.5 w-6 bg-ink-2 transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-ink-2 transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-ink-2 transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-line bg-paper/95 px-6 py-4 backdrop-blur-xl lg:hidden"
        >
          <div className="flex flex-col gap-3">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  {...ctaAttrs(link.ctaId, "_mobile")}
                  className={`text-sm font-medium transition-colors duration-150 ${
                    isActive ? "text-accent" : "text-ink-2 hover:text-accent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/resume-checker"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-sheet px-5 py-2.5 text-center text-sm font-semibold text-ink shadow-float transition-all duration-200 hover:text-accent hover:shadow-float-hover"
              data-cta-location="navbar-ats-checker"
              data-event="navbar_ats_checker_click"
            >
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
              />
              ATS Checker
            </Link>
            <a
              href="https://app.makemycv.ae"
              className="btn-primary px-5 py-2.5 text-center text-sm font-semibold text-white"
              data-event="cta_click"
              data-cta-id="navbar_build_cv_mobile"
              data-cta-location="navbar"
            >
              Start Building Free &rarr;
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
