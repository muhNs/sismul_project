"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { AdminScore } from "../../types";
import { dummyMaterials } from "../../data/materials";
import { Card } from "@/components/ui/Card";

export interface ExtendedScore extends AdminScore {
  chapterTitle: string;
  skill: string;
}

interface ScoresTableProps {
  scores: ExtendedScore[];
}

export const ScoresTable: React.FC<ScoresTableProps> = ({ scores }) => {
  const columns = React.useMemo<ColumnDef<ExtendedScore>[]>(
    () => [
      {
        accessorKey: "studentName",
        header: "Nama Siswa",
        cell: (info) => <span className="font-bold text-on-surface">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "chapterTitle",
        header: "Judul Chapter",
        cell: (info) => <span className="font-semibold text-on-surface-variant">{info.getValue() as string}</span>,
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
        accessorKey: "highestScore",
        header: "Skor Tertinggi",
        cell: (info) => {
          const score = info.getValue() as number;
          let label = "Needs Improvement";
          let color = "bg-red-100 text-red-700";

          if (score >= 90) {
            label = "Excellent";
            color = "bg-green-100 text-green-800";
          } else if (score >= 80) {
            label = "Good";
            color = "bg-blue-100 text-blue-800";
          } else if (score >= 70) {
            label = "Fair";
            color = "bg-orange-100 text-orange-800";
          }

          return (
            <div className="flex items-center gap-2">
              <span className="font-black text-on-surface text-lg">{score}</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${color}`}>
                {label}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "completedAt",
        header: "Tanggal Mengerjakan",
        cell: (info) => <span className="text-sm text-on-surface-variant">{info.getValue() as string}</span>,
      },
    ],
    []
  );

  const table = useReactTable({
    data: scores,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (scores.length === 0) {
    return (
      <Card className="p-12 flex flex-col items-center justify-center text-center bg-surface border-outline-variant shadow-sm rounded-2xl">
        <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant">monitoring</span>
        </div>
        <h3 className="text-lg font-bold text-on-surface mb-2">Belum ada laporan nilai.</h3>
        <p className="text-on-surface-variant mb-6">Nilai siswa akan muncul setelah mereka menyelesaikan kuis.</p>
      </Card>
    );
  }

  return (
    <>
      {/* Desktop & Tablet Table */}
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
                <tr key={row.id} className="hover:bg-surface-container-low transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile Card List */}
      <div className="md:hidden flex flex-col gap-4">
        {scores.map((score) => {
          let label = "Needs Improvement";
          let color = "bg-red-100 text-red-700";

          if (score.highestScore >= 90) {
            label = "Excellent";
            color = "bg-green-100 text-green-800";
          } else if (score.highestScore >= 80) {
            label = "Good";
            color = "bg-blue-100 text-blue-800";
          } else if (score.highestScore >= 70) {
            label = "Fair";
            color = "bg-orange-100 text-orange-800";
          }

          let skillBg = "bg-purple-100 text-purple-700";
          if (score.skill === "Listening") skillBg = "bg-cyan-100 text-cyan-700";
          if (score.skill === "Writing") skillBg = "bg-rose-100 text-rose-700";
          if (score.skill === "Speaking") skillBg = "bg-yellow-100 text-yellow-700";

          return (
            <Card key={score.id} className="p-4 bg-surface rounded-2xl shadow-sm border border-outline-variant">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-lg text-on-surface">{score.studentName}</h4>
                  <p className="text-sm text-on-surface-variant">{score.chapterTitle}</p>
                </div>
                <span className={`px-2 py-1 rounded-md text-xs font-bold ${skillBg}`}>
                  {score.skill}
                </span>
              </div>
              <div className="flex justify-between items-end mt-4 pt-3 border-t border-outline-variant/30">
                <div>
                  <p className="text-xs text-on-surface-variant font-medium mb-1">SKOR TERTINGGI</p>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-on-surface text-xl">{score.highestScore}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${color}`}>
                      {label}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-on-surface-variant font-medium mb-1">TANGGAL</p>
                  <p className="text-sm text-on-surface font-semibold">{score.completedAt}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
};
