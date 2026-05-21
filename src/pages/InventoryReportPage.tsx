import { usePageTitle } from '@/shared/hooks/usePageTitle';
import InventoryReport from '@/features/reports/components/InventoryReport';

/** Page component for the inventory valuation report. */
export default function InventoryReportPage() {
  usePageTitle('Reporte de Inventario');
  return <InventoryReport />;
}
