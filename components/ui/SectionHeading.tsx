type Align = "left" | "center";

type Props = {
  eyebrow?: string;
  title: string;
  subcopy?: string;
  align?: Align;
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subcopy,
  align = "center",
  tone = "light",
  className = "",
}: Props) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const subcopyColor = tone === "dark" ? "text-white/70" : "text-muted";
  const eyebrowColor = tone === "dark" ? "text-gold-light" : "text-accent";

  return (
    <div className={`${alignClass} ${className}`.trim()}>
      {eyebrow && (
        <p
          className={`font-mono text-[11px] font-semibold uppercase tracking-[0.14em] ${eyebrowColor}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display font-bold ${titleColor} text-[28px] md:text-[32px] leading-[1.2] tracking-tight-2 ${
          eyebrow ? "mt-3" : ""
        }`}
      >
        {title}
      </h2>
      {subcopy && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed ${subcopyColor} max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subcopy}
        </p>
      )}
    </div>
  );
}
