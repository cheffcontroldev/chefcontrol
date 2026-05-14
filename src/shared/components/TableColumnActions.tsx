import { Eye, Trash2 } from 'lucide-react';

export function TableColumnActions() {
  return (
    <div className="flex items-center justify-center gap-2">
      <button className="btn btn-info btn-xs">
        <Eye className="w-4 h-4" />
      </button>
      <button className="btn btn-error btn-xs">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
