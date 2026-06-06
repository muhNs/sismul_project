import Link from "next/link";
import { usePathname } from "next/navigation";

export const AdminSidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: "dashboard" },
    { name: "Manajemen User", href: "/admin/users", icon: "group" },
    { name: "Kelola Kosakata", href: "/admin/vocabularies", icon: "menu_book" },
    { name: "Kelola Materi", href: "/admin/materials", icon: "auto_stories" },
    { name: "Kelola Kuis", href: "/admin/quizzes", icon: "quiz" },
    { name: "Laporan Nilai", href: "/admin/scores", icon: "bar_chart" },
  ];

  return (
    <aside className="w-64 bg-surface-container-low border-r border-outline-variant flex flex-col h-full shadow-sm">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary text-xl">admin_panel_settings</span>
        </div>
        <h2 className="text-xl font-black text-primary tracking-tight">
          Learnly Admin
        </h2>
      </div>
      
      <nav className="flex-1 px-4 py-2 space-y-2">
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

      <div className="p-4 border-t border-outline-variant">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-error hover:bg-error-container rounded-xl transition-colors font-medium"
        >
          <span className="material-symbols-outlined">logout</span>
          Keluar ke App
        </Link>
      </div>
    </aside>
  );
};
