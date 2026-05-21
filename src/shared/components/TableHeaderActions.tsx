/**
 * Props for the TableHeaderActions component.
 */
interface TableHeaderActionsProps {
  /** Text for the action button (default: 'Agregar') */
  title?: string;
  /** Callback when the action button is clicked */
  onAdd?: () => void;
}

/**
 * Action button placed above data tables.
 * @description A styled button typically used to trigger "add new" or
 * "create" actions for list views. Positioned above the table.
 *
 * @example
 * ```tsx
 * <TableHeaderActions
 *   title="Agregar Usuario"
 *   onAdd={() => setFormMode('create')}
 * />
 * ```
 *
 * @param title - Button label (default: 'Agregar')
 * @param onAdd - Click handler for the button
 */
export default function TableHeaderActions({ title = 'Agregar', onAdd }: TableHeaderActionsProps) {
  return (
    <div className="py-6">
      <button className="btn btn-success" onClick={onAdd}>
        {title}
      </button>
    </div>
  );
}
