import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRestaurant } from '../api';
import type { UpdateRestaurantInput } from '../schemas';
import { useUiStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';

export function useUpdateRestaurant() {
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: (input: UpdateRestaurantInput) => updateRestaurant(user?.restaurantId, input),
    onSuccess: () => {
      setShowAlertMessage('success', 'Restaurante actualizado exitosamente');
      queryClient.invalidateQueries({ queryKey: ['restaurant'] });
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
