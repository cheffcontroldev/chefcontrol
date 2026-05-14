import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUnitOfMeasure } from '../api';
import type { CreateUnitOfMeasureInput } from '../schemas'; // ← importa el tipo inferido
import { useAuthStore } from '@/stores/authStore';
import { useUiStore } from '@/stores/uiStore';

type UseCreateUnitOfMeasureOptions = {
  resetForm: () => void;
  onClose?: () => void;
};

export function useCreateUnitOfMeasure({ resetForm, onClose }: UseCreateUnitOfMeasureOptions) {
  const { user } = useAuthStore();
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();

  const restaurantId = user?.restaurantId;

  return useMutation({
    mutationFn: (input: CreateUnitOfMeasureInput) => createUnitOfMeasure(input, restaurantId), // ← usa el tipo inferido
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
