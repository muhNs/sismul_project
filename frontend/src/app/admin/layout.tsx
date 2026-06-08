import React from "react";
import { AdminLayout as LayoutWrapper } from "@/features/pages/admin/components/layout/AdminLayout";
import { AdminGuard } from "@/features/pages/admin/components/layout/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <LayoutWrapper>{children}</LayoutWrapper>
    </AdminGuard>
  );
}

