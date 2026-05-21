import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '../api';
import { useUiStore } from '@/stores/uiStore';

/**
 * TanStack Query mutation for soft-deleting a product.
 *
 * On **success**: invalidates the products list query.
 */
export function useDeleteProduct() {
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setShowAlertMessage('success', 'Producto eliminado exitosamente');
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
