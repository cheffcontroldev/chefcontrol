import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategory } from '../api';
import type { UpdateCategoryInput } from '../schemas';
import { useUiStore } from '@/stores/uiStore';

type UseUpdateCategoryOptions = {
  resetForm?: () => void;
  onClose?: () => void;
};

export function useUpdateCategory({ resetForm, onClose }: UseUpdateCategoryOptions = {}) {
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateCategoryInput }) =>
      updateCategory(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setShowAlertMessage('success', 'Categoría actualizada exitosamente');
      resetForm?.();
      onClose?.();
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
