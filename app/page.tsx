import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Neuroflex Kenya | Physiotherapy & Rehabilitation in Nairobi",
  description:
    "Neuroflex Kenya is a physiotherapy and neurological rehabilitation centre on Fedha Road, Embakasi, Nairobi, led by NRPT Dennis Masaki.",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return <HomePageClient />;
}
