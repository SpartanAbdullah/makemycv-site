"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/templates", label: "Templates" },
  { href: "/jd-match", label: "JD Match" },
  { href: "/support", label: "Support" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo — same lockup as the builder app (source: makemycv-app/public/logos) */}
        <Link href="/" className="flex items-center" aria-label="MakeMyCV — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/logo-horizontal.svg"
            alt="makemycv.ae"
            width={399}
            height={100}
            className="h-7 w-auto md:h-8"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-150 after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-150 ${
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
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-sheet px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-150 hover:border-accent/40 hover:text-accent"
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
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary rounded-xl px-5 py-2.5 text-sm font-bold text-white"
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
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl border border-line bg-sheet px-5 py-2.5 text-center text-sm font-semibold text-ink transition-all duration-150 hover:border-accent/40 hover:text-accent"
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
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary rounded-xl px-5 py-2.5 text-center text-sm font-bold text-white"
            >
              Start Building Free &rarr;
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
