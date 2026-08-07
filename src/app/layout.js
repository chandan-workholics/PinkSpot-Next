import "./globals.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://pinkspot.cc"),
  title: "Female Escorts in Canada - Verified Ads | Pinkspot",
  description: "Explore verified female escort ads across Canada. Browse discreet companion listings by city and province on Pinkspot.",
  openGraph: {
    title: "Female Escorts in Canada - Verified Ads | Pinkspot",
    description: "Explore verified female escort ads across Canada. Browse discreet companion listings by city and province on Pinkspot.",
    url: "https://pinkspot.cc/",
    siteName: "Pinkspot.cc",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </head>

      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T3DBWT5Q48"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T3DBWT5Q48');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
