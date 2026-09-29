import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Script from "next/script";
import { Preloader } from "@/components/preloader/Preloader";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { MotionProvider } from "@/components/providers/MotionProvider";
import "./globals.css";

const displaySerif = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const bodySans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prodman-club.vercel.app"),
  title: "ProdMan Club — Masters' Union",
  description:
    "ProdMan Club at Masters' Union — Build what should exist. A community of product thinkers, tech builders, AI explorers, design minds, and curious generalists.",
  openGraph: {
    title: "ProdMan Club — Masters' Union",
    description:
      "A community of product thinkers, tech builders, AI explorers, design minds, and curious generalists.",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProdMan Club — Masters' Union",
    description:
      "A community of product thinkers, tech builders, AI explorers, design minds, and curious generalists.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Static first-party script: reads sessionStorage to skip the preloader on
            repeat visits. No user input, no external data, no side effects beyond adding
            a class to <html>. */}
        <Script
          id="prodman-preloader-visibility"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (sessionStorage.getItem('prodman_preloader_seen') === 'true' && !window.location.search.includes('preloader=force')) {
                    document.documentElement.classList.add('preloader-seen');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <meta name="theme-color" content="#f2f0e8" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#050505" media="(prefers-color-scheme: dark)" />
        <noscript>
          <style>{`#brand-preloader { display: none !important; } body { overflow: auto !important; }`}</style>
        </noscript>
      </head>
      <body className={`${displaySerif.variable} ${bodySans.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <Preloader />
          <CustomCursor />
          {children}
        </MotionProvider>
        <GoogleAnalytics />
        <ConsentBanner />
      </body>
    </html>
  );
}
