import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { getCurrentUser } from '@/features/auth/api';

/**
 * Hook that checks and maintains authentication state.
 * @description On mount, attempts to load the current user session.
 * Updates the authStore with user data or clears it if not authenticated.
 *
 * @returns An object containing:
 * - user: The current user object or null
 * - isAuthenticated: Whether the user is logged in
 * - isLoading: Whether the auth check is in progress
 *
 * @example
 * ```tsx
 * const { user, isLoading } = useAuthGuard();
 * if (isLoading) return <Spinner />;
 * return <div>Welcome {user?.name}</div>;
 * ```
 */
export function useAuthGuard() {
  const { user, isAuthenticated, isLoading, setUser, setLoading, clearUser } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);

      try {
        const currentUser = await getCurrentUser();

        if (currentUser) {
          setUser({
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            role: currentUser.role,
            restaurantId: currentUser.restaurantId,
            restaurantName: currentUser.restaurantName,
          });
        } else {
          clearUser();
        }
      } catch {
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser, clearUser, setLoading]);

  return { user, isAuthenticated, isLoading };
}
