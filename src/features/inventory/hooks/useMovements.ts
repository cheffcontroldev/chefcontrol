import { useQuery } from '@tanstack/react-query';
import { getMovements } from '../api';
import { useAuthStore } from '@/stores/authStore';

import type { TypeMovement } from '../types';

export function useMovements(filter: TypeMovement | null = null, filterStatus: boolean = false) {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['movements', restaurantId, filter, filterStatus],
    queryFn: () => getMovements(restaurantId!, filter, filterStatus),
    enabled: !!restaurantId,
  });
}
