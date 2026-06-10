// src/features/quizzes/components/AdminQuizForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { quizSchema } from "../schemas/quiz.schema";
import type { QuizFormValues } from "../schemas/quiz.schema";

interface AdminQuizFormProps {
  skill: "Reading" | "Listening" | "Writing" | "Speaking";
  onSubmitSuccess?: (data: any) => void;
}

export function AdminQuizForm({ skill, onSubmitSuccess }: AdminQuizFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
  });

  const onSubmit = async (data: QuizFormValues) => {
    // Di sini Anda bisa memanggil function dari useAdminQuiz
    console.log("Quiz Data:", { ...data, skill });
    alert("Soal berhasil disimpan!");
    if (onSubmitSuccess) onSubmitSuccess(data);
  };

  return (
    <Card variant="surface" className="p-6 bg-white">
      <h2 className="font-display text-xl font-bold mb-4">Tambah Soal {skill}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Pertanyaan */}
        <div className="flex flex-col gap-2">
          <label className="font-label text-sm font-bold text-on-surface-variant">Pertanyaan</label>
          <textarea 
            {...register("question")}
            className="w-full p-3 border border-outline rounded-lg focus:outline-none focus:border-primary resize-none h-24"
            placeholder="Masukkan pertanyaan soal di sini..."
          />
          {errors.question && <span className="text-error text-xs">{errors.question.message}</span>}
        </div>

        {/* Opsi Jawaban */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["A", "B", "C", "D"].map((option) => (
            <div key={option} className="flex flex-col gap-1">
              <label className="font-label text-xs font-bold text-on-surface-variant uppercase">Opsi {option}</label>
              <input 
                {...register(`option${option}` as keyof QuizFormValues)}
                className="w-full p-2 border border-outline rounded-lg focus:outline-none focus:border-primary"
                placeholder={`Jawaban ${option}`}
              />
              {errors[`option${option}` as keyof QuizFormValues] && (
                <span className="text-error text-xs">{errors[`option${option}` as keyof QuizFormValues]?.message}</span>
              )}
            </div>
          ))}
        </div>

        {/* Kunci Jawaban */}
        <div className="flex flex-col gap-2">
          <label className="font-label text-sm font-bold text-on-surface-variant">Kunci Jawaban Benar</label>
          <select 
            {...register("correctAnswer")}
            className="w-full p-3 border border-outline rounded-lg bg-white"
          >
            <option value="">Pilih jawaban yang benar...</option>
            <option value="A">Opsi A</option>
            <option value="B">Opsi B</option>
            <option value="C">Opsi C</option>
            <option value="D">Opsi D</option>
          </select>
          {errors.correctAnswer && <span className="text-error text-xs">{errors.correctAnswer.message}</span>}
        </div>

        {/* Info Tambahan (Sesuai kode awal Anda) */}
        {(skill === "Reading" || skill === "Listening") && (
          <div className="mt-1 p-3 bg-secondary-container/20 rounded-lg border border-secondary-container text-sm text-on-surface-variant">
            <span className="font-bold flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-secondary text-[18px]">info</span>
              Tips Media:
            </span>
            Masukkan link Google Drive/Media URL langsung di pertanyaan.
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" type="button">Batal</Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan Soal"}
          </Button>
        </div>
      </form>
    </Card>
  );
}