import { useQuery } from '@tanstack/react-query';
import { getRestaurant } from '../api';
import { useAuthStore } from '@/stores/authStore';

export function useRestaurant() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['restaurant', restaurantId],
    queryFn: () => getRestaurant(restaurantId!),
    enabled: !!restaurantId,
  });
}
