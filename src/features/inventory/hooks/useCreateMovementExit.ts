import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMovementExit } from '../api';
import type { CreateExitMovement } from '../schemas';
import { useAuthStore } from '@/stores/authStore';
import { useUiStore } from '@/stores/uiStore';

type UseCreateMovementExitOptions = {
  resetForm: () => void;
};

/**
 * TanStack Query mutation for creating an exit movement.
 *
 * Calls the `register_exit` RPC which consumes stock from available lots
 * (FIFO) and creates a movement record.
 *
 * On **success**: invalidates lots, movements, expiring-lots, and low-stock
 * queries.
 */
export function useCreateMovementExit({ resetForm }: UseCreateMovementExitOptions) {
  const { user } = useAuthStore();
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateExitMovement) =>
      createMovementExit(input, user.restaurantId, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lots'] });
      queryClient.invalidateQueries({ queryKey: ['movements'] });
      queryClient.invalidateQueries({ queryKey: ['expiring_lots'] });
      queryClient.invalidateQueries({ queryKey: ['low_stock'] });
      setShowAlertMessage('success', 'Movimiento creado exitosamente');
      resetForm();
    },
    onError: (error: Error) => {
      console.error(error.message);
      setShowAlertMessage('error', error.message);
    },
  });
}
