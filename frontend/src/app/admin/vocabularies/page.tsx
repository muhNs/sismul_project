import { AdminVocabularyTable } from "@/features/vocabularies/components/AdminVocabularyTable";

export default function AdminVocabulariesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold font-display text-on-surface">Kosakata</h1>
          <p className="text-on-surface-variant mt-1 text-sm">
            Kelola daftar kosakata untuk berbagai grade.
          </p>
        </div>
      </div>
      <AdminVocabularyTable />
    </div>
  );
}
