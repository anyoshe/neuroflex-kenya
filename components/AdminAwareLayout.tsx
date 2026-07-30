// components/AdminAwareLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import LayoutWrapper from "./LayoutWrapper";

export default function AdminAwareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminPage = pathname?.startsWith("/admin");
  const isReportPdfPage = pathname === "/report/pdf";

  if (isAdminPage || isReportPdfPage) {
    return <>{children}</>;
  }

  return <LayoutWrapper>{children}</LayoutWrapper>;
}
