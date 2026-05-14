import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../api';
import type { CreateUserInput } from '../schemas';
import { useAuthStore } from '@/stores/authStore';
import { useUiStore } from '@/stores/uiStore';

export function useSignIn() {
  const { user } = useAuthStore();
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();

  const restaurantId = user?.restaurantId;

  return useMutation({
    mutationFn: (input: CreateUserInput) => createUser(input, restaurantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setShowAlertMessage('success', 'Usuario creado exitosamente');
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
