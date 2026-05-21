import { useQuery } from '@tanstack/react-query';
import { getInventoryReport } from '../api';

/**
 * TanStack Query hook that fetches the current inventory report.
 */
export function useInventoryReport(restaurantId: string) {
  return useQuery({
    queryKey: ['inventory-report', restaurantId],
    queryFn: () => getInventoryReport(restaurantId),
    enabled: !!restaurantId,
  });
}
