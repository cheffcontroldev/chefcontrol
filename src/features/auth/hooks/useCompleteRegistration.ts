import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { completeRegistration } from '../api';
import type { CompleteRegistrationFormInput } from '../schemas';
import { useUiStore } from '@/stores/uiStore';

/**
 * TanStack Query mutation that finishes the first-time registration flow.
 *
 * Calls the `create_restaurant_and_user` RPC with the restaurant info and the
 * `authId` / `email` obtained from the URL params.
 *
 * On **success**: shows a success alert and redirects to the login page.
 *
 * On **error**: displays the error message in an alert banner.
 *
 * @param authId - Supabase auth UUID (from the URL query string)
 * @param email - User email (from the URL query string)
 */
export function useCompleteRegistration(authId: string, email: string) {
  const [, navigate] = useLocation();
  const { setShowAlertMessage } = useUiStore();

  return useMutation({
    mutationFn: (formData: CompleteRegistrationFormInput) =>
      completeRegistration({
        ...formData,
        authId,
        email,
      }),
    onSuccess: () => {
      setShowAlertMessage('success', 'Registro completado. Ahora puedes iniciar sesión.');
      navigate('/ingresar');
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
