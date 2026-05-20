import MovementReport from '@/features/reports/components/MovementReport';
import { usePageTitle } from '@/shared/hooks/usePageTitle';

export default function MovementReportPage() {
  usePageTitle('Reporte de Movimientos');
  return <MovementReport />;
}
