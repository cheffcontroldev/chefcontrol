import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategory } from '../api';
import type { UpdateCategoryInput } from '../schemas';
import { useUiStore } from '@/stores/uiStore';
import { useCategoryStore } from '../store/CategoryStore';

type UseUpdateCategoryOptions = {
  resetForm?: () => void;
  onClose?: () => void;
};

export function useUpdateCategory({ resetForm, onClose }: UseUpdateCategoryOptions = {}) {
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();
  const { setSelectedCategory } = useCategoryStore();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateCategoryInput }) =>
      updateCategory(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['categories_count'] });
      setShowAlertMessage('success', 'Categoría actualizada exitosamente');
      resetForm?.();
      setSelectedCategory(null);
      onClose?.();
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
