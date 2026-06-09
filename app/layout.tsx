import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingBookingWidget from "@/components/FloatingBookingWidget";
import ManifestLink from "@/components/ManifestLink";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Neuroflex Kenya | Physio & Wellness Centre",
  description:
    "Expert neurological rehabilitation and physiotherapy in Nairobi. Stroke recovery, pediatric care, and wellness programs led by NRPT Dennis Masaki.",
  keywords: [
    "physiotherapy Nairobi",
    "neurological rehabilitation Kenya",
    "stroke recovery",
    "Neuroflex Kenya",
  ],
  icons: {
    icon: "/assets/logos/logo2.jpeg",
  },
  openGraph: {
    title: "Neuroflex Kenya | Physio & Wellness Centre",
    description:
      "Recover. Move. Thrive. Advanced rehabilitation and compassionate care in Nairobi.",
    type: "website",
  },
  other: {
    "manifest": "/manifest.json",
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