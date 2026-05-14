import { useMutation } from '@tanstack/react-query';
import { updateMyPassword } from '../api';
import type { UpdateMyPasswordInput } from '../types';
import { useUiStore } from '@/stores/uiStore';

export function useUpdateMyPassword() {
  const { setShowAlertMessage } = useUiStore();

  return useMutation({
    mutationFn: (password: UpdateMyPasswordInput['password']) => updateMyPassword(password),
    onSuccess: () => {
      setShowAlertMessage('success', 'Contraseña actualizada exitosamente');
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
