import { useMutation } from '@tanstack/react-query';
import { updateMyUser } from '../api';
import type { UpdateUserInput } from '../schemas';
import { useUiStore } from '@/stores/uiStore';

type UpdateMyUserVariables = {
  id: string;
  input: UpdateUserInput;
};

export function useUpdateMyUser() {
  const { setShowAlertMessage } = useUiStore();

  return useMutation({
    mutationFn: ({ id, input }: UpdateMyUserVariables) => updateMyUser(id, input),
    onSuccess: () => {
      setShowAlertMessage('success', 'Usuario actualizado exitosamente');
    },
    onError: (error: Error) => {
      setShowAlertMessage('error', error.message);
    },
  });
}
