"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100 transition-all";
const labelClass =
  "block mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500";

export const ContactForm = () => {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Question",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    try {
      const res = await fetch("https://formspree.io/f/mqeykryy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormState("success");
        setForm({
          name: "",
          email: "",
          subject: "General Question",
          message: "",
        });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
        <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-3" strokeWidth={2} />
        <h3 className="font-bold text-green-800 text-xl mb-2">
          Message Sent!
        </h3>
        <p className="text-green-700 text-sm">
          We&apos;ll reply within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {formState === "error" && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          Something went wrong. Please try again or email us directly at hello@makemycv.ae.
        </div>
      )}
      <div>
        <label className={labelClass}>Name *</label>
        <input
          type="text"
          required
          placeholder="Your full name"
          className={inputClass}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div>
        <label className={labelClass}>Email *</label>
        <input
          type="email"
          required
          placeholder="you@email.com"
          className={inputClass}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div>
        <label className={labelClass}>Subject</label>
        <select
          className={inputClass}
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        >
          <option>General Question</option>
          <option>Bug Report</option>
          <option>Feature Request</option>
          <option>Partnership</option>
          <option>Pro Plan Info</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Message *</label>
        <textarea
          required
          rows={5}
          placeholder="How can we help?"
          className={inputClass}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>
      <button
        type="submit"
        disabled={formState === "submitting"}
        className="btn-primary w-full text-white font-bold py-4 rounded-2xl text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {formState === "submitting" ? "Sending..." : "Send Message \u2192"}
      </button>
    </form>
  );
};
