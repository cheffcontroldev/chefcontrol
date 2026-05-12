import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { signUp } from '../api';
import type { SignUpInput } from '../schemas';

export function useSignUp() {
  const [, navigate] = useLocation();

  return useMutation({
    mutationFn: (input: SignUpInput) => signUp(input),
    onSuccess: () => {
      navigate('/ingresar/');
    },
    onError: (error: Error) => {
      console.error('Error al registrar usuario', error.message);
    },
  });
}
