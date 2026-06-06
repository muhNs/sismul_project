import { AdminMaterialTable } from "@/features/materials/components/AdminMaterialTable";

export default function AdminMaterialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold font-display text-on-surface">Materi Pembelajaran</h1>
          <p className="text-on-surface-variant mt-1 text-sm">
            Kelola chapter materi dan soal-soal kuis.
          </p>
        </div>
      </div>
      <AdminMaterialTable />
    </div>
  );
}
