import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api';
import { useAuthStore } from '@/stores/authStore';

/**
 * TanStack Query hook that fetches the current user's auth profile.
 *
 * The query is **disabled** until `user.id` is available from the auth store
 * (i.e. the user is logged in).
 *
 * @returns A query result containing the {@link User} object or an error.
 */
export function useUser() {
  const { user } = useAuthStore();
  const userId = user?.id;

  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(),
    enabled: !!userId,
  });
}
