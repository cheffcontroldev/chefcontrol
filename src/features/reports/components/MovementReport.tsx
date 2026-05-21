import { useState, useMemo, useCallback } from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  AlertTriangle,
  FileText,
  PackageMinus,
  PackagePlus,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useMovementReport } from '../hooks/useMovementReport';
import ReportFilter from './ReportFilter';
import ExportButton from './ExportButton';

import type { ReportFilter as ReportFilterType } from '../types';

/**
 * Movement report page with filters, summary stats, and a sortable data table.
 *
 * Includes export functionality via {@link ExportButton}.
 */
export default function MovementReport() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  const [filterInput, setFilterInput] = useState<ReportFilterType>({});

  const [appliedFilter, setAppliedFilter] = useState<ReportFilterType>({});

  const {
    data: movements,
    isLoading,
    isError,
  } = useMovementReport(restaurantId || '', appliedFilter);

  const stats = useMemo(() => {
    if (!movements) return { totalEntries: 0, totalExits: 0, totalMovements: 0 };

    return {
      totalEntries: movements.filter((m) => m.type === 'entry').length,
      totalExits: movements.filter((m) => m.type === 'exit').length,
      totalMovements: movements.length,
    };
  }, [movements]);

  const handleApplyFilters = useCallback(() => {
    setAppliedFilter(filterInput);
  }, [filterInput]);

  const handleClearFilters = useCallback(() => {
    setFilterInput({});
    setAppliedFilter({});
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error">
        <AlertTriangle className="w-5 h-5" />
        <span>Error al cargar el reporte de movimientos</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ReportFilter
        filter={filterInput}
        onFilterChange={setFilterInput}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
        showTypeFilter={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-success">
              <PackagePlus className="w-8 h-8" />
            </div>
            <div className="stat-title">Entradas</div>
            <div className="stat-value text-success">{stats.totalEntries}</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-error">
              <PackageMinus className="w-8 h-8" />
            </div>
            <div className="stat-title">Salidas</div>
            <div className="stat-value text-error">{stats.totalExits}</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-primary">
              <FileText className="w-8 h-8" />
            </div>
            <div className="stat-title">Total de movimientos</div>
            <div className="stat-value text-primary">{stats.totalMovements}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <ExportButton data={movements || []} filename="movimientos" />
      </div>

      {!movements || movements.length === 0 ? (
        <div className="alert alert-info">
          <FileText className="w-5 h-5" />
          <span>No hay movimientos para el período seleccionado</span>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Proveedor</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {movements.map((movement) => (
                <tr key={movement.movementId} className={movement.isCancelled ? 'opacity-50' : ''}>
                  <td>{new Date(movement.movementDate).toLocaleDateString()}</td>
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
                  <td className="font-medium">{movement.product.name}</td>
                  <td>
                    {movement.quantity} {movement.product.unitsOfMeasure?.abbreviation || ''}
                  </td>
                  <td>{movement.reason}</td>
                  <td>
                    {movement.isCancelled ? (
                      <span className="badge badge-ghost badge-sm">Anulado</span>
                    ) : (
                      <span className="badge badge-success badge-sm">Activo</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
