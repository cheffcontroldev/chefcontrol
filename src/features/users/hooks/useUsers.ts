import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api';
import { useAuthStore } from '@/stores/authStore';

export function useUsers() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['users', restaurantId],
    queryFn: () => getUsers(restaurantId!),
    enabled: !!restaurantId,
  });
}
