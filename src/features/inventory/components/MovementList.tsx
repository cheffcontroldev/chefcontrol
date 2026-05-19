import { useState } from 'react';
import { Eye, PackageMinus, PackagePlus } from 'lucide-react';

/* Hooks */
import { useMovements } from '../hooks/useMovements';

import { formatDate } from '@/shared/utils/dataHelpers';

import { useMovementStore } from '../store/MovementStore';
import type { TypeMovement } from '../types';

export default function MovementList() {
  const [filter, setFilter] = useState<TypeMovement | null>(null);
  const [showCanceled, setShowCanceled] = useState(false);
  const { data: movements, isLoading, error } = useMovements(filter, showCanceled);
  const countMovements = movements?.length || 0;
  const { setSelectedMovement } = useMovementStore();

  return (
    <div className="overflow-x-auto w-full min-w-[340px] max-w-7xl">
      <div className="py-6 px-4 flex flex-col gap-6 items-start md:flex-row md:items-center md:justify-start md:gap-12">
        <div className="flex gap-3 items-center">
          <label htmlFor="filter">Mostrar:</label>
          <select
            name="filter"
            id="filter"
            className="select"
            value={filter || ''}
            onChange={(e) => setFilter(e.target.value as TypeMovement | null)}
          >
            <option value="">Todo</option>
            <option value="entry">Entradas</option>
            <option value="exit">Salidas</option>
          </select>
        </div>
        <div className="flex gap-3 items-center">
          <label htmlFor="cancelrecords">Mostrar registros cancelados</label>
          <input
            type="checkbox"
            id="cancelrecords"
            onChange={(e) => setShowCanceled(e.target.checked)}
          />
        </div>
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Producto</th>
            <th>Tipo</th>
            <th className="max-md:hidden">Cantidad</th>
            <th className="max-lg:hidden">Fecha</th>
            <th className="max-sm:hidden">Cancelado</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={8} className="text-center">
                Cargando...
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={8} className="text-center">
                Error: {error.message}
              </td>
            </tr>
          )}
          {countMovements === 0 && !isLoading && (
            <tr>
              <td colSpan={8} className="text-center">
                No se encontraron movimientos
              </td>
            </tr>
          )}
          {movements?.map((movement) => (
            <tr key={movement.id} className="hover:bg-base-300">
              <td>{movement.product.name}</td>
              <td className="flex items-center gap-2">
                {movement.type === 'entry' ? (
                  <>
                    Entrada <PackagePlus className="text-success w-4 h-4" />
                  </>
                ) : (
                  <>
                    Salida <PackageMinus className="text-error w-4 h-4" />
                  </>
                )}
              </td>
              <td className="max-md:hidden">
                {movement.quantity} {movement.product.unitsOfMeasure.abbreviation}
              </td>
              <td className="max-lg:hidden">{formatDate(movement.movementDate.toString())}</td>
              <td className="max-sm:hidden">{movement.isCancelled ? 'Sí' : 'No'}</td>
              <td className="text-center">
                <button
                  className="btn btn-info btn-xs"
                  onClick={() => setSelectedMovement(movement)}
                >
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
