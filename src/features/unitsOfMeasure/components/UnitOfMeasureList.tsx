import { useUnitsOfMeasure } from '../hooks/useUnitsOfMeasure';
import { Ruler, Plus, Eye, Trash2, AlertTriangle, Scale, Loader2 } from 'lucide-react';

/* Stores */
import { useUiStore } from '@/stores/uiStore';
import { useUnitOfMeasureStore } from '../store/UnitOfMeasureStore';
import { useDeleteStore } from '@/stores/deleteStore';

/* Interfaces and Types */
import type { UnitOfMeasure } from '../types';

/* Hooks */
import { useDeleteUnitOfMeasure } from '../hooks/useDeleteUnitsOfMeasure';

/**
 * Table view of all non-deleted units of measure with show and delete actions
 * per row, plus an "Agregar Unidad de Medida" header button.
 */
export default function UnitOfMeasureList() {
  const { data: unitOfMeasures, isLoading, error } = useUnitsOfMeasure();
  const { setSelectedUnitOfMeasure } = useUnitOfMeasureStore();
  const { setUnitOfMeasureFormMode } = useUiStore();
  const { setShowConfirmDelete, setConfirmDeleteAction } = useDeleteStore();
  const { mutate: deleteUnitOfMeasure } = useDeleteUnitOfMeasure();
  const countUnitOfMeasures = unitOfMeasures?.length || 0;

  const onShow = (unitOfMeasure: UnitOfMeasure) => {
    setSelectedUnitOfMeasure(unitOfMeasure);
    setUnitOfMeasureFormMode('show');
  };

  const onCreate = () => {
    setSelectedUnitOfMeasure(null);
    setUnitOfMeasureFormMode('create');
  };

  const onDelete = (unitOfMeasure: UnitOfMeasure) => {
    setShowConfirmDelete(`¿Eliminar la unidad de medida "${unitOfMeasure.name}"?`);
    setConfirmDeleteAction(() => deleteUnitOfMeasure({ id: unitOfMeasure.id }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-secondary/10 rounded-xl">
            <Ruler className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Unidades de Medida</h2>
            <p className="text-sm text-base-content/60">
              {countUnitOfMeasures}{' '}
              {countUnitOfMeasures === 1 ? 'unidad registrada' : 'unidades registradas'}
            </p>
          </div>
        </div>

        <button type="button" className="btn btn-secondary gap-2" onClick={onCreate}>
          <Plus className="w-4 h-4" />
          Agregar Unidad
        </button>
      </div>

      {countUnitOfMeasures === 0 && !isLoading && !error && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center py-16">
            <div className="p-4 bg-base-200 rounded-full mb-4">
              <Scale className="w-8 h-8 text-base-content/40" />
            </div>
            <h3 className="text-lg font-semibold">No hay unidades de medida</h3>
            <p className="text-base-content/60 max-w-sm">
              Comienza creando tu primera unidad para gestionar el inventario de productos.
            </p>
            <button
              type="button"
              className="btn btn-secondary btn-outline gap-2 mt-4"
              onClick={onCreate}
            >
              <Plus className="w-4 h-4" />
              Crear unidad
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-secondary" />
              <span className="ml-3 text-lg">Cargando unidades...</span>
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

      {countUnitOfMeasures > 0 && (
        <div className="card bg-base-100 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200/50">
                  <th className="w-16 text-center">#</th>
                  <th>Nombre</th>
                  <th className="max-md:hidden">Abreviatura</th>
                  <th className="text-center w-32">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {unitOfMeasures?.map((unitOfMeasure, index) => (
                  <tr
                    key={unitOfMeasure.id}
                    className="hover:bg-base-200/50 transition-colors group"
                  >
                    <td className="text-center">
                      <span className="badge badge-ghost badge-sm">{index + 1}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                          <Ruler className="w-4 h-4 text-secondary" />
                        </div>
                        <span className="font-medium">{unitOfMeasure.name}</span>
                      </div>
                    </td>
                    <td className="max-md:hidden">
                      <span className="badge badge-outline badge-sm font-mono">
                        {unitOfMeasure.abbreviation}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm btn-circle hover:bg-info/10 hover:text-info"
                          onClick={() => onShow(unitOfMeasure)}
                          title="Ver detalle"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm btn-circle hover:bg-error/10 hover:text-error"
                          onClick={() => onDelete(unitOfMeasure)}
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer con info */}
          <div className="bg-base-200/30 px-6 py-3 text-sm text-base-content/60 flex justify-between items-center">
            <span>
              Mostrando {countUnitOfMeasures} {countUnitOfMeasures === 1 ? 'unidad' : 'unidades'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
