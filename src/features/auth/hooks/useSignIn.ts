import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { signIn } from '../api';
import type { SignInInput } from '../schemas';
import { useAuthStore } from '@/stores/authStore';
import { useUiStore } from '@/stores/uiStore';

export function useSignIn() {
  const [, navigate] = useLocation();
  const { setUser } = useAuthStore();
  const { setShowAlertMessage } = useUiStore();

  return useMutation({
    mutationFn: (input: SignInInput) => signIn(input),
    onSuccess: (authUser) => {
      const userForStore = {
        id: authUser.id,
        email: authUser.email,
        name: authUser.name,
        role: authUser.role,
        restaurantId: authUser.restaurantId,
        restaurantName: authUser.restaurantName,
        restaurantAddress: authUser.restaurantAddress,
        restaurantPhone: authUser.restaurantPhone,
      };

      setUser(userForStore);

      navigate('/');
    },
    onError: (error: Error) => {
      if (error.message === 'INCOMPLETE_REGISTRATION') {
        setShowAlertMessage('warning', 'Debes completar tu registro antes de continuar');
        navigate('/completar-registro');
      } else if (error.message === 'Email not confirmed') {
        setShowAlertMessage('error', 'Tu email no ha sido confirmado');
      } else if (error.message === 'Invalid login credentials') {
        setShowAlertMessage('error', 'Credenciales inválidas');
      } else {
        setShowAlertMessage('error', error.message);
      }
    },
  });
}
