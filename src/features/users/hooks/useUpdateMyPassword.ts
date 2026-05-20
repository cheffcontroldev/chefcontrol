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
      if (error.message.includes('New password should be different from the old password')) {
        setShowAlertMessage('error', 'La nueva contraseña no puede ser la misma que la actual');
      } else {
        setShowAlertMessage('error', error.message);
      }
    },
  });
}
