// src/store/authStore.ts
import { create } from "zustand";
import { getProfile } from "../services/authService"; // assumes /auth/profile API
import { persist } from "zustand/middleware";

interface User {
  email: string;
  fullName: string;
  preferences: string[];
  UserId: string;
  bio?: string;
  experienceLevel?: string;
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
        localStorage.setItem("auth token", token);
        set({ token });
      },

      fetchUser: async () => {
        const token = get().token;
        if (!token) return;

        try {
          const { profile } = await getProfile();
          const response = await getProfile();
          console.log("🟡 getProfile() raw response:", response);

          set({
            user: {
              email: profile.email,
              fullName: profile.fullName,
              preferences: profile.preferences,
              UserId: profile.UserId, // 🟢 map UserId → authorId
              bio: profile.bio,
              experienceLevel: profile.experienceLevel,
            },
          });
          console.log(profile.UserId);
        } catch (err) {
          console.error("❌ Error fetching user profile", err);
          set({ user: null, token: null });
        }
      },

      logout: () => {
        localStorage.removeItem("auth token");
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage", // this saves token & user in localStorage
      partialize: (state) => ({
        token: state.token,
        userId: state.user?.UserId || null,
      }),
    }
  )
);
