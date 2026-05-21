import ExpiringLotsList from '../../alerts/components/ExpiringLotsList';
import LowStockList from '../../alerts/components/LowStockList';

/**
 * Dashboard section that surfaces actionable alerts.
 *
 * Composes two alert lists side by side on `xl` screens, stacked on smaller
 * viewports:
 * - Products with low stock
 * - Lots that are about to expire
 */
export default function DashboardAlerts() {
  return (
    <div className="space-y-4 xl:grid xl:grid-cols-2 xl:gap-4">
      <ExpiringLotsList />
      <LowStockList />
    </div>
  );
}
