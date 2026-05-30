import type { LucideIcon } from "lucide-react";

type Tone = "blue" | "green" | "red" | "amber" | "slate";
type Size = "sm" | "md";

const tones: Record<Tone, string> = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
  red: "bg-red-50 text-red-600",
  amber: "bg-amber-50 text-amber-600",
  slate: "bg-slate-100 text-slate-700",
};

const sizes: Record<Size, { box: string; icon: number }> = {
  sm: { box: "h-8 w-8 rounded-lg", icon: 16 },
  md: { box: "h-10 w-10 rounded-xl", icon: 20 },
};

export function IconBadge({
  icon: Icon,
  tone = "blue",
  size = "md",
}: {
  icon: LucideIcon;
  tone?: Tone;
  size?: Size;
}) {
  const { box, icon } = sizes[size];
  return (
    <div className={`inline-flex items-center justify-center ${box} ${tones[tone]}`}>
      <Icon size={icon} strokeWidth={2} />
    </div>
  );
}
