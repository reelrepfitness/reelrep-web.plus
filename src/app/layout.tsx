import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reel Rep Plus | אפליקציית תזונה חכמה לספירת קלוריות",
  description: "אפליקציית תזונה חכמה שנותנת לכם שליטה מלאה. סריקת ברקוד, ניתוח צלחת עם AI, מאגר מזון עצום, מתכונים ומדריכים. בלי לשקול, בלי לנחש - רק תוצאות.",
  keywords: ["אפליקציית תזונה", "ספירת קלוריות", "דיאטה", "מעקב תזונתי", "סריקת ברקוד", "AI תזונה", "מתכונים בריאים", "ירידה במשקל"],
  authors: [{ name: "Reel Rep Plus" }],
  creator: "Reel Rep Plus",
  publisher: "Reel Rep Plus",
  metadataBase: new URL("https://reelrepplus.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "https://reelrepplus.com",
    siteName: "Reel Rep Plus",
    title: "Reel Rep Plus | אפליקציית תזונה חכמה",
    description: "אפליקציית תזונה חכמה שנותנת לכם שליטה מלאה. בלי לשקול, בלי לנחש - רק תוצאות.",
    images: [
      {
        url: "/images/social-share-new.png",
        width: 1200,
        height: 630,
        alt: "Reel Rep Plus - אפליקציית תזונה חכמה",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reel Rep Plus | אפליקציית תזונה חכמה",
    description: "אפליקציית תזונה חכמה שנותנת לכם שליטה מלאה. בלי לשקול, בלי לנחש - רק תוצאות.",
    images: ["/images/social-share-new.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// Structured Data (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Reel Rep Plus",
  applicationCategory: "HealthApplication",
  operatingSystem: "iOS, Android",
  description: "אפליקציית תזונה חכמה שנותנת לכם שליטה מלאה. סריקת ברקוד, ניתוח צלחת עם AI, מאגר מזון עצום, מתכונים ומדריכים.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "ILS",
    description: "14 ימי ניסיון חינם",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "150",
  },
  author: {
    "@type": "Organization",
    name: "Reel Rep Plus",
    url: "https://reelrepplus.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="font-sans antialiased"
      >
        {children}
      </body>
    </html>
  );
}
