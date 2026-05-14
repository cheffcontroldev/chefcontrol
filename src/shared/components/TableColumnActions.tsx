import { Eye, Trash2 } from 'lucide-react';

interface TableColumnActionsProps {
  onShow?: () => void;
  onDelete?: () => void;
}

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
