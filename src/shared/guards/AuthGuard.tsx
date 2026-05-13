/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '@/stores/authStore';
import { getCurrentUser } from '@/features/auth/api';
import { supabase } from '@/supabase/client';
import Layout from '@/shared/components/Layout';
import InitialLayout from '@/shared/components/InitialLayout';

const PUBLIC_ROUTES = ['/ingresar', '/registrarse'];
const SEMI_PROTECTED_ROUTES = ['/completar-registro'];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
  const { user, isAuthenticated, isLoading, setUser, clearUser, setLoading } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      const path = window.location.pathname;

      if (PUBLIC_ROUTES.includes(path)) {
        setLoading(false);
        return;
      }

      if (isAuthenticated && user && user.restaurantId) {
        if (SEMI_PROTECTED_ROUTES.includes(path)) {
          navigate('/');
        }
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          clearUser();

          if (!PUBLIC_ROUTES.includes(path)) {
            navigate('/ingresar');
          }
          setLoading(false);
          return;
        }

        const currentUser = await getCurrentUser();

        if (currentUser) {
          setUser({
            id: currentUser.id,
            email: currentUser.email,
            name: currentUser.name,
            role: currentUser.role,
            restaurantId: currentUser.restaurantId,
            restaurantName: currentUser.restaurantName,
            restaurantAddress: currentUser.restaurantAddress,
            restaurantPhone: currentUser.restaurantPhone,
          });

          if (SEMI_PROTECTED_ROUTES.includes(path)) {
            navigate('/');
          }
        } else {
          clearUser();

          if (!SEMI_PROTECTED_ROUTES.includes(path)) {
            navigate('/completar-registro');
          }
        }
      } catch (error) {
        console.error('💥 Error:', error);
        clearUser();
        navigate('/ingresar');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [location]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const path = window.location.pathname;
  const showLayout = !PUBLIC_ROUTES.includes(path) && !SEMI_PROTECTED_ROUTES.includes(path);

  return showLayout ? <Layout>{children}</Layout> : <InitialLayout>{children}</InitialLayout>;
}
