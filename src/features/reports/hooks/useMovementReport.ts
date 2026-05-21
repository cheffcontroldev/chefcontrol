import { useQuery } from '@tanstack/react-query';
import { getMovementReport } from '../api';
import type { ReportFilter } from '../types';

/**
 * TanStack Query hook that fetches the movement report filtered by the given
 * parameters.
 */
export function useMovementReport(restaurantId: string, filter: ReportFilter) {
  return useQuery({
    queryKey: ['movement-report', restaurantId, filter],
    queryFn: () => getMovementReport(restaurantId, filter),
    enabled: !!restaurantId,
  });
}
