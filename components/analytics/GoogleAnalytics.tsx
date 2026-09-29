import Script from "next/script";

// Measurement IDs are public (they ship in the page source), so the club property
// is the production default; NEXT_PUBLIC_GA_ID overrides it. `next dev` never
// reports, so local work stays out of the data.
const GA_ID =
  process.env.NEXT_PUBLIC_GA_ID ??
  (process.env.NODE_ENV === "production" ? "G-CBXEY954H5" : undefined);

/**
 * GA4 loader. Renders nothing in local dev (no ID resolved).
 *
 * Consent Mode v2: everything starts denied and only analytics_storage is
 * granted after the visitor accepts in <ConsentBanner />. Ads signals stay
 * denied always. Until then GA receives cookieless pings only.
 *
 * DAU comes from GA4's built-in "Active users" metric (1-day window); no
 * custom events are needed. Enhanced measurement (on by default) also sends
 * page_view on client-side route changes.
 */
export function GoogleAnalytics() {
  if (!GA_ID || !/^G-[A-Z0-9]+$/.test(GA_ID)) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          try {
            if (localStorage.getItem('prodman_consent') === 'granted') {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            }
          } catch (e) {}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
