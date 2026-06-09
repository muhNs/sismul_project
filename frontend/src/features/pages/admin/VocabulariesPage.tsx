"use client";

import React, { useState, useMemo, useEffect } from "react";
import { VocabulariesTable } from "./components/vocabularies/VocabulariesTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { AdminVocabulary } from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getVocabularies, createVocabulary, updateVocabulary, deleteVocabulary } from "@/features/vocabularies/api/vocabularies";

const formSchema = z.object({
  english: z.string().min(1, "English word wajib diisi"),
  indonesian: z.string().min(1, "Indonesian meaning wajib diisi"),
  grade: z.enum(["Grade 3", "Grade 4", "Grade 5", "Grade 6"], {
    message: "Grade wajib dipilih",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export const VocabulariesPage = () => {
  const [vocabularies, setVocabularies] = useState<AdminVocabulary[]>([]);
  const [search, setSearch] = useState("");
  const [filterGrade, setFilterGrade] = useState("Semua Grade");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchVocabs = async () => {
      try {
        const data = await getVocabularies();
        setVocabularies(data.map(v => ({
          id: String(v.id),
          english: v.english,
          indonesian: v.indonesian,
          grade: `Grade ${v.gradeLevel}` as any,
          image: v.image_path ? `http://localhost:5000${v.image_path}` : undefined,
          audio: v.voice_path ? `http://localhost:5000${v.voice_path}` : undefined,
        })));
      } catch (err) {
        console.error("Gagal memuat kosakata di dasbor admin:", err);
      }
    };
    fetchVocabs();
  }, []);

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
      english: "",
      indonesian: "",
      grade: "Grade 3",
    },
  });

  const filteredData = useMemo(() => {
    return vocabularies.filter((v) => {
      const matchSearch =
        v.english.toLowerCase().includes(search.toLowerCase()) ||
        v.indonesian.toLowerCase().includes(search.toLowerCase());
      const matchGrade = filterGrade === "Semua Grade" || v.grade === filterGrade;
      return matchSearch && matchGrade;
    });
  }, [vocabularies, search, filterGrade]);

  const handleOpenAdd = () => {
    setEditingId(null);
    form.reset({ english: "", indonesian: "", grade: "Grade 3" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (vocab: AdminVocabulary) => {
    setEditingId(vocab.id);
    form.reset({
      english: vocab.english,
      indonesian: vocab.indonesian,
      grade: vocab.grade,
    });
    setIsModalOpen(true);
  };

  const handleOpenDelete = (id: string) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("english", data.english);
    formData.append("indonesian", data.indonesian);
    
    const gradeLevel = data.grade.replace("Grade ", "");
    formData.append("gradeLevel", gradeLevel);

    const imageInput = document.querySelector('input[type="file"][accept="image/*"]') as HTMLInputElement;
    const audioInput = document.querySelector('input[type="file"][accept="audio/*"]') as HTMLInputElement;

    if (imageInput?.files?.[0]) {
      formData.append("image", imageInput.files[0]);
    }
    if (audioInput?.files?.[0]) {
      formData.append("voice", audioInput.files[0]);
    }

    try {
      if (editingId) {
        const updated = await updateVocabulary(parseInt(editingId, 10), formData);
        setVocabularies(prev => prev.map(v => v.id === editingId ? {
          id: String(updated.id),
          english: updated.english,
          indonesian: updated.indonesian,
          grade: `Grade ${updated.gradeLevel}` as any,
          image: updated.image_path ? `http://localhost:5000${updated.image_path}` : undefined,
          audio: updated.voice_path ? `http://localhost:5000${updated.voice_path}` : undefined,
        } : v));
        showToast("Berhasil mengubah kosakata");
      } else {
        const created = await createVocabulary(formData);
        const newVocab: AdminVocabulary = {
          id: String(created.id),
          english: created.english,
          indonesian: created.indonesian,
          grade: `Grade ${created.gradeLevel}` as any,
          image: created.image_path ? `http://localhost:5000${created.image_path}` : undefined,
          audio: created.voice_path ? `http://localhost:5000${created.voice_path}` : undefined,
        };
        setVocabularies(prev => [...prev, newVocab]);
        showToast("Berhasil menambahkan kosakata");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      console.error(err);
      let errorMessage = "Gagal menyimpan kosakata.";
      if (err.response?.data?.message) {
        if (Array.isArray(err.response.data.message)) {
          errorMessage = err.response.data.message[0]?.message || errorMessage;
        } else if (typeof err.response.data.message === "string") {
          errorMessage = err.response.data.message;
        }
      }
      showToast(errorMessage);
    }
  };

  const confirmDelete = async () => {
    if (deletingId) {
      try {
        await deleteVocabulary(parseInt(deletingId, 10));
        setVocabularies(prev => prev.filter(v => v.id !== deletingId));
        showToast("Berhasil menghapus kosakata");
      } catch (err) {
        console.error("Gagal menghapus kosakata:", err);
        alert("Gagal menghapus kosakata dari server.");
      }
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
          <h1 className="text-2xl font-bold text-on-surface">Kelola Kosakata</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Kelola dan atur data kosakata bahasa Inggris untuk siswa berdasarkan grade.
          </p>
        </div>
        <Button variant="primary" className="flex items-center gap-2" onClick={handleOpenAdd}>
          <span className="material-symbols-outlined">add</span>
          Tambah Kosakata
        </Button>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center w-full bg-surface p-4 rounded-2xl border border-outline-variant shadow-sm">
        <div className="flex-1 w-full relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            type="text"
            placeholder="Cari kosakata..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        <div className="w-full md:w-48 relative">
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
      </div>

      {/* Table */}
      <VocabulariesTable 
        vocabularies={filteredData} 
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      {/* Modal Add/Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Kosakata" : "Tambah Kosakata"}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-on-surface">English Word</label>
            <input
              {...form.register("english")}
              className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="e.g. Cat"
            />
            {form.formState.errors.english && (
              <p className="text-error text-xs">{form.formState.errors.english.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-on-surface">Indonesian Meaning</label>
            <input
              {...form.register("indonesian")}
              className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="e.g. Kucing"
            />
            {form.formState.errors.indonesian && (
              <p className="text-error text-xs">{form.formState.errors.indonesian.message}</p>
            )}
          </div>

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
            <label className="text-sm font-semibold text-on-surface">Upload Image (Opsional)</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-container file:text-primary hover:file:bg-primary/20 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-on-surface">Upload Audio (Opsional)</label>
            <input
              type="file"
              accept="audio/*"
              className="w-full px-4 py-2 text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-container file:text-primary hover:file:bg-primary/20 transition-all"
            />
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-end gap-3 border-t border-outline-variant/30 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto">
              Batal
            </Button>
            <Button type="submit" variant="primary" className="w-full sm:w-auto">
              {editingId ? "Update Kosakata" : "Simpan Kosakata"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Delete Confirmation */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Hapus Kosakata?"
      >
        <div className="space-y-6">
          <p className="text-on-surface-variant">Data kosakata yang dihapus tidak dapat dikembalikan.</p>
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
