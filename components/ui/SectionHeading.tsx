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
  const titleColor = tone === "dark" ? "text-white" : "text-slate-900";
  const subcopyColor = tone === "dark" ? "text-slate-300" : "text-slate-600";
  const eyebrowColor = tone === "dark" ? "text-blue-400" : "text-brand-blue";

  return (
    <div className={`${alignClass} ${className}`.trim()}>
      {eyebrow && (
        <p
          className={`text-xs font-semibold uppercase tracking-eyebrow ${eyebrowColor}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display font-bold ${titleColor} text-[36px] md:text-[44px] leading-[1.15] tracking-tight-1-5 ${
          eyebrow ? "mt-3" : ""
        }`}
      >
        {title}
      </h2>
      {subcopy && (
        <p
          className={`mt-4 text-lg md:text-xl leading-relaxed ${subcopyColor} max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subcopy}
        </p>
      )}
    </div>
  );
}
