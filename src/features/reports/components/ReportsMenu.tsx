import BigMenuItem from '@/shared/components/BigMenuItem';
import { Grid3X3, NotepadText } from 'lucide-react';

/**
 * Reports landing page with links to inventory and movement reports.
 */
export default function ReportsMenu() {
  return (
    <div className="px-3 w-full max-w-6xl justify-center flex gap-4 flex-wrap">
      <BigMenuItem icon={Grid3X3} title="Reporte de inventario" href="/reportes/inventario" />
      <BigMenuItem icon={NotepadText} title="Reporte de movimientos" href="/reportes/movimientos" />
    </div>
  );
}
