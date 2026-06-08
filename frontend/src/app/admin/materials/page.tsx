import { MaterialsPage } from "@/features/pages/admin/MaterialsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Kelola Materi | Learnly",
};

export default function Page() {
  return <MaterialsPage />;
}
