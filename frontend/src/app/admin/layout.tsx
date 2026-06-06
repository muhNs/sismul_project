import React from "react";
import { AdminLayout as LayoutWrapper } from "@/features/pages/admin/components/layout/AdminLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}

