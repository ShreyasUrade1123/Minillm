import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface AppState {
  theme: Theme
  sidebarOpen: boolean
  setTheme: (theme: Theme) => void
  toggleSidebar: () => void
  setSidebarOpen: (isOpen: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'system',
      sidebarOpen: true,
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
    }),
    {
      name: 'app-storage',
      // Only persist the theme, not sidebar state
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
)
