import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMovementEntry } from '../api';
import type { CreateEntryMovement } from '../schemas';
import { useAuthStore } from '@/stores/authStore';
import { useUiStore } from '@/stores/uiStore';

type UseCreateMovementEntryOptions = {
  resetForm: () => void;
};

/**
 * TanStack Query mutation for creating an entry movement.
 *
 * Calls the `register_entry` RPC which creates both a movement record and a
 * new lot atomically.
 *
 * On **success**: invalidates lots, movements, expiring-lots, and low-stock
 * queries.
 */
export function useCreateMovementEntry({ resetForm }: UseCreateMovementEntryOptions) {
  const { user } = useAuthStore();
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateEntryMovement) =>
      createMovementEntry(input, user.restaurantId, user.id),
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
