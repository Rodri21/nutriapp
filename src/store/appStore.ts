//Example Zustand store for application state management

// import { create } from 'zustand';

// interface AppState {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
//   setSidebarOpen: (open: boolean) => void;
// }

// export const useAppStore = create<AppState>((set) => ({
//   sidebarOpen: false,
//   toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
//   setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
// }));