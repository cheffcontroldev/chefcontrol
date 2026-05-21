import { useState } from 'react';
import {
  Eye,
  AlertTriangle,
  Loader2,
  Boxes,
  PackageCheck,
  PackageX,
  Calendar,
  Scale,
  CheckCircle2,
  XCircle,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { useLots } from '../hooks/useLots';

import { formatDate } from '@/shared/utils/dataHelpers';

import { useLotStore } from '../store/LottStore';

/**
 * Table view of lots with a toggle to include or exclude zero-stock items.
 *
 * Each row shows product name, expiration date, quantities, and status. An eye
 * icon opens the lot detail modal.
 */
export default function LotList() {
  const [includeZeroStock, setIncludeZeroStock] = useState(false);
  const { data: lots, isLoading, error } = useLots(includeZeroStock);
  const countLots = lots?.length || 0;
  const { setSelectedLot } = useLotStore();

  const activeLots = lots?.filter((l) => l.currentQuantity > 0).length || 0;
  const depletedLots = lots?.filter((l) => l.currentQuantity === 0).length || 0;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-warning/10 rounded-xl">
            <Boxes className="w-6 h-6 text-warning" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Lotes</h2>
            <p className="text-sm text-base-content/60">
              {activeLots} activos
              {depletedLots > 0 && ` • ${depletedLots} agotados`}
              {includeZeroStock && ' (mostrando todos)'}
            </p>
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer bg-base-100 px-4 py-2 rounded-lg shadow-sm border border-base-300 hover:bg-base-200 transition-colors">
          <div className="flex items-center gap-2">
            {includeZeroStock ? (
              <ToggleRight className="w-5 h-5 text-warning" />
            ) : (
              <ToggleLeft className="w-5 h-5 text-base-content/40" />
            )}
            <span className="text-sm font-medium">Mostrar agotados</span>
          </div>
          <input
            type="checkbox"
            checked={includeZeroStock}
            onChange={(e) => setIncludeZeroStock(e.target.checked)}
            className="checkbox checkbox-sm checkbox-warning"
          />
        </label>
      </div>

      {countLots === 0 && !isLoading && !error && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center py-16">
            <div className="p-4 bg-base-200 rounded-full mb-4">
              <PackageCheck className="w-8 h-8 text-base-content/40" />
            </div>
            <h3 className="text-lg font-semibold">
              {includeZeroStock ? 'No hay lotes registrados' : 'Sin lotes activos'}
            </h3>
            <p className="text-base-content/60 max-w-sm">
              {includeZeroStock
                ? 'No se encontraron lotes en el sistema.'
                : 'Todos los lotes están agotados. Activa "Mostrar agotados" para verlos.'}
            </p>
            {!includeZeroStock && (
              <button
                type="button"
                className="btn btn-warning btn-outline gap-2 mt-4"
                onClick={() => setIncludeZeroStock(true)}
              >
                <PackageX className="w-4 h-4" />
                Ver lotes agotados
              </button>
            )}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-warning" />
              <span className="ml-3 text-lg">Cargando lotes...</span>
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

      {countLots > 0 && (
        <div className="card bg-base-100 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200/50">
                  <th className="w-16 text-center">#</th>
                  <th>Producto</th>
                  <th>Vencimiento</th>
                  <th className="max-lg:hidden text-center">Cantidad inicial</th>
                  <th className="max-sm:hidden text-center">Cantidad actual</th>
                  <th className="max-xl:hidden">Creado</th>
                  <th className="max-md:hidden text-center">Estado</th>
                  <th className="text-center w-20">Ver</th>
                </tr>
              </thead>
              <tbody>
                {lots?.map((lot, index) => {
                  const isDepleted = lot.currentQuantity === 0;
                  const isExpired = new Date(lot.expirationDate) < new Date();

                  return (
                    <tr
                      key={lot.id}
                      className={`hover:bg-base-200/50 transition-colors group ${
                        isDepleted ? 'bg-error/5' : ''
                      } ${isExpired ? 'bg-warning/5' : ''}`}
                    >
                      <td className="text-center">
                        <span
                          className={`badge badge-sm ${isDepleted ? 'badge-error' : 'badge-ghost'}`}
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isDepleted
                                ? 'bg-error/10'
                                : isExpired
                                  ? 'bg-warning/10'
                                  : 'bg-success/10'
                            }`}
                          >
                            <Boxes
                              className={`w-4 h-4 ${
                                isDepleted
                                  ? 'text-error'
                                  : isExpired
                                    ? 'text-warning'
                                    : 'text-success'
                              }`}
                            />
                          </div>
                          <div>
                            <span
                              className={`font-medium block ${isDepleted ? 'line-through opacity-60' : ''}`}
                            >
                              {lot.product.name}
                            </span>
                            <span className="text-xs text-base-content/50 sm:hidden">
                              {lot.product.unitsOfMeasure.abbreviation}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          <Calendar
                            className={`w-3.5 h-3.5 ${
                              isExpired ? 'text-error' : 'text-base-content/40'
                            }`}
                          />
                          <span className={`text-sm ${isExpired ? 'text-error font-medium' : ''}`}>
                            {formatDate(lot.expirationDate)}
                          </span>
                          {isExpired && <span className="badge badge-error badge-xs">Vencido</span>}
                        </div>
                      </td>
                      <td className="max-lg:hidden text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Scale className="w-3.5 h-3.5 text-base-content/40" />
                          <span className="text-sm">
                            {lot.initialQuantity} {lot.product.unitsOfMeasure.abbreviation}
                          </span>
                        </div>
                      </td>
                      <td className="max-sm:hidden text-center">
                        {isDepleted ? (
                          <span className="badge badge-error badge-sm gap-1">
                            <PackageX className="w-3 h-3" />
                            Agotado
                          </span>
                        ) : (
                          <span className="badge badge-success badge-sm gap-1">
                            <PackageCheck className="w-3 h-3" />
                            {lot.currentQuantity} {lot.product.unitsOfMeasure.abbreviation}
                          </span>
                        )}
                      </td>
                      <td className="max-xl:hidden">
                        <span className="text-sm text-base-content/60">
                          {formatDate(lot.createdAt.toString())}
                        </span>
                      </td>
                      <td className="max-md:hidden text-center">
                        {lot.isActive ? (
                          <span className="badge badge-success badge-sm gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Activo
                          </span>
                        ) : (
                          <span className="badge badge-ghost badge-sm gap-1">
                            <XCircle className="w-3 h-3" />
                            Inactivo
                          </span>
                        )}
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm btn-circle hover:bg-info/10 hover:text-info"
                          onClick={() => setSelectedLot(lot)}
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
              Mostrando {countLots} {countLots === 1 ? 'lote' : 'lotes'}
              {includeZeroStock && ' (incluyendo agotados)'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
