import { useQuery } from '@tanstack/react-query';
import { getLowStock } from '../api';
import { useAuthStore } from '@/stores/authStore';

export function useLowStock() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['low-stock', restaurantId],
    queryFn: () => getLowStock(restaurantId!),
    enabled: !!restaurantId,
  });
}
