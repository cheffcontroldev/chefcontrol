import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory } from '../api';
import { useUiStore } from '@/stores/uiStore';

export function useDeleteCategory() {
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setShowAlertMessage('success', 'Categoría eliminada exitosamente');
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
