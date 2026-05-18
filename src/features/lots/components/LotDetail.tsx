import { CircleAlert } from 'lucide-react';
import DetailModal from '@/shared/components/DetailModal';

import { useLotStore } from '../store/LottStore';

import { formatDate, isExpiringSoon, isExpired } from '@/shared/utils/dataHelpers';

export default function LotDetail() {
  const { selectedLot, setSelectedLot } = useLotStore();

  if (!selectedLot) return null;

  return (
    <DetailModal>
      <h3 className="text-lg text-center font-semibold">Detalle del lote</h3>
      <table className="table min-w-[340px]">
        <tbody>
          <tr>
            <td className="font-bold">Producto</td>
            <td>{selectedLot.product?.name}</td>
          </tr>
          <tr>
            <td className="font-bold">Fecha de creación</td>
            <td>{formatDate(selectedLot.createdAt)}</td>
          </tr>
          <tr>
            <td
              className={
                isExpired(selectedLot.expirationDate) ? 'text-error font-bold' : 'font-bold'
              }
            >
              Fecha de vencimiento
            </td>
            <td
              className={
                isExpired(selectedLot.expirationDate)
                  ? 'text-error font-bold'
                  : isExpiringSoon(selectedLot.expirationDate, 7)
                    ? 'text-error'
                    : ''
              }
            >
              {isExpired(selectedLot.expirationDate) && (
                <CircleAlert className="inline-block mr-2" />
              )}
              {selectedLot.expirationDate}
            </td>
          </tr>
          <tr>
            <td className="font-bold">Cantidad Inicial</td>
            <td>
              {selectedLot.initialQuantity} {selectedLot.product?.unitsOfMeasure?.name}
            </td>
          </tr>
          <tr>
            <td className="font-bold">Cantidad Actual</td>
            <td className={selectedLot.currentQuantity === 0 ? 'text-error' : ''}>
              {selectedLot.currentQuantity} {selectedLot.product?.unitsOfMeasure?.name}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="text-center pt-6">
        <button className="btn btn-neutral" onClick={() => setSelectedLot(null)}>
          Cerrar
        </button>
      </div>
    </DetailModal>
  );
}
