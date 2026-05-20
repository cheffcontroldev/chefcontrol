import { useQueryClient } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';

/* Hooks */
import { useLowStock } from '../hooks/useLowStock';

export default function LowStockList() {
  const { data: lowStocks, isLoading, error } = useLowStock();
  const queryClient = useQueryClient();

  return (
    <div className="w-full shadow-md p-3 border border-base-300">
      <div className="flex item-center justify-between">
        <h3 className="text-xl text-center-py-3">Productos bajo stock</h3>
        <button
          className="btn btn-sm btn-info"
          onClick={() => queryClient.invalidateQueries({ queryKey: ['low_stock'] })}
        >
          <RefreshCw size={16} />
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Stock actual</th>
            <th>Stock mínimo</th>
          </tr>
          {isLoading && (
            <tr>
              <td colSpan={3}>Cargando...</td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={3}>Error al cargar los lotes</td>
            </tr>
          )}
          {lowStocks?.length === 0 && !isLoading && !error && (
            <tr>
              <td colSpan={3}>No hay lotes próximos a vencer</td>
            </tr>
          )}
          {lowStocks?.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.productName}</td>
              <td>
                {stock.currentStock} {stock.unitAbbreviation}.
              </td>
              <td>
                {stock.stockMinimun} {stock.unitAbbreviation}.
              </td>
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
}
