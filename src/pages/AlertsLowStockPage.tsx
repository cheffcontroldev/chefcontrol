import LowStockList from '@/features/alerts/components/LowStockList';
import { usePageTitle } from '@/shared/hooks/usePageTitle';

/** Page component for displaying products with low stock levels. */
export default function AlertsLowStockPage() {
  usePageTitle('Alertas - Productos con bajo stock');
  return (
    <div className="w-full max-w-7xl py-6">
      <LowStockList />
    </div>
  );
}
