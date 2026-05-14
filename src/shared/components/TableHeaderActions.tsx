interface TableHeaderActionsProps {
  title?: string;
  onAdd?: () => void;
}

export default function TableHeaderActions({ title = 'Agregar', onAdd }: TableHeaderActionsProps) {
  return (
    <div className="py-6">
      <button className="btn btn-success" onClick={onAdd}>
        {title}
      </button>
    </div>
  );
}
