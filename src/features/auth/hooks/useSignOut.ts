import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { signOut } from '../api';
import { useAuthStore } from '@/stores/authStore';
import { useUiStore } from '@/stores/uiStore';

/**
 * TanStack Query mutation that signs the user out.
 *
 * On **success**: clears the auth store, shows a success alert, and navigates
 * to the login page (`/ingresar`).
 *
 * On **error**: displays the error message in an alert banner.
 */
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
