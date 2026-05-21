import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../api';
import type { CreateProductInput } from '../schemas';
import { useAuthStore } from '@/stores/authStore';
import { useUiStore } from '@/stores/uiStore';

type UseCreateProductOptions = {
  resetForm: () => void;
  onClose?: () => void;
};

/**
 * TanStack Query mutation for creating a new product.
 *
 * On **success**: invalidates `['products']`, resets the form, and calls
 * `onClose`.
 *
 * On **error**: maps the Postgres "rate limit" constraint to a user-friendly
 * message ("El producto ya está registrado").
 */
export function useCreateProduct({ resetForm, onClose }: UseCreateProductOptions) {
  const { user } = useAuthStore();
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();

  const restaurantId = user?.restaurantId;

  return useMutation({
    mutationFn: (input: CreateProductInput) => createProduct(input, restaurantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setShowAlertMessage('success', 'Producto creado exitosamente');
      resetForm();
      onClose?.();
    },
    onError: (error: Error) => {
      if (error.message.includes('product rate limit exceeded')) {
        setShowAlertMessage('error', 'El producto ya está registrado');
        return;
      }
      setShowAlertMessage('error', error.message);
    },
  });
}
