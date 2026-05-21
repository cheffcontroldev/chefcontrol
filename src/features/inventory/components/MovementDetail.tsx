import {
  PackageMinus,
  PackagePlus,
  X,
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  Scale,
  FileText,
  StickyNote,
  Ban,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Clock,
  Tag,
} from 'lucide-react';
import DetailModal from '@/shared/components/DetailModal';
import CancelConfirmModal from '../components/CancelConfirmModal';

import { useMovementStore } from '../store/MovementStore';
import { useCancelMovement } from '../hooks/useCancelMovement';

/**
 * Detail modal that displays full information about the selected movement.
 *
 * Includes a "Cancelar movimiento" button for non-cancelled entries/exits.
 * When there are downstream dependencies, the cancel flow shows a
 * confirmation modal via {@link CancelConfirmModal}.
 */
export default function MovementDetail() {
  const { selectedMovement, setSelectedMovement } = useMovementStore();
  const { initiateCancel, confirmCancel, closeConfirm, dependencies, showConfirmModal, isLoading } =
    useCancelMovement();

  if (!selectedMovement) return null;

  const handleCancel = () => {
    if (!selectedMovement || selectedMovement.isCancelled) return;
    initiateCancel(selectedMovement.id);
  };

  const canCancel =
    !selectedMovement.isCancelled &&
    (selectedMovement.type === 'exit' || selectedMovement.type === 'entry');

  const isEntry = selectedMovement.type === 'entry';

  const statusConfig = selectedMovement.isCancelled
    ? {
        icon: Ban,
        label: 'Anulado',
        color: 'text-error',
        bg: 'bg-error/10',
        border: 'border-error',
        badge: 'badge-error',
      }
    : {
        icon: CheckCircle2,
        label: 'Activo',
        color: 'text-success',
        bg: 'bg-success/10',
        border: 'border-success',
        badge: 'badge-success',
      };

  const StatusIcon = statusConfig.icon;

  return (
    <>
      <DetailModal>
        <div className="space-y-6 max-w-md mx-auto">
          <div className="text-center space-y-3">
            <div
              className={`w-16 h-16 rounded-2xl ${isEntry ? 'bg-success/10 border-success' : 'bg-error/10 border-error'} border-2 flex items-center justify-center mx-auto`}
            >
              {isEntry ? (
                <PackagePlus className="w-8 h-8 text-success" />
              ) : (
                <PackageMinus className="w-8 h-8 text-error" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold">{selectedMovement.product?.name}</h3>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span
                  className={`badge badge-lg gap-1 ${isEntry ? 'badge-success' : 'badge-error'}`}
                >
                  {isEntry ? (
                    <ArrowDownLeft className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                  {isEntry ? 'Entrada' : 'Salida'}
                </span>
                <span className={`badge badge-lg gap-1 ${statusConfig.badge}`}>
                  <StatusIcon className="w-4 h-4" />
                  {statusConfig.label}
                </span>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg border border-base-200">
            <div className="card-body space-y-1 p-4">
              {/* Producto */}
              <div className="flex items-center justify-between py-3 border-b border-base-200 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <Tag className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60">Producto</p>
                    <p className="font-medium">{selectedMovement.product?.name}</p>
                  </div>
                </div>
                <span className="badge badge-ghost badge-sm">
                  {selectedMovement.product?.unitsOfMeasure?.abbreviation}
                </span>
              </div>

              {/* Cantidad */}
              <div className="flex items-center justify-between py-3 border-b border-base-200 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${isEntry ? 'bg-success/10' : 'bg-error/10'}`}>
                    <Scale className={`w-4 h-4 ${isEntry ? 'text-success' : 'text-error'}`} />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60">Cantidad</p>
                    <p className={`font-medium ${isEntry ? 'text-success' : 'text-error'}`}>
                      {isEntry ? '+' : '-'}
                      {selectedMovement.quantity}{' '}
                      {selectedMovement.product?.unitsOfMeasure?.abbreviation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Fecha */}
              <div className="flex items-center justify-between py-3 border-b border-base-200 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-accent/10 rounded-lg">
                    <CalendarDays className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60">Fecha del movimiento</p>
                    <p className="font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-base-content/40" />
                      {new Date(selectedMovement.movementDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Motivo */}
              <div className="flex items-center justify-between py-3 border-b border-base-200 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-info/10 rounded-lg">
                    <FileText className="w-4 h-4 text-info" />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60">Motivo / Razón</p>
                    <p className="font-medium">{selectedMovement.reason}</p>
                  </div>
                </div>
              </div>

              {/* Notas */}
              <div className="flex items-center justify-between py-3 border-b border-base-200 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-warning/10 rounded-lg">
                    <StickyNote className="w-4 h-4 text-warning" />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60">Notas adicionales</p>
                    <p className="font-medium text-base-content/70">
                      {selectedMovement.notes || 'Sin notas'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Estado */}
              <div className="flex items-center justify-between py-3 border-b border-base-200 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${statusConfig.bg}`}>
                    <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60">Estado</p>
                    <p
                      className={`font-medium ${selectedMovement.isCancelled ? 'text-error' : 'text-success'}`}
                    >
                      {selectedMovement.isCancelled
                        ? `Anulado el ${selectedMovement.canceledAt ? new Date(selectedMovement.canceledAt).toLocaleDateString() : ''}`
                        : 'Activo'}
                    </p>
                  </div>
                </div>
                {selectedMovement.isCancelled && (
                  <span className="badge badge-error badge-sm gap-1">
                    <Ban className="w-3 h-3" />
                    Anulado
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            {canCancel && (
              <button
                type="button"
                className="btn btn-error gap-2 w-full sm:w-auto"
                onClick={handleCancel}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4" />
                    Anular movimiento
                  </>
                )}
              </button>
            )}
            <button
              type="button"
              className="btn btn-neutral gap-2 w-full sm:w-auto"
              onClick={() => setSelectedMovement(null)}
            >
              <X className="w-4 h-4" />
              Cerrar
            </button>
          </div>
        </div>
      </DetailModal>

      <CancelConfirmModal
        isOpen={showConfirmModal}
        dependencies={dependencies}
        onConfirm={confirmCancel}
        onCancel={closeConfirm}
        isLoading={isLoading}
      />
    </>
  );
}
