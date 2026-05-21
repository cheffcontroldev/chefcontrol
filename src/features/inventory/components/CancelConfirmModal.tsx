/** Props for the {@link CancelConfirmModal} component. */
interface CancelConfirmModalProps {
  isOpen: boolean;
  dependencies: Array<{
    id: string;
    date: string;
    quantity: number;
    reason: string;
  }>;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

/**
 * Modal that asks the user to confirm cancelling a movement.
 *
 * If the movement has downstream dependencies (other movements that consumed
 * the same lot), it shows a warning and offers "Anular todo" instead.
 */
export default function CancelConfirmModal({
  isOpen,
  dependencies,
  onConfirm,
  onCancel,
  isLoading,
}: CancelConfirmModalProps) {
  if (!isOpen) return null;

  const hasDependencies = dependencies.length > 0;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {hasDependencies ? '⚠️ Movimientos dependientes' : '¿Anular movimiento?'}
        </h3>

        <p className="py-4">
          {hasDependencies
            ? `Esta entrada tiene ${dependencies.length} salida(s) que consumieron sus lotes. Se anularán en cascada.`
            : '¿Está seguro de que desea anular este movimiento? El stock será restaurado.'}
        </p>

        {hasDependencies && (
          <div className="bg-base-200 rounded p-3 mb-4 max-h-40 overflow-y-auto">
            <h4 className="font-semibold text-sm mb-2">Salidas a anular:</h4>
            <ul className="space-y-1">
              {dependencies.map((dep) => (
                <li key={dep.id} className="text-sm">
                  • {dep.reason} — {dep.quantity} kg ({new Date(dep.date).toLocaleDateString()})
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="modal-action">
          <button className="btn" onClick={onCancel} disabled={isLoading}>
            Volver
          </button>
          <button className="btn btn-error" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Anulando...' : hasDependencies ? 'Anular todo' : 'Confirmar anulación'}
          </button>
        </div>
      </div>
    </div>
  );
}
