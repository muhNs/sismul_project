"use client";

import React, { useState, useEffect } from "react";
import { StatCard } from "./components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import api from "@/lib/axios";

interface DashboardStats {
  totalUsers: number;
  totalStudents: number;
  totalQuizzesCompleted: number;
  totalMaterials: number;
}

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalStudents: 0,
    totalQuizzesCompleted: 0,
    totalMaterials: 0,
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function formatRelativeTime(date: Date) {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins} menit yang lalu`;
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    if (diffDays < 7) return `${diffDays} hari yang lalu`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  }

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const [usersRes, materialsRes, scoresRes] = await Promise.all([
          api.get("/api/v1/users"),
          api.get("/api/v1/materials"),
          api.get("/api/v1/scores"),
        ]);

        const users: any[] = usersRes.data.data || usersRes.data;
        const materials: any[] = materialsRes.data.data || materialsRes.data;
        const scores: any[] = scoresRes.data.data || scoresRes.data;

        setStats({
          totalUsers: users.length,
          totalStudents: users.filter((u: any) => u.role === "student").length,
          totalQuizzesCompleted: scores.length,
          totalMaterials: materials.length,
        });

        const activities: any[] = [];
        
        // Map users
        users.forEach((u: any) => {
          activities.push({
            id: `user-${u.id}`,
            type: "user_registered",
            icon: "person_add",
            iconBg: "bg-primary/10 text-primary",
            title: "Pengguna Baru Terdaftar",
            description: `${u.name} mendaftar sebagai ${
              u.role === "ADMIN" ? "Admin" : u.role === "TEACHER" ? "Guru" : "Siswa"
            }.`,
            timestamp: new Date(u.created_at),
          });
        });

        // Map scores
        scores.forEach((s: any) => {
          activities.push({
            id: `score-${s.id}`,
            type: "quiz_completed",
            icon: "assignment_turned_in",
            iconBg: "bg-tertiary/10 text-tertiary",
            title: "Kuis Selesai",
            description: `${s.user?.name || "Siswa"} menyelesaikan kuis ${
              s.material ? `Chapter ${s.material.chapter}` : "materi"
            } dengan skor ${s.score}.`,
            timestamp: new Date(s.created_at),
          });
        });

        // Sort by timestamp desc and take top 5
        activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        setRecentActivities(activities.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-on-surface tracking-tight">Dashboard Overview</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Selamat datang kembali, Superadmin. Berikut ringkasan aplikasi Anda.
          </p>
        </div>
        <div className="bg-surface-container-low px-4 py-2 rounded-xl text-sm font-medium text-on-surface-variant border border-outline-variant/50">
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Pengguna"
          value={isLoading ? "..." : stats.totalUsers.toString()}
          icon="group"
          trend={{ value: "", isPositive: true }}
          colorClass="text-primary"
        />
        <StatCard
          title="Total Siswa"
          value={isLoading ? "..." : stats.totalStudents.toString()}
          icon="school"
          trend={{ value: "", isPositive: true }}
          colorClass="text-tertiary"
        />
        <StatCard
          title="Kuis Selesai"
          value={isLoading ? "..." : stats.totalQuizzesCompleted.toString()}
          icon="quiz"
          trend={{ value: "", isPositive: true }}
          colorClass="text-primary"
        />
        <StatCard
          title="Total Materi"
          value={isLoading ? "..." : stats.totalMaterials.toString()}
          icon="menu_book"
          trend={{ value: "", isPositive: true }}
          colorClass="text-error"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6 bg-surface-container-low border border-outline-variant/30 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-on-surface">Aktivitas Terbaru</h3>
            <span className="text-on-surface-variant text-xs font-semibold">Real-time update</span>
          </div>
          <div className="space-y-4">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-high transition-colors">
                <div className={`w-10 h-10 rounded-full ${act.iconBg} flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-[20px]">{act.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-on-surface break-words">{act.title}</p>
                  <p className="text-xs text-on-surface-variant break-words">{act.description}</p>
                </div>
                <span className="text-xs text-on-surface-variant font-medium flex-shrink-0 whitespace-nowrap">
                  {formatRelativeTime(act.timestamp)}
                </span>
              </div>
            ))}
            {recentActivities.length === 0 && (
              <p className="text-sm text-on-surface-variant text-center py-6">Belum ada aktivitas terbaru.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

