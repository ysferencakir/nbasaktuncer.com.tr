import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { sitePublicUrl } from "@/lib/site-config";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "N. Başak Tuncer",
    template: "%s | N. Başak Tuncer",
  },
  description: "N. Başak Tuncer yazıları için modern ve sade makale platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "N. Başak Tuncer",
    url: sitePublicUrl,
    inLanguage: "tr-TR",
  };

  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-sans`}>
        <JsonLd data={websiteJsonLd} />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 py-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
