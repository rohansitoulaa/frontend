// src/store/authStore.ts
import { create } from "zustand";
import { getProfile } from "../services/authService"; // assumes /auth/profile API
import { persist } from "zustand/middleware";

interface User {
  email: string;
  fullName: string;
  preferences:string[];
}

interface AuthStore {
  user: User | null;
  token: string | null;
  setToken: (token: string) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      setToken: (token: string) => {
        set({ token });
      },

      fetchUser: async () => {
        const token = get().token;
        if (!token) return;

        try {
            const { profile } = await getProfile(); // hit /auth/profile
          
          set({  user: profile });
        } catch (err) {
          console.error("❌ Error fetching user profile", err);
          set({ user: null, token: null });
        }
      },

      logout: () => {
        localStorage.removeItem("authToken");
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage", // this saves token & user in localStorage
      partialize: (state) => ({ token: state.token }), // only persist token
    }
  )
);
