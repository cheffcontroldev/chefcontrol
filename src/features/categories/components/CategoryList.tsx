import { useCategories } from '../hooks/useCategories';

/* Components */
import { TableColumnActions } from '@/shared/components/TableColumnActions';
import TableHeaderActions from '@/shared/components/TableHeaderActions';

/* Stores */
import { useUiStore } from '@/stores/uiStore';
import { useCategoryStore } from '../store/CategoryStore';

/* Interfaces and Types */
import type { Category } from '../types';

export default function CategoryList() {
  const { data: categories, isLoading, error } = useCategories();
  const { setSelectedCategory } = useCategoryStore();
  const { setCategoryFormMode } = useUiStore();
  const countCategories = categories?.length || 0;

  const onShow = (category: Category) => {
    setSelectedCategory(category);
    setCategoryFormMode('show');
  };

  const onCreate = () => {
    setSelectedCategory(null);
    setCategoryFormMode('create');
  };

  return (
    <div className="overflow-x-auto w-full max-w-4xl">
      <TableHeaderActions title="Agregar Categoría" onAdd={() => onCreate()} />
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
                <TableColumnActions onShow={() => onShow(category)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
