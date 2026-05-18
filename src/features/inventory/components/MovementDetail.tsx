import { PackageMinus, PackagePlus } from 'lucide-react';
import DetailModal from '@/shared/components/DetailModal';

import { useMovementStore } from '../store/MovementStore';

export default function MovementDetail() {
  const { selectedMovement, setSelectedMovement } = useMovementStore();

  if (!selectedMovement) return null;

  return (
    <DetailModal>
      <h3 className="text-lg text-center font-semibold">Detalle del movimiento</h3>
      <table className="table min-w-[340px]">
        <tbody>
          <tr>
            <td className="font-bold">Producto</td>
            <td>{selectedMovement.product?.name}</td>
          </tr>
          <tr>
            <td className="font-bold">Tipo de Movimiento</td>
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
            <td className="font-bold">Cantidad Inicial</td>
            <td>{selectedMovement.movementDate.toString()}</td>
          </tr>
          <tr>
            <td className="font-bold">Motivo</td>
            <td>{selectedMovement.reason}</td>
          </tr>
          <tr>
            <td className="font-bold">Notas</td>
            <td>{selectedMovement.notes}</td>
          </tr>
          <tr>
            <td className="font-bold">Status</td>
            <td>
              {selectedMovement.isCancelled ? 'Cancelado ' + selectedMovement.canceledAt : 'Activo'}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="text-center pt-6">
        <button className="btn btn-neutral" onClick={() => setSelectedMovement(null)}>
          Cerrar
        </button>
      </div>
    </DetailModal>
  );
}
