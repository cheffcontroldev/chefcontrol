import { useQuery } from '@tanstack/react-query';
import { getExpiringLots } from '../api';
import { useAuthStore } from '@/stores/authStore';

export function useExpiringLots(days: number = 3) {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['expiring_lots', restaurantId, days],
    queryFn: () => getExpiringLots(restaurantId!, days),
    enabled: !!restaurantId,
  });
}
