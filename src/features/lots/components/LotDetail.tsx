import {
  AlertTriangle,
  AlertOctagon,
  Timer,
  CheckCircle2,
  Package,
  CalendarDays,
  Scale,
  Boxes,
  X,
  Clock,
  ArrowDown,
  Tag,
} from 'lucide-react';
import DetailModal from '@/shared/components/DetailModal';

import { useLotStore } from '../store/LottStore';

import { formatDate, isExpiringSoon, isExpired } from '@/shared/utils/dataHelpers';

/**
 * Detail modal that displays full information about the selected lot.
 *
 * Highlights expiring and expired dates with error styling. Only rendered
 * when `selectedLot` is not null.
 */
export default function LotDetail() {
  const { selectedLot, setSelectedLot } = useLotStore();

  if (!selectedLot) return null;

  const expired = isExpired(selectedLot.expirationDate);
  const expiringSoon = isExpiringSoon(selectedLot.expirationDate, 7);
  const depleted = selectedLot.currentQuantity === 0;

  const statusConfig = expired
    ? {
        icon: AlertOctagon,
        label: 'Vencido',
        color: 'text-error',
        bg: 'bg-error/10',
        border: 'border-error',
        badge: 'badge-error',
      }
    : expiringSoon
      ? {
          icon: Timer,
          label: 'Por vencer',
          color: 'text-warning',
          bg: 'bg-warning/10',
          border: 'border-warning',
          badge: 'badge-warning',
        }
      : depleted
        ? {
            icon: AlertTriangle,
            label: 'Agotado',
            color: 'text-error',
            bg: 'bg-error/10',
            border: 'border-error',
            badge: 'badge-error',
          }
        : {
            icon: CheckCircle2,
            label: 'Vigente',
            color: 'text-success',
            bg: 'bg-success/10',
            border: 'border-success',
            badge: 'badge-success',
          };

  const StatusIcon = statusConfig.icon;

  return (
    <DetailModal>
      <div className="space-y-6 max-w-md mx-auto">
        <div className="text-center space-y-3">
          <div
            className={`w-16 h-16 rounded-2xl ${statusConfig.bg} ${statusConfig.border} border-2 flex items-center justify-center mx-auto`}
          >
            <StatusIcon className={`w-8 h-8 ${statusConfig.color}`} />
          </div>
          <div>
            <h3 className="text-xl font-bold">{selectedLot.product?.name}</h3>
            <span className={`badge badge-lg gap-1 mt-2 ${statusConfig.badge}`}>
              <StatusIcon className="w-4 h-4" />
              {statusConfig.label}
            </span>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg border border-base-200">
          <div className="card-body space-y-1 p-4">
            <div className="flex items-center justify-between py-3 border-b border-base-200 last:border-0">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <Package className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-base-content/60">Producto</p>
                  <p className="font-medium">{selectedLot.product?.name}</p>
                </div>
              </div>
              <span className="badge badge-ghost badge-sm gap-1">
                <Tag className="w-3 h-3" />
                {selectedLot.product?.unitsOfMeasure?.abbreviation}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-base-200 last:border-0">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-accent/10 rounded-lg">
                  <CalendarDays className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-base-content/60">Fecha de creación</p>
                  <p className="font-medium">{formatDate(selectedLot.createdAt)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-base-200 last:border-0">
              <div className="flex items-center gap-3">
                <div
                  className={`p-1.5 rounded-lg ${expired ? 'bg-error/10' : expiringSoon ? 'bg-warning/10' : 'bg-success/10'}`}
                >
                  <Clock
                    className={`w-4 h-4 ${expired ? 'text-error' : expiringSoon ? 'text-warning' : 'text-success'}`}
                  />
                </div>
                <div>
                  <p className="text-xs text-base-content/60">Vencimiento</p>
                  <p
                    className={`font-medium ${expired ? 'text-error' : expiringSoon ? 'text-warning' : ''}`}
                  >
                    {expired && <AlertOctagon className="inline-block w-4 h-4 mr-1" />}
                    {formatDate(selectedLot.expirationDate)}
                  </p>
                </div>
              </div>
              {expired && <span className="badge badge-error badge-sm">Vencido</span>}
              {expiringSoon && !expired && (
                <span className="badge badge-warning badge-sm">Próximo</span>
              )}
            </div>

            <div className="flex items-center justify-between py-3 border-b border-base-200 last:border-0">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-info/10 rounded-lg">
                  <Boxes className="w-4 h-4 text-info" />
                </div>
                <div>
                  <p className="text-xs text-base-content/60">Cantidad inicial</p>
                  <p className="font-medium">
                    {selectedLot.initialQuantity}{' '}
                    {selectedLot.product?.unitsOfMeasure?.abbreviation}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-base-200 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg ${depleted ? 'bg-error/10' : 'bg-success/10'}`}>
                  <Scale className={`w-4 h-4 ${depleted ? 'text-error' : 'text-success'}`} />
                </div>
                <div>
                  <p className="text-xs text-base-content/60">Cantidad actual</p>
                  <p className={`font-medium ${depleted ? 'text-error' : ''}`}>
                    {depleted ? (
                      <>
                        <AlertTriangle className="inline-block w-4 h-4 mr-1" />
                        Agotado
                      </>
                    ) : (
                      `${selectedLot.currentQuantity} ${selectedLot.product?.unitsOfMeasure?.abbreviation}`
                    )}
                  </p>
                </div>
              </div>
              {!depleted && (
                <div className="flex items-center gap-1 text-sm text-base-content/60">
                  <ArrowDown className="w-3 h-3" />
                  {Math.round((selectedLot.currentQuantity / selectedLot.initialQuantity) * 100)}%
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            className="btn btn-neutral gap-2"
            onClick={() => setSelectedLot(null)}
          >
            <X className="w-4 h-4" />
            Cerrar
          </button>
        </div>
      </div>
    </DetailModal>
  );
}
