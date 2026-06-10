import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLogout } from "@/features/auth/hooks/useLogout";

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const AdminSidebar = ({ isOpen, setIsOpen }: AdminSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { mutate: logout, isPending } = useLogout();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: "dashboard" },
    { name: "Manajemen User", href: "/admin/users", icon: "group" },
    { name: "Kelola Kosakata", href: "/admin/vocabularies", icon: "menu_book" },
    { name: "Kelola Materi", href: "/admin/materials", icon: "auto_stories" },
    { name: "Kelola Kuis", href: "/admin/quizzes", icon: "quiz" },
    { name: "Laporan Nilai", href: "/admin/scores", icon: "bar_chart" },
  ];

  // Temporary Logout Handler
  const handleLogout = () => {
    logout();
  };

  // Close sidebar on navigation on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 lg:w-64 bg-surface-container-low border-r border-outline-variant flex flex-col h-full shadow-2xl lg:shadow-none transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between lg:justify-start gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-xl">admin_panel_settings</span>
            </div>
            <h2 className="text-xl font-black text-primary tracking-tight">
              Learnly Admin
            </h2>
          </div>
          {/* Close button on mobile */}
          <button 
            className="lg:hidden p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary-container text-on-primary-container shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <span className={`material-symbols-outlined ${isActive ? "fill-icon" : ""}`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button Section */}
        <div className="p-4 border-t border-outline-variant">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-error hover:bg-error/10 w-full transition-all duration-200 active:scale-95"
          >
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};