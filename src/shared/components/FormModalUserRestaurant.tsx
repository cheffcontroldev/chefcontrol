import type { FormMode } from '../types';

interface FormModalProps {
  formMode: FormMode;
  hideForm: () => void;
  onSubmit?: () => void;
  className?: string;
  isPending?: boolean;
}

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
          <div className="flex items-center justify-center">
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
