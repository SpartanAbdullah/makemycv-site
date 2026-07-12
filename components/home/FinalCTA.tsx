import { CreditCard, Lock, Zap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section className="bg-accent-deep text-white">
      <Reveal className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <h2 className="font-display text-[32px] font-bold leading-[1.15] tracking-tight-2 md:text-[40px]">
          Your next UAE job starts with the right CV.
        </h2>
        <p className="mt-5 text-lg text-white/75">
          Free to build. Free to download. No paywall, no account, no upsell.
        </p>

        <div className="mt-10">
          <a
            href="https://app.makemycv.ae"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-accent-deep shadow-md transition-all duration-150 ease-out hover:scale-[1.02] hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent-deep"
            data-event="home_final_cta_click"
          >
            Build My CV — Free
            <span aria-hidden="true" className="ml-2">
              &rarr;
            </span>
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/65">
          <span className="inline-flex items-center gap-1.5">
            <Lock size={14} className="text-gold-light" />
            Your data stays in your browser
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap size={14} className="text-gold-light" />
            Ready in 5 minutes
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CreditCard size={14} className="text-gold-light" />
            No card required
          </span>
        </div>
      </Reveal>
    </section>
  );
}
