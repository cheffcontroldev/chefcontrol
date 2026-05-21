import { useProducts } from '../hooks/useProducts';

/* Components */
import { TableColumnActions } from '@/shared/components/TableColumnActions';
import TableHeaderActions from '@/shared/components/TableHeaderActions';

/* Stores */
import { useUiStore } from '@/stores/uiStore';
import { useProductStore } from '../store/ProductStore';
import { useDeleteStore } from '@/stores/deleteStore';

/* Interfaces and Types */
import type { Product } from '../types';

/* Hooks */
import { useDeleteProduct } from '../hooks/useDeleteProduct';

/**
 * Table view of all non-deleted products with show and delete actions per
 * row, plus an "Agregar Producto" header button.
 */
export default function ProductList() {
  const { data: products, isLoading, error } = useProducts();
  const { setSelectedProduct } = useProductStore();
  const { setProductFormMode } = useUiStore();
  const { setShowConfirmDelete, setConfirmDeleteAction } = useDeleteStore();
  const { mutate: deleteProduct } = useDeleteProduct();
  const countProducts = products?.length || 0;

  const onShow = (product: Product) => {
    setSelectedProduct(product);
    setProductFormMode('show');
  };

  const onCreate = () => {
    setSelectedProduct(null);
    setProductFormMode('create');
  };

  const onDelete = (product: Product) => {
    setShowConfirmDelete(`¿Eliminar el producto "${product.name}"?`);
    setConfirmDeleteAction(() => deleteProduct({ id: product.id }));
  };

  return (
    <div className="overflow-x-auto w-full max-sm:min-w-[340px] min-w-xl md:min-w-2xl lg:min-w-4xl xl:min-w-5xl 2xl:min-w-7xl">
      <TableHeaderActions title="Agregar Producto" onAdd={() => onCreate()} />
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Nombre</th>
            <th className="max-sm:hidden">SKUCode</th>
            <th className="max-md:hidden">Categoría</th>
            <th className="max-lg:hidden">Stock mínimo</th>
            <th className="max-lg:hidden">Unidad de medida</th>
            <th className="max-xl:hidden">Activo</th>

            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={7} className="text-center">
                Cargando...
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={7} className="text-center">
                Error: {error.message}
              </td>
            </tr>
          )}
          {countProducts === 0 && !isLoading && !error && (
            <tr>
              <td colSpan={7} className="text-center">
                No se encontraron productos
              </td>
            </tr>
          )}
          {products?.map((product) => (
            <tr key={product.id} className="hover:bg-base-300">
              <td>{product.name}</td>
              <td className="max-sm:hidden">{product.skuCode}</td>
              <td className="max-md:hidden">{product.category.name}</td>
              <td className="max-lg:hidden">{product.stockMinimum}</td>
              <td className="max-lg:hidden">{product.unitsOfMeasure.name}</td>
              <td className="max-xl:hidden">{product.isActive ? 'Activo' : 'Inactivo'}</td>
              <td>
                <TableColumnActions
                  onShow={() => onShow(product)}
                  onDelete={() => onDelete(product)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
