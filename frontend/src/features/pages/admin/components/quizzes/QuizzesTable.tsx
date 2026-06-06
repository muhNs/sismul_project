"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { AdminQuiz } from "../../types";
import { Card } from "@/components/ui/Card";

interface QuizzesTableProps {
  quizzes: AdminQuiz[];
  onDelete?: (id: string) => void;
  onEdit?: (quiz: AdminQuiz) => void;
}

export const QuizzesTable: React.FC<QuizzesTableProps> = ({ 
  quizzes,
  onDelete,
  onEdit
}) => {
  const columns = React.useMemo<ColumnDef<AdminQuiz>[]>(
    () => [
      {
        accessorKey: "questionText",
        header: "Teks Soal",
        cell: (info) => (
          <span className="font-semibold text-on-surface line-clamp-2 max-w-[300px]">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "materialId",
        header: "Materi / Chapter",
        cell: (info) => {
          return <span className="text-sm font-medium text-on-surface-variant">{info.getValue() as string}</span>;
        },
      },
      {
        accessorKey: "type",
        header: "Tipe Soal",
        cell: (info) => {
          const type = info.getValue() as string;
          let bgClass = "bg-surface-container-high text-on-surface-variant";
          
          if (type.includes("Reading")) bgClass = "bg-purple-100 text-purple-700";
          if (type.includes("Listening")) bgClass = "bg-cyan-100 text-cyan-700";
          if (type.includes("Writing")) bgClass = "bg-rose-100 text-rose-700";
          if (type.includes("Speaking")) bgClass = "bg-yellow-100 text-yellow-700";

          return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${bgClass}`}>
              {type}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: () => <div className="text-center">Aksi</div>,
        cell: ({ row }) => {
          return (
            <div className="flex justify-center items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => onEdit?.(row.original)}
                title="Edit Soal"
                className="p-1.5 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
              <button 
                onClick={() => onDelete?.(row.original.id)}
                title="Hapus Soal"
                className="p-1.5 rounded-xl bg-error-container text-error hover:opacity-80 transition-opacity flex items-center justify-center"
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
    data: quizzes,
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
      {quizzes.length === 0 ? (
        <Card className="p-12 flex flex-col items-center justify-center text-center bg-surface border-outline-variant shadow-sm rounded-2xl">
          <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant">quiz</span>
          </div>
          <h3 className="text-lg font-bold text-on-surface mb-2">Belum ada data kuis.</h3>
          <p className="text-on-surface-variant mb-6">Tambahkan soal pertama untuk memulai latihan siswa.</p>
        </Card>
      ) : (
        <Card className="overflow-hidden p-0 rounded-2xl border border-outline-variant bg-surface shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
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
        </Card>
      )}
    </div>
  );
};
