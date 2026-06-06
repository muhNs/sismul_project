"use client";

import React, { useState, useMemo, useEffect } from "react";
import { QuizzesTable } from "./components/quizzes/QuizzesTable";
import { dummyQuizzes } from "./data/quizzes";
import { dummyMaterials } from "./data/materials";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { AdminQuiz, QuizType } from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const getValidationSchema = (skill: string) => {
  const baseSchema = {
    materialId: z.string().min(1, "Materi wajib dipilih"),
  };

  if (skill === "Writing") {
    return z.object({
      ...baseSchema,
      fullSentence: z.string().min(1, "Kalimat utuh wajib diisi"),
      blankWord: z.string().min(1, "Kata yang dihilangkan wajib diisi"),
      blankIndex: z.coerce.number().min(1, "Index kata wajib diisi"),
    }).refine((data) => {
      const words = data.fullSentence.split(" ");
      return data.blankIndex <= words.length;
    }, {
      message: "Index tidak boleh lebih besar dari jumlah kata",
      path: ["blankIndex"]
    });
  } else if (skill === "Speaking") {
    return z.object({
      ...baseSchema,
      instruction: z.string().min(1, "Instruksi wajib diisi"),
      readingText: z.string().min(1, "Teks yang dibaca wajib diisi"),
    });
  } else {
    return z.object({
      ...baseSchema,
      questionText: z.string().min(1, "Pertanyaan wajib diisi"),
      optionsA: z.string().min(1, "Opsi A wajib diisi"),
      optionsB: z.string().min(1, "Opsi B wajib diisi"),
      optionsC: z.string().min(1, "Opsi C wajib diisi"),
      answerKey: z.enum(["A", "B", "C"], { message: "Kunci jawaban wajib dipilih" }),
    });
  }
};

type FormValues = {
  materialId: string;
  questionText?: string;
  optionsA?: string;
  optionsB?: string;
  optionsC?: string;
  answerKey?: "A" | "B" | "C";
  fullSentence?: string;
  blankWord?: string;
  blankIndex?: number;
  instruction?: string;
  readingText?: string;
};

