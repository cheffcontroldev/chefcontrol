import { useQuery } from '@tanstack/react-query';
import { getCountProducts } from '../api';
import { useAuthStore } from '@/stores/authStore';

export function useCountProducts() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['products_count', restaurantId],
    queryFn: () => getCountProducts(restaurantId!),
    enabled: !!restaurantId,
  });
}
