import { useQuery } from '@tanstack/react-query';
import { getUnitsOfMeasure } from '../api';
import { useAuthStore } from '@/stores/authStore';

export function useUnitsOfMeasure() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['unitsOfMeasure', restaurantId],
    queryFn: () => getUnitsOfMeasure(restaurantId!),
    enabled: !!restaurantId,
  });
}
