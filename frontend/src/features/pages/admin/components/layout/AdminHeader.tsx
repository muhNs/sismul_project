import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useAdminStore } from "@/lib/adminStore";
import api from "@/lib/axios";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  const router = useRouter();
  const adminLogout = useAdminStore((state) => state.adminLogout);
  const user = useAdminStore((state) => state.adminUser);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const adminName = user?.name || "Admin Utama";
  const adminInitial = adminName.charAt(0).toUpperCase();
  const adminRoleName = user?.role === "ADMIN" ? "Superadmin" : user?.role === "TEACHER" ? "Guru / Pengajar" : "Admin";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = async () => {
    try {
      await api.post("/api/v1/auth/logout");
    } catch (err) {
      console.error("Gagal logout admin di backend:", err);
    } finally {
      adminLogout();
      setIsLogoutModalOpen(false);
      router.push("/admin/login");
    }
  };

  return (
    <>
      <style>{`
        @keyframes dropdownSlide {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dropdown-animate {
          animation: dropdownSlide 0.2s ease-out forwards;
        }
      `}</style>
      
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

        <div className="flex items-center gap-2 md:gap-4 relative" ref={dropdownRef}>
          <button className="w-10 h-10 rounded-full hover:bg-surface-container-highest flex items-center justify-center text-on-surface-variant transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>
          
          <div className="h-8 w-[1px] bg-outline-variant mx-1 md:mx-2 hidden sm:block"></div>
          
          {/* Profile Trigger */}
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-on-surface">{adminName}</p>
              <p className="text-xs text-on-surface-variant">{adminRoleName}</p>
            </div>
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary-container text-primary font-bold flex items-center justify-center border border-primary/20 text-sm md:text-base">
              {adminInitial}
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-outline-variant rounded-2xl shadow-lg z-50 dropdown-animate overflow-hidden">
              <div className="px-4 py-3 border-b border-outline-variant/30 sm:hidden bg-surface-container-lowest">
                <p className="text-sm font-semibold text-on-surface">{adminName}</p>
                <p className="text-xs text-on-surface-variant">{adminRoleName}</p>
              </div>

              <div className="p-2 space-y-1">
                <button 
                  className="w-full text-left px-3 py-2 text-sm text-on-surface hover:bg-surface-container-high rounded-xl transition-colors flex items-center gap-3 font-medium"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    router.push("/admin/profile");
                  }}
                >
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">person</span>
                  Profil Saya
                </button>
                <button 
                  className="w-full text-left px-3 py-2 text-sm text-on-surface hover:bg-surface-container-high rounded-xl transition-colors flex items-center gap-3 font-medium"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    router.push("/admin/profile");
                  }}
                >
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">settings</span>
                  Pengaturan Akun
                </button>
                <button 
                  className="w-full text-left px-3 py-2 text-sm text-on-surface hover:bg-surface-container-high rounded-xl transition-colors flex items-center gap-3 font-medium"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    router.push("/admin/profile");
                  }}
                >
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">lock</span>
                  Ubah Password
                </button>
              </div>

              <div className="p-2 border-t border-outline-variant/30 bg-surface-container-lowest">
                <button 
                  onClick={handleLogoutClick}
                  className="w-full text-left px-3 py-2.5 text-sm font-bold text-error hover:bg-error-container hover:text-error rounded-xl transition-colors flex items-center gap-3"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modal Delete Confirmation */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Keluar dari aplikasi?"
      >
        <div className="space-y-6">
          <p className="text-on-surface-variant">Apakah Anda yakin ingin keluar dari akun admin?</p>
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 border-t border-outline-variant/30 pt-4">
            <Button variant="outline" onClick={() => setIsLogoutModalOpen(false)}>
              Batal
            </Button>
            <button
              onClick={confirmLogout}
              className="px-6 py-2.5 rounded-xl font-bold transition-all duration-200 bg-error text-on-error hover:bg-error/90 active:scale-95 shadow-sm"
            >
              Keluar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
