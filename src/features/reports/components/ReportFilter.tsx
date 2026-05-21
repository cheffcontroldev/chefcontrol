import { useState } from 'react';
import { Filter, Calendar, ArrowDownUp } from 'lucide-react';

import type { ReportFilter as ReportFilterType } from '../types';

interface ReportFilterProps {
  onFilterChange: (filter: ReportFilterType) => void;
  showTypeFilter?: boolean;
}

/**
 * Reusable filter bar for report pages.
 *
 * Provides date range inputs (from/to), an optional movement type dropdown,
 * and a clear-filters button. Every change immediately calls
 * `onFilterChange` with the new filter state.
 */
export default function ReportFilter({ onFilterChange, showTypeFilter = true }: ReportFilterProps) {
  const [filter, setFilter] = useState<ReportFilterType>({});

  const handleChange = (key: keyof ReportFilterType, value: string | undefined) => {
    const newFilter = { ...filter, [key]: value || undefined };
    setFilter(newFilter);
    onFilterChange(newFilter);
  };

  const handleClear = () => {
    setFilter({});
    onFilterChange({});
  };

  return (
    <div className="bg-base-100 rounded-lg shadow p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Filtros</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* From date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Desde
            </span>
          </label>
          <input
            type="date"
            className="input input-bordered input-sm w-full"
            value={filter.fromDate || ''}
            onChange={(e) => handleChange('fromDate', e.target.value)}
          />
        </div>

        {/* To date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Hasta
            </span>
          </label>
          <input
            type="date"
            className="input input-bordered input-sm w-full"
            value={filter.toDate || ''}
            onChange={(e) => handleChange('toDate', e.target.value)}
          />
        </div>

        {/* Movement type */}
        {showTypeFilter && (
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-1">
                <ArrowDownUp className="w-3 h-3" />
                Tipo
              </span>
            </label>
            <select
              className="select select-bordered select-sm w-full"
              value={filter.type || ''}
              onChange={(e) => handleChange('type', e.target.value || undefined)}
            >
              <option value="">Todos</option>
              <option value="entry">Entradas</option>
              <option value="exit">Salidas</option>
            </select>
          </div>
        )}

        {/* Clear button */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Acciones</span>
          </label>
          <button type="button" className="btn btn-outline btn-sm" onClick={handleClear}>
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
}
