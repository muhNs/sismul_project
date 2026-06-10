"use client";

import React, { useState, useMemo, useEffect } from "react";
import { QuizzesTable } from "./components/quizzes/QuizzesTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { AdminMaterial, AdminQuiz, QuizType } from "./types";
import { useForm } from "react-hook-form";
import api from "@/lib/axios";

const getValidationSchema = (skill: string) => {
  const baseSchema = {
    materialId: (v: string) => !!v || "Materi wajib dipilih",
  };
  if (skill === "Writing") {
    return { fullSentence: true, blankWord: true, blankIndex: true };
  } else if (skill === "Speaking") {
    return { instruction: true, readingText: true };
  }
  return { questionText: true, optionsA: true, optionsB: true, optionsC: true, answerKey: true };
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
  const [quizzes, setQuizzes] = useState<AdminQuiz[]>([]);
  const [materials, setMaterials] = useState<AdminMaterial[]>([]);
  const [search, setSearch] = useState("");
  const [filterGrade, setFilterGrade] = useState("Semua Grade");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  const selectedMaterial = useMemo(() => materials.find(m => m.id === watchMaterialId), [watchMaterialId, materials]);
  const skill = selectedMaterial?.skill || "Reading";

  useEffect(() => {
    form.clearErrors();
  }, [skill, form]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message: string) => setToastMessage(message);

  const fetchAll = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [quizzesRes, materialsRes] = await Promise.all([
        api.get("/api/v1/quizzes"),
        api.get("/api/v1/materials"),
      ]);
      
      const rawQuizzes = quizzesRes.data.data || quizzesRes.data;
      const mappedQuizzes = rawQuizzes.map((q: any) => ({
        id: q.id,
        materialId: q.material_id,
        questionText: q.questionText,
        type: q.questionType === "MULTIPLE_CHOICE" ? (q.material?.skillCategory === "READING" ? "Reading MCQ" : "Listening MCQ") : (q.questionType === "WRITING" ? "Writing Fill Blank" : "Speaking Pronunciation"),
        options: {
          A: q.optionA,
          B: q.optionB,
          C: q.optionC
        },
        answerKey: q.correctAnswer,
        fullSentence: q.questionText, // Assuming full sentence is stored here for writing
        blankWord: q.correctAnswer,   // Assuming correct answer is the blank word
        blankIndex: q.missingWordIndex,
        instruction: q.questionText,  // Assuming instruction is stored here for speaking
        readingText: q.correctAnswer, // Assuming reading text is stored here
      }));

      const rawMaterials = materialsRes.data.data || materialsRes.data;
      const mappedMaterials = rawMaterials.map((m: any) => ({
        id: m.id,
        title: `Chapter ${m.chapter}`,
        grade: `Grade ${m.gradeLevel}`,
        skill: m.skillCategory === "READING" ? "Reading" : 
               m.skillCategory === "LISTENING" ? "Listening" : 
               m.skillCategory === "WRITING" ? "Writing" : "Speaking"
      }));

      setQuizzes(mappedQuizzes);
      setMaterials(mappedMaterials);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data. Pastikan server backend berjalan.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const tableData = useMemo(() => {
    return quizzes.map(q => {
      const mat = materials.find(m => m.id === q.materialId);
      return {
        ...q,
        materialId: mat ? `${mat.title} (${mat.grade})` : q.materialId
      };
    });
  }, [quizzes, materials]);

  const filteredData = useMemo(() => {
    return tableData.filter((q) => {
      const matchSearch =
        (q.questionText || "").toLowerCase().includes(search.toLowerCase()) ||
        (q.fullSentence || "").toLowerCase().includes(search.toLowerCase()) ||
        (q.instruction || "").toLowerCase().includes(search.toLowerCase()) ||
        q.materialId.toLowerCase().includes(search.toLowerCase());
      const mat = materials.find(m => `${m.title} (${m.grade})` === q.materialId || m.id === q.materialId);
      const matchGrade = filterGrade === "Semua Grade" ? true : mat?.grade === filterGrade;
      return matchSearch && matchGrade;
    });
  }, [tableData, search, filterGrade, materials]);

  const handleOpenAdd = () => {
    setEditingId(null);
    form.reset({
      materialId: materials[0]?.id || "",
      questionText: "", optionsA: "", optionsB: "", optionsC: "",
      answerKey: undefined, fullSentence: "", blankWord: "", blankIndex: 1,
      instruction: "", readingText: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (quiz: AdminQuiz) => {
    setEditingId(quiz.id);
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

  const validateForm = (data: FormValues): boolean => {
    let valid = true;
    if (!data.materialId) { form.setError("materialId", { message: "Materi wajib dipilih" }); valid = false; }
    if (skill === "Writing") {
      if (!data.fullSentence) { form.setError("fullSentence", { message: "Kalimat utuh wajib diisi" }); valid = false; }
      if (!data.blankWord) { form.setError("blankWord", { message: "Kata yang dihilangkan wajib diisi" }); valid = false; }
      if (!data.blankIndex || data.blankIndex < 1) { form.setError("blankIndex", { message: "Index kata wajib diisi" }); valid = false; }
    } else if (skill === "Speaking") {
      if (!data.instruction) { form.setError("instruction", { message: "Instruksi wajib diisi" }); valid = false; }
      if (!data.readingText) { form.setError("readingText", { message: "Teks wajib diisi" }); valid = false; }
    } else {
      if (!data.questionText) { form.setError("questionText", { message: "Pertanyaan wajib diisi" }); valid = false; }
      if (!data.optionsA) { form.setError("optionsA", { message: "Opsi A wajib diisi" }); valid = false; }
      if (!data.optionsB) { form.setError("optionsB", { message: "Opsi B wajib diisi" }); valid = false; }
      if (!data.optionsC) { form.setError("optionsC", { message: "Opsi C wajib diisi" }); valid = false; }
      if (!data.answerKey) { form.setError("answerKey", { message: "Kunci jawaban wajib dipilih" }); valid = false; }
    }
    return valid;
  };

  const onSubmit = async (data: FormValues) => {
    if (!validateForm(data)) return;
    setIsSubmitting(true);

    let payload: any = {
      material_id: String(data.materialId),
    };

    if (skill === "Reading" || skill === "Listening") {
      payload.questionType = "MULTIPLE_CHOICE";
      payload.questionText = data.questionText;
      payload.optionA = data.optionsA;
      payload.optionB = data.optionsB;
      payload.optionC = data.optionsC;
      payload.correctAnswer = data.answerKey;
    } else if (skill === "Writing") {
      payload.questionType = "WRITING";
      payload.questionText = data.fullSentence; // Store the full sentence in questionText
      payload.correctAnswer = data.blankWord;   // Store the correct word in correctAnswer
      payload.missingWordIndex = String(data.blankIndex);
    } else if (skill === "Speaking") {
      payload.questionType = "SPEAKING";
      payload.questionText = data.instruction;  // Store instruction in questionText
      payload.correctAnswer = data.readingText; // Store text to read in correctAnswer
    }

    try {
      if (editingId) {
        const res = await api.put(`/api/v1/quizzes/${editingId}`, payload);
        const updated = res.data.data || res.data;
        const mappedUpdated = {
          id: updated.id,
          materialId: updated.material_id,
          questionText: updated.questionText,
          type: updated.questionType === "MULTIPLE_CHOICE" ? (skill === "Reading" ? "Reading MCQ" : "Listening MCQ") : (updated.questionType === "WRITING" ? "Writing Fill Blank" : "Speaking Pronunciation"),
          options: {
            A: updated.optionA,
            B: updated.optionB,
            C: updated.optionC
          },
          answerKey: updated.correctAnswer,
          fullSentence: updated.questionText,
          blankWord: updated.correctAnswer,
          blankIndex: updated.missingWordIndex,
          instruction: updated.questionText,
          readingText: updated.correctAnswer,
        };
        setQuizzes(prev => prev.map(q => q.id === editingId ? { ...q, ...mappedUpdated } as AdminQuiz : q));
        showToast("Soal berhasil diperbarui");
      } else {
        const res = await api.post("/api/v1/quizzes", payload);
        const created = res.data.data || res.data;
        const mappedCreated = {
          id: created.id,
          materialId: created.material_id,
          questionText: created.questionText,
          type: created.questionType === "MULTIPLE_CHOICE" ? (skill === "Reading" ? "Reading MCQ" : "Listening MCQ") : (created.questionType === "WRITING" ? "Writing Fill Blank" : "Speaking Pronunciation"),
          options: {
            A: created.optionA,
            B: created.optionB,
            C: created.optionC
          },
          answerKey: created.correctAnswer,
          fullSentence: created.questionText,
          blankWord: created.correctAnswer,
          blankIndex: created.missingWordIndex,
          instruction: created.questionText,
          readingText: created.correctAnswer,
        };
        setQuizzes(prev => [...prev, mappedCreated as AdminQuiz]);
        showToast("Soal berhasil ditambahkan");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      let errorMessage = "Gagal menyimpan soal";
      if (err.response?.data?.message) {
        if (Array.isArray(err.response.data.message)) {
          errorMessage = err.response.data.message[0]?.message || errorMessage;
        } else if (typeof err.response.data.message === "string") {
          errorMessage = err.response.data.message;
        }
      }
      showToast(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      await api.delete(`/api/v1/quizzes/${deletingId}`);
      setQuizzes(prev => prev.filter(q => q.id !== deletingId));
      showToast("Soal berhasil dihapus");
    } catch (err: any) {
      showToast(err.response?.data?.message || "Gagal menghapus soal");
    } finally {
      setIsDeleteModalOpen(false);
      setDeletingId(null);
    }
  };

  const getFillBlankPreview = () => {
    if (!fullSentenceWatch || !blankWordWatch) return "Preview...";
    const regex = new RegExp(`\\b${blankWordWatch}\\b`, 'i');
    if (fullSentenceWatch.match(regex)) return fullSentenceWatch.replace(regex, "_____");
    return fullSentenceWatch;
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
        <Button variant="outline" onClick={fetchAll}>Coba Lagi</Button>
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
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-surface p-4 rounded-2xl border border-outline-variant shadow-sm w-full">
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
        <div className="w-full md:w-auto relative min-w-[200px]">
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
              <option value="">-- Pilih Materi --</option>
              {materials.map(m => (
                <option key={m.id} value={m.id}>{m.title} ({m.skill}) - {m.grade}</option>
              ))}
            </select>
            {form.formState.errors.materialId && <p className="text-error text-xs">{form.formState.errors.materialId.message}</p>}
          </div>

          {(skill === "Reading" || skill === "Listening") && (
            <>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-on-surface">Pertanyaan</label>
                <textarea {...form.register("questionText")} rows={3} className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none" placeholder="Masukkan pertanyaan" />
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
                <input {...form.register("optionsA")} className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Masukkan Opsi A" />
                {form.formState.errors.optionsA && <p className="text-error text-xs">{form.formState.errors.optionsA.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-on-surface">Opsi B</label>
                <input {...form.register("optionsB")} className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Masukkan Opsi B" />
                {form.formState.errors.optionsB && <p className="text-error text-xs">{form.formState.errors.optionsB.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-on-surface">Opsi C</label>
                <input {...form.register("optionsC")} className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Masukkan Opsi C" />
                {form.formState.errors.optionsC && <p className="text-error text-xs">{form.formState.errors.optionsC.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-on-surface">Kunci Jawaban</label>
                <select {...form.register("answerKey")} className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all">
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
                <input {...form.register("fullSentence")} className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Contoh: I have a cat" />
                {form.formState.errors.fullSentence && <p className="text-error text-xs">{form.formState.errors.fullSentence.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-on-surface">Kata Yang Dihilangkan</label>
                <input {...form.register("blankWord")} className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Contoh: cat" />
                {form.formState.errors.blankWord && <p className="text-error text-xs">{form.formState.errors.blankWord.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-on-surface">Index Kata (ke-)</label>
                <input type="number" {...form.register("blankIndex")} className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Contoh: 4" />
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
                <input {...form.register("instruction")} className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Contoh: Please read the sentence below." />
                {form.formState.errors.instruction && <p className="text-error text-xs">{form.formState.errors.instruction.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-on-surface">Teks Yang Harus Dibaca</label>
                <textarea {...form.register("readingText")} rows={4} className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none" placeholder="Contoh: My name is Kevin and I like English." />
                {form.formState.errors.readingText && <p className="text-error text-xs">{form.formState.errors.readingText.message}</p>}
              </div>
            </>
          )}

          <div className="pt-4 flex flex-col sm:flex-row justify-end gap-3 border-t border-outline-variant/30 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto">
              Batal
            </Button>
            <Button type="submit" variant="primary" className="w-full sm:w-auto" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : editingId ? "Update Soal" : "Simpan Soal"}
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
