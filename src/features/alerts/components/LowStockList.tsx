import { useQueryClient } from '@tanstack/react-query';
import {
  RefreshCw,
  Loader2,
  AlertTriangle,
  TrendingDown,
  PackageCheck,
  ArrowDown,
  Minus,
  AlertOctagon,
  BarChart3,
} from 'lucide-react';

/* Hooks */
import { useLowStock } from '../hooks/useLowStock';

/**
 * Table that lists products that have fallen below their minimum stock
 * threshold.
 *
 * Shows product name, current stock, and minimum stock. Includes a refresh
 * button.
 */
export default function LowStockList() {
  const { data: lowStocks, isLoading, error } = useLowStock();
  const queryClient = useQueryClient();

  const criticalCount = lowStocks?.filter((s) => s.currentStock === 0).length || 0;
  const lowCount = lowStocks?.filter((s) => s.currentStock > 0).length || 0;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header con stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-warning/10 rounded-xl">
            <TrendingDown className="w-6 h-6 text-warning" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Stock bajo</h2>
            <p className="text-sm text-base-content/60">
              {criticalCount > 0 && (
                <span className="text-error font-medium">{criticalCount} agotados</span>
              )}
              {criticalCount > 0 && lowCount > 0 && ' • '}
              {lowCount > 0 && (
                <span className="text-warning font-medium">{lowCount} bajo stock</span>
              )}
              {lowStocks?.length === 0 && 'Inventario en niveles normales'}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-ghost btn-sm btn-circle hover:bg-info/10 hover:text-info"
          onClick={() => queryClient.invalidateQueries({ queryKey: ['low_stock'] })}
          title="Actualizar"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Estado vacío - todo OK */}
      {lowStocks?.length === 0 && !isLoading && !error && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center py-16">
            <div className="p-4 bg-success/10 rounded-full mb-4">
              <PackageCheck className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold">Inventario saludable</h3>
            <p className="text-base-content/60 max-w-sm">
              Todos los productos están por encima de su stock mínimo configurado.
            </p>
          </div>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-warning" />
              <span className="ml-3 text-lg">Verificando niveles de stock...</span>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="alert alert-error shadow-lg">
          <AlertOctagon className="w-6 h-6" />
          <div>
            <h3 className="font-bold">Error al cargar alertas</h3>
            <p>{error.message}</p>
          </div>
        </div>
      )}

      {/* Tabla de alertas */}
      {lowStocks && lowStocks.length > 0 && (
        <div className="card bg-base-100 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200/50">
                  <th className="w-16 text-center">#</th>
                  <th>Producto</th>
                  <th className="text-center">Stock actual</th>
                  <th className="text-center">Stock mínimo</th>
                  <th className="text-right">Déficit</th>
                </tr>
              </thead>
              <tbody>
                {lowStocks.map((stock, index) => {
                  const isDepleted = stock.currentStock === 0;
                  const deficit = stock.stockMinimun - stock.currentStock;

                  return (
                    <tr
                      key={stock.id}
                      className={`hover:bg-base-200/50 transition-colors ${
                        isDepleted ? 'bg-error/5' : 'bg-warning/5'
                      }`}
                    >
                      <td className="text-center">
                        <span
                          className={`badge badge-sm ${
                            isDepleted ? 'badge-error' : 'badge-warning badge-outline'
                          }`}
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isDepleted ? 'bg-error/10' : 'bg-warning/10'
                            }`}
                          >
                            {isDepleted ? (
                              <AlertTriangle className="w-4 h-4 text-error" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-warning" />
                            )}
                          </div>
                          <div>
                            <span className={`font-medium block ${isDepleted ? 'text-error' : ''}`}>
                              {stock.productName}
                            </span>
                            <span className="text-xs text-base-content/50">
                              {stock.unitAbbreviation}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        {isDepleted ? (
                          <span className="badge badge-error badge-sm gap-1">
                            <Minus className="w-3 h-3" />
                            Agotado
                          </span>
                        ) : (
                          <span className="badge badge-warning badge-sm">
                            {stock.currentStock} {stock.unitAbbreviation}
                          </span>
                        )}
                      </td>
                      <td className="text-center">
                        <span className="badge badge-ghost badge-sm">
                          {stock.stockMinimun} {stock.unitAbbreviation}
                        </span>
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <ArrowDown
                            className={`w-4 h-4 ${isDepleted ? 'text-error' : 'text-warning'}`}
                          />
                          <span
                            className={`font-bold ${isDepleted ? 'text-error' : 'text-warning'}`}
                          >
                            -{deficit} {stock.unitAbbreviation}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="bg-base-200/30 px-6 py-3 text-sm text-base-content/60 flex justify-between items-center">
            <span>
              {lowStocks.length} {lowStocks.length === 1 ? 'producto' : 'productos'} requieren
              reposición
            </span>
            <span className="badge badge-ghost badge-sm gap-1">
              <BarChart3 className="w-3 h-3" />
              Stock crítico
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
