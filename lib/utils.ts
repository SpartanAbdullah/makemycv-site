import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* Standard shadcn-style class combiner — needed by components/ui pieces
   ported from shadcn-shaped sources (floating-icons-hero-section). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
