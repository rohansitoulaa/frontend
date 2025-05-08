import { create } from "zustand";

type ThemeState ={
    theme: "dark" |"light"
    toggleTheme: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: 'light',
    toggleTheme: () =>
      set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    setTheme: (theme) => set({ theme })
  }));
  