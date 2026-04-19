"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode[];
};

export function TemplateShowcaseCarousel({ children }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { active: false },
    },
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const raf = useRef<number | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setCanPrev(emblaApi.canScrollPrev());
        setCanNext(emblaApi.canScrollNext());
      });
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Mobile: embla carousel. Desktop: disabled above md, natural grid below. */}
      <div className="overflow-hidden md:contents" ref={emblaRef}>
        <div className="flex gap-5 md:contents">
          {children.map((child, i) => (
            <div
              key={i}
              className="min-w-[78%] flex-none md:min-w-0 md:flex-auto"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile nav arrows */}
      <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canPrev}
          aria-label="Previous template"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-xs transition-colors hover:border-brand-blue hover:text-brand-blue disabled:opacity-40 disabled:pointer-events-none"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canNext}
          aria-label="Next template"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-xs transition-colors hover:border-brand-blue hover:text-brand-blue disabled:opacity-40 disabled:pointer-events-none"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
