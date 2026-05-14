import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory } from '../api';
import type { CreateCategoryInput } from '../schemas'; // ← importa el tipo inferido
import { useAuthStore } from '@/stores/authStore';
import { useUiStore } from '@/stores/uiStore';

type UseCreateCategoryOptions = {
  resetForm: () => void;
  onClose?: () => void;
};

export function useCreateCategory({ resetForm, onClose }: UseCreateCategoryOptions) {
  const { user } = useAuthStore();
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();

  const restaurantId = user?.restaurantId;

  return useMutation({
    mutationFn: (input: CreateCategoryInput) => createCategory(input, restaurantId), // ← usa el tipo inferido
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
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
