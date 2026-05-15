import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api';
import { useAuthStore } from '@/stores/authStore';

export function useProducts() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['products', restaurantId],
    queryFn: () => getProducts(restaurantId!),
    enabled: !!restaurantId,
  });
}
