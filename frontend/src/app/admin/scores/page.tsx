import { AdminScoreTable } from "@/features/scores/components/AdminScoreTable";

export default function AdminScoresPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold font-display text-on-surface">Laporan Nilai</h1>
          <p className="text-on-surface-variant mt-1 text-sm">
            Pantau perkembangan dan skor kuis siswa.
          </p>
        </div>
      </div>
      <AdminScoreTable />
    </div>
  );
}
