import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMyUser } from '../api';
import type { UpdateUserInput } from '../schemas';
import { useUiStore } from '@/stores/uiStore';

/**
 * TanStack Query mutation that updates the current user's display name.
 *
 * On **success**: shows a success alert and invalidates the `['user']` query
 * so the detail view re-fetches.
 *
 * On **error**: displays the error message in an alert banner.
 */
export function useUpdateMyUser() {
  const { setShowAlertMessage } = useUiStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateUserInput) => updateMyUser(input),
    onSuccess: () => {
      setShowAlertMessage('success', 'Usuario actualizado exitosamente');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
