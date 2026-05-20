import { usePageTitle } from '@/shared/hooks/usePageTitle';
import InventoryReport from '@/features/reports/components/InventoryReport';

export default function InventoryReportPage() {
  usePageTitle('Reporte de Inventario');
  return <InventoryReport />;
}
