import { useQuery } from '@tanstack/react-query';
import { getLots } from '../api';
import { useAuthStore } from '@/stores/authStore';

export function useLots() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['lots', restaurantId],
    queryFn: () => getLots(restaurantId!),
    enabled: !!restaurantId,
  });
}
