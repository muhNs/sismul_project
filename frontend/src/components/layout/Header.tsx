"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { dummyUser } from "@/lib/dummy-data";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  points?: number;
  avatarUrl?: string;
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = "Learnly",
  showBack = false,
  points = 1240,
  avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${dummyUser.username}`,
  userName = dummyUser.name,
}) => {
  const router = useRouter();

  return (
    <header className="bg-background fixed top-0 w-full z-50 h-16 flex justify-between items-center px-margin-mobile border-b-4 border-surface-container-highest">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="tactile-button p-2 rounded-xl bg-surface-container hover:bg-surface-dim transition-colors flex items-center justify-center border-b-2 border-surface-dim cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
        )}
        <div className="flex items-center gap-2">
          {!showBack && (
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6fXSv1D7rTkzTA1xnm-JKzpCG4n1-fNisZoVrYGEiwWj0LD-okV2Ka1MyoxiGIwb24cnHjSiSYFXJ8kgoxE9CIxwJtHBZA9dgC4IVOGjAEX5Jkb1mU_ATRzcbGQfmORbRV4InopKjRqReBC30QVEXTpAUJok7B4BVKwmyE-BbaP_Qc9qHphQ8xoxFKU4seodLYKQL7XkwOqJn-mULY7NO6Wceu6oKeV2iSngDhLuNN4mx3iGhust6FB5T218AsjjosfvsWE4jSbs" 
              alt="Learnly Logo" 
              className="w-8 h-8 object-contain"
            />
          )}
          <span className="font-display font-black text-xl text-primary leading-tight">
            {title}
          </span>
        </div>
      </div>

      <div 
        onClick={() => router.push('/profile')}
        className="flex items-center gap-2 bg-surface-container-low pl-3 pr-1.5 py-1.5 rounded-full border-2 border-surface-container-highest cursor-pointer hover:bg-surface-container transition-colors"
      >
        <div className="flex flex-col items-end">
          <span className="font-label text-[10px] text-on-surface-variant font-bold leading-none mb-0.5">
            {userName}
          </span>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-tertiary-container text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              stars
            </span>
            <span className="font-label text-xs font-bold text-on-surface leading-none">
              {points.toLocaleString('id-ID')} pts
            </span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full overflow-hidden bg-primary-container border border-surface-dim shrink-0">
          <img alt="Avatar" className="w-full h-full object-cover" src={avatarUrl} />
        </div>
      </div>
    </header>
  );
};

