import React from "react";
import { Card } from "@/components/ui/Card";

export function AdminScoreTable() {
  return (
    <Card variant="surface" className="p-4 bg-white overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-display text-xl font-bold">Laporan Nilai Siswa</h2>
        <div className="flex gap-2">
          <select className="border border-outline rounded p-2 text-sm">
            <option>Semua Grade</option>
            <option>Grade 3</option>
            <option>Grade 4</option>
          </select>
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold">
            Export to Excel
          </button>
        </div>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-outline text-on-surface-variant text-sm uppercase tracking-wider">
            <th className="p-3">Nama Siswa</th>
            <th className="p-3">Judul Chapter</th>
            <th className="p-3">Skill</th>
            <th className="p-3">Skor Tertinggi</th>
            <th className="p-3">Tanggal</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-surface-dim hover:bg-surface-container-lowest">
            <td className="p-3 font-medium">Budi Santoso</td>
            <td className="p-3">Chapter 1: Family</td>
            <td className="p-3">Reading</td>
            <td className="p-3 font-bold text-primary">100</td>
            <td className="p-3 text-sm text-on-surface-variant">2026-06-05</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}
