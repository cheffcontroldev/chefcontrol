import { useQueryClient } from '@tanstack/react-query';
import {
  RefreshCw,
  AlertTriangle,
  Loader2,
  CalendarClock,
  CheckCircle2,
  Clock,
  AlertOctagon,
  Timer,
  Settings2,
} from 'lucide-react';

/* Hooks */
import { useExpiringLots } from '../hooks/useExpiringLots';
import { useAlertConfig } from '../hooks/useAlertConfig';

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
  const { config: alertConfig } = useAlertConfig();

  const threshold = alertConfig?.expiration_alert_days || 7;
  const expiredCount = expiringLots?.filter((l) => l.daysRemaining < 0).length || 0;
  const todayCount = expiringLots?.filter((l) => l.daysRemaining === 0).length || 0;
  const warningCount =
    expiringLots?.filter((l) => l.daysRemaining > 0 && l.daysRemaining <= threshold).length || 0;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header con stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-error/10 rounded-xl">
            <CalendarClock className="w-6 h-6 text-error" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Lotes por vencer</h2>
            <p className="text-sm text-base-content/60">
              {expiredCount > 0 && (
                <span className="text-error font-medium">{expiredCount} vencidos</span>
              )}
              {expiredCount > 0 && todayCount > 0 && ' • '}
              {todayCount > 0 && <span className="text-warning font-medium">{todayCount} hoy</span>}
              {(expiredCount > 0 || todayCount > 0) && warningCount > 0 && ' • '}
              {warningCount > 0 && <span className="text-warning/70">{warningCount} próximos</span>}
              {expiringLots?.length === 0 && 'Sin alertas de vencimiento'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge badge-ghost badge-sm gap-1">
            <Settings2 className="w-3 h-3" />
            Umbral: {threshold} días
          </span>
          <button
            type="button"
            className="btn btn-ghost btn-sm btn-circle hover:bg-info/10 hover:text-info"
            onClick={() => queryClient.invalidateQueries({ queryKey: ['expiring_lots'] })}
            title="Actualizar"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Estado vacío - todo OK */}
      {expiringLots?.length === 0 && !isLoading && !error && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center py-16">
            <div className="p-4 bg-success/10 rounded-full mb-4">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold">Todo en orden</h3>
            <p className="text-base-content/60 max-w-sm">
              No hay lotes próximos a vencer dentro de los próximos {threshold} días.
            </p>
          </div>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-error" />
              <span className="ml-3 text-lg">Verificando vencimientos...</span>
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
      {expiringLots && expiringLots.length > 0 && (
        <div className="card bg-base-100 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200/50">
                  <th className="w-16 text-center">#</th>
                  <th>Producto</th>
                  <th>Estado</th>
                  <th className="text-right">Días restantes</th>
                </tr>
              </thead>
              <tbody>
                {expiringLots.map((lot, index) => {
                  const isExpired = lot.daysRemaining < 0;
                  const isToday = lot.daysRemaining === 0;
                  const isWarning = lot.daysRemaining > 0 && lot.daysRemaining <= threshold;

                  return (
                    <tr
                      key={lot.lotId}
                      className={`hover:bg-base-200/50 transition-colors ${
                        isExpired
                          ? 'bg-error/5'
                          : isToday
                            ? 'bg-warning/10'
                            : isWarning
                              ? 'bg-warning/5'
                              : ''
                      }`}
                    >
                      <td className="text-center">
                        <span
                          className={`badge badge-sm ${
                            isExpired
                              ? 'badge-error'
                              : isToday
                                ? 'badge-warning'
                                : isWarning
                                  ? 'badge-warning badge-outline'
                                  : 'badge-ghost'
                          }`}
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isExpired
                                ? 'bg-error/10'
                                : isToday
                                  ? 'bg-warning/20'
                                  : 'bg-warning/10'
                            }`}
                          >
                            {isExpired ? (
                              <AlertOctagon className="w-4 h-4 text-error" />
                            ) : isToday ? (
                              <Timer className="w-4 h-4 text-warning" />
                            ) : (
                              <Clock className="w-4 h-4 text-warning/70" />
                            )}
                          </div>
                          <span className={`font-medium ${isExpired ? 'text-error' : ''}`}>
                            {lot.productName}
                          </span>
                        </div>
                      </td>
                      <td>
                        {isExpired ? (
                          <span className="badge badge-error badge-sm gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Vencido
                          </span>
                        ) : isToday ? (
                          <span className="badge badge-warning badge-sm gap-1 animate-pulse">
                            <Timer className="w-3 h-3" />
                            Vence hoy
                          </span>
                        ) : (
                          <span
                            className={`badge badge-sm gap-1 ${
                              isWarning ? 'badge-warning badge-outline' : 'badge-ghost'
                            }`}
                          >
                            <Clock className="w-3 h-3" />
                            Próximo a vencer
                          </span>
                        )}
                      </td>
                      <td className="text-right">
                        {isExpired ? (
                          <span className="text-error font-bold">
                            {Math.abs(lot.daysRemaining)} días vencido
                          </span>
                        ) : isToday ? (
                          <span className="text-warning font-bold">Hoy</span>
                        ) : (
                          <span
                            className={`font-medium ${
                              isWarning ? 'text-warning' : 'text-base-content/60'
                            }`}
                          >
                            {lot.daysRemaining} días
                          </span>
                        )}
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
              {expiringLots.length} {expiringLots.length === 1 ? 'lote' : 'lotes'} requieren
              atención
            </span>
            <span className="badge badge-ghost badge-sm gap-1">
              <Settings2 className="w-3 h-3" />
              Umbral: {threshold} días
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
