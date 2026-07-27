// components/LayoutWrapper.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingBookingWidget from "@/components/FloatingBookingWidget";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingBookingWidget />
    </>
  );
}