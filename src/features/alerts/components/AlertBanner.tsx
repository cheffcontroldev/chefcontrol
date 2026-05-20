import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { Bell, BellRing } from 'lucide-react';

import type { ExpiringLot, LowStock } from '../types';
import { useExpiringLots } from '../hooks/useExpiringLots';
import { useLowStock } from '../hooks/useLowStock';

/* ──────────────── Subcomponente: Lista de notificaciones ──────────────── */

interface AlertNotificationListProps {
  expiringLots: ExpiringLot[];
  lowStocks: LowStock[];
  isLoading: boolean;
  hasError: boolean;
  onClose: () => void;
}

function AlertNotificationList({
  expiringLots,
  lowStocks,
  isLoading,
  hasError,
  onClose,
}: AlertNotificationListProps) {
  // Calcular vencidos vs por vencer
  const expiredLots = expiringLots.filter((lot) => lot.daysRemaining <= 0);
  const expiringSoonLots = expiringLots.filter((lot) => lot.daysRemaining > 0);

  // Cerrar al hacer click en cualquier link
  const handleClick = () => {
    onClose();
  };

  // Estados de carga y error
  if (isLoading) {
    return (
      <div className="fixed right-4 top-20 w-72 bg-base-100 shadow-2xl rounded-lg p-3 z-50 border border-base-300">
        <div className="text-sm text-center py-2">Cargando alertas...</div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="fixed right-4 top-20 w-72 bg-base-100 shadow-2xl rounded-lg p-3 z-50 border border-base-300">
        <div className="text-sm text-error text-center py-2">Error al cargar alertas</div>
      </div>
    );
  }

  // Sin alertas
  if (expiringLots.length === 0 && lowStocks.length === 0) return null;

  return (
    <div className="fixed right-4 top-20 w-72 bg-base-100 shadow-2xl rounded-lg p-3 z-50 border border-base-300">
      <h4 className="font-bold text-sm mb-3 border-b border-base-300 pb-2">Alertas</h4>

      {/* Vencidos */}
      {expiredLots.length > 0 && (
        <Link href="/alertas">
          <div
            className="p-2 mb-2 rounded bg-error/10 border border-error/20 cursor-pointer hover:bg-error/20 transition-colors"
            onClick={handleClick}
          >
            <span className="text-error text-sm font-medium">
              🔴 {expiredLots.length} lote{expiredLots.length !== 1 ? 's' : ''} vencido
              {expiredLots.length !== 1 ? 's' : ''}
            </span>
          </div>
        </Link>
      )}

      {/* Por vencer */}
      {expiringSoonLots.length > 0 && (
        <Link href="/alertas">
          <div
            className="p-2 mb-2 rounded bg-warning/10 border border-warning/20 cursor-pointer hover:bg-warning/20 transition-colors"
            onClick={handleClick}
          >
            <span className="text-warning text-sm font-medium">
              🟠 {expiringSoonLots.length} por vencer en 3 días
            </span>
          </div>
        </Link>
      )}

      {/* Stock bajo */}
      {lowStocks.length > 0 && (
        <Link href="/alertas">
          <div
            className="p-2 rounded bg-info/10 border border-info/20 cursor-pointer hover:bg-info/20 transition-colors"
            onClick={handleClick}
          >
            <span className="text-info text-sm font-medium">
              🟡 {lowStocks.length} producto{lowStocks.length !== 1 ? 's' : ''} con stock bajo
            </span>
          </div>
        </Link>
      )}

      <Link href="/alertas">
        <button className="btn btn-sm btn-ghost w-full mt-3 text-xs" onClick={handleClick}>
          Ver todas
        </button>
      </Link>
    </div>
  );
}

/* ──────────────── Componente principal ──────────────── */

export default function AlertBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: lowStocks, isLoading: isLoadingLowStock, isError: isErrorLowStock } = useLowStock();

  const {
    data: expiringLots,
    isLoading: isLoadingExpiring,
    isError: isErrorExpiring,
  } = useExpiringLots();

  const totalAlerts = (expiringLots?.length || 0) + (lowStocks?.length || 0);
  const isLoading = isLoadingLowStock || isLoadingExpiring;
  const hasError = isErrorLowStock || isErrorExpiring;
  const hasAlerts = totalAlerts > 0;

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón de la campana */}
      <button
        className="btn btn-ghost btn-circle relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Alertas"
      >
        {hasAlerts ? (
          <>
            <BellRing className="w-5 h-5 text-warning" />
            <span className="badge badge-sm badge-error absolute -top-1 -right-1">
              {totalAlerts}
            </span>
          </>
        ) : (
          <Bell className="w-5 h-5" />
        )}
      </button>

      {/* Dropdown de notificaciones */}
      {isOpen && (
        <AlertNotificationList
          expiringLots={expiringLots || []}
          lowStocks={lowStocks || []}
          isLoading={isLoading}
          hasError={hasError}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
