"use client";

import React, { useState } from "react";
import { AdminQuizTable } from "@/features/quizzes/components/AdminQuizTable";
import { AdminQuizForm } from "@/features/quizzes/components/AdminQuizForm";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useMaterials } from "@/features/materials/hooks/useMaterials";

export default function QuizzesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<any>(null);
  const { materials } = useMaterials();

  const getSkillFromMaterial = (materialId: string) => {
    const material = materials.find((m: any) => m.id === materialId);
    if (!material) return "Reading"; // Default
    
    // Sesuaikan mapping ini dengan data dari backend Anda
    const category = material.skillCategory?.toUpperCase();
    if (category === "LISTENING") return "Listening";
    if (category === "WRITING") return "Writing";
    if (category === "SPEAKING") return "Speaking";
    return "Reading";
  };

  const handleEdit = (quiz: any) => {
    setEditingQuiz(quiz);
    setIsModalOpen(true);
  };

  const currentSkill = editingQuiz 
    ? getSkillFromMaterial(editingQuiz.material_id) 
    : "Reading";

  const handleAddNew = () => {
    setEditingQuiz(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-on-surface">Kelola Kuis</h1>
          <p className="text-on-surface-variant text-sm">Manajemen soal dan materi kuis.</p>
        </div>
        <Button variant="primary" onClick={handleAddNew}>+ Tambah Kuis</Button>
      </div>

      {/* Tabel bertanggung jawab fetch datanya sendiri */}
      <AdminQuizTable onEdit={handleEdit} />

      {/* Modal Form */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingQuiz ? "Edit Kuis" : "Tambah Kuis"}
      >
        <AdminQuizForm 
          skill={currentSkill}
          onSubmitSuccess={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}