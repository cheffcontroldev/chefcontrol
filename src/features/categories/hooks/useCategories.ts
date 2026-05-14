import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api';
import { useAuthStore } from '@/stores/authStore';

export function useCategories() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['categories', restaurantId],
    queryFn: () => getCategories(restaurantId!),
    enabled: !!restaurantId,
  });
}
