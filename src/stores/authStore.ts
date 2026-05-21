import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Authenticated user data persisted from Supabase auth and the profiles/restaurants
 * database tables.
 */
export interface AuthUser {
  /** UUID from Supabase auth.users */
  id: string;
  /** User email address */
  email: string;
  /** Display name */
  name: string;
  /** User role (admin, owner, employee, etc.) */
  role: string;
  /** UUID of the restaurant the user belongs to */
  restaurantId: string;
  /** Display name of the restaurant */
  restaurantName: string;
  /** Optional restaurant address */
  restaurantAddress?: string;
  /** Optional restaurant phone number */
  restaurantPhone?: string;
}

/**
 * Internal authentication state slice.
 * @hidden - Used internally by the store, not meant for direct consumption.
 */
interface AuthState {
  /** Current authenticated user or null when logged out */
  user: AuthUser | null;
  /** Whether an auth check or login is in progress */
  isLoading: boolean;
  /** Derived boolean: true when `user` is not null */
  isAuthenticated: boolean;
}

/**
 * Actions available to modify the authentication state.
 * @hidden
 */
interface AuthActions {
  /**
   * Set the current user. Passing `null` logs the user out.
   * Also updates `isAuthenticated` and stops the loading state.
   */
  setUser: (user: AuthUser | null) => void;
  /** Toggle the loading state, e.g. during initial session check */
  setLoading: (loading: boolean) => void;
  /**
   * Clear all auth data: user, isAuthenticated, and loading state.
   * Equivalent to a full logout reset.
   */
  clearUser: () => void;
}

/**
 * Zustand store that manages authentication state across the application.
 *
 * Wraps Zustand's {@link https://docs.pmnd.rs/zustand/integrations/persisting-store | persist}
 * middleware backed by `localStorage`. Only `user` and `isAuthenticated` are persisted;
 * `isLoading` is ephemeral and resets on page reload.
 *
 * @example
 * ```ts
 * const { user, isAuthenticated, setUser, clearUser } = useAuthStore();
 *
 * // On login success
 * setUser({ id, email, name, role, restaurantId, restaurantName });
 *
 * // On logout
 * clearUser();
 * ```
 */
export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
      setLoading: (loading) => set({ isLoading: loading }),
      clearUser: () => set({ user: null, isAuthenticated: false, isLoading: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
