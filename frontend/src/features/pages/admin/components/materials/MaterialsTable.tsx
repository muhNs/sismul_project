"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { AdminMaterial } from "../../types";
import { Card } from "@/components/ui/Card";
import { useRouter } from "next/navigation";

interface MaterialsTableProps {
  materials: AdminMaterial[];
  onDelete?: (id: string) => void;
  onEdit?: (material: AdminMaterial) => void;
}

export const MaterialsTable: React.FC<MaterialsTableProps> = ({ 
  materials,
  onDelete,
  onEdit
}) => {
  const router = useRouter();

  const columns = React.useMemo<ColumnDef<AdminMaterial>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Judul Chapter",
        cell: (info) => <span className="font-semibold text-on-surface">{info.getValue() as string}</span>,
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
        accessorKey: "skill",
        header: "Skill",
        cell: (info) => {
          const skill = info.getValue() as string;
          let bgClass = "bg-purple-100 text-purple-700";
          if (skill === "Listening") bgClass = "bg-cyan-100 text-cyan-700";
          if (skill === "Writing") bgClass = "bg-rose-100 text-rose-700";
          if (skill === "Speaking") bgClass = "bg-yellow-100 text-yellow-700";

          return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${bgClass}`}>
              {skill}
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
                title="Edit materi"
                className="p-1.5 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
              <button 
                onClick={() => onDelete?.(row.original.id)}
                title="Hapus materi"
                className="p-1.5 rounded-xl bg-error-container text-error hover:opacity-80 transition-opacity flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          );
        },
      },
    ],
    [onDelete, onEdit, router]
  );

  const table = useReactTable({
    data: materials,
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
      {materials.length === 0 ? (
        <Card className="p-12 flex flex-col items-center justify-center text-center bg-surface border-outline-variant shadow-sm rounded-2xl">
          <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant">auto_stories</span>
          </div>
          <h3 className="text-lg font-bold text-on-surface mb-2">Belum ada materi pelajaran.</h3>
          <p className="text-on-surface-variant mb-6">Tambahkan chapter pertama untuk memulai pembelajaran.</p>
        </Card>
      ) : (
        <>
          {/* Desktop Table View */}
          <Card className="hidden md:block overflow-hidden p-0 rounded-2xl border border-outline-variant bg-surface shadow-sm">
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

          {/* Mobile Card List View */}
          <div className="md:hidden space-y-4">
            {table.getRowModel().rows.map((row) => {
              const material = row.original;
              
              let gradeBgClass = "bg-primary-container text-primary";
              if (material.grade === "Grade 4") gradeBgClass = "bg-blue-100 text-blue-700";
              if (material.grade === "Grade 5") gradeBgClass = "bg-green-100 text-green-700";
              if (material.grade === "Grade 6") gradeBgClass = "bg-orange-100 text-orange-700";

              let skillBgClass = "bg-purple-100 text-purple-700";
              if (material.skill === "Listening") skillBgClass = "bg-cyan-100 text-cyan-700";
              if (material.skill === "Writing") skillBgClass = "bg-rose-100 text-rose-700";
              if (material.skill === "Speaking") skillBgClass = "bg-yellow-100 text-yellow-700";

              return (
                <Card key={material.id} className="p-4 rounded-2xl border border-outline-variant bg-surface shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-on-surface text-lg">{material.title}</h4>
                      <p className="text-xs text-on-surface-variant mt-0.5">ID: {material.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${gradeBgClass}`}>
                      {material.grade}
                    </span>
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${skillBgClass}`}>
                      {material.skill}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-outline-variant/30">
                    <button 
                      onClick={() => onEdit?.(material)}
                      className="flex-1 py-2 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                    </button>
                    <button 
                      onClick={() => onDelete?.(material.id)}
                      className="flex-1 py-2 rounded-xl bg-error-container text-error hover:opacity-80 transition-opacity flex items-center justify-center gap-2 text-sm font-semibold"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span> Hapus
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {table.getPageCount() > 1 && (
            <div className="flex items-center justify-between px-2 py-4">
              <div className="text-xs text-on-surface-variant font-medium">
                Menampilkan halaman {table.getState().pagination.pageIndex + 1} dari {table.getPageCount()} ({materials.length} data)
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-4 py-2 rounded-xl border border-outline-variant bg-surface text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-container-low transition-colors"
                >
                  Sebelumnya
                </button>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-4 py-2 rounded-xl border border-outline-variant bg-surface text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-container-low transition-colors"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

