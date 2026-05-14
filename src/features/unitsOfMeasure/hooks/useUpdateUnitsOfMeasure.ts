import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUnitOfMeasure } from '../api';
import type { UpdateUnitOfMeasureInput } from '../schemas';
import { useUiStore } from '@/stores/uiStore';
import { useUnitOfMeasureStore } from '../store/UnitOfMeasureStore';

type UseUpdateUnitOfMeasureOptions = {
  resetForm?: () => void;
  onClose?: () => void;
};

export function useUpdateUnitOfMeasure({ resetForm, onClose }: UseUpdateUnitOfMeasureOptions = {}) {
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();
  const { setSelectedUnitOfMeasure } = useUnitOfMeasureStore();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateUnitOfMeasureInput }) =>
      updateUnitOfMeasure(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unitsOfMeasure'] });
      setShowAlertMessage('success', 'Unidad de medida actualizada exitosamente');
      resetForm?.();
      setSelectedUnitOfMeasure(null);
      onClose?.();
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
