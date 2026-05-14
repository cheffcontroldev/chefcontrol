import { useUnitsOfMeasure } from '../hooks/useUnitsOfMeasure';

/* Components */
import { TableColumnActions } from '@/shared/components/TableColumnActions';
import TableHeaderActions from '@/shared/components/TableHeaderActions';

/* Stores */
import { useUiStore } from '@/stores/uiStore';
import { useUnitOfMeasureStore } from '../store/UnitOfMeasureStore';
import { useDeleteStore } from '@/stores/deleteStore';

/* Interfaces and Types */
import type { UnitOfMeasure } from '../types';

/* Hooks */
import { useDeleteUnitOfMeasure } from '../hooks/useDeleteUnitsOfMeasure';

export default function CategoryList() {
  const { data: categories, isLoading, error } = useUnitsOfMeasure();
  const { setSelectedUnitOfMeasure } = useUnitOfMeasureStore();
  const { setUnitOfMeasureFormMode } = useUiStore();
  const { setShowConfirmDelete, setConfirmDeleteAction } = useDeleteStore();
  const { mutate: deleteUnitOfMeasure } = useDeleteUnitOfMeasure();
  const countCategories = categories?.length || 0;

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
    <div className="overflow-x-auto w-full max-w-4xl">
      <TableHeaderActions title="Agregar Unidad de Medida" onAdd={() => onCreate()} />
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="hidden">Id</th>
            <th>Nombre</th>
            <th className="max-md:hidden">Abreviatura</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={5} className="text-center">
                Cargando...
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={5} className="text-center">
                Error: {error.message}
              </td>
            </tr>
          )}
          {countCategories === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                No se encontraron unidades de medida
              </td>
            </tr>
          )}
          {categories?.map((unitOfMeasure) => (
            <tr key={unitOfMeasure.id} className="hover:bg-base-300">
              <th className="hidden">{unitOfMeasure.id.toString().slice(0, 8)}...</th>
              <td>{unitOfMeasure.name}</td>
              <td className="max-md:hidden">{unitOfMeasure.abbreviation}</td>
              <td>
                <TableColumnActions
                  onShow={() => onShow(unitOfMeasure)}
                  onDelete={() => onDelete(unitOfMeasure)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
