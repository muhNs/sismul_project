"use client";

import React, { useState, useMemo } from "react";
import { UsersTable } from "./components/users/UsersTable";
import { dummyUsers } from "./data/users";
import { AdminUser } from "./types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Format email tidak valid").min(1, "Email wajib diisi"),
  role: z.enum(["admin", "student", "teacher"], { message: "Role wajib dipilih" }),
  status: z.enum(["active", "inactive"], { message: "Status wajib dipilih" }),
});

type FormValues = z.infer<typeof formSchema>;

export const UsersPage = () => {
  const [users, setUsers] = useState<AdminUser[]>(dummyUsers);
  const [search, setSearch] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message: string) => setToastMessage(message);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "student",
      status: "active",
    },
  });

  const filteredData = useMemo(() => {
    return users.filter((u) => {
      return (
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [users, search]);

  const handleOpenAdd = () => {
    setEditingId(null);
    form.reset({ name: "", email: "", role: "student", status: "active" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: AdminUser) => {
    setEditingId(user.id);
    form.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsModalOpen(true);
  };

  const handleOpenDelete = (id: string) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const onSubmit = (data: FormValues) => {
    if (editingId) {
      setUsers(prev => prev.map(u => u.id === editingId ? { ...u, ...data } : u));
      showToast("Berhasil mengubah data user");
    } else {
      const newUser: AdminUser = {
        id: `USR-${Date.now()}`,
        createdAt: new Date().toISOString().split("T")[0],
        ...data,
      };
      setUsers(prev => [...prev, newUser]);
      showToast("Berhasil menambahkan user");
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setUsers(prev => prev.filter(u => u.id !== deletingId));
      showToast("Berhasil menghapus user");
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-surface-container-high text-on-surface px-6 py-3 rounded-full shadow-lg border border-outline-variant flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-primary">check_circle</span>
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Manajemen User</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Kelola data pengguna, peran, dan status akun.
          </p>
        </div>
        <Button variant="primary" className="flex items-center gap-2" onClick={handleOpenAdd}>
          <span className="material-symbols-outlined">add</span>
          Tambah User
        </Button>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col w-full bg-surface p-4 rounded-2xl border border-outline-variant shadow-sm">
        <div className="w-full relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <UsersTable 
        users={filteredData} 
        onEdit={handleOpenEdit} 
        onDelete={handleOpenDelete} 
      />

      {/* Modal Add/Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit User" : "Tambah User"}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-on-surface">Nama Lengkap</label>
            <input
              {...form.register("name")}
              className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Masukkan nama"
            />
            {form.formState.errors.name && (
              <p className="text-error text-xs">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-on-surface">Email</label>
            <input
              {...form.register("email")}
              className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="contoh@email.com"
            />
            {form.formState.errors.email && (
              <p className="text-error text-xs">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-on-surface">Role</label>
              <select
                {...form.register("role")}
                className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
              {form.formState.errors.role && (
                <p className="text-error text-xs">{form.formState.errors.role.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-on-surface">Status</label>
              <select
                {...form.register("status")}
                className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                <option value="active">Aktif</option>
                <option value="inactive">Nonaktif</option>
              </select>
              {form.formState.errors.status && (
                <p className="text-error text-xs">{form.formState.errors.status.message}</p>
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-outline-variant/30 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" variant="primary">
              {editingId ? "Update User" : "Simpan User"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Delete Confirmation */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Hapus User?"
      >
        <div className="space-y-6">
          <p className="text-on-surface-variant">Akun user yang dihapus tidak dapat dikembalikan atau mengakses sistem.</p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Batal
            </Button>
            <button
              onClick={confirmDelete}
              className="px-6 py-2.5 rounded-xl font-bold transition-all duration-200 bg-error text-on-error hover:bg-error/90 active:scale-95 shadow-sm"
            >
              Ya, Hapus
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
