import { ScoresPage } from "@/features/pages/admin/ScoresPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Laporan Nilai | Learnly",
};

export default function Page() {
  return <ScoresPage />;
}
