import { useQuery } from '@tanstack/react-query';
import { getCountProducts } from '../api';
import { useAuthStore } from '@/stores/authStore';

/**
 * TanStack Query hook that fetches the total count of non-deleted products.
 *
 * The query is **disabled** until `restaurantId` is available.
 */
export function useCountProducts() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['products_count', restaurantId],
    queryFn: () => getCountProducts(restaurantId!),
    enabled: !!restaurantId,
  });
}
