import FormModalButtons from './FormModalButtons';
import type { FormMode } from '../types';

interface FormModalProps {
  formMode: FormMode;
  onFormButtonActions: (formMode: FormMode) => void;
  onSubmit?: () => void;
  className?: string;
  isPending?: boolean;
}

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
