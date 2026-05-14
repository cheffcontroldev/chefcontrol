import { Eye, Trash2 } from 'lucide-react';

interface TableColumnActionsProps {
  formMode?: () => void;
  onDelete?: () => void;
}

export function TableColumnActions({ formMode }: TableColumnActionsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button className="btn btn-info btn-xs" onClick={formMode}>
        <Eye className="w-4 h-4" />
      </button>
      <button className="btn btn-error btn-xs">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
