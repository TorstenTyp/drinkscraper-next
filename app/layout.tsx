import type { Metadata } from "next";
import { merriweather } from '@/app/ui/fonts';
import type { Viewport } from 'next'
import "@/app/ui/globals.css";

export const metadata: Metadata = {
  title: "Drink Scraper",
  description: "Cocktails gathered from all over the internet",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${merriweather.className} antialiased bg-slate-100`}
      >{children}</body>
    </html>
  );
}
