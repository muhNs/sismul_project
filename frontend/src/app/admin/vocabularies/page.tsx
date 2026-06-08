import { VocabulariesPage } from "@/features/pages/admin/VocabulariesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Kelola Kosakata | Learnly",
};

export default function Page() {
  return <VocabulariesPage />;
}
