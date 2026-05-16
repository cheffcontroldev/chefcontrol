import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMovementEntry } from '../api';
import type { CreateEntryMovement } from '../schemas';
import { useAuthStore } from '@/stores/authStore';
import { useUiStore } from '@/stores/uiStore';

type UseMovementEntryOptions = {
  onClose?: () => void;
};

export function useMovementEntry({ onClose }: UseMovementEntryOptions) {
  const { user } = useAuthStore();
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();

  const restaurantId = user?.restaurantId;

  return useMutation({
    mutationFn: (input: CreateEntryMovement) => createMovementEntry(input, restaurantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movements'] });
      setShowAlertMessage('success', 'Movimiento creado exitosamente');
      onClose?.();
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
