"use client";

import React, { useState, useMemo, useEffect } from "react";
import { MaterialsTable } from "./components/materials/MaterialsTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { AdminMaterial } from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "@/lib/axios";

const formSchema = z.object({
  title: z.string().min(1, "Judul Chapter wajib diisi"),
  grade: z.enum(["Grade 3", "Grade 4", "Grade 5", "Grade 6"], {
    message: "Grade wajib dipilih",
  }),
  skill: z.enum(["Reading", "Listening", "Writing", "Speaking"], {
    message: "Skill wajib dipilih",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export const MaterialsPage = () => {
  const [materials, setMaterials] = useState<AdminMaterial[]>([]);
  const [search, setSearch] = useState("");
  const [filterGrade, setFilterGrade] = useState("Semua Grade");
  const [filterSkill, setFilterSkill] = useState("Semua Skill");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message: string) => setToastMessage(message);

  const fetchMaterials = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/v1/materials");
      setMaterials(res.data.data || res.data);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data materi. Pastikan server backend berjalan.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      grade: "Grade 3",
      skill: "Reading",
    },
  });

  const filteredData = useMemo(() => {
    return materials.filter((m) => {
      const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
      const matchGrade = filterGrade === "Semua Grade" || m.grade === filterGrade;
      const matchSkill = filterSkill === "Semua Skill" || m.skill === filterSkill;
      return matchSearch && matchGrade && matchSkill;
    });
  }, [materials, search, filterGrade, filterSkill]);

  const handleOpenAdd = () => {
    setEditingId(null);
    form.reset({ title: "", grade: "Grade 3", skill: "Reading" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (material: AdminMaterial) => {
    setEditingId(material.id);
    form.reset({
      title: material.title,
      grade: material.grade,
      skill: material.skill,
    });
    setIsModalOpen(true);
  };

  const handleOpenDelete = (id: string) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (editingId) {
        const res = await api.put(`/api/v1/materials/${editingId}`, data);
        const updated = res.data.data || res.data;
        setMaterials(prev => prev.map(m => m.id === editingId ? { ...m, ...updated } : m));
        showToast("Berhasil mengubah materi");
      } else {
        const res = await api.post("/api/v1/materials", data);
        const created = res.data.data || res.data;
        setMaterials(prev => [...prev, created]);
        showToast("Berhasil menambahkan materi");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      showToast(err.response?.data?.message || "Gagal menyimpan materi");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      await api.delete(`/api/v1/materials/${deletingId}`);
      setMaterials(prev => prev.filter(m => m.id !== deletingId));
      showToast("Berhasil menghapus materi");
    } catch (err: any) {
      showToast(err.response?.data?.message || "Gagal menghapus materi");
    } finally {
      setIsDeleteModalOpen(false);
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-surface-container-highest rounded-md animate-pulse"></div>
        <div className="h-20 w-full bg-surface-container-highest rounded-2xl animate-pulse"></div>
        <div className="h-64 w-full bg-surface-container-highest rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
        <span className="material-symbols-outlined text-5xl text-error">wifi_off</span>
        <p className="text-on-surface-variant font-semibold">{error}</p>
        <Button variant="outline" onClick={fetchMaterials}>Coba Lagi</Button>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-on-surface">Kelola Materi Pelajaran</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Kelola chapter pembelajaran bahasa Inggris berdasarkan grade dan skill pembelajaran.
          </p>
        </div>
        <Button variant="primary" className="flex items-center gap-2" onClick={handleOpenAdd}>
          <span className="material-symbols-outlined">add</span>
          Tambah Materi
        </Button>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center bg-surface p-4 rounded-2xl border border-outline-variant shadow-sm w-full">
        <div className="flex-1 w-full relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            type="text"
            placeholder="Cari judul chapter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="w-full sm:w-48 relative flex-shrink-0">
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="w-full pl-4 pr-10 py-2 appearance-none rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            >
              <option value="Semua Grade">Semua Grade</option>
              <option value="Grade 3">Grade 3</option>
              <option value="Grade 4">Grade 4</option>
              <option value="Grade 5">Grade 5</option>
              <option value="Grade 6">Grade 6</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
          </div>
          <div className="w-full sm:w-48 relative flex-shrink-0">
            <select
              value={filterSkill}
              onChange={(e) => setFilterSkill(e.target.value)}
              className="w-full pl-4 pr-10 py-2 appearance-none rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            >
              <option value="Semua Skill">Semua Skill</option>
              <option value="Reading">Reading</option>
              <option value="Listening">Listening</option>
              <option value="Writing">Writing</option>
              <option value="Speaking">Speaking</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <MaterialsTable
        materials={filteredData}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      {/* Modal Add/Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Materi" : "Tambah Materi"}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-on-surface">Judul Chapter</label>
            <input
              {...form.register("title")}
              className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Masukkan judul chapter"
            />
            {form.formState.errors.title && (
              <p className="text-error text-xs">{form.formState.errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-on-surface">Grade</label>
              <select
                {...form.register("grade")}
                className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
              </select>
              {form.formState.errors.grade && (
                <p className="text-error text-xs">{form.formState.errors.grade.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-on-surface">Skill</label>
              <select
                {...form.register("skill")}
                className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                <option value="Reading">Reading</option>
                <option value="Listening">Listening</option>
                <option value="Writing">Writing</option>
                <option value="Speaking">Speaking</option>
              </select>
              {form.formState.errors.skill && (
                <p className="text-error text-xs">{form.formState.errors.skill.message}</p>
              )}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-end gap-3 border-t border-outline-variant/30 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto">
              Batal
            </Button>
            <Button type="submit" variant="primary" className="w-full sm:w-auto" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : editingId ? "Update Materi" : "Simpan Materi"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Delete Confirmation */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Hapus Materi?"
      >
        <div className="space-y-6">
          <p className="text-on-surface-variant">Materi yang dihapus tidak dapat dikembalikan.</p>
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} className="w-full sm:w-auto">
              Batal
            </Button>
            <button
              onClick={confirmDelete}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold transition-all duration-200 bg-error text-on-error hover:bg-error/90 active:scale-95 shadow-sm"
            >
              Ya, Hapus
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
