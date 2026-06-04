import React from "react";
import { AdminUser } from "../../types";
import { Card } from "@/components/ui/Card";

interface UsersTableProps {
  users: AdminUser[];
}

export const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  return (
    <Card className="overflow-hidden p-0 rounded-2xl border border-outline-variant bg-surface shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-container-lowest text-on-surface-variant uppercase font-semibold text-xs border-b border-outline-variant">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Nama</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-surface-container-low transition-colors group">
                <td className="px-6 py-4 font-medium text-on-surface">{user.id}</td>
                <td className="px-6 py-4 text-on-surface font-semibold">{user.name}</td>
                <td className="px-6 py-4 text-on-surface-variant">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.role === "admin"
                        ? "bg-primary-container text-primary"
                        : "bg-surface-container-high text-on-surface-variant"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status === "active" ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button className="p-2 rounded-xl bg-error-container text-error hover:opacity-80 transition-opacity flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant">
                  Belum ada data user.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
