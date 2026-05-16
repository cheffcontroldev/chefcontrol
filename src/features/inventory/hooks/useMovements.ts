import { useQuery } from '@tanstack/react-query';
import { getMovements } from '../api';
import { useAuthStore } from '@/stores/authStore';

export function useMovements() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['movements', restaurantId],
    queryFn: () => getMovements(restaurantId!),
    enabled: !!restaurantId,
  });
}
