import { create } from 'zustand';

interface AuthState {
  user: { id: string; email: string; role: string; restaurantId: string } | null;
}

interface AuthActions {
  setUser: (user: AuthState['user']) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
