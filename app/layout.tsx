import type { Metadata } from "next";
import Script from "next/script";
import { Sora, Inter } from "next/font/google";
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

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
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
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body
        className={`${sora.variable} ${inter.variable} antialiased bg-white`}
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
