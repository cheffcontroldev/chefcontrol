import { useQueryClient } from '@tanstack/react-query';
import { RefreshCw, TriangleAlert } from 'lucide-react';

/* Hooks */
import { useExpiringLots } from '../hooks/useExpiringLots';

/**
 * Table that lists products/lots that are expiring within the configured
 * threshold.
 *
 * Shows expired, expiring-today, and "expires in N days" states with colour
 * coding. Includes a refresh button.
 */
export default function ExpiringLotsList() {
  const { data: expiringLots, isLoading, error } = useExpiringLots();
  const queryClient = useQueryClient();

  return (
    <div className="w-full shadow-md p-3 border border-base-300">
      <div className="flex item-center justify-between">
        <h3 className="text-xl text-center-py-3">Productos próximos a vencer</h3>
        <button
          className="btn btn-sm btn-info"
          onClick={() => queryClient.invalidateQueries({ queryKey: ['expiring_lots'] })}
        >
          <RefreshCw size={16} />
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Información</th>
          </tr>
          {isLoading && (
            <tr>
              <td colSpan={2}>Cargando...</td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={2}>Error al cargar los lotes</td>
            </tr>
          )}
          {expiringLots?.length === 0 && !isLoading && !error && (
            <tr>
              <td colSpan={2}>No hay lotes próximos a vencer</td>
            </tr>
          )}
          {expiringLots?.map((lot) => (
            <tr key={lot.lotId}>
              <td>{lot.productName}</td>
              <td className={lot.daysRemaining <= 0 && 'text-error'}>
                {lot.daysRemaining < 0 && (
                  <>
                    <TriangleAlert className="inline-block mr-1" size={16} />
                    Vencido
                    <TriangleAlert className="inline-block mr-1" size={16} />
                  </>
                )}

                {lot.daysRemaining == 0 && (
                  <>
                    <TriangleAlert className="inline-block mr-1" size={16} />
                    Vence hoy
                  </>
                )}

                {lot.daysRemaining > 0 && `Vence en ${lot.daysRemaining} días`}
              </td>
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
}
