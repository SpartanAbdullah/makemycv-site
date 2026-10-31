import { CreditCard, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TrustChip } from "@/components/ui/TrustChip";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-accent-deep text-white">
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <h2 className="font-display font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.05 }}>
          Your next UAE job starts with a CV
          <br className="hidden md:block" /> that actually gets read.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-white/75">
          Free check. About a minute. No sign-up.
        </p>

        <div className="mt-10 flex justify-center">
          <Button
            href="https://app.makemycv.ae/resume-checker"
            size="lg"
            withArrow
            data-event="cta_click"
            data-cta-id="checker_final_check_cv"
            data-cta-location="final"
          >
            Check my CV — Free
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <TrustChip icon={Lock} label="No sign-up" tone="dark" />
          <TrustChip icon={Zap} label="About a minute" tone="dark" />
          <TrustChip icon={CreditCard} label="No card required" tone="dark" />
        </div>
      </div>
    </section>
  );
}
