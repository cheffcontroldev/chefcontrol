import { useQuery } from '@tanstack/react-query';
import { getCountCategories } from '../api';
import { useAuthStore } from '@/stores/authStore';

/**
 * TanStack Query hook that fetches the total count of non-deleted categories.
 *
 * The query is **disabled** until `restaurantId` is available.
 */
export function useCountCategories() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['categories_count', restaurantId],
    queryFn: () => getCountCategories(restaurantId!),
    enabled: !!restaurantId,
  });
}
