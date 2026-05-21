import { useProducts } from '../hooks/useProducts';
import {
  Package,
  Plus,
  Eye,
  Trash2,
  AlertTriangle,
  Boxes,
  Loader2,
  Barcode,
  Tag,
  Scale,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

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
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Package className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Productos</h2>
            <p className="text-sm text-base-content/60">
              {countProducts}{' '}
              {countProducts === 1 ? 'producto registrado' : 'productos registrados'}
            </p>
          </div>
        </div>

        <button type="button" className="btn btn-primary gap-2" onClick={onCreate}>
          <Plus className="w-4 h-4" />
          Agregar Producto
        </button>
      </div>

      {countProducts === 0 && !isLoading && !error && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center py-16">
            <div className="p-4 bg-base-200 rounded-full mb-4">
              <Boxes className="w-8 h-8 text-base-content/40" />
            </div>
            <h3 className="text-lg font-semibold">No hay productos</h3>
            <p className="text-base-content/60 max-w-sm">
              Comienza creando tu primer producto para gestionar el inventario del restaurante.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-outline gap-2 mt-4"
              onClick={onCreate}
            >
              <Plus className="w-4 h-4" />
              Crear producto
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-lg">Cargando productos...</span>
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

      {countProducts > 0 && (
        <div className="card bg-base-100 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200/50">
                  <th className="w-16 text-center">#</th>
                  <th>Producto</th>
                  <th className="max-sm:hidden">SKU</th>
                  <th className="max-md:hidden">Categoría</th>
                  <th className="max-lg:hidden text-center">Stock mín.</th>
                  <th className="max-lg:hidden">Unidad</th>
                  <th className="max-xl:hidden text-center">Estado</th>
                  <th className="text-center w-32">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => (
                  <tr key={product.id} className="hover:bg-base-200/50 transition-colors group">
                    <td className="text-center">
                      <span className="badge badge-ghost badge-sm">{index + 1}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium block">{product.name}</span>
                          <span className="text-xs text-base-content/50 sm:hidden">
                            {product.skuCode}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="max-sm:hidden">
                      <div className="flex items-center gap-1.5">
                        <Barcode className="w-3.5 h-3.5 text-base-content/40" />
                        <span className="font-mono text-sm">{product.skuCode}</span>
                      </div>
                    </td>
                    <td className="max-md:hidden">
                      <span className="badge badge-ghost badge-sm gap-1">
                        <Tag className="w-3 h-3" />
                        {product.category.name}
                      </span>
                    </td>
                    <td className="max-lg:hidden text-center">
                      <span className="badge badge-sm">{product.stockMinimum}</span>
                    </td>
                    <td className="max-lg:hidden">
                      <div className="flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-base-content/40" />
                        <span className="text-sm">{product.unitsOfMeasure.abbreviation}</span>
                      </div>
                    </td>
                    <td className="max-xl:hidden text-center">
                      {product.isActive ? (
                        <span className="badge badge-success badge-sm gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Activo
                        </span>
                      ) : (
                        <span className="badge badge-ghost badge-sm gap-1">
                          <XCircle className="w-3 h-3" />
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm btn-circle hover:bg-info/10 hover:text-info"
                          onClick={() => onShow(product)}
                          title="Ver detalle"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm btn-circle hover:bg-error/10 hover:text-error"
                          onClick={() => onDelete(product)}
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
              Mostrando {countProducts} {countProducts === 1 ? 'producto' : 'productos'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
