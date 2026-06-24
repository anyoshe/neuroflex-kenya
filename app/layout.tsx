import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingBookingWidget from "@/components/FloatingBookingWidget";
import ManifestLink from "@/components/ManifestLink";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.neuroflexkenya.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Neuroflex Kenya | Physio & Wellness Centre",
  description:
    "Expert neurological rehabilitation and physiotherapy in Nairobi. Stroke recovery, pediatric care, and wellness programs led by NRPT Dennis Masaki.",
  keywords: [
    "physiotherapy Nairobi",
    "neurological rehabilitation Kenya",
    "stroke recovery",
    "Neuroflex Kenya",
    "physical therapy",
  ],
  authors: [{ name: "NRPT Dennis Masaki" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/icon-192x192.png",           // For iOS
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",                   // Important for PWA
  openGraph: {
    title: "Neuroflex Kenya | Physio & Wellness Centre",
    description:
      "Recover. Move. Thrive. Advanced rehabilitation and compassionate care in Nairobi.",
    images: [
      {
        url: "/assets/logos/logo2.jpeg",
        width: 1200,
        height: 630,
        alt: "Neuroflex Kenya Logo",
      },
    ],
    siteName: "Neuroflex Kenya",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ManifestLink />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingBookingWidget />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}