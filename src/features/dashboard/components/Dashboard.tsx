import AlertList from '@/features/alerts/components/AlertsMenu';
import DashboardCategories from './DashboardCategories';
import DashboardProducts from './DashboardProducts';
import DashboardLots from './DashboardLots';

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <DashboardCategories />
        <DashboardProducts />
        <DashboardLots />
      </div>
      <div className="grid grid-cols-1">
        <AlertList />
      </div>
    </div>
  );
}
