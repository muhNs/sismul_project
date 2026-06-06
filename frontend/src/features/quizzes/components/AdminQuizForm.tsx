"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface AdminQuizFormProps {
  skill: "Reading" | "Listening" | "Writing" | "Speaking";
}

const quizSchema = z.object({
  question: z.string().min(5, "Pertanyaan minimal 5 karakter"),
});

type QuizFormValues = z.infer<typeof quizSchema>;

export function AdminQuizForm({ skill }: AdminQuizFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
  });

  const onSubmit = (data: QuizFormValues) => {
    console.log("Quiz Data:", data);
    alert("Soal berhasil disimpan!");
  };

  return (
    <Card variant="surface" className="p-6 bg-white">
      <h2 className="font-display text-xl font-bold mb-4">Tambah Soal {skill}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-label text-sm font-bold text-on-surface-variant">
            Pertanyaan
          </label>
          <textarea 
            {...register("question")}
            className="w-full p-3 border border-outline rounded-lg focus:outline-none focus:border-primary resize-none h-32"
            placeholder="Masukkan pertanyaan soal di sini..."
          />
          {errors.question && <span className="text-error text-xs">{errors.question.message}</span>}
          
          {/* Workaround Hint for Media */}
          {(skill === "Reading" || skill === "Listening") && (
            <div className="mt-1 p-3 bg-secondary-container/20 rounded-lg border border-secondary-container text-sm text-on-surface-variant">
              <span className="font-bold flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-secondary text-[18px]">info</span>
                Tips Media (Gambar/Audio):
              </span>
              Karena sistem saat ini hanya menerima teks, Anda dapat menyisipkan media dengan memasukkan <strong>URL Link Media</strong> (misal: link Google Drive gambar/MP3) langsung ke dalam kotak teks pertanyaan di atas. Sistem di aplikasi siswa akan otomatis memuat link tersebut sebagai media.
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" type="button">Batal</Button>
          <Button variant="primary" type="submit">Simpan Soal</Button>
        </div>
      </form>
    </Card>
  );
}
