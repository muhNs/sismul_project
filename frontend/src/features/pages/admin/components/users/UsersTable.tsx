import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { AdminUser } from "../../types";
import { Card } from "@/components/ui/Card";

interface UsersTableProps {
  users: AdminUser[];
  onEdit?: (user: AdminUser) => void;
  onDelete?: (id: string) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit, onDelete }) => {
  const columns = React.useMemo<ColumnDef<AdminUser>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => <span className="font-medium text-on-surface">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "name",
        header: "Nama",
        cell: (info) => <span className="font-semibold text-on-surface">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => <span className="text-on-surface-variant">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: (info) => {
          const role = info.getValue() as string;
          return (
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                role === "admin"
                  ? "bg-primary-container text-primary"
                  : "bg-surface-container-high text-on-surface-variant"
              }`}
            >
              {role}
            </span>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = info.getValue() as string;
          return (
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status === "active" ? "Aktif" : "Nonaktif"}
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
                title="Edit User"
                className="p-1.5 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
              <button 
                onClick={() => onDelete?.(row.original.id)}
                title="Hapus User"
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
    data: users,
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
      {users.length === 0 ? (
        <Card className="p-12 flex flex-col items-center justify-center text-center bg-surface border-outline-variant shadow-sm rounded-2xl">
          <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant">group</span>
          </div>
          <h3 className="text-lg font-bold text-on-surface mb-2">Belum ada data user.</h3>
          <p className="text-on-surface-variant mb-6">Tambahkan user baru ke dalam sistem.</p>
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
              const user = row.original;
              return (
                <Card key={user.id} className="p-4 rounded-2xl border border-outline-variant bg-surface shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-on-surface">{user.name}</h4>
                      <p className="text-xs text-on-surface-variant mt-0.5">{user.email}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                      user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {user.status === "active" ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                      user.role === "admin" ? "bg-primary-container text-primary" : "bg-surface-container-high text-on-surface-variant"
                    }`}>
                      {user.role}
                    </span>
                    <span className="text-xs text-on-surface-variant">ID: {user.id}</span>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-outline-variant/30">
                    <button 
                      onClick={() => onEdit?.(user)}
                      className="flex-1 py-2 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                    </button>
                    <button 
                      onClick={() => onDelete?.(user.id)}
                      className="flex-1 py-2 rounded-xl bg-error-container text-error hover:opacity-80 transition-opacity flex items-center justify-center gap-2 text-sm font-semibold"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span> Hapus
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
