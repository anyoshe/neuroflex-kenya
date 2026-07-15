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

  if (isAdminPage) {
    return <>{children}</>;   // Skip public layout for admin
  }

  return <LayoutWrapper>{children}</LayoutWrapper>;
}