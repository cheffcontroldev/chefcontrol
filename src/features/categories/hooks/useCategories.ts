import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api';
import { useAuthStore } from '@/stores/authStore';

/**
 * TanStack Query hook that fetches all non-deleted categories for the current
 * user's restaurant.
 *
 * The query is **disabled** until `restaurantId` is available.
 */
export function useCategories() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['categories', restaurantId],
    queryFn: () => getCategories(restaurantId!),
    enabled: !!restaurantId,
  });
}
