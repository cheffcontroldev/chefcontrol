import { useQuery } from '@tanstack/react-query';
import { getLots } from '../api';
import { useAuthStore } from '@/stores/authStore';

export function useLots(includeZeroStock = false) {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['lots', restaurantId, includeZeroStock],
    queryFn: () => getLots(restaurantId!, includeZeroStock),
    enabled: !!restaurantId,
  });
}
