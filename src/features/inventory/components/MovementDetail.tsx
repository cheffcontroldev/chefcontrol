import { PackageMinus, PackagePlus } from 'lucide-react';
import DetailModal from '@/shared/components/DetailModal';
import CancelConfirmModal from '../components/CancelConfirmModal';

import { useMovementStore } from '../store/MovementStore';
import { useCancelMovement } from '../hooks/useCancelMovement';

/**
 * Detail modal that displays full information about the selected movement.
 *
 * Includes a "Cancelar movimiento" button for non-cancelled entries/exits.
 * When there are downstream dependencies, the cancel flow shows a
 * confirmation modal via {@link CancelConfirmModal}.
 */
export default function MovementDetail() {
  const { selectedMovement, setSelectedMovement } = useMovementStore();
  const { initiateCancel, confirmCancel, closeConfirm, dependencies, showConfirmModal, isLoading } =
    useCancelMovement();

  if (!selectedMovement) return null;

  const handleCancel = () => {
    if (!selectedMovement || selectedMovement.isCancelled) return;
    initiateCancel(selectedMovement.id);
  };

  const canCancel =
    !selectedMovement.isCancelled &&
    (selectedMovement.type === 'exit' || selectedMovement.type === 'entry');

  return (
    <>
      <DetailModal>
        <h3 className="text-lg text-center font-semibold">Detalle del movimiento</h3>

        <table className="table min-w-[340px]">
          <tbody>
            <tr>
              <td className="font-bold">Producto</td>
              <td>{selectedMovement.product?.name}</td>
            </tr>
            <tr>
              <td className="font-bold">Tipo</td>
              <td className="flex items-center gap-2">
                {selectedMovement.type === 'entry' ? (
                  <>
                    Entrada <PackagePlus className="text-success w-5 h-5" />
                  </>
                ) : (
                  <>
                    Salida <PackageMinus className="text-error w-5 h-5" />
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td className="font-bold">Cantidad</td>
              <td>{selectedMovement.quantity}</td>
            </tr>
            <tr>
              <td className="font-bold">Fecha</td>
              <td>{new Date(selectedMovement.movementDate).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className="font-bold">Motivo</td>
              <td>{selectedMovement.reason}</td>
            </tr>
            <tr>
              <td className="font-bold">Notas</td>
              <td>{selectedMovement.notes || '-'}</td>
            </tr>
            <tr>
              <td className="font-bold">Estado</td>
              <td>
                {selectedMovement.isCancelled
                  ? `Cancelado ${selectedMovement.canceledAt ? new Date(selectedMovement.canceledAt).toLocaleDateString() : ''}`
                  : 'Activo'}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="text-center pt-6 flex gap-3 items-center justify-center">
          {canCancel && (
            <button
              type="button"
              className="btn btn-error"
              onClick={handleCancel}
              disabled={isLoading || selectedMovement.isCancelled}
            >
              {isLoading ? 'Procesando...' : 'Cancelar movimiento'}
            </button>
          )}
          <button
            type="button"
            className="btn btn-neutral"
            onClick={() => setSelectedMovement(null)}
          >
            Cerrar
          </button>
        </div>
      </DetailModal>

      <CancelConfirmModal
        isOpen={showConfirmModal}
        dependencies={dependencies}
        onConfirm={confirmCancel}
        onCancel={closeConfirm}
        isLoading={isLoading}
      />
    </>
  );
}
