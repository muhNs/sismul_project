"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";

const vocabularySchema = z.object({
  english: z.string().min(1, "Bahasa Inggris wajib diisi"),
  indonesian: z.string().min(1, "Bahasa Indonesia wajib diisi"),
  grade: z.string().min(1, "Grade harus dipilih"),
  mediaUrl: z.string().url("Format URL tidak valid").optional().or(z.literal("")),
});

type VocabularyFormValues = z.infer<typeof vocabularySchema>;

export function AdminVocabularyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VocabularyFormValues>({
    resolver: zodResolver(vocabularySchema),
  });

  const onSubmit = (data: VocabularyFormValues) => {
    console.log("Vocabulary Data:", data);
    // TODO: Call API
    alert("Berhasil disimpan! Cek console.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="font-label text-sm font-bold text-on-surface-variant">English</label>
        <input 
          {...register("english")} 
          placeholder="Contoh: Apple"
          className="border border-outline rounded-lg p-3 focus:outline-none focus:border-primary"
        />
        {errors.english && <span className="text-error text-xs">{errors.english.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-label text-sm font-bold text-on-surface-variant">Indonesian</label>
        <input 
          {...register("indonesian")} 
          placeholder="Contoh: Apel"
          className="border border-outline rounded-lg p-3 focus:outline-none focus:border-primary"
        />
        {errors.indonesian && <span className="text-error text-xs">{errors.indonesian.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-label text-sm font-bold text-on-surface-variant">Grade</label>
        <select {...register("grade")} className="border border-outline rounded-lg p-3 focus:outline-none focus:border-primary bg-white">
          <option value="">Pilih Grade</option>
          <option value="3">Grade 3</option>
          <option value="4">Grade 4</option>
          <option value="5">Grade 5</option>
          <option value="6">Grade 6</option>
        </select>
        {errors.grade && <span className="text-error text-xs">{errors.grade.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-label text-sm font-bold text-on-surface-variant">Media URL (Opsional)</label>
        <input 
          {...register("mediaUrl")} 
          placeholder="https://link-ke-gambar-atau-audio"
          className="border border-outline rounded-lg p-3 focus:outline-none focus:border-primary"
        />
        {errors.mediaUrl && <span className="text-error text-xs">{errors.mediaUrl.message}</span>}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" type="button">Batal</Button>
        <Button variant="primary" type="submit">Simpan</Button>
      </div>
    </form>
  );
}
