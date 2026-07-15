import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ManifestLink from "@/components/ManifestLink";
import SchemaMarkup from "@/components/SchemaMarkup"; // 1. Import it here
import { Toaster } from "react-hot-toast";
import "./report-preview.css";
import AdminAwareLayout from "@/components/AdminAwareLayout";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const siteUrl = "https://neuroflexkenya.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Neuroflex Kenya | Physio & Wellness Centre",
  description:
    "Expert neurological rehabilitation and physiotherapy in Nairobi. Stroke recovery, pediatric care, and wellness programs led by NRPT Dennis Masaki.",
     verification: {
    google: "KgPlqn8f_qdNZ2T_KwoYRgyw5x9cK0SLG0nAXoTibco",
  },

  keywords: [
    "physiotherapy Nairobi",
    "neurological rehabilitation Kenya",
    "stroke recovery Nairobi",
    "Neuroflex Kenya",
    "Dennis Masaki physiotherapist",
    "physical therapy Kenya",
  ],
  authors: [{ name: "NRPT Dennis Masaki" }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/icon-192x192.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
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

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} min-h-screen flex flex-col`}>
//         <SchemaMarkup />
//         <ManifestLink />

//         <LayoutWrapper>
//           {children}
//         </LayoutWrapper>

//         <Toaster position="top-center" />
//       </body>
//     </html>
//   );
// }
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <SchemaMarkup />
        <ManifestLink />

        {/* Smart Wrapper - skips LayoutWrapper for admin pages */}
        <AdminAwareLayout>
          {children}
        </AdminAwareLayout>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}