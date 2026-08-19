import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "ghost" | "outline" | "text";
type Size = "sm" | "md" | "lg";
type Tone = "light" | "dark";

/* Premium pill buttons (2026-08 reskin): fully rounded, 3D-glass primary,
   floating-paper secondary — shadows carry the ring border, so no `border`. */
const base =
  "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  sm: "text-sm px-5 py-2.5",
  md: "text-lg px-8 py-3.5",
  lg: "text-lg px-9 py-4",
};

const variants: Record<Variant, (tone: Tone) => string> = {
  primary: () =>
    "text-white bg-accent shadow-cta hover:shadow-cta-hover hover:-translate-y-px hover:brightness-[1.08]",
  ghost: (tone) =>
    tone === "dark"
      ? "border border-white/20 text-white hover:bg-white/10"
      : "bg-sheet text-ink shadow-float hover:shadow-float-hover hover:-translate-y-px",
  outline: (tone) =>
    tone === "dark"
      ? "border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:border-white/50"
      : "bg-sheet text-accent shadow-float hover:shadow-float-hover hover:-translate-y-px",
  text: () =>
    "text-accent hover:underline underline-offset-4 px-0 py-0 shadow-none",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  tone = "light",
  className = "",
}: {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  className?: string;
} = {}): string {
  const sizeClass = variant === "text" ? "" : sizes[size];
  return `${base} ${sizeClass} ${variants[variant](tone)} ${className}`.trim();
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
};

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export function Button(props: AnchorProps | ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    tone = "light",
    withArrow = false,
    children,
    className,
    ...rest
  } = props;

  const cls = buttonClasses({ variant, size, tone, className });
  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowRight className="ml-2" size={18} aria-hidden="true" focusable="false" />
      )}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorProps;
    return (
      <a href={href} className={cls} {...anchorRest}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonRest } = rest as ButtonProps;
  return (
    <button type={type} className={cls} {...buttonRest}>
      {content}
    </button>
  );
}
