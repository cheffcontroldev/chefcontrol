import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { signUp } from '../api';
import type { SignUpInput } from '../schemas';
import { useUiStore } from '@/stores/uiStore';

export function useSignUp() {
  const [, navigate] = useLocation();
  const { setShowAlertMessage } = useUiStore();

  return useMutation({
    mutationFn: (input: SignUpInput) => signUp(input),
    onSuccess: () => {
      setShowAlertMessage(
        'success',
        'Usuario registrado exitosamente, revisa tu correo para confirmar tu cuenta'
      );
      navigate('/ingresar/');
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
