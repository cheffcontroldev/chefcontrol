import type { FormMode } from '@/shared/types';

interface FormModalButtonsProps {
  formMode: FormMode;
  setFormMode: (formMode: FormMode) => void;
}

export default function FormModalButtons({ formMode, setFormMode }: FormModalButtonsProps) {
  return (
    <div className="card-actions flex gap-3 items-center justify-center py-6">
      {formMode !== 'show' && (
        <>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </>
      )}
      {formMode === 'show' && (
        <button className="btn btn-secondary" onClick={() => setFormMode('edit')}>
          Editar
        </button>
      )}

      {formMode !== 'edit' && (
        <>
          <button className="btn btn-neutral" onClick={() => setFormMode('hidden')}>
            Cerrar
          </button>
        </>
      )}
    </div>
  );
}
