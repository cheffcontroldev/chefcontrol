import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUnitOfMeasure } from '../api';
import { useUiStore } from '@/stores/uiStore';

export function useDeleteUnitOfMeasure() {
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteUnitOfMeasure(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unitsOfMeasure'] });
      setShowAlertMessage('success', 'Unidad de medida eliminada exitosamente');
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
