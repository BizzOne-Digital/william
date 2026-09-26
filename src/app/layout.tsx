import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { siteMetadata } from "@/lib/metadata";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = siteMetadata();

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${montserrat.variable} h-full`}>
      <body className="page-width flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
