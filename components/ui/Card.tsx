import type { HTMLAttributes, ReactNode } from "react";

type Variant = "default" | "glass";

/* Floating-paper cards (2026-08 reskin): the shadow's ring layer replaces the
   old `border border-line`, so no border here. */
const variants: Record<Variant, string> = {
  default:
    "bg-sheet rounded-2xl p-6 shadow-float transition-all duration-200 hover:shadow-float-hover hover:-translate-y-0.5",
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
