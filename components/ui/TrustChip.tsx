import type { LucideIcon } from "lucide-react";

type Tone = "light" | "dark";

type Props = {
  icon: LucideIcon;
  label: string;
  tone?: Tone;
};

export function TrustChip({ icon: Icon, label, tone = "light" }: Props) {
  const toneClass =
    tone === "dark"
      ? "bg-white/10 text-slate-200 border-white/10"
      : "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${toneClass}`}
    >
      <Icon size={14} strokeWidth={2.25} />
      {label}
    </span>
  );
}
