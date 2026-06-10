import React from "react";
import { useAdminQuiz } from "../hooks/useAdminQuiz";

interface AdminQuizTableProps {
  onEdit: (quiz: any) => void;
}

export const AdminQuizTable: React.FC<AdminQuizTableProps> = ({ onEdit }) => {
  const { quizzes, isLoading, deleteQuiz, isDeleting } = useAdminQuiz();

  if (isLoading) return <div className="text-center py-10 font-bold text-on-surface-variant">Memuat data kuis...</div>;

  return (
    <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
      <table className="w-full text-sm text-left">
        <thead className="bg-surface-container-low text-on-surface-variant font-bold uppercase text-xs">
          <tr>
            <th className="px-6 py-4">Materi (Chapter / Grade / Skill)</th>
            <th className="px-6 py-4">Tipe Soal</th>
            <th className="px-6 py-4">Pertanyaan</th>
            <th className="px-6 py-4">Kunci Jawaban</th>
            <th className="px-6 py-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20">
          {quizzes.map((quiz: any) => (
            <tr key={quiz.id} className="hover:bg-surface-container-low/50">
              <td className="px-6 py-4 font-semibold text-on-surface">
                {quiz.material ? `Chapter ${quiz.material.chapter} - Grade ${quiz.material.gradeLevel} (${quiz.material.skillCategory})` : `Material ID: ${quiz.material_id}`}
              </td>
              <td className="px-6 py-4 text-on-surface-variant font-medium">
                {quiz.questionType}
              </td>
              <td className="px-6 py-4 text-on-surface truncate max-w-[200px]" title={quiz.questionText}>
                {quiz.questionText}
              </td>
              <td className="px-6 py-4 text-on-surface-variant font-semibold">
                {quiz.correctAnswer}
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
          {quizzes.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant font-medium">
                Belum ada data kuis yang dibuat.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};