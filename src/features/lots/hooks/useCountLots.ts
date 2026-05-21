import { useQuery } from '@tanstack/react-query';
import { getCountLots } from '../api';
import { useAuthStore } from '@/stores/authStore';

/**
 * TanStack Query hook that fetches the count of lots with positive stock.
 *
 * The query is **disabled** until `restaurantId` is available.
 */
export function useCountLots() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['lots_count', restaurantId],
    queryFn: () => getCountLots(restaurantId!),
    enabled: !!restaurantId,
  });
}
