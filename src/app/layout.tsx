import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";
import AnalyticsConsent from "@/components/AnalyticsConsent";

const siteDescription =
  "Find rental homes, apartments, private rooms, and houses for rent. Connect directly with property owners and authorized property managers on Shagriha.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shagriha.com"),
  title: {
    default: "Shagriha | Rental Homes, Apartments & Rooms",
    template: "%s | Shagriha",
  },
  description: siteDescription,
  applicationName: "Shagriha",
  keywords: ["rental homes", "apartments for rent", "houses for rent", "private rooms for rent", "rental listings", "property owners", "property managers", "Shagriha"],
  authors: [{ name: "Shagriha LLC", url: "https://www.shagriha.com" }],
  creator: "Shagriha LLC",
  publisher: "Shagriha LLC",
  category: "real estate",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    siteName: "Shagriha",
    title: "Shagriha | Rental Homes, Apartments & Rooms",
    description: siteDescription,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Shagriha | Rental Homes, Apartments & Rooms",
    description: siteDescription,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": "https://www.shagriha.com/#organization", name: "Shagriha LLC", url: "https://www.shagriha.com", logo: "https://www.shagriha.com/android-chrome-512x512.png", email: "support@shagriha.com" },
      { "@type": "WebSite", "@id": "https://www.shagriha.com/#website", name: "Shagriha", url: "https://www.shagriha.com", description: siteDescription, publisher: { "@id": "https://www.shagriha.com/#organization" } },
    ],
  };

  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
        <Toaster closeButton />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
