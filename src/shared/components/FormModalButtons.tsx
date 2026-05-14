import type { FormMode } from '@/shared/types';

interface FormModalButtonsProps {
  formMode: FormMode;
  onFormButtonActions: (formMode: FormMode) => void;
  isPending: boolean;
}

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
