// Category → accent colour map for the blog redesign (dark theme).
// Mirrors the approved mockup's CATS palette. Kept free of any Velite import
// so it can be used in both Server and Client Components.
export const CATEGORY_COLOR: Record<string, string> = {
  "CV Tips": "#2563eb", // brand blue
  "UAE Job Market": "#10b981", // teal/green
  "ATS Guide": "#818cf8", // indigo
  "Career Advice": "#fbbf24", // amber
  "Interview Tips": "#fb7185", // rose
  "Industry Guide": "#22d3ee", // cyan
};

export function categoryColor(category: string): string {
  return CATEGORY_COLOR[category] ?? "#2563eb";
}
