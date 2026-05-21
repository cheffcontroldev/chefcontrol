import type { FormMode } from '@/shared/types';

/**
 * Props for the FormModalButtons component.
 */
interface FormModalButtonsProps {
  /** Current form mode determining which buttons are shown */
  formMode: FormMode;
  /** Callback triggered on button clicks to change form mode */
  onFormButtonActions: (formMode: FormMode) => void;
  /** Whether an async operation is in progress (disables all buttons) */
  isPending: boolean;
}

/**
 * Contextual action buttons for form modals.
 * @description Renders buttons based on FormMode:
 * - 'show': Shows "Editar" + "Cerrar"
 * - 'create': Shows "Guardar" + "Cerrar"
 * - 'edit': Shows "Guardar" + "Cancelar"
 * - 'hidden': Nothing rendered
 *
 * @example
 * ```tsx
 * <FormModalButtons
 *   formMode={formMode}
 *   onFormButtonActions={handleModeChange}
 *   isPending={isSubmitting}
 * />
 * ```
 *
 * @param formMode - Determines visible buttons
 * @param onFormButtonActions - Callback for button click actions
 * @param isPending - Disables buttons while true
 */
export default function FormModalButtons({
  formMode,
  onFormButtonActions,
  isPending,
}: FormModalButtonsProps) {
  return (
    <div className="card-actions w-full flex gap-3 items-center justify-center pt-6">
      {formMode !== 'show' && (
        <>
          <button type="submit" className="btn btn-primary" disabled={isPending}>
            Guardar
          </button>
        </>
      )}
      {formMode === 'show' && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onFormButtonActions('edit')}
          disabled={isPending}
        >
          Editar
        </button>
      )}

      {formMode !== 'edit' && (
        <>
          <button
            type="button"
            className="btn btn-neutral"
            onClick={() => onFormButtonActions('hidden')}
            disabled={isPending}
          >
            Cerrar
          </button>
        </>
      )}

      {formMode === 'edit' && (
        <>
          <button
            type="button"
            className="btn btn-neutral"
            onClick={() => onFormButtonActions('show')}
            disabled={isPending}
          >
            Cancelar
          </button>
        </>
      )}
    </div>
  );
}
