import { useQuery } from '@tanstack/react-query';
import { getExpiringLots } from '../api';
import { useAuthStore } from '@/stores/authStore';
import { useAlertConfig } from './useAlertConfig';

/**
 * TanStack Query hook that fetches lots expiring within the configured
 * alert threshold.
 *
 * Reads `expiration_alert_days` from the alert config (via
 * {@link useAlertConfig}) so the threshold is always in sync with the
 * restaurant's settings.
 *
 * The query is **disabled** until both `restaurantId` and `alertConfig`
 * are available.
 */
export function useExpiringLots() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;
  const { config: alertConfig } = useAlertConfig();

  return useQuery({
    queryKey: ['expiring_lots', restaurantId, alertConfig?.expiration_alert_days],
    queryFn: () => getExpiringLots(restaurantId!, alertConfig?.expiration_alert_days ?? 3),
    enabled: !!restaurantId && !!alertConfig,
  });
}
