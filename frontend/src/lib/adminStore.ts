import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/features/auth/types";

interface AdminState {
  adminUser: User | null;
  _hasHydrated: boolean;
  setAdminAuth: (user: User) => void;
  adminLogout: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      adminUser: null,
      _hasHydrated: false,
      setAdminAuth: (user) => set({ adminUser: user }),
      adminLogout: () => set({ adminUser: null }),
      setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),
    }),
    {
      name: "learnly-admin-storage",
      onRehydrateStorage: () => (state) => {
        // Dipanggil setelah data berhasil dibaca dari localStorage
        state?.setHasHydrated(true);
      },
    }
  )
);
