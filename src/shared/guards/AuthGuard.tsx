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
  const [, navigate] = useLocation();
  const { isLoading, setUser, clearUser, setLoading } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      const path = window.location.pathname;
      if (PUBLIC_ROUTES.includes(path)) return;

      setLoading(true);

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const isAuthInSupabase = !!session?.user;
        const currentUser = await getCurrentUser();
        const hasCompleteRegistration = !!currentUser;

        if (hasCompleteRegistration) {
          setUser({
            id: currentUser.id,
            email: currentUser.email,
            role: currentUser.role,
            restaurantId: currentUser.restaurantId,
          });
          if (SEMI_PROTECTED_ROUTES.includes(path)) {
            navigate('/');
          }
        } else if (isAuthInSupabase) {
          if (!SEMI_PROTECTED_ROUTES.includes(path)) {
            navigate('/completar-registro');
          }
        } else {
          clearUser();
          navigate('/ingresar');
        }
      } catch {
        clearUser();
        navigate('/ingresar');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, setUser, clearUser, setLoading]);

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
