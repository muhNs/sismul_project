import QuizzesPage from "@/features/pages/admin/QuizzesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Kelola Kuis | Learnly",
};

export default function Page() {
  return <QuizzesPage />;
}
