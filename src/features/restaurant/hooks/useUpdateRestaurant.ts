import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRestaurant } from '../api';
import type { UpdateRestaurantInput } from '../schemas';
import { useUiStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';

/**
 * TanStack Query mutation that updates the current user's restaurant.
 *
 * Gets `restaurantId` from the auth store automatically.
 *
 * On **success**: shows a success alert and invalidates the `['restaurant']`
 * query.
 *
 * On **error**: displays the error message in an alert banner.
 */
export function useUpdateRestaurant() {
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: (input: UpdateRestaurantInput) => {
      if (!user?.restaurantId) throw new Error('No authenticated');
      return updateRestaurant(user.restaurantId, input);
    },
    onSuccess: () => {
      setShowAlertMessage('success', 'Restaurante actualizado exitosamente');
      queryClient.invalidateQueries({ queryKey: ['restaurant'] });
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
