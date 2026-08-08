import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Script from "next/script";
import { Preloader } from "@/components/preloader/Preloader";
import { CustomCursor } from "@/components/cursor/CustomCursor";
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
  title: "ProdMan Club — Masters' Union",
  description:
    "ProdMan Club at Masters' Union — Build what should exist. A community of product thinkers, tech builders, AI explorers, design minds, and curious generalists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
        <noscript>
          <style>{`#brand-preloader { display: none !important; } body { overflow: auto !important; }`}</style>
        </noscript>
      </head>
      <body className={`${displaySerif.variable} ${bodySans.variable}`}>
        <MotionProvider>
          <Preloader />
          <CustomCursor />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
