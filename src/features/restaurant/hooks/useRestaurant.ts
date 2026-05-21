import { useQuery } from '@tanstack/react-query';
import { getRestaurant } from '../api';
import { useAuthStore } from '@/stores/authStore';

/**
 * TanStack Query hook that fetches the restaurant associated with the current
 * authenticated user.
 *
 * The query is **disabled** until `restaurantId` is available from the auth
 * store.
 *
 * @returns A query result containing the {@link Restaurant} object or an error.
 */
export function useRestaurant() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['restaurant', restaurantId],
    queryFn: () => getRestaurant(restaurantId!),
    enabled: !!restaurantId,
  });
}
