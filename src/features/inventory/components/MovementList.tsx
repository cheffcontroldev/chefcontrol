import { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, Eye } from 'lucide-react';

/* Hooks */
import { useMovements } from '../hooks/useMovements';

import { formatDate } from '@/shared/utils/dataHelpers';

import { useMovementStore } from '../store/MovementStore';
import type { TypeMovement } from '../types';

/**
 * Table view of movements with type and cancelled-status filters.
 *
 * Each row shows product, type (entry/exit with icon), quantity, date, and
 * cancellation status. An eye icon opens the movement detail modal.
 */
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
            className="checkbox"
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
              <td colSpan={6} className="text-center">
                Cargando...
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={6} className="text-center">
                Error: {error.message}
              </td>
            </tr>
          )}
          {countMovements === 0 && !isLoading && !error && (
            <tr>
              <td colSpan={6} className="text-center">
                No se encontraron movimientos
              </td>
            </tr>
          )}
          {movements?.map((movement) => (
            <tr key={movement.id} className="hover:bg-base-300">
              <td>{movement.product.name}</td>
              <td>
                {movement.type === 'entry' ? (
                  <span className="badge badge-success gap-1">
                    <ArrowDownLeft className="w-3 h-3" />
                    Entrada
                  </span>
                ) : (
                  <span className="badge badge-error gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    Salida
                  </span>
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
