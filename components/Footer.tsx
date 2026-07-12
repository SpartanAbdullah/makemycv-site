import Link from "next/link";
import { Heart, MapPin } from "lucide-react";

const pageLinks = [
  { href: "/", label: "Home" },
  { href: "/templates", label: "Templates" },
  { href: "/support", label: "Support" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const Footer = () => (
  <footer className="border-t border-white/10 bg-ink text-white">
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
      {/* Brand */}
      <div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-xs font-bold text-white">
            M
          </span>
          <span className="font-display text-lg font-bold">MakeMyCV</span>
        </div>
        <p className="mt-2 text-sm text-white/60">
          Built for UAE job seekers.
          <br />
          Free, fast, ATS-friendly.
        </p>
        <p className="mt-4 text-xs text-white/45">
          Contact:{" "}
          <a
            href="mailto:hello@makemycv.ae"
            className="text-white/60 transition-colors duration-150 hover:text-gold-light"
          >
            hello@makemycv.ae
          </a>
        </p>
        <p className="mt-2 text-xs text-white/45">
          <Link
            href="/support"
            className="transition-colors duration-150 hover:text-gold-light"
          >
            Built by Abdullah in Dubai.
          </Link>
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
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

      {/* App CTA */}
      <div>
        <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
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
        <p className="mt-2 text-xs text-white/45">
          No account needed. Takes 5 minutes.
        </p>
      </div>
    </div>

    {/* Bottom bar */}
    <div>
      <div className="mb-6 h-px bg-white/10" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 pb-6 text-xs text-white/40 sm:flex-row">
        <span>&copy; 2026 makemycv.ae &mdash; All rights reserved.</span>
        <span className="flex items-center gap-1.5 text-xs text-white/40">
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
