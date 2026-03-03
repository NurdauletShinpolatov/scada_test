import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  isAuthorized: boolean
  user?: { name: string; role?: string }
  login: (name: string) => void
  logout: () => void
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuthorized: false,
      user: undefined,

      login: (name: string) =>
        set(() => ({
          isAuthorized: true,
          user: { name },
        })),

      logout: () =>
        set(() => ({
          isAuthorized: false,
          user: undefined,
        })),
    }),
    {
      name: "auth-storage",
    }
  )
)