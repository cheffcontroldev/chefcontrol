import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUnitOfMeasure } from '../api';
import type { CreateUnitOfMeasureInput } from '../schemas';
import { useAuthStore } from '@/stores/authStore';
import { useUiStore } from '@/stores/uiStore';

type UseCreateUnitOfMeasureOptions = {
  resetForm: () => void;
  onClose?: () => void;
};

/**
 * TanStack Query mutation for creating a new unit of measure.
 *
 * On **success**: invalidates `['unitsOfMeasure']`, resets the form, and calls
 * `onClose`.
 *
 * On **error**: maps the Postgres "rate limit" constraint to a user-friendly
 * message ("La unidad de medida ya está registrada").
 */
export function useCreateUnitOfMeasure({ resetForm, onClose }: UseCreateUnitOfMeasureOptions) {
  const { user } = useAuthStore();
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();

  const restaurantId = user?.restaurantId;

  return useMutation({
    mutationFn: (input: CreateUnitOfMeasureInput) => {
      if (!restaurantId) throw new Error('No authenticated');
      return createUnitOfMeasure(input, restaurantId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unitsOfMeasure'] });
      setShowAlertMessage('success', 'Unidad de medida creada exitosamente');
      resetForm();
      onClose?.();
    },
    onError: (error: Error) => {
      if (error.message.includes('unit of measure rate limit exceeded')) {
        setShowAlertMessage('error', 'La unidad de medida ya está registrada');
        return;
      }
      setShowAlertMessage('error', error.message);
    },
  });
}
