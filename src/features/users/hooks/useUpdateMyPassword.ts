import { useMutation } from '@tanstack/react-query';
import { updateMyPassword } from '../api';
import type { UpdateMyPasswordInput } from '../types';
import { useUiStore } from '@/stores/uiStore';

/**
 * TanStack Query mutation that updates the current user's password.
 *
 * On **success**: shows a success alert.
 *
 * On **error**: maps the Supabase "same password" error to a user-friendly
 * Spanish message; all other errors are shown as-is.
 */
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
