/* Hooks */
import { Eye } from 'lucide-react';
import { useLots } from '../hooks/useLots';

import { formatDate } from '@/shared/utils/dataHelpers';

import { useLotStore } from '../store/LottStore';

export default function LotList() {
  const { data: lots, isLoading, error } = useLots();
  const countLots = lots?.length || 0;
  const { setSelectedLot } = useLotStore();

  return (
    <div className="overflow-x-auto w-full max-sm:min-w-[340px] min-w-lg md:min-w-2xl lg:min-w-4xl xl:min-w-5xl xl:max-w-6xl">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Producto</th>
            <th>Vencimiento</th>
            <th className="max-lg:hidden">Cantidad Inicial</th>
            <th className="max-sm:hidden">Cantidad actual</th>
            <th className="max-xl:hidden">Creado</th>
            <th className="max-md:hidden">Activo</th>

            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={7} className="text-center">
                Cargando...
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={7} className="text-center">
                Error: {error.message}
              </td>
            </tr>
          )}
          {countLots === 0 && (
            <tr>
              <td colSpan={7} className="text-center">
                No se encontraron lotes
              </td>
            </tr>
          )}
          {lots?.map((lot) => (
            <tr
              key={lot.id}
              className={`hover:bg-base-300 ${lot.currentQuantity === 0 ? 'text-error' : ''}`.trim()}
            >
              <td>{lot.product.name}</td>
              <td>{lot.expirationDate}</td>
              <td className="max-lg:hidden">
                {lot.initialQuantity} {lot.product.unitsOfMeasure.abbreviation}.
              </td>
              <td className="max-sm:hidden">
                {lot.currentQuantity === 0 ? 'Agotado' : lot.currentQuantity}
              </td>
              <td className="max-xl:hidden">{formatDate(lot.createdAt.toString())}</td>
              <td className="max-md:hidden">{lot.isActive ? 'Activo' : 'Inactivo'}</td>
              <td className="text-center">
                <button className="btn btn-info btn-xs" onClick={() => setSelectedLot(lot)}>
                  <Eye className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
