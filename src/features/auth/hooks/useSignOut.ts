// features/auth/hooks/useSignOut.ts
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { signOut } from '../api';
import { useAuthStore } from '@/stores/authStore';
import { useUiStore } from '@/stores/uiStore';

export function useSignOut() {
  const [, navigate] = useLocation();
  const { clearUser } = useAuthStore();
  const { setShowAlertMessage } = useUiStore();

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      clearUser();
      setShowAlertMessage('success', 'Sesión cerrada correctamente');
      navigate('/ingresar');
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
