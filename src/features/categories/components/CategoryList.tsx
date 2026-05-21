import { useCategories } from '../hooks/useCategories';
import { Tag, Plus, Eye, Trash2, AlertTriangle, Package, Loader2 } from 'lucide-react';

/* Stores */
import { useUiStore } from '@/stores/uiStore';
import { useCategoryStore } from '../store/CategoryStore';
import { useDeleteStore } from '@/stores/deleteStore';

/* Interfaces and Types */
import type { Category } from '../types';

/* Hooks */
import { useDeleteCategory } from '../hooks/useDeleteCategory';

/**
 * Table view of all non-deleted categories with show and delete actions per
 * row, plus an "Agregar Categoría" header button.
 */
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
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Tag className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Categorías</h2>
            <p className="text-sm text-base-content/60">
              {countCategories}{' '}
              {countCategories === 1 ? 'categoría registrada' : 'categorías registradas'}
            </p>
          </div>
        </div>

        <button type="button" className="btn btn-primary gap-2" onClick={onCreate}>
          <Plus className="w-4 h-4" />
          Agregar Categoría
        </button>
      </div>

      {countCategories === 0 && !isLoading && !error && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center py-16">
            <div className="p-4 bg-base-200 rounded-full mb-4">
              <Package className="w-8 h-8 text-base-content/40" />
            </div>
            <h3 className="text-lg font-semibold">No hay categorías</h3>
            <p className="text-base-content/60 max-w-sm">
              Comienza creando tu primera categoría para organizar los productos del inventario.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-outline gap-2 mt-4"
              onClick={onCreate}
            >
              <Plus className="w-4 h-4" />
              Crear categoría
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-lg">Cargando categorías...</span>
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

      {countCategories > 0 && (
        <div className="card bg-base-100 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200/50">
                  <th className="w-16 text-center">#</th>
                  <th>Nombre</th>
                  <th className="max-md:hidden">Descripción</th>
                  <th className="text-center w-32">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category, index) => (
                  <tr key={category.id} className="hover:bg-base-200/50 transition-colors group">
                    <td className="text-center">
                      <span className="badge badge-ghost badge-sm">{index + 1}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Tag className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </td>
                    <td className="max-md:hidden">
                      <p className="text-sm text-base-content/70 line-clamp-2 max-w-xs">
                        {category.description || 'Sin descripción'}
                      </p>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm btn-circle hover:bg-info/10 hover:text-info"
                          onClick={() => onShow(category)}
                          title="Ver detalle"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm btn-circle hover:bg-error/10 hover:text-error"
                          onClick={() => onDelete(category)}
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

          <div className="bg-base-200/30 px-6 py-3 text-sm text-base-content/60 flex justify-between items-center">
            <span>
              Mostrando {countCategories} {countCategories === 1 ? 'categoría' : 'categorías'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
