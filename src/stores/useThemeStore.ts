import { create } from "zustand";

type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

// Helper function to get theme from localStorage
const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light"; // SSR safety
  const storedTheme = localStorage.getItem("theme");
  return storedTheme === "dark" ? "dark" : "light"; // default to light
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    }),
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));
