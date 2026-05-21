import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../api';
import type { UpdateProductInput } from '../schemas';
import { useUiStore } from '@/stores/uiStore';
import { useProductStore } from '../store/ProductStore';

type UseUpdateProductOptions = {
  resetForm?: () => void;
  onClose?: () => void;
};

/**
 * TanStack Query mutation for updating an existing product.
 *
 * On **success**: invalidates `['products']`, clears the selected product,
 * resets the form, and calls `onClose`.
 */
export function useUpdateProduct({ resetForm, onClose }: UseUpdateProductOptions = {}) {
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();
  const { setSelectedProduct } = useProductStore();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateProductInput }) =>
      updateProduct(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setShowAlertMessage('success', 'Producto actualizado exitosamente');
      resetForm?.();
      setSelectedProduct(null);
      onClose?.();
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
