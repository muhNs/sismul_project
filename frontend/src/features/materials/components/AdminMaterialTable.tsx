"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export function AdminMaterialTable() {
  const router = useRouter();

  return (
    <Card variant="surface" className="p-4 bg-white overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-display text-xl font-bold">Kelola Materi</h2>
        <div className="flex gap-2">
          <select className="border border-outline rounded p-2 text-sm">
            <option>Semua Grade</option>
            <option>Grade 3</option>
            <option>Grade 4</option>
          </select>
          <Button variant="primary" onClick={() => {}}>
            + Tambah Materi
          </Button>
        </div>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-outline text-on-surface-variant text-sm uppercase tracking-wider">
            <th className="p-3">Judul Chapter</th>
            <th className="p-3">Grade</th>
            <th className="p-3">Skill</th>
            <th className="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-surface-dim hover:bg-surface-container-lowest">
            <td className="p-3 font-medium">Chapter 1: Family</td>
            <td className="p-3">3</td>
            <td className="p-3">Reading</td>
            <td className="p-3 flex gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => router.push("/admin/materials/chapter-1-reading/quizzes")}
              >
                Kelola Soal
              </Button>
              <Button variant="outline" size="sm" className="text-error border-error hover:bg-error-container">Hapus</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}
