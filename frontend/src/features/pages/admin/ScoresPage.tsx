"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ScoresTable, ExtendedScore } from "./components/scores/ScoresTable";
import { dummyScores } from "./data/scores";
import { dummyMaterials } from "./data/materials";
import { Button } from "@/components/ui/Button";
import * as XLSX from "xlsx";

export const ScoresPage = () => {
  const [search, setSearch] = useState("");
  const [filterGrade, setFilterGrade] = useState("Semua Grade");
  const [filterChapter, setFilterChapter] = useState("Semua Chapter");
  const [filterSkill, setFilterSkill] = useState("Semua Skill");
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const extendedScores: ExtendedScore[] = useMemo(() => {
    return dummyScores.map(score => {
      const mat = dummyMaterials.find(m => m.id === score.materialId);
      return {
        ...score,
        chapterTitle: mat ? mat.title : "Unknown Chapter",
        skill: mat ? mat.skill : "Unknown Skill",
        grade: mat ? mat.grade : "Unknown Grade",
      };
    }) as (ExtendedScore & { grade: string })[];
  }, []);

  // Get unique chapters for the dropdown based on selected grade
  const availableChapters = useMemo(() => {
    const chapters = new Set<string>();
    dummyMaterials.forEach(mat => {
      if (filterGrade === "Semua Grade" || mat.grade === filterGrade) {
        chapters.add(mat.title);
      }
    });
    return Array.from(chapters);
  }, [filterGrade]);

  const filteredScores = useMemo(() => {
    return extendedScores.filter((score) => {
      const matchSearch = score.studentName.toLowerCase().includes(search.toLowerCase());
      const matchGrade = filterGrade === "Semua Grade" ? true : (score as any).grade === filterGrade;
      const matchChapter = filterChapter === "Semua Chapter" ? true : score.chapterTitle === filterChapter;
      const matchSkill = filterSkill === "Semua Skill" ? true : score.skill === filterSkill;
      
      return matchSearch && matchGrade && matchChapter && matchSkill;
    });
  }, [extendedScores, search, filterGrade, filterChapter, filterSkill]);

  // Reset chapter filter if the selected grade doesn't contain that chapter
  useEffect(() => {
    if (filterChapter !== "Semua Chapter" && !availableChapters.includes(filterChapter)) {
      setFilterChapter("Semua Chapter");
    }
  }, [filterGrade, availableChapters, filterChapter]);

  const handleExportExcel = () => {
    if (filteredScores.length === 0) return;
    
    // 1. Create detailed header and metadata
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

    // 2. Append rows
    filteredScores.forEach((score, index) => {
      let status = "Needs Improvement";
      if (score.highestScore >= 90) status = "Excellent";
      else if (score.highestScore >= 80) status = "Good";
      else if (score.highestScore >= 70) status = "Fair";

      aoaData.push([
        index + 1,
        score.studentName,
        (score as any).grade,
        score.chapterTitle,
        score.skill,
        score.highestScore,
        status,
        score.completedAt
      ]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(aoaData);

    // 3. Set column widths
    worksheet['!cols'] = [
      { wch: 5 },  // NO
      { wch: 25 }, // NAMA SISWA
      { wch: 15 }, // GRADE
      { wch: 35 }, // JUDUL CHAPTER
      { wch: 15 }, // SKILL
      { wch: 18 }, // SKOR TERTINGGI
      { wch: 22 }, // STATUS
      { wch: 25 }, // TANGGAL
    ];

    // 4. Merge cells for title
    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 7 } } // Merge A1:H1
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rekapitulasi Nilai");
    XLSX.writeFile(workbook, `Laporan_Nilai_${Date.now()}.xlsx`);
  };

  const handleExportCSV = () => {
    if (filteredScores.length === 0) return;

    const headers = ["Nama Siswa", "Judul Chapter", "Skill", "Skor Tertinggi", "Tanggal Mengerjakan"];
    const rows = filteredScores.map(score => [
      `"${score.studentName}"`,
      `"${score.chapterTitle}"`,
      `"${score.skill}"`,
      score.highestScore,
      `"${score.completedAt}"`
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
    
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

  return (
    <div className="space-y-6 relative">
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
      <div className="flex flex-col md:flex-row items-center gap-4 bg-surface p-4 rounded-2xl border border-outline-variant shadow-sm flex-wrap">
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
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <div className="relative min-w-[140px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant z-10 text-[18px]">school</span>
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none font-semibold cursor-pointer text-sm"
            >
              <option value="Semua Grade">Semua Grade</option>
              <option value="Grade 3">Grade 3</option>
              <option value="Grade 4">Grade 4</option>
              <option value="Grade 5">Grade 5</option>
              <option value="Grade 6">Grade 6</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
          </div>

          <div className="relative min-w-[160px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant z-10 text-[18px]">auto_stories</span>
            <select
              value={filterChapter}
              onChange={(e) => setFilterChapter(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none font-semibold cursor-pointer text-sm"
            >
              <option value="Semua Chapter">Semua Chapter</option>
              {availableChapters.map(chapter => (
                <option key={chapter} value={chapter}>{chapter}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
          </div>

          <div className="relative min-w-[140px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant z-10 text-[18px]">psychology</span>
            <select
              value={filterSkill}
              onChange={(e) => setFilterSkill(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none font-semibold cursor-pointer text-sm"
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
      <ScoresTable scores={filteredScores} />
    </div>
  );
};
