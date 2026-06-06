"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { AdminVocabulary } from "../../types";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface VocabulariesTableProps {
  vocabularies: AdminVocabulary[];
  onDelete?: (id: string) => void;
  onEdit?: (vocabulary: AdminVocabulary) => void;
}

export const VocabulariesTable: React.FC<VocabulariesTableProps> = ({ 
  vocabularies,
  onDelete,
  onEdit
}) => {
  const columns = React.useMemo<ColumnDef<AdminVocabulary>[]>(
    () => [
      {
        accessorKey: "english",
        header: "English",
        cell: (info) => <span className="font-semibold">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "indonesian",
        header: "Indonesian",
      },
      {
        accessorKey: "grade",
        header: "Grade",
        cell: (info) => {
          const grade = info.getValue() as string;
          let bgClass = "bg-primary-container text-primary";
          if (grade === "Grade 4") bgClass = "bg-blue-100 text-blue-700";
          if (grade === "Grade 5") bgClass = "bg-green-100 text-green-700";
          if (grade === "Grade 6") bgClass = "bg-orange-100 text-orange-700";

          return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${bgClass}`}>
              {grade}
            </span>
          );
        },
      },
      {
        id: "media",
        header: "Audio/Image",
        cell: ({ row }) => {
          const hasImage = !!row.original.image;
          const hasAudio = !!row.original.audio;

          return (
            <div className="flex gap-2">
              {hasImage && (
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">image</span>
                </div>
              )}
              {hasAudio && (
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">volume_up</span>
                </div>
              )}
              {!hasImage && !hasAudio && (
                <span className="text-on-surface-variant text-sm">-</span>
              )}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: () => <div className="text-center">Aksi</div>,
        cell: ({ row }) => {
          return (
            <div className="flex justify-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => onEdit?.(row.original)}
                className="p-2 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
              <button 
                onClick={() => onDelete?.(row.original.id)}
                className="p-2 rounded-xl bg-error-container text-error hover:opacity-80 transition-opacity flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          );
        },
      },
    ],
    [onDelete, onEdit]
  );

  const table = useReactTable({
    data: vocabularies,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="space-y-4">
      {vocabularies.length === 0 ? (
        <Card className="p-12 flex flex-col items-center justify-center text-center bg-surface border-outline-variant shadow-sm rounded-2xl">
          <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant">book</span>
          </div>
          <h3 className="text-lg font-bold text-on-surface mb-2">Belum ada data kosakata</h3>
          <p className="text-on-surface-variant mb-6">Mulai tambahkan kosakata bahasa Inggris untuk siswa Anda.</p>
        </Card>
      ) : (
        <Card className="overflow-hidden p-0 rounded-2xl border border-outline-variant bg-surface shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-container-lowest text-on-surface-variant uppercase font-semibold text-xs border-b border-outline-variant">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-6 py-4">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-surface-container-low transition-colors group">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 text-on-surface">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls could be added here */}
          <div className="p-4 border-t border-outline-variant flex justify-between items-center bg-surface-container-lowest text-sm text-on-surface-variant">
            <div>
              Showing {table.getRowModel().rows.length} of {vocabularies.length} entries
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 rounded-lg border border-outline-variant disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </button>
              <button
                className="px-3 py-1 rounded-lg border border-outline-variant disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
