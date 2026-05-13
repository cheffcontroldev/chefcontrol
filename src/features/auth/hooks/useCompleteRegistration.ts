// features/auth/hooks/useCompleteRegistration.ts
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { completeRegistration } from '../api';
import type { CompleteRegistrationFormInput } from '../schemas';
import { useUiStore } from '@/stores/uiStore';

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
