import React from "react";
import { StatCard } from "./components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { dummyUsers } from "./data/users";

export const AdminDashboardPage = () => {
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
          value={dummyUsers.length.toString()} 
          icon="group"
          trend={{ value: "+12%", isPositive: true }}
          colorClass="text-primary"
        />
        <StatCard 
          title="Sesi Belajar" 
          value="1,240" 
          icon="menu_book"
          trend={{ value: "+8%", isPositive: true }}
          colorClass="text-tertiary"
        />
        <StatCard 
          title="Kuis Selesai" 
          value="3,890" 
          icon="quiz"
          trend={{ value: "+24%", isPositive: true }}
          colorClass="text-primary"
        />
        <StatCard 
          title="Pendapatan (Koin)" 
          value="12K" 
          icon="monetization_on"
          trend={{ value: "-2%", isPositive: false }}
          colorClass="text-error"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 p-6 bg-surface-container-low border border-outline-variant/30 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-on-surface">Aktivitas Terbaru</h3>
            <button className="text-primary text-sm font-semibold hover:underline">Lihat Semua</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-high transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary-container text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-on-surface break-words">Pengguna Baru Terdaftar</p>
                  <p className="text-xs text-on-surface-variant break-words">Budi Santoso menyelesaikan pendaftaran.</p>
                </div>
                <span className="text-xs text-on-surface-variant font-medium flex-shrink-0 whitespace-nowrap">{i * 2} jam yang lalu</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-1 p-6 bg-surface-container-low border border-outline-variant/30 shadow-sm">
          <h3 className="font-bold text-on-surface mb-6">Status Sistem</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-xl bg-surface-container-high border border-outline-variant/50">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary">dns</span>
                <span className="text-sm font-semibold text-on-surface">Database</span>
              </div>
              <span className="px-2 py-1 rounded-md bg-tertiary/10 text-tertiary text-xs font-bold">Online</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-surface-container-high border border-outline-variant/50">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary">cloud</span>
                <span className="text-sm font-semibold text-on-surface">Storage</span>
              </div>
              <span className="px-2 py-1 rounded-md bg-tertiary/10 text-tertiary text-xs font-bold">Online</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-surface-container-high border border-outline-variant/50">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-error">api</span>
                <span className="text-sm font-semibold text-on-surface">Payment API</span>
              </div>
              <span className="px-2 py-1 rounded-md bg-error/10 text-error text-xs font-bold">Gangguan</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
