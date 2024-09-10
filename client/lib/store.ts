import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "./types";

interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
  token: null | string;
  updateEmail: (email: User["email"]) => void;
  updateName: (name: User["name"]) => void;
  updateContact: (contact: User["contact"]) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      updateEmail: (email: User["email"]) =>
        set((state) => ({
          user: state.user ? { ...state.user, email } : null,
        })),
      updateName: (name: User["name"]) =>
        set((state) => ({
          user: state.user ? { ...state.user, name } : null,
        })),
      updateContact: (contact: User["contact"]) =>
        set((state) => ({
          user: state.user ? { ...state.user, contact } : null,
        })),
      setToken: (token: string) => set(() => ({ token })),
      logout: () =>
        set(() => ({ isAuthenticated: false, user: null, token: null })),
    }),
    {
      name: "auth",
    }
  )
);
