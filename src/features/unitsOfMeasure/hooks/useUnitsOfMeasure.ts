import { useQuery } from '@tanstack/react-query';
import { getUnitsOfMeasure } from '../api';
import { useAuthStore } from '@/stores/authStore';

/**
 * TanStack Query hook that fetches all non-deleted units of measure for the
 * current user's restaurant.
 *
 * The query is **disabled** until `restaurantId` is available.
 */
export function useUnitsOfMeasure() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['unitsOfMeasure', restaurantId],
    queryFn: () => getUnitsOfMeasure(restaurantId!),
    enabled: !!restaurantId,
  });
}
