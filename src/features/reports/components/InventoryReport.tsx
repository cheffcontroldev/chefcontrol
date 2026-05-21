import { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, Boxes } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useInventoryReport } from '../hooks/useInventoryReport';
import ExportButton from './ExportButton';

/**
 * Inventory report page with expandable rows showing lot-level detail.
 *
 * Renders a summary bar (total products, low-stock count, expired lots),
 * an export button, and a table where each product row can be expanded to
 * show its individual lots with expiration status.
 */
export default function InventoryReport() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;
  const { data: inventory, isLoading, isError } = useInventoryReport(restaurantId || '');
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());

  const toggleProduct = (productId: string) => {
    const newSet = new Set(expandedProducts);
    if (newSet.has(productId)) {
      newSet.delete(productId);
    } else {
      newSet.add(productId);
    }
    setExpandedProducts(newSet);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error">
        <AlertTriangle className="w-5 h-5" />
        <span>Error al cargar el reporte de inventario</span>
      </div>
    );
  }

  if (!inventory || inventory.length === 0) {
    return (
      <div className="alert alert-info">
        <Boxes className="w-5 h-5" />
        <span>No hay productos en el inventario</span>
      </div>
    );
  }

  const totalProducts = inventory.length;
  const lowStockCount = inventory.filter((item) => item.deficit > 0).length;
  const expiredLots = inventory.flatMap((item) => item.lots.filter((lot) => lot.isExpired));

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Boxes className="w-8 h-8" />
            </div>
            <div className="stat-title">Productos</div>
            <div className="stat-value text-primary">{totalProducts}</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-warning">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="stat-title">Stock bajo</div>
            <div className="stat-value text-warning">{lowStockCount}</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-error">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="stat-title">Lotes vencidos</div>
            <div className="stat-value text-error">{expiredLots.length}</div>
          </div>
        </div>
      </div>

      {/* Export */}
      <div className="flex justify-end">
        <ExportButton data={inventory} filename="inventario" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Stock mínimo</th>
              <th>Stock actual</th>
              <th>Déficit</th>
              <th>Lotes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => {
              const isExpanded = expandedProducts.has(item.productId);
              const hasDeficit = item.deficit > 0;

              return (
                <>
                  <tr
                    key={item.productId}
                    className={`cursor-pointer hover:bg-base-200 transition-colors ${
                      hasDeficit ? 'bg-warning/10' : ''
                    }`}
                    onClick={() => toggleProduct(item.productId)}
                  >
                    <td className="font-medium">{item.productName}</td>
                    <td>{item.categoryName || '—'}</td>
                    <td>
                      {item.stockMinimum} {item.unitOfMeasure.abbreviation}
                    </td>
                    <td className={hasDeficit ? 'text-warning font-semibold' : ''}>
                      {item.currentStock} {item.unitOfMeasure.abbreviation}
                    </td>
                    <td>
                      {hasDeficit ? (
                        <span className="badge badge-warning badge-sm">
                          -{item.deficit} {item.unitOfMeasure.abbreviation}
                        </span>
                      ) : (
                        <span className="badge badge-success badge-sm">OK</span>
                      )}
                    </td>
                    <td>{item.lots.length}</td>
                    <td>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </td>
                  </tr>

                  {/* Lot details */}
                  {isExpanded && (
                    <tr className="bg-base-100">
                      <td colSpan={7} className="p-0">
                        <div className="p-4">
                          <h4 className="font-semibold text-sm mb-3">
                            Lotes de {item.productName}
                          </h4>
                          {item.lots.length === 0 ? (
                            <p className="text-sm text-base-content/60">Sin lotes activos</p>
                          ) : (
                            <table className="table table-sm w-full">
                              <thead>
                                <tr className="bg-base-200">
                                  <th>Vencimiento</th>
                                  <th>Cantidad inicial</th>
                                  <th>Cantidad actual</th>
                                  <th>Días restantes</th>
                                  <th>Estado</th>
                                </tr>
                              </thead>
                              <tbody>
                                {item.lots.map((lot) => (
                                  <tr key={lot.lotId}>
                                    <td>{new Date(lot.expirationDate).toLocaleDateString()}</td>
                                    <td>
                                      {lot.initialQuantity} {item.unitOfMeasure.abbreviation}
                                    </td>
                                    <td>
                                      {lot.currentQuantity} {item.unitOfMeasure.abbreviation}
                                    </td>
                                    <td>
                                      {lot.daysRemaining <= 0 ? (
                                        <span className="badge badge-error badge-sm">Vencido</span>
                                      ) : lot.daysRemaining <= 3 ? (
                                        <span className="badge badge-warning badge-sm">
                                          {lot.daysRemaining} días
                                        </span>
                                      ) : (
                                        <span className="badge badge-success badge-sm">
                                          {lot.daysRemaining} días
                                        </span>
                                      )}
                                    </td>
                                    <td>
                                      {lot.isExpired ? (
                                        <span className="text-error text-sm">Vencido</span>
                                      ) : (
                                        <span className="text-success text-sm">Vigente</span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
