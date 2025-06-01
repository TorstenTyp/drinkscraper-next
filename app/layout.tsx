import type { Metadata } from "next";
import { merriweather } from '@/app/ui/fonts';
import "@/app/ui/globals.css";

export const metadata: Metadata = {
  title: "Drink Scraper",
  description: "Cocktails gathered from all over the internet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
      className={`${merriweather.className} antialiased`}
      >{children}</body>
    </html>
  );
}
