import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api';
import { useAuthStore } from '@/stores/authStore';

/**
 * TanStack Query hook that fetches all non-deleted products for the current
 * user's restaurant.
 *
 * The query is **disabled** until `restaurantId` is available.
 */
export function useProducts() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['products', restaurantId],
    queryFn: () => getProducts(restaurantId!),
    enabled: !!restaurantId,
  });
}
