import type { HTMLAttributes, ReactNode } from "react";

type Bg = "dark" | "paper" | "paper-2";
type PaddingY = "content" | "hero";

const bgs: Record<Bg, string> = {
  dark: "text-white",
  paper: "bg-paper text-slate-900",
  "paper-2": "bg-paper-2 text-slate-900",
};

const paddings: Record<PaddingY, string> = {
  content: "py-20 md:py-28",
  hero: "py-24 md:py-32",
};

type Props = HTMLAttributes<HTMLElement> & {
  bg?: Bg;
  paddingY?: PaddingY;
  children: ReactNode;
  /** Pass children that need to be positioned (e.g. hero-spotlight) — wrapper already relative */
  innerClassName?: string;
};

export function Section({
  bg = "paper",
  paddingY = "content",
  className = "",
  innerClassName = "",
  children,
  ...rest
}: Props) {
  const darkBg =
    bg === "dark"
      ? { background: "linear-gradient(135deg, #0a0f1e 0%, #111827 50%, #0a0f1e 100%)" }
      : undefined;

  return (
    <section
      className={`relative overflow-hidden ${bgs[bg]} ${paddings[paddingY]} ${className}`.trim()}
      style={darkBg}
      {...rest}
    >
      <div className={`relative mx-auto max-w-6xl px-6 ${innerClassName}`.trim()}>
        {children}
      </div>
    </section>
  );
}