export const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState<AdminQuiz[]>(dummyQuizzes);
  const [search, setSearch] = useState("");
  const [filterGrade, setFilterGrade] = useState("Semua Grade");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // We need to initialize the form first without a dynamic schema 
  // because the schema depends on the watched materialId.
  // A clean way is to use a super schema that validates everything conditionally, 
  // but since we want strict typing per branch, we'll recreate the resolver dynamically.
  
  const form = useForm<FormValues>({
    defaultValues: {
      materialId: "",
      questionText: "",
      optionsA: "",
      optionsB: "",
      optionsC: "",
      fullSentence: "",
      blankWord: "",
      blankIndex: 1,
      instruction: "",
      readingText: "",
    },
  });

  const watchMaterialId = form.watch("materialId");
  const fullSentenceWatch = form.watch("fullSentence");
  const blankWordWatch = form.watch("blankWord");

  const selectedMaterial = useMemo(() => dummyMaterials.find(m => m.id === watchMaterialId), [watchMaterialId]);
  const skill = selectedMaterial?.skill || "Reading";

  // Re-apply the resolver when the skill changes
  useEffect(() => {
    form.clearErrors();
  }, [skill, form]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  // Enhance table data to include material title
  const tableData = useMemo(() => {
    return quizzes.map(q => {
      const mat = dummyMaterials.find(m => m.id === q.materialId);
      return {
        ...q,
        materialId: mat ? `${mat.title} (${mat.grade})` : q.materialId
      };
    });
  }, [quizzes]);

  const filteredData = useMemo(() => {
    return tableData.filter((q) => {
      const matchSearch =
        (q.questionText || "").toLowerCase().includes(search.toLowerCase()) ||
        (q.fullSentence || "").toLowerCase().includes(search.toLowerCase()) ||
        (q.instruction || "").toLowerCase().includes(search.toLowerCase()) ||
        q.materialId.toLowerCase().includes(search.toLowerCase());
      
      const mat = dummyMaterials.find(m => `${m.title} (${m.grade})` === q.materialId || m.id === q.materialId);
      const matchGrade = filterGrade === "Semua Grade" ? true : mat?.grade === filterGrade;

      return matchSearch && matchGrade;
    });
  }, [tableData, search, filterGrade]);

  const handleOpenAdd = () => {
    setEditingId(null);
    form.reset({
      materialId: dummyMaterials[0]?.id || "",
      questionText: "",
      optionsA: "",
      optionsB: "",
      optionsC: "",
      answerKey: undefined,
      fullSentence: "",
      blankWord: "",
      blankIndex: 1,
      instruction: "",
      readingText: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (quiz: AdminQuiz) => {
    setEditingId(quiz.id);
    
    // Find original materialId since the table injects the title
    const originalQuiz = quizzes.find(q => q.id === quiz.id);
    const mId = originalQuiz?.materialId || "";

    form.reset({
      materialId: mId,
      questionText: quiz.questionText,
      optionsA: quiz.options?.A || "",
      optionsB: quiz.options?.B || "",
      optionsC: quiz.options?.C || "",
      answerKey: quiz.answerKey,
      fullSentence: quiz.fullSentence || "",
      blankWord: quiz.blankWord || "",
      blankIndex: quiz.blankIndex || 1,
      instruction: quiz.instruction || "",
      readingText: quiz.readingText || "",
    });
    setIsModalOpen(true);
  };

  const handleOpenDelete = (id: string) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const onSubmit = async (data: FormValues) => {
    // Manually validate using the dynamic schema because react-hook-form 
    // doesn't gracefully update resolver on the fly mid-submit without re-renders.
    const schema = getValidationSchema(skill);
    const result = schema.safeParse(data);
    
    if (!result.success) {
      result.error.issues.forEach(issue => {
        form.setError(issue.path[0] as any, { message: issue.message });
      });
      return;
    }

    let newQuiz: Partial<AdminQuiz> = {
      materialId: data.materialId,
      type: `${skill} ${skill === "Writing" ? "Fill Blank" : skill === "Speaking" ? "Pronunciation" : "MCQ"}` as QuizType,
    };

    if (skill === "Reading" || skill === "Listening") {
      newQuiz.questionText = data.questionText;
      newQuiz.options = { A: data.optionsA!, B: data.optionsB!, C: data.optionsC! };
      newQuiz.answerKey = data.answerKey;
    } else if (skill === "Writing") {
      newQuiz.questionText = "Lengkapi kalimat rumpang berikut.";
      newQuiz.fullSentence = data.fullSentence;
      newQuiz.blankWord = data.blankWord;
      newQuiz.blankIndex = data.blankIndex;
    } else if (skill === "Speaking") {
      newQuiz.questionText = data.instruction;
      newQuiz.instruction = data.instruction;
      newQuiz.readingText = data.readingText;
    }

    if (editingId) {
      setQuizzes(prev => prev.map(q => q.id === editingId ? { ...q, ...newQuiz } as AdminQuiz : q));
      showToast("Soal berhasil diperbarui");
    } else {
      newQuiz.id = `QZ-${Date.now()}`;
      setQuizzes(prev => [...prev, newQuiz as AdminQuiz]);
      showToast("Soal berhasil ditambahkan");
    }
    setIsModalOpen(true); // temporary workaround for rapid clicking
    setTimeout(() => setIsModalOpen(false), 10);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setQuizzes(prev => prev.filter(q => q.id !== deletingId));
      showToast("Soal berhasil dihapus");
    }
    setIsDeleteModalOpen(false);
  };

  // Helper for fill blank preview
  const getFillBlankPreview = () => {
    if (!fullSentenceWatch || !blankWordWatch) return "Preview...";
    const regex = new RegExp(`\\b${blankWordWatch}\\b`, 'i');
    if (fullSentenceWatch.match(regex)) {
      return fullSentenceWatch.replace(regex, "_____");
    }
    return fullSentenceWatch;
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
          <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-2">
            <span className="font-semibold text-primary">Admin</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="font-semibold text-on-surface">Kelola Kuis</span>
          </div>
          <h1 className="text-2xl font-bold text-on-surface">Kelola Soal Kuis</h1>
          <p className="text-on-surface-variant text-sm mt-1">Daftar seluruh soal kuis dari berbagai materi pelajaran.</p>
        </div>
        <Button variant="primary" className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3" onClick={handleOpenAdd}>
          <span className="material-symbols-outlined">add</span>
          Tambah Soal Baru
        </Button>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-surface p-4 rounded-2xl border border-outline-variant shadow-sm">
        <div className="flex-1 w-full relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            type="text"
            placeholder="Cari soal..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        <div className="w-full sm:w-auto relative min-w-[200px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant z-10">filter_list</span>
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none font-semibold cursor-pointer"
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
      <QuizzesTable 
        quizzes={filteredData} 
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      {/* Modal Add/Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Soal" : "Tambah Soal Baru"}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          <div className="space-y-1 pb-4 mb-4 border-b border-outline-variant/30">
            <label className="text-sm font-semibold text-on-surface">Pilih Materi / Chapter</label>
            <select
              {...form.register("materialId")}
              className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all font-medium"
            >
              {dummyMaterials.map(m => (
                <option key={m.id} value={m.id}>{m.title} ({m.skill}) - {m.grade}</option>
              ))}
            </select>
            {form.formState.errors.materialId && <p className="text-error text-xs">{form.formState.errors.materialId.message}</p>}
          </div>

          {(skill === "Reading" || skill === "Listening") && (
            <>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-on-surface">Pertanyaan</label>
                <textarea
                  {...form.register("questionText")}
                  rows={3}
                  className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  placeholder="Masukkan pertanyaan"
                />
                {form.formState.errors.questionText && <p className="text-error text-xs">{form.formState.errors.questionText.message}</p>}
              </div>

              {skill === "Listening" && (
                <div className="p-3 bg-cyan-50 border border-cyan-100 rounded-xl text-cyan-800 text-sm flex gap-2 items-start">
                  <span className="material-symbols-outlined text-[20px]">info</span>
                  <p>Audio upload akan didukung pada versi mendatang.</p>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-semibold text-on-surface">Opsi A</label>
                <input
                  {...form.register("optionsA")}
                  className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Masukkan Opsi A"
                />
                {form.formState.errors.optionsA && <p className="text-error text-xs">{form.formState.errors.optionsA.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-on-surface">Opsi B</label>
                <input
                  {...form.register("optionsB")}
                  className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Masukkan Opsi B"
                />
                {form.formState.errors.optionsB && <p className="text-error text-xs">{form.formState.errors.optionsB.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-on-surface">Opsi C</label>
                <input
                  {...form.register("optionsC")}
                  className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Masukkan Opsi C"
                />
                {form.formState.errors.optionsC && <p className="text-error text-xs">{form.formState.errors.optionsC.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-on-surface">Kunci Jawaban</label>
                <select
                  {...form.register("answerKey")}
                  className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                >
                  <option value="">-- Pilih Kunci Jawaban --</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
                {form.formState.errors.answerKey && <p className="text-error text-xs">{form.formState.errors.answerKey.message}</p>}
              </div>
            </>
          )}

          {skill === "Writing" && (
            <>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-on-surface">Kalimat Utuh</label>
                <input
                  {...form.register("fullSentence")}
                  className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Contoh: I have a cat"
                />
                {form.formState.errors.fullSentence && <p className="text-error text-xs">{form.formState.errors.fullSentence.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-on-surface">Kata Yang Dihilangkan</label>
                <input
                  {...form.register("blankWord")}
                  className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Contoh: cat"
                />
                {form.formState.errors.blankWord && <p className="text-error text-xs">{form.formState.errors.blankWord.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-on-surface">Index Kata (ke-)</label>
                <input
                  type="number"
                  {...form.register("blankIndex")}
                  className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Contoh: 4"
                />
                {form.formState.errors.blankIndex && <p className="text-error text-xs">{form.formState.errors.blankIndex.message}</p>}
              </div>

              <div className="p-4 bg-surface-container-high rounded-xl border border-outline-variant/50">
                <p className="text-xs text-on-surface-variant font-semibold mb-1">Preview:</p>
                <p className="text-sm text-on-surface font-medium">{getFillBlankPreview()}</p>
              </div>
            </>
          )}

          {skill === "Speaking" && (
            <>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-on-surface">Instruksi</label>
                <input
                  {...form.register("instruction")}
                  className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Contoh: Please read the sentence below."
                />
                {form.formState.errors.instruction && <p className="text-error text-xs">{form.formState.errors.instruction.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-on-surface">Teks Yang Harus Dibaca</label>
                <textarea
                  {...form.register("readingText")}
                  rows={4}
                  className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  placeholder="Contoh: My name is Kevin and I like English."
                />
                {form.formState.errors.readingText && <p className="text-error text-xs">{form.formState.errors.readingText.message}</p>}
              </div>
            </>
          )}

          <div className="pt-4 flex justify-end gap-3 border-t border-outline-variant/30 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" variant="primary">
              {editingId ? "Update Soal" : "Simpan Soal"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Delete Confirmation */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Hapus Soal?"
      >
        <div className="space-y-6">
          <p className="text-on-surface-variant">Soal yang dihapus tidak dapat dikembalikan.</p>
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
