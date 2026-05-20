import ExpiringLotsList from './ExpiringLotsList';
import LowStockList from './LowStockList';

export default function Alerts() {
  return (
    <div className="space-y-4 xl:grid xl:grid-cols-2 xl:gap-4">
      <ExpiringLotsList />
      <LowStockList />
    </div>
  );
}
