/* Components */
import { TableColumnActions } from '@/shared/components/TableColumnActions';

/* Stores */
import { useUiStore } from '@/stores/uiStore';
import { useLotStore } from '../store/LottStore';

/* Interfaces and Types */
import type { Lot } from '../types';

/* Hooks */
import { useLots } from '../hooks/useLots';

import { formatDate } from '@/shared/utils/formatDate';

export default function LotList() {
  const { data: lots, isLoading, error } = useLots();
  const countLots = lots?.length || 0;
  const { setLotFormMode } = useUiStore();
  const { setSelectedLot } = useLotStore();

  const onShow = (lot: Lot) => {
    setSelectedLot(lot);
    setLotFormMode('show');
  };

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

            <th className="text-center">Actions</th>
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
            <tr key={lot.id} className="hover:bg-base-300">
              <td>{lot.product.name}</td>
              <td>{formatDate(lot.expirationDate.toString())}</td>
              <td className="max-lg:hidden">{lot.initialQuantity}</td>
              <td className="max-sm:hidden">{lot.currentQuantity}</td>
              <td className="max-xl:hidden">{formatDate(lot.createdAt.toString())}</td>
              <td className="max-md:hidden">{lot.isActive ? 'Activo' : 'Inactivo'}</td>
              <td>
                <TableColumnActions onShow={() => onShow(lot)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
