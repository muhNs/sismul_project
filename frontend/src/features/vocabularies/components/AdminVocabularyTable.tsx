"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function AdminVocabularyTable() {
  return (
    <Card variant="surface" className="p-4 bg-white overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-display text-xl font-bold">Kelola Kosakata</h2>
        <div className="flex gap-2">
          <select className="border border-outline rounded p-2 text-sm">
            <option>Semua Grade</option>
            <option>Grade 3</option>
            <option>Grade 4</option>
          </select>
          <Button variant="primary" onClick={() => {}}>
            + Tambah Kosakata
          </Button>
        </div>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-outline text-on-surface-variant text-sm uppercase tracking-wider">
            <th className="p-3">English</th>
            <th className="p-3">Indonesian</th>
            <th className="p-3">Grade</th>
            <th className="p-3">Media (URL)</th>
            <th className="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-surface-dim hover:bg-surface-container-lowest">
            <td className="p-3 font-bold text-primary">Apple</td>
            <td className="p-3">Apel</td>
            <td className="p-3">3</td>
            <td className="p-3 text-sm text-secondary truncate max-w-[150px]">https://example.com/audio.mp3</td>
            <td className="p-3 flex gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="outline" size="sm" className="text-error border-error hover:bg-error-container">Hapus</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}
