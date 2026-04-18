import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "ghost" | "text";
type Size = "sm" | "md" | "lg";
type Tone = "light" | "dark";

const base =
  "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-7 py-3.5",
  lg: "text-lg px-8 py-4",
};

const variants: Record<Variant, (tone: Tone) => string> = {
  primary: () =>
    "text-white bg-gradient-to-br from-brand-blue to-brand-blue-dark shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5",
  ghost: (tone) =>
    tone === "dark"
      ? "border border-white/20 text-white hover:bg-white/10"
      : "border border-line text-slate-800 hover:bg-paper-2",
  text: () =>
    "text-brand-blue hover:underline underline-offset-4 px-0 py-0 shadow-none",
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
      {withArrow && <ArrowRight className="ml-2" size={18} />}
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
