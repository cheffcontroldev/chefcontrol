import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { getCurrentUser } from '@/features/auth/api';

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
