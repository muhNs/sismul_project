// src/features/quizzes/components/AdminQuizForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useAdminQuiz } from "../hooks/useAdminQuiz";
import api from "@/lib/axios";

interface AdminQuizFormProps {
  quiz?: any;
  onSubmitSuccess?: () => void;
}

export function AdminQuizForm({ quiz, onSubmitSuccess }: AdminQuizFormProps) {
  const { createQuiz, isCreating, updateQuiz, isUpdating } = useAdminQuiz();
  const isSubmitting = isCreating || isUpdating;

  const [materials, setMaterials] = useState<any[]>([]);
  const [loadingMaterials, setLoadingMaterials] = useState(true);

  // Form States
  const [materialId, setMaterialId] = useState(quiz?.material_id || "");
  const [questionType, setQuestionType] = useState<"MULTIPLE_CHOICE" | "WRITING" | "SPEAKING">(
    quiz?.questionType || "MULTIPLE_CHOICE"
  );
  const [questionText, setQuestionText] = useState(quiz?.questionText || "");
  const [correctAnswer, setCorrectAnswer] = useState(quiz?.correctAnswer || "");
  const [optionA, setOptionA] = useState(quiz?.optionA || "");
  const [optionB, setOptionB] = useState(quiz?.optionB || "");
  const [optionC, setOptionC] = useState(quiz?.optionC || "");
  const [optionD, setOptionD] = useState(quiz?.optionD || "");
  const [missingWordIndex, setMissingWordIndex] = useState(
    quiz?.missingWordIndex !== undefined && quiz?.missingWordIndex !== null
      ? String(quiz.missingWordIndex)
      : ""
  );
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await api.get("/api/v1/materials");
        setMaterials(res.data.data || res.data);
      } catch (err) {
        console.error("Gagal mengambil data materi:", err);
      } finally {
        setLoadingMaterials(false);
      }
    };
    fetchMaterials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!materialId) {
      alert("Pilih materi terlebih dahulu");
      return;
    }
    if (!questionText.trim()) {
      alert("Pertanyaan tidak boleh kosong");
      return;
    }
    if (!correctAnswer.trim()) {
      alert("Kunci jawaban tidak boleh kosong");
      return;
    }

    const formData = new FormData();
    formData.append("material_id", String(materialId));
    formData.append("questionType", questionType);
    formData.append("questionText", questionText);
    formData.append("correctAnswer", correctAnswer);

    if (questionType === "MULTIPLE_CHOICE") {
      formData.append("optionA", optionA);
      formData.append("optionB", optionB);
      formData.append("optionC", optionC);
      formData.append("optionD", optionD);
    } else if (questionType === "WRITING" && missingWordIndex !== "") {
      formData.append("missingWordIndex", missingWordIndex);
    }

    if (mediaFile) {
      formData.append("media", mediaFile);
    }

    if (quiz) {
      // Update Mode
      updateQuiz(
        { id: quiz.id, formData },
        {
          onSuccess: () => {
            alert("Soal berhasil diperbarui!");
            if (onSubmitSuccess) onSubmitSuccess();
          },
          onError: (err: any) => {
            alert(err.response?.data?.message || "Gagal memperbarui soal");
          },
        }
      );
    } else {
      // Create Mode
      createQuiz(formData as any, {
        onSuccess: () => {
          alert("Soal berhasil ditambahkan!");
          if (onSubmitSuccess) onSubmitSuccess();
        },
        onError: (err: any) => {
          alert(err.response?.data?.message || "Gagal menambahkan soal");
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-on-surface">
      {/* Pilih Materi */}
      <div className="space-y-1">
        <label className="text-sm font-semibold block">Materi Pembelajaran</label>
        {loadingMaterials ? (
          <div className="text-xs text-on-surface-variant animate-pulse">Memuat materi...</div>
        ) : (
          <select
            value={materialId}
            onChange={(e) => setMaterialId(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            required
          >
            <option value="">Pilih materi...</option>
            {materials.map((m) => (
              <option key={m.id} value={m.id}>
                Chapter {m.chapter} - Grade {m.gradeLevel} ({m.skillCategory})
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Tipe Soal */}
      <div className="space-y-1">
        <label className="text-sm font-semibold block">Tipe Soal</label>
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value as any)}
          className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          required
        >
          <option value="MULTIPLE_CHOICE">Pilihan Ganda (Multiple Choice)</option>
          <option value="WRITING">Menulis (Writing - Lengkapi Kata)</option>
          <option value="SPEAKING">Berbicara (Speaking)</option>
        </select>
      </div>

      {/* Pertanyaan / Teks Soal */}
      <div className="space-y-1">
        <label className="text-sm font-semibold block">
          {questionType === "SPEAKING" ? "Teks Pengucapan" : "Pertanyaan / Kalimat Soal"}
        </label>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none h-20"
          placeholder={
            questionType === "WRITING"
              ? "Contoh: I have a ___ (kucing)."
              : "Masukkan teks pertanyaan..."
          }
          required
        />
      </div>

      {/* Kunci Jawaban */}
      <div className="space-y-1">
        <label className="text-sm font-semibold block">Kunci Jawaban Benar</label>
        {questionType === "MULTIPLE_CHOICE" ? (
          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            required
          >
            <option value="">Pilih opsi kunci jawaban...</option>
            <option value="A">Opsi A</option>
            <option value="B">Opsi B</option>
            <option value="C">Opsi C</option>
            <option value="D">Opsi D</option>
          </select>
        ) : (
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder={questionType === "WRITING" ? "Contoh: cat" : "Contoh: kalimat pengucapan lengkap"}
            required
          />
        )}
      </div>

      {/* Pilihan Ganda Khusus MULTIPLE_CHOICE */}
      {questionType === "MULTIPLE_CHOICE" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-2xl bg-surface-container-low border-outline-variant/30">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-on-surface-variant">Opsi A</label>
            <input
              type="text"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
              placeholder="Pilihan A"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-on-surface-variant">Opsi B</label>
            <input
              type="text"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
              placeholder="Pilihan B"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-on-surface-variant">Opsi C</label>
            <input
              type="text"
              value={optionC}
              onChange={(e) => setOptionC(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
              placeholder="Pilihan C"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-on-surface-variant">Opsi D</label>
            <input
              type="text"
              value={optionD}
              onChange={(e) => setOptionD(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
              placeholder="Pilihan D (Opsional)"
            />
          </div>
        </div>
      )}

      {/* Indeks Kata yang Hilang Khusus WRITING */}
      {questionType === "WRITING" && (
        <div className="space-y-1 border p-4 rounded-2xl bg-surface-container-low border-outline-variant/30">
          <label className="text-sm font-semibold block">Indeks Kata yang Hilang (0-based Index)</label>
          <input
            type="number"
            value={missingWordIndex}
            onChange={(e) => setMissingWordIndex(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="Contoh: 3 (jika kata ke-4 adalah ___)"
            min="0"
          />
          <p className="text-xs text-on-surface-variant mt-1">
            Indeks dimulai dari 0. Misalnya pada kalimat "I have a ___", kata ke-4 (indeks 3) adalah yang dihilangkan.
          </p>
        </div>
      )}

      {/* Upload Media file (Audio/Image) */}
      <div className="space-y-1">
        <label className="text-sm font-semibold block">File Media Tambahan (Gambar/Audio - Opsional)</label>
        <input
          type="file"
          accept="image/*,audio/*"
          onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
          className="w-full px-4 py-2 text-sm border border-outline-variant rounded-xl text-on-surface file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary-container file:text-primary hover:file:bg-primary/20 transition-all"
        />
        {quiz?.mediaUrl && (
          <p className="text-xs text-primary font-semibold mt-1">
            File media saat ini: <a href={`http://localhost:5000${quiz.mediaUrl}`} target="_blank" rel="noopener noreferrer" className="underline">Lihat Media</a>
          </p>
        )}
      </div>

      {/* Tombol Aksi */}
      <div className="pt-4 flex justify-end gap-3 border-t border-outline-variant/30 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onSubmitSuccess}
          disabled={isSubmitting}
        >
          Batal
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Menyimpan..." : "Simpan Soal"}
        </Button>
      </div>
    </form>
  );
}