import { Eye, Trash2 } from 'lucide-react';

/**
 * Props for the TableColumnActions component.
 */
interface TableColumnActionsProps {
  /** Callback for the view/show detail action */
  onShow?: () => void;
  /** Callback for the delete action */
  onDelete?: () => void;
}

/**
 * Action buttons for table rows (view and delete).
 * @description Renders two icon buttons — view (eye icon) and delete (trash icon) —
 * used inside table cells for row-level actions.
 *
 * @example
 * ```tsx
 * <TableColumnActions
 *   onShow={() => setFormMode('show')}
 *   onDelete={() => setShowConfirmDelete('¿Eliminar?')}
 * />
 * ```
 *
 * @param onShow - Click handler for view action
 * @param onDelete - Click handler for delete action
 */
export function TableColumnActions({ onShow, onDelete }: TableColumnActionsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button className="btn btn-info btn-xs" onClick={onShow}>
        <Eye className="w-4 h-4" />
      </button>
      <button className="btn btn-error btn-xs" onClick={onDelete}>
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
