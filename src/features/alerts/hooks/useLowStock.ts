import { useQuery } from '@tanstack/react-query';
import { getLowStock } from '../api';
import { useAuthStore } from '@/stores/authStore';

/**
 * TanStack Query hook that fetches products with low stock.
 *
 * The query is **disabled** until `restaurantId` is available.
 */
export function useLowStock() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['low_stock', restaurantId],
    queryFn: () => getLowStock(restaurantId!),
    enabled: !!restaurantId,
  });
}
