import type { Metadata, Viewport } from "next";
import { Inter, Lato, Roboto_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/content";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import "./globals.css";

// Tipografia 2+1: display, body, un solo outlier mono. Solo i pesi usati.
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"], display: "swap", variable: "--font-inter" });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"], display: "swap", variable: "--font-lato" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap", variable: "--font-roboto-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  icons: {
    icon: [
      { url: "/assets/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
  openGraph: { type: "website", title: site.title, description: site.description, url: site.url, images: [{ url: "/assets/og.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", site: site.twitter, title: site.title, description: site.shortDescription, images: ["/assets/og.png"] },
};

export const viewport: Viewport = { themeColor: "#12110d", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${inter.variable} ${lato.variable} ${robotoMono.variable}`}>
      <body>
        <a className="skip-link" href="#panel">Salta al contenuto</a>
        {children}
        <AudioPlayer />
        <Analytics />
      </body>
    </html>
  );
}
