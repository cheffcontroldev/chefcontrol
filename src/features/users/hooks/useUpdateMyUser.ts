import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMyUser } from '../api';
import type { UpdateUserInput } from '../schemas';
import { useUiStore } from '@/stores/uiStore';

export function useUpdateMyUser() {
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateUserInput) => updateMyUser(input),
    onSuccess: () => {
      setShowAlertMessage('success', 'Usuario actualizado exitosamente');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
