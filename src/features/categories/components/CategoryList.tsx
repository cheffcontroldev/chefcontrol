import { useCategories } from '../hooks/useCategories';

/* Components */
import { TableColumnActions } from '@/shared/components/TableColumnActions';
import TableHeaderActions from '@/shared/components/TableHeaderActions';

/* Stores */
import { useUiStore } from '@/stores/uiStore';
import { useCategoryStore } from '../store/CategoryStore';
import { useDeleteStore } from '@/stores/deleteStore';

/* Interfaces and Types */
import type { Category } from '../types';

/* Hooks */
import { useDeleteCategory } from '../hooks/useDeleteCategory';

export default function CategoryList() {
  const { data: categories, isLoading, error } = useCategories();
  const { setSelectedCategory } = useCategoryStore();
  const { setCategoryFormMode } = useUiStore();
  const { setShowConfirmDelete, setConfirmDeleteAction } = useDeleteStore();
  const { mutate: deleteCategory } = useDeleteCategory();
  const countCategories = categories?.length || 0;

  const onShow = (category: Category) => {
    setSelectedCategory(category);
    setCategoryFormMode('show');
  };

  const onCreate = () => {
    setSelectedCategory(null);
    setCategoryFormMode('create');
  };

  const onDelete = (category: Category) => {
    setShowConfirmDelete(`¿Eliminar la categoría "${category.name}"?`);
    setConfirmDeleteAction(() => deleteCategory({ id: category.id }));
  };

  return (
    <div className="overflow-x-auto w-full max-w-4xl">
      <TableHeaderActions title="Agregar Categoría" onAdd={() => onCreate()} />
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Nombre</th>
            <th className="max-md:hidden">Descripción</th>
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
              <td>{category.name}</td>
              <td className="max-md:hidden">{category.description.slice(0, 50)}...</td>
              <td>
                <TableColumnActions
                  onShow={() => onShow(category)}
                  onDelete={() => onDelete(category)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
