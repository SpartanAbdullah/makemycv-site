import type { HTMLAttributes, ReactNode } from "react";

type Variant = "default" | "glass";

const variants: Record<Variant, string> = {
  default:
    "bg-white border border-line rounded-2xl p-6 shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-md-soft hover:-translate-y-0.5",
  glass:
    "glass-card rounded-2xl p-6 transition-all duration-200 hover:bg-white/[0.06]",
};

type Props = HTMLAttributes<HTMLDivElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function Card({
  variant = "default",
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <div className={`${variants[variant]} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}
