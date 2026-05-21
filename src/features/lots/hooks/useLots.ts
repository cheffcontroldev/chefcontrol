import { useQuery } from '@tanstack/react-query';
import { getLots } from '../api';
import { useAuthStore } from '@/stores/authStore';

/**
 * TanStack Query hook that fetches lots for the current user's restaurant.
 *
 * @param includeZeroStock - When `false` (default), only lots with stock > 0
 *   are returned.
 *
 * The query is **disabled** until `restaurantId` is available.
 */
export function useLots(includeZeroStock = false) {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['lots', restaurantId, includeZeroStock],
    queryFn: () => getLots(restaurantId!, includeZeroStock),
    enabled: !!restaurantId,
  });
}
