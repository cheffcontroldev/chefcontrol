import { TriangleAlert } from 'lucide-react';
import { useDeleteStore } from '@/stores/deleteStore';

/**
 * Confirmation modal for delete operations.
 * @description Global modal that prompts the user to confirm a delete action.
 * Reads state from deleteStore — shows the confirmation message and
 * triggers the actual delete on confirmation.
 *
 * @example
 * ```tsx
 * // In any component:
 * setShowConfirmDelete('¿Eliminar producto?');
 * // ModalConfirmDelete renders "Eliminar" / "Cancelar" buttons
 * ```
 *
 * @returns The modal element, or null if showConfirmDelete is null
 */
export default function ModalConfirmDelete() {
  const { showConfirmDelete, executeConfirmDelete, setShowConfirmDelete } = useDeleteStore();

  if (!showConfirmDelete) return null;

  return (
    <div className="fixed inset-0 w-full h-screen flex items-center justify-center bg-base-300/50 backdrop-blur-xs z-40 px-3">
      <div className="card bg-base-100 shadow-xl z-50 p-12 w-full max-w-md border border-base-300">
        <div className="flex flex-col items-center justify-center gap-2">
          <TriangleAlert className="text-error w-20 h-20" />
          <p className="text-center">{showConfirmDelete}</p>
          <div className="flex gap-3 pt-6">
            <button className="btn btn-error" onClick={executeConfirmDelete}>
              Eliminar
            </button>
            <button className="btn btn-neutral" onClick={() => setShowConfirmDelete(null)}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
