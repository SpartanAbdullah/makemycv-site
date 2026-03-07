import Link from "next/link";

const pageLinks = [
  { href: "/", label: "Home" },
  { href: "/templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const Footer = () => (
  <footer className="bg-brand-navy text-white">
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
      {/* Brand */}
      <div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-blue" />
          <span className="font-display text-lg font-bold">MakeMyCV</span>
        </div>
        <p className="mt-2 text-sm text-slate-400">
          Built for UAE job seekers.
          <br />
          Free, fast, ATS-friendly.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Pages
        </p>
        <div className="flex flex-col gap-2">
          {pageLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* App CTA */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Build Your CV
        </p>
        <a
          href="https://app.makemycv.ae"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700"
        >
          Start Free &rarr;
        </a>
        <p className="mt-2 text-xs text-slate-500">
          No account needed. Takes 5 minutes.
        </p>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-slate-600 sm:flex-row">
        <span>&copy; 2026 makemycv.ae &mdash; All rights reserved.</span>
        <span>Made for UAE &#127462;&#127466;</span>
      </div>
    </div>
  </footer>
);
