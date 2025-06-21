import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { clearTokens } from "@/lib/cookie";

interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      isAuthenticated: false,
      setAuthenticated: (value) =>
        set({ isAuthenticated: value }, false, "auth/setAuthenticated"),
      logout: () => {
        clearTokens();
        set({ isAuthenticated: false }, false, "auth/logout");
        window.location.href = "/login";
      },
    }),
    { name: "AuthStore" }
  )
);
