import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The product is simple enough that "how it works" is one sentence.
 * No decorative step numbers, no three-card walkthrough.
 */
export function HowItWorks() {
  return (
    <section className="bg-paper py-16 md:py-20">
      <Reveal className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-[26px] font-bold leading-snug tracking-tight-2 text-ink md:text-[30px]">
          Fill in your details, pick a template,
          <br className="hidden md:block" /> download your CV.{" "}
          <span className="text-accent">About five minutes.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
          No account. No credit card. No &ldquo;upgrade to continue&rdquo;
          popup at the last step.
        </p>

        <div className="mt-8">
          <Button
            href="https://app.makemycv.ae"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            withArrow
            data-event="home_how_it_works_cta_click"
          >
            Start building — Free
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
