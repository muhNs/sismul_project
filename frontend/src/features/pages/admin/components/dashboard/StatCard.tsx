import React from "react";
import { Card } from "@/components/ui/Card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  colorClass?: string;
}

export const StatCard = ({ title, value, icon, trend, colorClass = "text-primary" }: StatCardProps) => {
  return (
    <Card className="p-6 border border-outline-variant/30 hover:border-outline-variant/80 transition-colors bg-surface-container-low shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">{title}</p>
          <h3 className="text-3xl font-black text-on-surface tracking-tight">{value}</h3>
          
          {trend && (
            <div className={`mt-2 flex items-center gap-1 text-sm font-semibold ${trend.isPositive ? "text-tertiary" : "text-error"}`}>
              <span className="material-symbols-outlined text-[16px]">
                {trend.isPositive ? "trending_up" : "trending_down"}
              </span>
              <span>{trend.value}</span>
              <span className="text-on-surface-variant font-normal ml-1">bulan ini</span>
            </div>
          )}
        </div>
        
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-surface-container-high ${colorClass}`}>
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
      </div>
    </Card>
  );
};
