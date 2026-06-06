"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";

const materialSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  grade: z.string().min(1, "Grade harus dipilih"),
  skill: z.string().min(1, "Skill harus dipilih"),
});

type MaterialFormValues = z.infer<typeof materialSchema>;

export function AdminMaterialForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MaterialFormValues>({
    resolver: zodResolver(materialSchema),
  });

  const onSubmit = (data: MaterialFormValues) => {
    console.log("Material Data:", data);
    // TODO: Call API
    alert("Berhasil disimpan! Cek console.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="font-label text-sm font-bold text-on-surface-variant">Judul Chapter</label>
        <input 
          {...register("title")} 
          placeholder="Contoh: Chapter 1: Family"
          className="border border-outline rounded-lg p-3 focus:outline-none focus:border-primary"
        />
        {errors.title && <span className="text-error text-xs">{errors.title.message}</span>}
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
        <label className="font-label text-sm font-bold text-on-surface-variant">Skill</label>
        <select {...register("skill")} className="border border-outline rounded-lg p-3 focus:outline-none focus:border-primary bg-white">
          <option value="">Pilih Skill</option>
          <option value="Reading">Reading</option>
          <option value="Listening">Listening</option>
          <option value="Writing">Writing</option>
          <option value="Speaking">Speaking</option>
        </select>
        {errors.skill && <span className="text-error text-xs">{errors.skill.message}</span>}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" type="button">Batal</Button>
        <Button variant="primary" type="submit">Simpan</Button>
      </div>
    </form>
  );
}
