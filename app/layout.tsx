import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";
import { profile, siteUrl } from "@/lib/data";

const fullTitle = `${profile.name} · ${profile.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: fullTitle,
  description: profile.summary,
  keywords: [
    profile.name,
    "sales",
    "business development",
    "bilingual",
    "Montréal",
    "founder",
    "Afterlife Events",
  ],
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: fullTitle,
    description: profile.summary,
    url: "/",
    siteName: profile.name,
    type: "website",
    locale: "en_CA",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: fullTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description: profile.summary,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <ScrollProgress />
        <div id="content">{children}</div>
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
