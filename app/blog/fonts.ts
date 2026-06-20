import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";

// Scoped to the blog index (applied on the page wrapper, not site-wide) so the
// rest of the app keeps Inter/JetBrains Mono. Loaded via next/font (self-hosted,
// no render-blocking <link>).
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});
