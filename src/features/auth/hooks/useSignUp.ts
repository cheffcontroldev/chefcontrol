import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { signUp } from '../api';
import type { AuthSignUpInput } from '../schemas';
import { useUiStore } from '@/stores/uiStore';

/**
 * TanStack Query mutation that creates a new Supabase Auth user.
 *
 * On **success**: redirects to `/completar-registro?authId=...&email=...` with
 * the new user's credentials so they can finish setting up their restaurant.
 *
 * On **error**: displays the error message in an alert banner.
 */
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
