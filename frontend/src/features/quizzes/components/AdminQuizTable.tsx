import React from "react";
import { useAdminQuiz } from "../hooks/useAdminQuiz";

interface AdminQuizTableProps {
  onEdit: (quiz: any) => void;
}

export const AdminQuizTable: React.FC<AdminQuizTableProps> = ({ onEdit }) => {
  const { quizzes, isLoading, deleteQuiz, isDeleting } = useAdminQuiz();

  if (isLoading) return <div className="text-center py-10">Memuat data...</div>;

  return (
    <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
      <table className="w-full text-sm text-left">
        <thead className="bg-surface-container-low text-on-surface-variant font-bold uppercase text-xs">
          <tr>
            <th className="px-6 py-4">Judul Kuis</th>
            <th className="px-6 py-4">Materi ID</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20">
          {quizzes.map((quiz: any) => (
            <tr key={quiz.id} className="hover:bg-surface-container-low/50">
              <td className="px-6 py-4 font-semibold text-on-surface">Chapter {quiz.material.chapter}</td>
              <td className="px-6 py-4 text-on-surface-variant">{quiz.material_id}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${quiz.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {quiz.is_active ? "Aktif" : "Nonaktif"}
                </span>
              </td>
              <td className="px-6 py-4 flex justify-center gap-2">
                <button onClick={() => onEdit(quiz)} className="p-2 text-primary hover:bg-primary-container/20 rounded-lg">
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button 
                  onClick={() => deleteQuiz(quiz.id)} 
                  disabled={isDeleting}
                  className="p-2 text-error hover:bg-error/10 rounded-lg"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};