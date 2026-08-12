import * as React from "react";

/* Brand SVGs for the two owned social profiles (LinkedIn + Instagram).
   lucide-react dropped its brand icons, so these live here — plain server-safe
   components shared by the Footer and the homepage SocialSection.

   Full-color variants carry their own brand fills; the *Glyph variants use
   currentColor for monochrome contexts (footer). */

export const IconLinkedIn = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#0A66C2" />
    <path
      fill="#fff"
      d="M6.94 8.5H4.5V19h2.44V8.5ZM5.72 7.4a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9ZM19.5 13.24c0-2.7-1.44-3.96-3.37-3.96-1.55 0-2.25.86-2.63 1.46V8.5h-2.44V19h2.44v-5.61c0-1.1.2-2.16 1.57-2.16 1.34 0 1.36 1.25 1.36 2.23V19h2.44l.03-5.76Z"
    />
  </svg>
);

export const IconInstagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="10%" stopColor="#fdf497" />
        <stop offset="50%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
    <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.8" />
    <circle cx="16.2" cy="7.8" r="1" fill="#fff" />
  </svg>
);

export const IconLinkedInGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

/* Share-target glyphs. Not owned profiles — these label the share row on blog
   posts, so they only ever need the monochrome currentColor treatment. */

export const IconWhatsAppGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.92 9.92 0 0 0 4.88 1.27h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2Zm0 18.19h-.01a8.27 8.27 0 0 1-4.21-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.24 8.24 0 0 1-1.27-4.41c0-4.57 3.72-8.29 8.29-8.29 2.21 0 4.29.86 5.86 2.43a8.24 8.24 0 0 1 2.42 5.86c0 4.57-3.72 8.28-8.29 8.28Zm4.55-6.2c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.56.12-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06a6.77 6.77 0 0 1-3.38-2.96c-.26-.44.25-.4.73-1.35.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.86-.87 2.09s.9 2.43 1.02 2.6c.13.16 1.77 2.7 4.28 3.79 1.59.69 2.21.75 3.01.63.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.11-.23-.17-.48-.29Z" />
  </svg>
);

export const IconXGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.96 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.09 4.13H5.12l11.96 15.64Z" />
  </svg>
);

export const IconInstagramGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);
