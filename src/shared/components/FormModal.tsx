import FormModalButtons from './FormModalButtons';
import type { FormMode } from '../types';

/**
 * Props for the FormModal component.
 */
interface FormModalProps {
  /** Current form mode controlling visibility and behavior */
  formMode: FormMode;
  /** Callback to handle form mode changes (triggered by buttons) */
  onFormButtonActions: (formMode: FormMode) => void;
  /** Submit handler for the form element */
  onSubmit?: () => void;
  /** CSS classes for the content area (default: 'space-y-3') */
  className?: string;
  /** Whether an async operation is in progress (disables buttons) */
  isPending?: boolean;
}

/**
 * Modal wrapper for CRUD forms with overlay backdrop.
 * @description Full-screen modal dialog that renders form content
 * with an overlay backdrop. Delegates action buttons to FormModalButtons.
 *
 * @example
 * ```tsx
 * <FormModal
 *   formMode={formMode}
 *   onFormButtonActions={handleFormMode}
 *   onSubmit={handleSubmit(onSubmit)}
 *   isPending={isPending}
 * >
 *   <Input {...register('name')} placeholder="Nombre" />
 *   <Select options={roles} placeholder="Rol" {...register('role')} />
 * </FormModal>
 * ```
 *
 * @param formMode - Controls visibility ('hidden' hides the modal)
 * @param onFormButtonActions - Callback for button clicks (mode changes)
 * @param onSubmit - Form submission handler
 * @param className - Custom spacing for form fields (default: 'space-y-3')
 * @param isPending - Disables all buttons while true
 * @param children - Form content rendered inside the modal
 */
export default function FormModal({
  children,
  formMode,
  onFormButtonActions,
  onSubmit,
  className = 'space-y-3',
  isPending = false,
}: FormModalProps & { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 w-full h-screen flex items-center justify-center bg-base-300 opacity-70 backdrop-blur-xl z-50">
      <div className="card bg-base-100 shadow-xl z-50 p-6">
        <form onSubmit={onSubmit}>
          <div className={className}>{children}</div>
          <FormModalButtons
            formMode={formMode}
            onFormButtonActions={onFormButtonActions}
            isPending={isPending}
          />
        </form>
      </div>
    </div>
  );
}
