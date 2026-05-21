import DashboardAlerts from './DashboardAlerts';
import DashboardCategories from './DashboardCategories';
import DashboardProducts from './DashboardProducts';
import DashboardLots from './DashboardLots';

/**
 * Main dashboard page.
 *
 * Composes four dashboard widgets in a responsive grid:
 * - Count cards (categories, products, lots) — 1/2/3 columns depending on viewport
 * - Alerts section (expiring lots + low stock) — full width below
 */
export default function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <DashboardCategories />
        <DashboardProducts />
        <DashboardLots />
      </div>
      <div className="grid grid-cols-1">
        <DashboardAlerts />
      </div>
    </div>
  );
}
