import React from "react";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  return (
    <header className="h-16 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2 md:gap-4">
        {/* Hamburger Menu (Mobile Only) */}
        <button 
          className="lg:hidden p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-full transition-colors flex items-center justify-center"
          onClick={onMenuClick}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Optional Search or Breadcrumbs could go here */}
        <div className="relative hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
            search
          </span>
          <input
            type="text"
            placeholder="Cari sesuatu..."
            className="pl-10 pr-4 py-2 bg-surface-container rounded-full text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64 text-on-surface"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="w-10 h-10 rounded-full hover:bg-surface-container-highest flex items-center justify-center text-on-surface-variant transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-outline-variant mx-1 md:mx-2 hidden sm:block"></div>
        
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-on-surface">Admin Utama</p>
            <p className="text-xs text-on-surface-variant">Superadmin</p>
          </div>
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary-container text-primary font-bold flex items-center justify-center border border-primary/20 text-sm md:text-base">
            A
          </div>
        </div>
      </div>
    </header>
  );
};
