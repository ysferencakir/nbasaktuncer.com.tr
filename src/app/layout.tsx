import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

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
    default: "Makale Platformu",
    template: "%s | Makale Platformu",
  },
  description: "Sanity ile yönetilen modern ve sade makale platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-sans`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 py-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
