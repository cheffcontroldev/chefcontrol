import { useCallback } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import type { FormMode } from '@/shared/types';

type UseFormActionsOptions<T extends Record<string, unknown>> = {
  setFormMode: (mode: FormMode) => void;
  formMethods: UseFormReturn<T>;
};

export function useFormActions<T extends Record<string, unknown>>({
  setFormMode,
  formMethods,
}: UseFormActionsOptions<T>) {
  const { reset } = formMethods;

  const onFormButtonActions = useCallback(
    (action: FormMode) => {
      if (action === 'hidden' || action === 'create') {
        reset();
      }
      setFormMode(action);
    },
    [reset, setFormMode]
  );

  return { onFormButtonActions };
}
