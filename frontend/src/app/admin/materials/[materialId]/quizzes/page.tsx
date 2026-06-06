"use client";

import { AdminQuizForm } from "@/features/quizzes/components/AdminQuizForm";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useParams, useRouter } from "next/navigation";

export default function AdminQuizzesPage() {
  const params = useParams();
  const router = useRouter();
  
  const materialId = params.materialId as string;
  const isReading = materialId?.includes("reading");
  const skill = isReading ? "Reading" : "Listening";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => router.back()} className="px-3">
          <span className="material-symbols-outlined">arrow_back</span>
        </Button>
        <div>
          <h1 className="text-2xl font-bold font-display text-on-surface">
            Kelola Soal Kuis
          </h1>
          <p className="text-on-surface-variant mt-1 text-sm">
            Chapter: {materialId}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="surface" className="p-4 bg-white overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display text-lg font-bold">Daftar Soal Tersimpan</h2>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline text-on-surface-variant text-sm uppercase tracking-wider">
                <th className="p-3">Teks Soal</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-surface-dim hover:bg-surface-container-lowest">
                <td className="p-3">Apa arti kalimat ini?</td>
                <td className="p-3 flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm" className="text-error border-error hover:bg-error-container">Hapus</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Card>

        <div>
          <AdminQuizForm skill={skill} />
        </div>
      </div>
    </div>
  );
}
