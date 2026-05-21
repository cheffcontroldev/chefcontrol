import { useQuery } from '@tanstack/react-query';
import { getMovements } from '../api';
import { useAuthStore } from '@/stores/authStore';

import type { TypeMovement } from '../types';

/**
 * TanStack Query hook that fetches movements for the current user's
 * restaurant.
 *
 * @param filter - If provided, only movements of this type are returned
 * @param filterStatus - When `false` (default), cancelled movements are hidden
 *
 * The query is **disabled** until `restaurantId` is available.
 */
export function useMovements(filter: TypeMovement | null = null, filterStatus: boolean = false) {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['movements', restaurantId, filter, filterStatus],
    queryFn: () => getMovements(restaurantId!, filter, filterStatus),
    enabled: !!restaurantId,
  });
}
