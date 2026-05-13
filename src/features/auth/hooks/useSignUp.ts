// features/auth/hooks/useSignUp.ts
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { signUp } from '../api';
import type { AuthSignUpInput } from '../schemas';
import { useUiStore } from '@/stores/uiStore';

export function useSignUp() {
  const [, navigate] = useLocation();
  const { setShowAlertMessage } = useUiStore();

  return useMutation({
    mutationFn: (input: AuthSignUpInput) => signUp(input),
    onSuccess: (data) => {
      // Redirigir a completar registro con el authId
      navigate(`/completar-registro?authId=${data.userId}&email=${encodeURIComponent(data.email)}`);
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
