"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  points?: number;
  avatarUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = "Learnly",
  showBack = false,
  points = 1240,
  avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuD6fXSv1D7rTkzTA1xnm-JKzpCG4n1-fNisZoVrYGEiwWj0LD-okV2Ka1MyoxiGIwb24cnHjSiSYFXJ8kgoxE9CIxwJtHBZA9dgC4IVOGjAEX5Jkb1mU_ATRzcbGQfmORbRV4InopKjRqReBC30QVEXTpAUJok7B4BVKwmyE-BbaP_Qc9qHphQ8xoxFKU4seodLYKQL7XkwOqJn-mULY7NO6Wceu6oKeV2iSngDhLuNN4mx3iGhust6FB5T218AsjjosfvsWE4jSbs",
}) => {
  const router = useRouter();

  return (
    <header className="bg-background fixed top-0 w-full z-50 h-16 flex justify-between items-center px-margin-mobile border-b-4 border-surface-container-highest">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            onClick={() => router.back()}
            className="tactile-button p-2 rounded-xl bg-surface-container hover:bg-surface-dim transition-colors flex items-center justify-center border-b-2 border-surface-dim cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
        ) : (
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container bg-surface-container-high">
            <img alt="Avatar" className="w-full h-full object-cover" src={avatarUrl} />
          </div>
        )}
        <div className="flex flex-col">
          {!showBack && (
            <span className="font-label text-xs text-on-surface-variant leading-none">
              Halo, Pelajar!
            </span>
          )}
          <span className="font-display font-black text-lg text-primary leading-tight">
            {title}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full border-2 border-surface-container-highest">
        <span className="material-symbols-outlined text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
          stars
        </span>
        <span className="font-label text-sm text-on-surface">{points.toLocaleString()} pts</span>
      </div>
    </header>
  );
};
