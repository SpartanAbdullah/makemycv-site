import { buildPageMetadata } from "@/lib/seo";
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "./ContactForm";

export const metadata = buildPageMetadata({
  title: "Contact MakeMyCV",
  description:
    "Get in touch with the MakeMyCV team for questions, feedback, or partnership inquiries.",
  path: "/contact",
  index: false,
});

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-paper py-16 md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 55% at 76% 32%, rgba(14, 124, 74, 0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <h1 className="font-display text-[clamp(36px,4vw,56px)] font-bold leading-[1.1] tracking-tight-2 text-ink">
            Get in <span className="text-accent">Touch</span>
          </h1>
          <p className="mt-4 text-lg text-muted">
            Questions, feedback, or partnership inquiries. We read every
            message.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-paper py-12 md:py-20">
        <div className="mx-auto max-w-xl px-6">
          <ContactForm />
        </div>

        {/* Info cards */}
        <div className="mx-auto mt-12 grid max-w-xl gap-4 px-6 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-sheet p-5 text-center shadow-sm-soft">
            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Mail size={20} />
            </div>
            <p className="mt-2 text-sm font-semibold text-ink">Email</p>
            <p className="text-sm text-muted">hello@makemycv.ae</p>
          </div>
          <div className="rounded-xl border border-line bg-sheet p-5 text-center shadow-sm-soft">
            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <MapPin size={20} />
            </div>
            <p className="mt-2 text-sm font-semibold text-ink">
              Based In
            </p>
            <p className="text-sm text-muted">
              Dubai, United Arab Emirates
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
