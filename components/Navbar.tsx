"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" },
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
      className={`sticky top-0 z-50 backdrop-blur-xl bg-white/80 transition-shadow ${
        scrolled ? "shadow-sm border-b border-slate-100/80" : "border-b border-slate-100/80"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full btn-primary text-xs font-bold text-white"
            style={{ boxShadow: '0 0 16px rgba(37,99,235,0.4)' }}
          >
            M
          </span>
          <span className="font-display text-lg font-bold text-slate-900">
            MakeMyCV
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-[#2563eb] after:transition-all ${
                  isActive
                    ? "text-[#2563eb] after:w-full"
                    : "text-slate-600 hover:text-[#2563eb] after:w-0 hover:after:w-full"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/resume-checker"
            className="neon-border group relative inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-900 transition-transform hover:scale-[1.03]"
            data-cta-location="navbar-ats-checker"
            data-event="navbar_ats_checker_click"
          >
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]"
            />
            ATS Checker
          </Link>
          <a
            href="https://app.makemycv.ae"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl"
          >
            Start Building Free &rarr;
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-slate-700 transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-slate-700 transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-slate-700 transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-brand-border bg-white/95 backdrop-blur-xl px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? "text-[#2563eb]" : "text-slate-600 hover:text-[#2563eb]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/resume-checker"
              onClick={() => setMenuOpen(false)}
              className="neon-border mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-center text-sm font-semibold text-slate-900"
              data-cta-location="navbar-ats-checker"
              data-event="navbar_ats_checker_click"
            >
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]"
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
