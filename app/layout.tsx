import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  indexableRobots,
} from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Free CV Builder for UAE Jobs",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Build a professional, ATS-friendly CV in minutes. Free CV builder designed for Dubai, Abu Dhabi & UAE job market. No sign-up required.",
  keywords: [
    "CV builder UAE",
    "resume builder Dubai",
    "free CV maker UAE",
    "ATS CV template",
    "professional resume Dubai",
    "CV maker Abu Dhabi",
    "job application UAE",
    "Gulf CV format",
  ],
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Free CV Builder for UAE Jobs",
    description:
      "ATS-friendly CV builder for Dubai & UAE. Free, instant PDF, no account needed.",
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} homepage`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free CV Builder for UAE Jobs",
    description:
      "ATS-friendly CVs for UAE jobs. Free, fast, no sign-up.",
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
  robots: indexableRobots,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://app.makemycv.ae" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-white`}
      >
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8MWPD87FJH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8MWPD87FJH');
          `}
        </Script>
        {/* Delegate click listener: forwards [data-event] attributes to gtag */}
        <Script id="data-event-dispatch" strategy="afterInteractive">
          {`
            document.addEventListener('click', function(e) {
              var el = e.target && e.target.closest ? e.target.closest('[data-event]') : null;
              if (!el) return;
              var eventName = el.getAttribute('data-event');
              if (!eventName || typeof window.gtag !== 'function') return;
              var params = {};
              for (var i = 0; i < el.attributes.length; i++) {
                var attr = el.attributes[i];
                if (attr.name.indexOf('data-') === 0 && attr.name !== 'data-event') {
                  params[attr.name.slice(5).replace(/-/g, '_')] = attr.value;
                }
              }
              window.gtag('event', eventName, params);
            }, { passive: true });
          `}
        </Script>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
