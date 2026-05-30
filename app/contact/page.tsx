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
      <section className="bg-brand-navy py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="font-display text-4xl font-extrabold text-white md:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Questions, feedback, or partnership inquiries. We read every
            message.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-xl px-6">
          <ContactForm />
        </div>

        {/* Info cards */}
        <div className="mx-auto mt-12 grid max-w-xl gap-4 px-6 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-5 text-center">
            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Mail size={20} />
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-800">Email</p>
            <p className="text-sm text-brand-muted">hello@makemycv.ae</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5 text-center">
            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <MapPin size={20} />
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-800">
              Based In
            </p>
            <p className="text-sm text-brand-muted">
              Dubai, United Arab Emirates
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
