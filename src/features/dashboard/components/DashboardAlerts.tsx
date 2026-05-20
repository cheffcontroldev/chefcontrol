import ExpiringLotsList from '../../alerts/components/ExpiringLotsList';
import LowStockList from '../../alerts/components/LowStockList';

export default function DashboardAlerts() {
  return (
    <div className="space-y-4 xl:grid xl:grid-cols-2 xl:gap-4">
      <ExpiringLotsList />
      <LowStockList />
    </div>
  );
}
