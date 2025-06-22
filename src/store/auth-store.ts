import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { clearTokens } from "@/lib/cookie";
import Cookies from "js-cookie";
import { CookieName } from "@/types";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  // hasCheckedAuth: boolean;
  setTokens: (accessToken: string, refreshToken: string) => void;
  checkAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: !!Cookies.get(CookieName.ACCESS_TOKEN),
      // hasCheckedAuth: false,

      // ✅ Called after login
      setTokens: (accessToken, refreshToken) =>
        set(
          {
            accessToken,
            refreshToken,
            isAuthenticated: true,
          },
          false,
          "auth/setTokens"
        ),

      // ✅ Called on app init (reload/refresh)
      checkAuth: () => {
        const access = Cookies.get(CookieName.ACCESS_TOKEN);
        const refresh = Cookies.get(CookieName.REFRESH_TOKEN);

        if (access && refresh) {
          set(
            {
              accessToken: access,
              refreshToken: refresh,
              // hasCheckedAuth: true,
              isAuthenticated: true,
            },
            false,
            "auth/restore"
          );
        } else {
          set(
            { accessToken: null, refreshToken: null, isAuthenticated: false },
            false,
            "auth/clear"
          );
        }
      },

      logout: () => {
        clearTokens();
        set(
          {
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            // hasCheckedAuth: true,
          },
          false,
          "auth/logout"
        );
        window.location.href = "/login";
      },
    }),
    { name: "AuthStore" }
  )
);
