import MovementReport from '@/features/reports/components/MovementReport';
import { usePageTitle } from '@/shared/hooks/usePageTitle';

/** Page component for the inventory movement history report. */
export default function MovementReportPage() {
  usePageTitle('Reporte de Movimientos');
  return <MovementReport />;
}
