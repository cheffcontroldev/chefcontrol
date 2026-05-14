import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../api';
import type { CreateUserInput } from '../schemas';
import { useAuthStore } from '@/stores/authStore';
import { useUiStore } from '@/stores/uiStore';

type UseCreateUserOptions = {
  resetForm: () => void;
  onClose?: () => void;
};

export function useCreateUser({ resetForm, onClose }: UseCreateUserOptions) {
  const { user } = useAuthStore();
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();

  const restaurantId = user?.restaurantId;

  return useMutation({
    mutationFn: (input: CreateUserInput) => createUser(input, restaurantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setShowAlertMessage('success', 'Usuario creado exitosamente');
      resetForm();
      onClose?.();
    },
    onError: (error: Error) => {
      if (error.message.includes('email rate limit exceeded')) {
        setShowAlertMessage('error', 'El email ya está registrado');
        return;
      }
      setShowAlertMessage('error', error.message);
    },
  });
}
