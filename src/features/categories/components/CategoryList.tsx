import { useCategories } from '../hooks/useCategories';
import { TableColumnActions } from '@/shared/components/TableColumnActions';
import TableHeaderActions from '@/shared/components/TableHeaderActions';
import { useUiStore } from '@/stores/uiStore';

export default function CategoryList() {
  const { data: categories, isLoading, error } = useCategories();
  const { setCategoryFormMode } = useUiStore();
  const countCategories = categories?.length || 0;
  return (
    <div className="overflow-x-auto w-full max-w-7xl">
      <TableHeaderActions title="Agregar Categoría" onAdd={() => setCategoryFormMode('create')} />
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="hidden">Id</th>
            <th>Nombre</th>
            <th className="max-sm:hidden">Descripción</th>
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
                No se encontraron categorías
              </td>
            </tr>
          )}
          {categories?.map((category) => (
            <tr key={category.id} className="hover:bg-base-300">
              <th className="hidden">{category.id.toString().slice(0, 8)}...</th>
              <td>{category.name}</td>
              <td className="max-sm:hidden">{category.description}</td>
              <td>
                <TableColumnActions formMode={() => setCategoryFormMode('show')} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
