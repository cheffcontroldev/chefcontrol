import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api';
import { useAuthStore } from '@/stores/authStore';

export function useUser() {
  const { user } = useAuthStore();
  const userId = user?.id;

  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId!),
    enabled: !!userId,
  });
}
