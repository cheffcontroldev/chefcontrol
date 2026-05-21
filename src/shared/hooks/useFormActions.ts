import { useCallback } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import type { FormMode } from '@/shared/types';

/**
 * Options for the useFormActions hook.
 */
type UseFormActionsOptions<T extends Record<string, unknown>> = {
  /** Store setter for form mode */
  setFormMode: (mode: FormMode) => void;
  /** React Hook Form methods for reset functionality */
  formMethods: UseFormReturn<T>;
};

/**
 * Hook providing shared form action handlers for CRUD modals.
 * @description Returns an `onFormButtonActions` callback that manages
 * form mode transitions and resets the form when switching to 'hidden'
 * or 'create' modes.
 *
 * @example
 * ```tsx
 * const formMethods = useForm<FormData>();
 * const { onFormButtonActions } = useFormActions({ setFormMode, formMethods });
 * // Pass onFormButtonActions to FormModal
 * ```
 *
 * @param setFormMode - Store setter to update form mode
 * @param formMethods - React Hook Form instance for form reset
 * @returns Object with onFormButtonActions callback
 */
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
