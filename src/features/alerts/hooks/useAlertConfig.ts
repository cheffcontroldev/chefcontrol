import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAlertConfig, updateAlertConfig } from '../api';
import { useAuthStore } from '@/stores/authStore';

/**
 * Hook that bundles the alert-config query and its update mutation.
 *
 * Returns the current config, loading/updating states, and an `updateDays`
 * function to change the expiration alert threshold.
 */
export function useAlertConfig() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['alert-config', restaurantId],
    queryFn: () => getAlertConfig(restaurantId!),
    enabled: !!restaurantId,
  });

  const mutation = useMutation({
    mutationFn: (days: number) => updateAlertConfig(restaurantId!, days),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alert-config'] });
      queryClient.invalidateQueries({ queryKey: ['expiring-lots'] });
    },
  });

  return {
    config: query.data,
    isLoading: query.isLoading,
    updateDays: mutation.mutate,
    isUpdating: mutation.isPending,
  };
}
