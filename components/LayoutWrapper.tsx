"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingBookingWidget from "@/components/FloatingBookingWidget";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isPdfPage = pathname.startsWith("/report/pdf");

  if (isPdfPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />

      <FloatingBookingWidget />
    </>
  );
}