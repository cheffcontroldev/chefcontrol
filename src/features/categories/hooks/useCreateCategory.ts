import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory } from '../api';
import type { CreateCategoryInput } from '../schemas';
import { useAuthStore } from '@/stores/authStore';
import { useUiStore } from '@/stores/uiStore';

type UseCreateCategoryOptions = {
  resetForm: () => void;
  onClose?: () => void;
};

/**
 * TanStack Query mutation for creating a new category.
 *
 * On **success**: invalidates `['categories']` + `['categories_count']`,
 * resets the form, and calls `onClose`.
 *
 * On **error**: maps the Postgres "rate limit" constraint to a user-friendly
 * message ("La categoría ya está registrada").
 */
export function useCreateCategory({ resetForm, onClose }: UseCreateCategoryOptions) {
  const { user } = useAuthStore();
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();

  const restaurantId = user?.restaurantId;

  return useMutation({
    mutationFn: (input: CreateCategoryInput) => {
      if (!restaurantId) throw new Error('No authenticated');
      return createCategory(input, restaurantId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['categories_count'] });
      setShowAlertMessage('success', 'Categoría creada exitosamente');
      resetForm();
      onClose?.();
    },
    onError: (error: Error) => {
      if (error.message.includes('category rate limit exceeded')) {
        setShowAlertMessage('error', 'La categoría ya está registrada');
        return;
      }
      setShowAlertMessage('error', error.message);
    },
  });
}
