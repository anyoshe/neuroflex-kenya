// "use client";

// import { usePathname } from "next/navigation";

// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import FloatingBookingWidget from "@/components/FloatingBookingWidget";

// export default function LayoutWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();

//   const isPdfPage = pathname.startsWith("/report/pdf");
//   const isAdminPage = pathname.startsWith("/admin");

//   // PDF pages and Admin pages should not have the public layout
//   if (isPdfPage || isAdminPage) {
//     return <>{children}</>;
//   }

//   return (
//     <>
//       <Navbar />

//       <main className="flex-1">
//         {children}
//       </main>

//       <Footer />

//       <FloatingBookingWidget />
//     </>
//   );
// }

// components/LayoutWrapper.tsx
// ← NO "use client" here (Server Component)

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingBookingWidget from "@/components/FloatingBookingWidget";

type Props = {
  children: React.ReactNode;
  // We will pass the pathname from a client component only when needed
};

export default function LayoutWrapper({ children }: Props) {
  // For now, we will always show navbar/footer
  // We will handle admin pages differently (better for SEO)

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingBookingWidget />
    </>
  );
}