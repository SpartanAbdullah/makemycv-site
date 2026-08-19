"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/* Ported from a shadcn-shaped source. Adapted for this codebase:
   - shadcn theme tokens (bg-background, bg-card, text-foreground…) don't
     exist here, so classes use the site palette (paper/ink/line).
   - The shadcn Button dependency was dropped — components/ui/Button.tsx
     already exists (and Windows' case-insensitive FS means a shadcn
     button.tsx would overwrite it). CTAs use the site's btn-primary style.
   - Supports an optional secondary CTA (LinkedIn + Instagram pairing). */

// Interface for the props of each individual icon.
interface IconProps {
  id: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className: string; // Used for custom positioning of the icon.
  href?: string; // Optional link — icon becomes clickable.
  label?: string; // Accessible name when href is set.
}

// Interface for the main hero component's props.
export interface FloatingIconsHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  icons: IconProps[];
}

// A single icon component with its own motion logic
const Icon = ({
  mouseX,
  mouseY,
  iconData,
  index,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  iconData: IconProps;
  index: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Motion values for the icon's position, with spring physics for smooth movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
            Math.pow(mouseY.current - (rect.top + rect.height / 2), 2)
        );

        // If the cursor is close enough, repel the icon
        if (distance < 150) {
          const angle = Math.atan2(
            mouseY.current - (rect.top + rect.height / 2),
            mouseX.current - (rect.left + rect.width / 2)
          );
          // The closer the cursor, the stronger the repulsion
          const force = (1 - distance / 150) * 50;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          // Return to original position when cursor is away
          x.set(0);
          y.set(0);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, mouseX, mouseY]);

  const tile = (
    <motion.div
      className="flex h-16 w-16 items-center justify-center rounded-3xl border border-line bg-white/85 p-3 shadow-xl backdrop-blur-md md:h-20 md:w-20"
      animate={{
        y: [0, -8, 0, 8, 0],
        x: [0, 6, 0, -6, 0],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{
        duration: 5 + ((index * 1.7) % 5),
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      <iconData.icon className="h-8 w-8 text-ink md:h-10 md:w-10" />
    </motion.div>
  );

  return (
    <motion.div
      ref={ref}
      key={iconData.id}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("absolute", iconData.className)}
    >
      {iconData.href ? (
        <a
          href={iconData.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={iconData.label}
          className="block rounded-3xl outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          {tile}
        </a>
      ) : (
        tile
      )}
    </motion.div>
  );
};

const FloatingIconsHero = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & FloatingIconsHeroProps
>(
  (
    {
      className,
      title,
      subtitle,
      ctaText,
      ctaHref,
      secondaryCtaText,
      secondaryCtaHref,
      icons,
      ...props
    },
    ref
  ) => {
    // Refs to track the raw mouse position
    const mouseX = React.useRef(0);
    const mouseY = React.useRef(0);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
    };

    return (
      <section
        ref={ref}
        onMouseMove={handleMouseMove}
        className={cn(
          "relative flex w-full items-center justify-center overflow-hidden bg-paper-2 py-24 md:py-32",
          className
        )}
        {...props}
      >
        {/* Container for the background floating icons */}
        <div className="absolute inset-0 h-full w-full">
          {icons.map((iconData, index) => (
            <Icon
              key={iconData.id}
              mouseX={mouseX}
              mouseY={mouseY}
              iconData={iconData}
              index={index}
            />
          ))}
        </div>

        {/* Container for the foreground content */}
        <div className="relative z-10 px-4 text-center">
          <h2 className="bg-gradient-to-b from-ink to-ink/70 bg-clip-text text-[36px] font-bold leading-[1.05] tracking-tight text-transparent md:text-[48px]">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">{subtitle}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block px-8 py-3.5 text-base font-semibold text-white"
            >
              {ctaText}
            </a>
            {secondaryCtaText && secondaryCtaHref && (
              <a
                href={secondaryCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-sheet px-8 py-3.5 text-base font-semibold text-ink shadow-float transition-all duration-200 hover:-translate-y-px hover:text-accent hover:shadow-float-hover"
              >
                {secondaryCtaText}
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }
);

FloatingIconsHero.displayName = "FloatingIconsHero";

export { FloatingIconsHero };
