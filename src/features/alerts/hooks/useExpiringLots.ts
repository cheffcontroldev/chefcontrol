import { useQuery } from '@tanstack/react-query';
import { getExpiringLots } from '../api';
import { useAuthStore } from '@/stores/authStore';

/**
 * TanStack Query hook that fetches lots expiring within the given number
 * of days.
 *
 * @param days - Threshold in days (default: 3)
 *
 * The query is **disabled** until `restaurantId` is available.
 */
export function useExpiringLots(days: number = 3) {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['expiring_lots', restaurantId, days],
    queryFn: () => getExpiringLots(restaurantId!, days),
    enabled: !!restaurantId,
  });
}
