import { UsersPage } from "@/features/pages/admin/UsersPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Manajemen User | Learnly",
};

export default function Page() {
  return <UsersPage />;
}

