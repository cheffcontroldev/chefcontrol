import { Filter, Calendar, ArrowDownUp, Search, X } from 'lucide-react';

import type { ReportFilter as ReportFilterType } from '../types';

interface ReportFilterProps {
  filter: ReportFilterType;
  onFilterChange: (filter: ReportFilterType) => void;
  onApply: () => void;
  onClear: () => void;
  showTypeFilter?: boolean;
}

export default function ReportFilter({
  filter,
  onFilterChange,
  onApply,
  onClear,
  showTypeFilter = true,
}: ReportFilterProps) {
  const handleChange = (key: keyof ReportFilterType, value: string | undefined) => {
    onFilterChange({ ...filter, [key]: value || undefined });
  };

  return (
    <div className="bg-base-100 rounded-lg shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Filtros</h3>
        </div>
        <button type="button" className="btn btn-ghost btn-sm gap-1" onClick={onClear}>
          <X className="w-4 h-4" />
          Limpiar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        <div className="form-control">
          <label className="label">
            <span className="label-text">Acciones</span>
          </label>
          <button type="button" className="btn btn-primary btn-sm gap-1" onClick={onApply}>
            <Search className="w-4 h-4" />
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );
}
