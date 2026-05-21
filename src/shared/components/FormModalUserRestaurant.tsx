import type { FormMode } from '../types';

/**
 * Props for the FormModalUserRestaurant component.
 * ⚠️ Note: Interface named `FormModalProps` collides with the
 * interface name in FormModal.tsx.
 */
interface FormModalProps {
  /** Current form mode (only 'edit' is used in practice) */
  formMode: FormMode;
  /** Callback to close/hide the modal */
  hideForm: () => void;
  /** Submit handler for the form */
  onSubmit?: () => void;
  /** CSS classes for the content area (default: 'space-y-3') */
  className?: string;
  /** Whether an async operation is in progress (disables buttons) */
  isPending?: boolean;
}

/**
 * Simplified modal for User and Restaurant edit forms.
 * @description A full-screen modal overlay with Save and Cancel buttons.
 * Simpler than FormModal — no dynamic button variations, just
 * a consistent edit form pattern.
 *
 * @example
 * ```tsx
 * <FormModalUserRestaurant
 *   formMode="edit"
 *   hideForm={handleClose}
 *   onSubmit={handleSubmit(onSubmit)}
 *   isPending={isUpdating}
 * >
 *   <Input {...register('name')} placeholder="Nombre" />
 * </FormModalUserRestaurant>
 * ```
 *
 * @param formMode - Controls visibility ('hidden' hides the modal)
 * @param hideForm - Callback to close the modal
 * @param onSubmit - Form submit handler
 * @param className - Custom spacing for form fields (default: 'space-y-3')
 * @param isPending - Disables buttons while true (default: false)
 * @param children - Form content rendered inside the modal
 */
export default function FormModalUserRestaurant({
  children,
  hideForm,
  onSubmit,
  className = 'space-y-3',
  isPending = false,
}: FormModalProps & { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 w-full h-screen flex items-center justify-center bg-base-300 opacity-70 backdrop-blur-xl z-50">
      <div className="card bg-base-100 shadow-xl z-50 p-6">
        <form onSubmit={onSubmit}>
          <div className={className}>{children}</div>
          <div className="flex items-center justify-center pt-3">
            <button disabled={isPending} className="btn btn-success">
              Guardar
            </button>
            <button disabled={isPending} className="btn btn-neutral" onClick={() => hideForm()}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
