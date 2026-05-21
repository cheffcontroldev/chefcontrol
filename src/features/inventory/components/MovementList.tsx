import { useState } from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Eye,
  AlertTriangle,
  Loader2,
  ArrowLeftRight,
  PackagePlus,
  PackageMinus,
  Ban,
  CheckCircle2,
  Calendar,
  Scale,
  Filter,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

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

  const totalEntries = movements?.filter((m) => m.type === 'entry' && !m.isCancelled).length || 0;
  const totalExits = movements?.filter((m) => m.type === 'exit' && !m.isCancelled).length || 0;
  const totalCancelled = movements?.filter((m) => m.isCancelled).length || 0;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-accent/10 rounded-xl">
            <ArrowLeftRight className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Movimientos</h2>
            <p className="text-sm text-base-content/60">
              {totalEntries} entradas • {totalExits} salidas
              {totalCancelled > 0 && ` • ${totalCancelled} anulados`}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 bg-base-100 px-3 py-2 rounded-lg shadow-sm border border-base-300">
            <Filter className="w-4 h-4 text-base-content/40" />
            <select
              className="select select-ghost select-sm w-40 focus:bg-transparent"
              value={filter || ''}
              onChange={(e) => setFilter(e.target.value as TypeMovement | null)}
            >
              <option value="">Todos los tipos</option>
              <option value="entry">Entradas</option>
              <option value="exit">Salidas</option>
            </select>
          </div>

          <label className="flex items-center gap-3 cursor-pointer bg-base-100 px-4 py-2 rounded-lg shadow-sm border border-base-300 hover:bg-base-200 transition-colors">
            <div className="flex items-center gap-2">
              {showCanceled ? (
                <ToggleRight className="w-5 h-5 text-error" />
              ) : (
                <ToggleLeft className="w-5 h-5 text-base-content/40" />
              )}
              <span className="text-sm font-medium">Mostrar anulados</span>
            </div>
            <input
              type="checkbox"
              checked={showCanceled}
              onChange={(e) => setShowCanceled(e.target.checked)}
              className="checkbox checkbox-sm checkbox-error"
            />
          </label>
        </div>
      </div>

      {countMovements === 0 && !isLoading && !error && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center py-16">
            <div className="p-4 bg-base-200 rounded-full mb-4">
              <ArrowLeftRight className="w-8 h-8 text-base-content/40" />
            </div>
            <h3 className="text-lg font-semibold">No hay movimientos</h3>
            <p className="text-base-content/60 max-w-sm">
              {showCanceled
                ? 'No se encontraron movimientos con los filtros seleccionados.'
                : 'No hay movimientos registrados. Las entradas y salidas aparecerán aquí.'}
            </p>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
              <span className="ml-3 text-lg">Cargando movimientos...</span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-error shadow-lg">
          <AlertTriangle className="w-6 h-6" />
          <div>
            <h3 className="font-bold">Error al cargar</h3>
            <p>{error.message}</p>
          </div>
        </div>
      )}

      {countMovements > 0 && (
        <div className="card bg-base-100 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200/50">
                  <th className="w-16 text-center">#</th>
                  <th>Producto</th>
                  <th>Tipo</th>
                  <th className="max-md:hidden text-center">Cantidad</th>
                  <th className="max-lg:hidden">Fecha</th>
                  <th className="max-sm:hidden text-center">Estado</th>
                  <th className="text-center w-20">Ver</th>
                </tr>
              </thead>
              <tbody>
                {movements?.map((movement, index) => {
                  const isEntry = movement.type === 'entry';
                  const isCancelled = movement.isCancelled;

                  return (
                    <tr
                      key={movement.id}
                      className={`hover:bg-base-200/50 transition-colors group ${
                        isCancelled ? 'bg-error/5 opacity-60' : ''
                      }`}
                    >
                      <td className="text-center">
                        <span
                          className={`badge badge-sm ${
                            isCancelled ? 'badge-error' : isEntry ? 'badge-success' : 'badge-error'
                          }`}
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isCancelled
                                ? 'bg-error/10'
                                : isEntry
                                  ? 'bg-success/10'
                                  : 'bg-error/10'
                            }`}
                          >
                            {isEntry ? (
                              <PackagePlus
                                className={`w-4 h-4 ${isCancelled ? 'text-error' : 'text-success'}`}
                              />
                            ) : (
                              <PackageMinus
                                className={`w-4 h-4 ${isCancelled ? 'text-error' : 'text-error'}`}
                              />
                            )}
                          </div>
                          <div>
                            <span
                              className={`font-medium block ${isCancelled ? 'line-through' : ''}`}
                            >
                              {movement.product.name}
                            </span>
                            <span className="text-xs text-base-content/50 sm:hidden">
                              {movement.product.unitsOfMeasure.abbreviation}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        {isEntry ? (
                          <span
                            className={`badge badge-success badge-sm gap-1 ${
                              isCancelled ? 'opacity-50' : ''
                            }`}
                          >
                            <ArrowDownLeft className="w-3 h-3" />
                            Entrada
                          </span>
                        ) : (
                          <span
                            className={`badge badge-error badge-sm gap-1 ${
                              isCancelled ? 'opacity-50' : ''
                            }`}
                          >
                            <ArrowUpRight className="w-3 h-3" />
                            Salida
                          </span>
                        )}
                      </td>
                      <td className="max-md:hidden text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Scale className="w-3.5 h-3.5 text-base-content/40" />
                          <span className={`text-sm ${isCancelled ? 'line-through' : ''}`}>
                            {movement.quantity} {movement.product.unitsOfMeasure.abbreviation}
                          </span>
                        </div>
                      </td>
                      <td className="max-lg:hidden">
                        <div className="flex items-center gap-1.5">
                          <Calendar
                            className={`w-3.5 h-3.5 ${
                              isCancelled ? 'text-error' : 'text-base-content/40'
                            }`}
                          />
                          <span
                            className={`text-sm ${isCancelled ? 'text-error/60' : 'text-base-content/60'}`}
                          >
                            {formatDate(movement.movementDate.toString())}
                          </span>
                        </div>
                      </td>
                      <td className="max-sm:hidden text-center">
                        {isCancelled ? (
                          <span className="badge badge-error badge-sm gap-1">
                            <Ban className="w-3 h-3" />
                            Anulado
                          </span>
                        ) : (
                          <span className="badge badge-success badge-sm gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Activo
                          </span>
                        )}
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm btn-circle hover:bg-info/10 hover:text-info"
                          onClick={() => setSelectedMovement(movement)}
                          title="Ver detalle"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer con info */}
          <div className="bg-base-200/30 px-6 py-3 text-sm text-base-content/60 flex justify-between items-center">
            <span>
              Mostrando {countMovements} {countMovements === 1 ? 'movimiento' : 'movimientos'}
              {showCanceled && ' (incluyendo anulados)'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
