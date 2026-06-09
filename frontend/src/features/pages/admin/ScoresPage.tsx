"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ScoresTable, ExtendedScore } from "./components/scores/ScoresTable";
import { Button } from "@/components/ui/Button";
import api from "@/lib/axios";
import * as XLSX from "xlsx";

interface ApiMaterial {
  id: string;
  title: string;
  grade: string;
  skill: string;
}

interface ApiScore {
  id: string;
  studentName: string;
  materialId: string;
  highestScore: number;
  completedAt: string;
}

export const ScoresPage = () => {
  const [search, setSearch] = useState("");
  const [filterGrade, setFilterGrade] = useState("Semua Grade");
  const [filterChapter, setFilterChapter] = useState("Semua Chapter");
  const [filterSkill, setFilterSkill] = useState("Semua Skill");

  const [scores, setScores] = useState<ApiScore[]>([]);
  const [materials, setMaterials] = useState<ApiMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [scoresRes, materialsRes] = await Promise.all([
          api.get("/api/v1/scores"),
          api.get("/api/v1/materials"),
        ]);
        const rawScores = scoresRes.data.data || scoresRes.data;
        const mappedScores = rawScores.map((s: any) => ({
          id: s.id,
          studentName: s.user?.name || "Unknown",
          materialId: s.material_id,
          highestScore: s.score,
          completedAt: new Date(s.created_at).toLocaleDateString("id-ID")
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

        setScores(mappedScores);
        setMaterials(mappedMaterials);
      } catch (err: any) {
        console.error(err);
        setError("Gagal memuat data. Pastikan server backend berjalan.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const extendedScores: ExtendedScore[] = useMemo(() => {
    return scores.map(score => {
      const mat = materials.find(m => m.id === score.materialId);
      return {
        ...score,
        chapterTitle: mat ? mat.title : "Unknown Chapter",
        skill: mat ? mat.skill : "Unknown Skill",
        grade: mat ? mat.grade : "Unknown Grade",
      };
    }) as (ExtendedScore & { grade: string })[];
  }, [scores, materials]);

  const availableChapters = useMemo(() => {
    const chapters = new Set<string>();
    materials.forEach(mat => {
      if (filterGrade === "Semua Grade" || mat.grade === filterGrade) {
        chapters.add(mat.title);
      }
    });
    return Array.from(chapters);
  }, [filterGrade, materials]);

  const filteredScores = useMemo(() => {
    return extendedScores.filter((score) => {
      const matchSearch = score.studentName.toLowerCase().includes(search.toLowerCase());
      const matchGrade = filterGrade === "Semua Grade" ? true : (score as any).grade === filterGrade;
      const matchChapter = filterChapter === "Semua Chapter" ? true : score.chapterTitle === filterChapter;
      const matchSkill = filterSkill === "Semua Skill" ? true : score.skill === filterSkill;
      return matchSearch && matchGrade && matchChapter && matchSkill;
    });
  }, [extendedScores, search, filterGrade, filterChapter, filterSkill]);

  useEffect(() => {
    if (filterChapter !== "Semua Chapter" && !availableChapters.includes(filterChapter)) {
      setFilterChapter("Semua Chapter");
    }
  }, [filterGrade, availableChapters, filterChapter]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message: string) => setToastMessage(message);

  const handleExportExcel = () => {
    if (filteredScores.length === 0) {
      showToast("Tidak ada data untuk diekspor.");
      return;
    }
    const aoaData: any[][] = [
      ["LAPORAN HASIL NILAI KUIS - LEARNLY"],
      [],
      ["Informasi Laporan:"],
      ["Tanggal Export", new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + " WIB"],
      ["Filter Grade", filterGrade],
      ["Filter Chapter", filterChapter],
      ["Filter Skill", filterSkill],
      ["Total Data", `${filteredScores.length} Siswa`],
      [],
      ["NO", "NAMA SISWA", "GRADE", "JUDUL CHAPTER", "SKILL", "SKOR TERTINGGI", "STATUS PREDIKAT", "TANGGAL MENGERJAKAN"]
    ];
    filteredScores.forEach((score, index) => {
      let status = "Needs Improvement";
      if (score.highestScore >= 90) status = "Excellent";
      else if (score.highestScore >= 80) status = "Good";
      else if (score.highestScore >= 70) status = "Fair";
      aoaData.push([index + 1, score.studentName, (score as any).grade, score.chapterTitle, score.skill, score.highestScore, status, score.completedAt]);
    });
    const worksheet = XLSX.utils.aoa_to_sheet(aoaData);
    worksheet['!cols'] = [{ wch: 5 }, { wch: 25 }, { wch: 15 }, { wch: 35 }, { wch: 15 }, { wch: 18 }, { wch: 22 }, { wch: 25 }];
    worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rekapitulasi Nilai");
    XLSX.writeFile(workbook, `Laporan_Nilai_${Date.now()}.xlsx`);
  };

  const handleExportCSV = () => {
    if (filteredScores.length === 0) {
      showToast("Tidak ada data untuk diekspor.");
      return;
    }
    const headers = ["Nama Siswa", "Judul Chapter", "Skill", "Skor Tertinggi", "Tanggal Mengerjakan"];
    const rows = filteredScores.map(score => [`"${score.studentName}"`, `"${score.chapterTitle}"`, `"${score.skill}"`, score.highestScore, `"${score.completedAt}"`]);
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Laporan_Nilai.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-3">
            <div className="h-4 w-32 bg-surface-container-high rounded-md animate-pulse"></div>
            <div className="h-8 w-48 bg-surface-container-highest rounded-md animate-pulse"></div>
            <div className="h-4 w-64 bg-surface-container-high rounded-md animate-pulse"></div>
          </div>
        </div>
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
        <Button variant="outline" onClick={() => window.location.reload()}>Coba Lagi</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-surface-container-high text-on-surface px-6 py-3 rounded-full shadow-lg border border-outline-variant flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-primary">info</span>
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-2">
            <span className="font-semibold text-primary">Admin</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="font-semibold text-on-surface">Laporan Nilai</span>
          </div>
          <h1 className="text-2xl font-bold text-on-surface">Laporan Nilai</h1>
          <p className="text-on-surface-variant text-sm mt-1">Pantau hasil pembelajaran siswa berdasarkan chapter dan skill bahasa Inggris.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <Button variant="outline" className="flex items-center justify-center gap-2" onClick={handleExportCSV}>
            <span className="material-symbols-outlined text-[18px]">data_object</span>
            Export CSV
          </Button>
          <Button variant="primary" className="flex items-center justify-center gap-2" onClick={handleExportExcel}>
            <span className="material-symbols-outlined text-[18px]">table_chart</span>
            Export Excel
          </Button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 bg-surface p-4 rounded-2xl border border-outline-variant shadow-sm w-full">
        <div className="flex-1 w-full relative min-w-[200px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            type="text"
            placeholder="Cari nama siswa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:min-w-[140px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant z-10 text-[18px]">school</span>
            <select value={filterGrade} onChange={(e) => setFilterGrade(e.target.value)} className="w-full pl-10 pr-10 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none font-semibold cursor-pointer text-sm">
              <option value="Semua Grade">Semua Grade</option>
              <option value="Grade 3">Grade 3</option>
              <option value="Grade 4">Grade 4</option>
              <option value="Grade 5">Grade 5</option>
              <option value="Grade 6">Grade 6</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
          </div>

          <div className="relative w-full sm:min-w-[160px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant z-10 text-[18px]">auto_stories</span>
            <select value={filterChapter} onChange={(e) => setFilterChapter(e.target.value)} className="w-full pl-10 pr-10 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none font-semibold cursor-pointer text-sm">
              <option value="Semua Chapter">Semua Chapter</option>
              {availableChapters.map(chapter => (
                <option key={chapter} value={chapter}>{chapter}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
          </div>

          <div className="relative w-full sm:min-w-[140px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant z-10 text-[18px]">psychology</span>
            <select value={filterSkill} onChange={(e) => setFilterSkill(e.target.value)} className="w-full pl-10 pr-10 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none font-semibold cursor-pointer text-sm">
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
      <ScoresTable scores={filteredScores} />
    </div>
  );
};
